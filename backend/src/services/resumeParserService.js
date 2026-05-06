import fs from "node:fs/promises";

const STACK_KEYWORDS = [
  "javascript",
  "typescript",
  "node.js",
  "node",
  "react",
  "next.js",
  "python",
  "java",
  "spring",
  "django",
  "flask",
  "aws",
  "azure",
  "gcp",
  "docker",
  "kubernetes",
  "mongodb",
  "postgresql",
  "mysql",
  "redis",
  "graphql",
  "rest",
];

const ROLE_KEYWORDS = [
  "frontend developer",
  "backend developer",
  "full stack developer",
  "software engineer",
  "senior software engineer",
  "tech lead",
  "engineering manager",
  "devops engineer",
  "data engineer",
  "machine learning engineer",
  "solutions architect",
];

const SENIOR_HINTS = ["senior", "lead", "architect", "principal", "staff", "manager"];

function findYearsOfExperience(text) {
  const matches = [...text.matchAll(/(\d{1,2})\+?\s+years?/gi)].map((m) => Number(m[1]));
  return matches.length ? Math.max(...matches) : 0;
}

function extractKeywords(text, dictionary) {
  const lower = text.toLowerCase();
  return dictionary.filter((keyword) => lower.includes(keyword.toLowerCase()));
}

function inferSeniority(text, years) {
  const lower = text.toLowerCase();
  if (years >= 8 || SENIOR_HINTS.some((hint) => lower.includes(hint))) {
    return "senior";
  }
  if (years >= 4) return "mid";
  return "junior";
}

export const resumeParserService = {
  async loadResumeText(filePath, mimeType) {
    if (mimeType === "text/plain" || filePath.toLowerCase().endsWith(".txt")) {
      return fs.readFile(filePath, "utf8");
    }
    return "";
  },

  buildProfile(text, overrides = {}) {
    const normalizedText = text || "";
    const years = findYearsOfExperience(normalizedText);
    const techStacks = extractKeywords(normalizedText, STACK_KEYWORDS);
    const previousRoles = extractKeywords(normalizedText, ROLE_KEYWORDS);
    const seniority = inferSeniority(normalizedText, years);

    return {
      techStacks: overrides.techStacks?.length ? overrides.techStacks : techStacks,
      previousRoles: overrides.previousRoles?.length ? overrides.previousRoles : previousRoles,
      targetRole: overrides.targetRole || previousRoles[0] || "software engineer",
      yearsOfExperience: overrides.yearsOfExperience || years,
      seniorityLevel: overrides.seniorityLevel || seniority,
    };
  },
};
