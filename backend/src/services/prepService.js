function questionByStack(stack, level) {
  const seniorVariant =
    level === "senior"
      ? `Design a production-grade ${stack} solution with tradeoffs, scaling strategy, and observability.`
      : `Explain how you would build a reliable feature using ${stack}.`;

  return seniorVariant;
}

export const prepService = {
  generatePrepPlan(profile) {
    const stacks = profile.techStacks?.length ? profile.techStacks : ["javascript", "node.js"];
    const level = profile.seniorityLevel || "mid";

    const technicalQuestions = stacks.slice(0, 6).map((stack) => questionByStack(stack, level));

    const behavioralQuestions = [
      "Describe a difficult project conflict and how you resolved it.",
      "Tell me about a time you improved delivery speed without reducing quality.",
      "How do you mentor teammates and raise the engineering bar?",
    ];

    const roleAligned = profile.targetRole || "software engineer";
    const systemDesignQuestions = [
      `Design a hiring platform module for ${roleAligned} interview workflows.`,
      "Design an event-driven transcript and scoring pipeline for live interviews.",
    ];

    return {
      profileSnapshot: profile,
      technicalQuestions,
      behavioralQuestions,
      systemDesignQuestions,
      studyChecklist: [
        "Revise 3 projects from your resume with architecture and outcome metrics.",
        "Prepare STAR stories for leadership, ownership, and conflict handling.",
        "Practice concise answers (2-3 minutes) for core stack topics.",
      ],
    };
  },
};
