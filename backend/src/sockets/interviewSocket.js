import { store } from "../repositories/mongoStore.js";
import { interviewService } from "../services/interviewService.js";
import { tokenService } from "../services/tokenService.js";

async function socketAuth(socket, next) {
  try {
    const rawToken = socket.handshake.auth?.token || "";
    const token = rawToken.replace(/^Bearer\s+/i, "");
    const payload = tokenService.verify(token);
    const user = await store.findUserById(payload.sub);
    if (!user) return next(new Error("Unauthorized"));
    socket.user = user;
    return next();
  } catch {
    return next(new Error("Unauthorized"));
  }
}

export function registerInterviewSocket(io) {
  io.use(socketAuth);

  io.on("connection", (socket) => {
    socket.on("interview:start", async ({ roleTarget } = {}) => {
      const resume = await store.getResumeByUserId(socket.user.id);
      if (!resume) {
        socket.emit("interview:error", { message: "Upload resume first." });
        return;
      }

      const interview = await interviewService.startInterview({
        userId: socket.user.id,
        roleTarget: roleTarget || resume.parsedProfile.targetRole || "software engineer",
        profile: resume.parsedProfile,
      });

      const question = interviewService.getCurrentQuestion(interview);
      if (question) {
        await interviewService.addInterviewerQuestion(interview.id, question);
      }

      socket.emit("interview:started", {
        interviewId: interview.id,
        firstQuestion: question,
      });
    });

    socket.on("interview:answer", async ({ interviewId, answer }) => {
      const interview = await store.getInterviewById(interviewId);
      if (!interview || interview.userId !== socket.user.id) {
        socket.emit("interview:error", { message: "Invalid interview session." });
        return;
      }

      await interviewService.addCandidateAnswer(interviewId, answer || "");
      const updated = await store.getInterviewById(interviewId);
      const nextQuestion = interviewService.getCurrentQuestion(updated);
      if (nextQuestion) {
        await interviewService.addInterviewerQuestion(interviewId, nextQuestion);
      }

      socket.emit("interview:question", {
        interviewId,
        question: nextQuestion,
        hasMoreQuestions: Boolean(nextQuestion),
      });
    });

    socket.on("interview:end", async ({ interviewId }) => {
      const interview = await store.getInterviewById(interviewId);
      if (!interview || interview.userId !== socket.user.id) {
        socket.emit("interview:error", { message: "Invalid interview session." });
        return;
      }

      const done =
        interview.status === "completed"
          ? interview
          : await interviewService.finishInterview(interviewId);
      socket.emit("interview:report", done.report);
    });
  });
}
