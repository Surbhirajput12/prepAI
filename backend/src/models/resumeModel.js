import mongoose from "mongoose";

const parsedProfileSchema = new mongoose.Schema(
  {
    techStacks: { type: [String], default: [] },
    previousRoles: { type: [String], default: [] },
    targetRole: { type: String, default: "software engineer" },
    yearsOfExperience: { type: Number, default: 0 },
    seniorityLevel: { type: String, default: "junior" },
  },
  { _id: false }
);

const resumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    mimeType: { type: String, required: true },
    parsedProfile: { type: parsedProfileSchema, required: true },
    rawText: { type: String, default: "" },
  },
  { timestamps: { createdAt: "uploadedAt", updatedAt: "updatedAt" } }
);

export const ResumeModel = mongoose.model("Resume", resumeSchema);
