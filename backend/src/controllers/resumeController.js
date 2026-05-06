import { store } from "../repositories/mongoStore.js";
import { resumeParserService } from "../services/resumeParserService.js";
import { ApiError } from "../utils/apiError.js";

function parseArrayField(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseNumber(value) {
  if (!value) return 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export const resumeController = {
  async upload(req, res) {
    if (!req.file) {
      throw new ApiError(400, "Please upload a resume file.");
    }

    const fileText = await resumeParserService.loadResumeText(req.file.path, req.file.mimetype);
    const rawText = req.body.resumeText || fileText || "";

    const overrides = {
      techStacks: parseArrayField(req.body.techStacks),
      previousRoles: parseArrayField(req.body.previousRoles),
      targetRole: req.body.targetRole,
      yearsOfExperience: parseNumber(req.body.yearsOfExperience),
      seniorityLevel: req.body.seniorityLevel,
    };

    const parsedProfile = resumeParserService.buildProfile(rawText, overrides);
    const resume = await store.saveResume({
      userId: req.user.id,
      fileName: req.file.originalname,
      filePath: req.file.path,
      mimeType: req.file.mimetype,
      parsedProfile,
      rawText,
    });

    res.status(201).json({
      success: true,
      message: "Resume uploaded. User can now continue to dashboard and interview prep.",
      data: resume,
    });
  },

  async getMine(req, res) {
    const resume = await store.getResumeByUserId(req.user.id);
    if (!resume) {
      throw new ApiError(404, "No resume uploaded yet.");
    }

    res.json({
      success: true,
      data: resume,
    });
  },

  async suggest(req, res) {
    const { context, taskType } = req.body;
    if (!context) {
      throw new ApiError(400, "Context data is required for suggestions.");
    }
    
    // Using generativeService which was just created
    const { generativeService } = await import("../services/generativeService.js");
    const suggestion = await generativeService.suggestResumeImprovements(context, taskType);

    res.json({
      success: true,
      suggestion,
    });
  }
};
