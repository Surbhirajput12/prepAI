import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../config/env.js";

// Initialize Gemini SDK with API key from environment
const apiKey = env.googleClientId || process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const generativeService = {
  async suggestResumeImprovements(contextData, taskType = 'general') {
    try {
      if (!genAI) {
        // Fallback mock if no API key is configured
        return `[Mock AI Suggestion] Enhance your resume by highlighting measurable impacts in the context of: ${contextData}. Try using action verbs like "Spearheaded" or "Orchestrated".`;
      }

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      let prompt = "";
      if (taskType === 'bullet_points') {
        prompt = `
          You are an expert AI resume writer and career coach.
          Task: Rewrite the following experience description into 3-4 professional, impactful, and ATS-friendly bullet points.
          Focus on quantifiable achievements, action verbs, and industry-standard terminology.
          Do NOT include introductory text, just the bullet points starting with a dash (-).

          Experience Description:
          ${contextData}
        `;
      } else if (taskType === 'professional_summary') {
        prompt = `
          You are an expert AI resume writer.
          Task: Write a compelling, professional resume summary (3-4 sentences) based on the following context.
          Highlight key skills, years of experience, and career goals.
          Do NOT include introductory text, just the summary paragraph.
          
          Context Data:
          ${contextData}
        `;
      } else {
        prompt = `
          You are an expert AI resume reviewer and career coach.  
          Please provide 3 specific, actionable suggestions to improve the following resume section or context data.
          Focus on making the text more impactful, ATS-friendly, and professional.
          
          Context Data:
          ${contextData}
          
          Provide the output as a clean text summary.
        `;
      }

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error("Generative AI Error:", error.message);
      // Fallback gracefully if API key is invalid or quota exceeded
      return `[Fallback AI Suggestion] We couldn't reach the live AI service right now. To enhance your resume for: "${contextData}", consider adding quantifiable metrics (e.g., "improved efficiency by 20%") and action-oriented verbs.`;
    }
  }
};
