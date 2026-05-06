import { store } from "../repositories/mongoStore.js";

export const dashboardController = {
  async summary(req, res) {
    const resume = await store.getResumeByUserId(req.user.id);
    const interviews = await store.listUserInterviews(req.user.id);

    res.json({
      success: true,
      data: {
        user: {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email,
        },
        hasResume: Boolean(resume),
        latestProfile: resume?.parsedProfile || null,
        interviews: interviews.map((item) => ({
          id: item.id,
          roleTarget: item.roleTarget,
          status: item.status,
          createdAt: item.createdAt,
          completedAt: item.completedAt,
          score: item.report?.overallScore || null,
        })),
      },
    });
  },
};
