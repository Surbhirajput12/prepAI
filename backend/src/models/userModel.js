import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    passwordHash: { type: String, default: null },
    provider: { type: String, enum: ["local", "google"], default: "local" },
    providerId: { type: String, default: null },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);
