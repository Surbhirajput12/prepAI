import mongoose from "mongoose";

const transcriptTurnSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["interviewer", "candidate"], required: true },
    text: { type: String, required: true },
    at: { type: String, required: true },
  },
  { _id: false }
);

const interviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    roleTarget: { type: String, required: true },
    profileSnapshot: { type: mongoose.Schema.Types.Mixed, required: true },
    status: { type: String, enum: ["active", "completed"], default: "active" },
    questionSet: { type: [String], default: [] },
    transcript: { type: [transcriptTurnSchema], default: [] },
    completedAt: { type: String, default: null },
    report: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

export const InterviewModel = mongoose.model("Interview", interviewSchema);
