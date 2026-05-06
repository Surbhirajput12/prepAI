import { UserModel } from "../models/userModel.js";
import { ResumeModel } from "../models/resumeModel.js";
import { InterviewModel } from "../models/interviewModel.js";
import { env } from "../config/env.js";

function mapId(doc) {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : doc;
  const normalized = { ...obj };
  normalized.id = String(obj._id);
  if (obj.userId) normalized.userId = String(obj.userId);
  delete normalized._id;
  delete normalized.__v;
  return normalized;
}

const mongoStore = {
  async createUser({ email, name, passwordHash, provider = "local", providerId = null }) {
    const created = await UserModel.create({
      email,
      name,
      passwordHash,
      provider,
      providerId,
    });
    return mapId(created);
  },

  async findUserByEmail(email) {
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    return mapId(user);
  },

  async findUserByOAuth(provider, providerId) {
    const user = await UserModel.findOne({ provider, providerId });
    return mapId(user);
  },

  async findUserById(id) {
    const user = await UserModel.findById(id);
    return mapId(user);
  },

  async saveResume({ userId, fileName, filePath, mimeType, parsedProfile, rawText }) {
    const resume = await ResumeModel.findOneAndUpdate(
      { userId },
      { fileName, filePath, mimeType, parsedProfile, rawText, userId },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    return mapId(resume);
  },

  async getResumeByUserId(userId) {
    const resume = await ResumeModel.findOne({ userId });
    return mapId(resume);
  },

  async createInterview({ userId, roleTarget, profileSnapshot }) {
    const created = await InterviewModel.create({
      userId,
      roleTarget,
      profileSnapshot,
    });
    return mapId(created);
  },

  async getInterviewById(id) {
    const interview = await InterviewModel.findById(id);
    return mapId(interview);
  },

  async updateInterview(id, updater) {
    const interview = await InterviewModel.findById(id);
    if (!interview) return null;
    const current = mapId(interview);
    const updatedObject = updater(current);
    const { id: _idIgnore, ...safeData } = updatedObject;
    const saved = await InterviewModel.findByIdAndUpdate(
      id,
      { $set: safeData },
      { new: true }
    );
    return mapId(saved);
  },

  async listUserInterviews(userId) {
    const interviews = await InterviewModel.find({ userId }).sort({ createdAt: -1 });
    return interviews.map(mapId);
  },
};

const state = {
  users: [],
  resumes: [],
  interviews: [],
};

function now() {
  return new Date().toISOString();
}

function createId() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
}

function clone(value) {
  return value ? JSON.parse(JSON.stringify(value)) : null;
}

const memoryStore = {
  async createUser({ email, name, passwordHash, provider = "local", providerId = null }) {
    const timestamp = now();
    const user = {
      id: createId(),
      email: email.toLowerCase(),
      name,
      passwordHash,
      provider,
      providerId,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    state.users.push(user);
    return clone(user);
  },

  async findUserByEmail(email) {
    return clone(state.users.find((user) => user.email === email.toLowerCase()));
  },

  async findUserByOAuth(provider, providerId) {
    return clone(state.users.find((user) => user.provider === provider && user.providerId === providerId));
  },

  async findUserById(id) {
    return clone(state.users.find((user) => user.id === id));
  },

  async saveResume({ userId, fileName, filePath, mimeType, parsedProfile, rawText }) {
    const existingIndex = state.resumes.findIndex((resume) => resume.userId === userId);
    const timestamp = now();
    const existing = existingIndex >= 0 ? state.resumes[existingIndex] : null;
    const resume = {
      id: existing?.id || createId(),
      userId,
      fileName,
      filePath,
      mimeType,
      parsedProfile,
      rawText,
      uploadedAt: existing?.uploadedAt || timestamp,
      updatedAt: timestamp,
    };

    if (existingIndex >= 0) {
      state.resumes[existingIndex] = resume;
    } else {
      state.resumes.push(resume);
    }
    return clone(resume);
  },

  async getResumeByUserId(userId) {
    return clone(state.resumes.find((resume) => resume.userId === userId));
  },

  async createInterview({ userId, roleTarget, profileSnapshot }) {
    const timestamp = now();
    const interview = {
      id: createId(),
      userId,
      roleTarget,
      profileSnapshot,
      status: "active",
      questionSet: [],
      transcript: [],
      completedAt: null,
      report: null,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    state.interviews.push(interview);
    return clone(interview);
  },

  async getInterviewById(id) {
    return clone(state.interviews.find((interview) => interview.id === id));
  },

  async updateInterview(id, updater) {
    const index = state.interviews.findIndex((interview) => interview.id === id);
    if (index < 0) return null;

    const updated = {
      ...updater(clone(state.interviews[index])),
      id,
      updatedAt: now(),
    };
    state.interviews[index] = updated;
    return clone(updated);
  },

  async listUserInterviews(userId) {
    return clone(
      state.interviews
        .filter((interview) => interview.userId === userId)
        .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt))
    );
  },
};

export const store = env.useMemoryStore ? memoryStore : mongoStore;
