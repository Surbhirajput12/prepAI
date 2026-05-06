import { store } from "../repositories/mongoStore.js";
import { interviewService } from "../services/interviewService.js";
import { ApiError } from "../utils/apiError.js";

export const interviewController = {
  async start(req, res) {
    const resume = await store.getResumeByUserId(req.user.id);
    if (!resume) {
      throw new ApiError(400, "Upload resume before starting an interview.");
    }

    const roleTarget = req.body.roleTarget || resume.parsedProfile.targetRole || "software engineer";
    const interview = await interviewService.startInterview({
      userId: req.user.id,
      roleTarget,
      profile: resume.parsedProfile,
    });

    const firstQuestion = interviewService.getCurrentQuestion(interview);
    let updated = interview;
    if (firstQuestion) {
      updated = await interviewService.addInterviewerQuestion(interview.id, firstQuestion);
    }

    res.status(201).json({
      success: true,
      data: {
        interviewId: interview.id,
        roleTarget,
        firstQuestion,
        status: updated.status,
      },
    });
  },

  async answer(req, res) {
    const interview = await store.getInterviewById(req.params.id);
    if (!interview || interview.userId !== req.user.id) {
      throw new ApiError(404, "Interview session not found.");
    }
    if (interview.status !== "active") {
      throw new ApiError(400, "Interview already completed.");
    }

    const { answer } = req.body;
    if (!answer) {
      throw new ApiError(400, "answer is required.");
    }

    const afterAnswer = await interviewService.addCandidateAnswer(interview.id, answer);
    const nextQuestion = interviewService.getCurrentQuestion(afterAnswer);
    if (nextQuestion) {
      await interviewService.addInterviewerQuestion(interview.id, nextQuestion);
    }

    res.json({
      success: true,
      data: {
        interviewId: interview.id,
        nextQuestion,
        hasMoreQuestions: Boolean(nextQuestion),
      },
    });
  },

  async end(req, res) {
    const interview = await store.getInterviewById(req.params.id);
    if (!interview || interview.userId !== req.user.id) {
      throw new ApiError(404, "Interview session not found.");
    }

    const completed =
      interview.status === "completed"
        ? interview
        : await interviewService.finishInterview(interview.id);

    res.json({
      success: true,
      message: "Interview finished. Transcript and report generated.",
      data: completed.report,
    });
  },

  async report(req, res) {
    const interview = await store.getInterviewById(req.params.id);
    if (!interview || interview.userId !== req.user.id) {
      throw new ApiError(404, "Interview session not found.");
    }
    if (!interview.report) {
      throw new ApiError(400, "Interview report not generated yet.");
    }

    res.json({
      success: true,
      data: interview.report,
    });
  },
};
