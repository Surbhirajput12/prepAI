import { store } from "../repositories/mongoStore.js";

function buildQuestionSet(profile, roleTarget) {
  const stacks = profile.techStacks?.length ? profile.techStacks : ["node.js", "javascript"];
  const base = [
    `Introduce yourself for a ${roleTarget} interview and summarize your strongest project impact.`,
    `What was your most complex ${stacks[0]} implementation and what tradeoffs did you make?`,
    `How would you improve reliability and performance in a production service?`,
    `Tell me about a time you handled a high-pressure bug in production.`,
  ];

  if (profile.seniorityLevel === "senior") {
    base.push(
      "How do you influence architecture decisions across teams and resolve disagreements?"
    );
  }

  return base;
}

function evaluateAnswer(answer, profile) {
  const text = (answer || "").toLowerCase();
  const lengthScore = Math.min(40, Math.floor((text.split(/\s+/).filter(Boolean).length / 120) * 40));
  const stackMentions = (profile.techStacks || []).filter((stack) =>
    text.includes(stack.toLowerCase())
  ).length;
  const depthScore = Math.min(35, stackMentions * 8 + (text.includes("tradeoff") ? 6 : 0));
  const ownershipScore = ["impact", "result", "led", "improved", "metric"].some((token) =>
    text.includes(token)
  )
    ? 25
    : 12;

  const total = Math.min(100, lengthScore + depthScore + ownershipScore);
  return {
    total,
    breakdown: { lengthScore, depthScore, ownershipScore },
  };
}

function aggregateReport(interview) {
  const scoredTurns = interview.transcript
    .filter((t) => t.role === "candidate")
    .map((turn) => evaluateAnswer(turn.text, interview.profileSnapshot));

  const average =
    scoredTurns.length === 0
      ? 0
      : Math.round(scoredTurns.reduce((sum, item) => sum + item.total, 0) / scoredTurns.length);

  const expected = interview.profileSnapshot.seniorityLevel === "senior" ? 75 : 60;
  const verdict = average >= expected ? "strong hire signal" : "needs improvement";

  return {
    overallScore: average,
    targetThreshold: expected,
    verdict,
    seniorityBenchmarkedAgainst: interview.profileSnapshot.seniorityLevel,
    feedback: [
      "Use quantified outcomes in every answer.",
      "Explain architecture tradeoffs more explicitly.",
      "Tie decisions to business impact and reliability.",
    ],
    transcript: interview.transcript,
  };
}

export const interviewService = {
  async startInterview({ userId, roleTarget, profile }) {
    const interview = await store.createInterview({ userId, roleTarget, profileSnapshot: profile });
    const questionSet = buildQuestionSet(profile, roleTarget);
    const updated = await store.updateInterview(interview.id, (current) => ({ ...current, questionSet }));
    return updated;
  },

  getCurrentQuestion(interview) {
    const asked = interview.transcript.filter((t) => t.role === "interviewer").length;
    return interview.questionSet?.[asked] || null;
  },

  async addInterviewerQuestion(interviewId, question) {
    return store.updateInterview(interviewId, (current) => ({
      ...current,
      transcript: [
        ...current.transcript,
        {
          role: "interviewer",
          text: question,
          at: new Date().toISOString(),
        },
      ],
    }));
  },

  async addCandidateAnswer(interviewId, answer) {
    return store.updateInterview(interviewId, (current) => ({
      ...current,
      transcript: [
        ...current.transcript,
        {
          role: "candidate",
          text: answer,
          at: new Date().toISOString(),
        },
      ],
    }));
  },

  async finishInterview(interviewId) {
    return store.updateInterview(interviewId, (current) => {
      const report = aggregateReport(current);
      return {
        ...current,
        status: "completed",
        completedAt: new Date().toISOString(),
        report,
      };
    });
  },
};
