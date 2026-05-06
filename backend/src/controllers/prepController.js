import { store } from "../repositories/mongoStore.js";
import { prepService } from "../services/prepService.js";
import { ApiError } from "../utils/apiError.js";

export const prepController = {
  async getPlan(req, res) {
    const resume = await store.getResumeByUserId(req.user.id);
    if (!resume) {
      throw new ApiError(400, "Upload resume first to generate prep plan.");
    }

    const plan = prepService.generatePrepPlan(resume.parsedProfile);
    res.json({
      success: true,
      data: plan,
    });
  },
};
