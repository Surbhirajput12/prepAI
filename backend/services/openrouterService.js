const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

const PRIMARY_MODEL = "openai/gpt-4o-mini";
const SECONDARY_MODEL = "anthropic/claude-3-haiku";
const FREE_FALLBACK_MODEL = "openrouter/free";

function getTypeConfig(type) {
  const normalized = String(type || "interview").toLowerCase();

  if (normalized === "resume") {
    return {
      // Best quality first.
      modelOrder: [PRIMARY_MODEL, SECONDARY_MODEL, FREE_FALLBACK_MODEL],
      temperature: 0.3,
      systemPrompt:
        "You are a senior resume strategist. Return clear, structured, high-quality resume guidance.",
    };
  }

  if (normalized === "feedback") {
    return {
      // Cheaper-first ordering.
      modelOrder: [FREE_FALLBACK_MODEL, SECONDARY_MODEL, PRIMARY_MODEL],
      temperature: 0.2,
      systemPrompt:
        "You are an interview feedback assistant. Be concise, practical, and cost-efficient.",
    };
  }

  return {
    // Conversational interview coaching.
    modelOrder: [SECONDARY_MODEL, PRIMARY_MODEL, FREE_FALLBACK_MODEL],
    temperature: 0.7,
    systemPrompt:
      "You are a conversational interview coach. Ask natural follow-ups and keep answers human and clear.",
  };
}

function extractText(data) {
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content === "string") return content.trim();
  if (Array.isArray(content)) {
    return content
      .map((part) => (typeof part?.text === "string" ? part.text : ""))
      .join("")
      .trim();
  }
  return "";
}

async function callOpenRouter({ prompt, modelCandidates, temperature, systemPrompt }) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is missing.");
  }

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost",
      "X-Title": process.env.OPENROUTER_APP_NAME || "AI Resume Backend",
    },
    body: JSON.stringify({
      // Required: OpenRouter multi-model routing.
      models: modelCandidates,
      provider: {
        sort: { by: "price" },
      },
      temperature,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message =
      data?.error?.message || data?.message || `OpenRouter error (${response.status})`;
    throw new Error(message);
  }

  const output = extractText(data);
  if (!output) {
    throw new Error("OpenRouter returned empty output.");
  }

  return {
    success: true,
    modelUsed: data?.model || modelCandidates[0],
    output,
  };
}

export async function generateAIResponse(prompt, type = "interview") {
  const safePrompt = String(prompt || "").trim();
  if (!safePrompt) {
    throw new Error("Prompt is required.");
  }

  const config = getTypeConfig(type);
  const errors = [];

  // Retry using next model preference order.
  for (let i = 0; i < config.modelOrder.length; i += 1) {
    const candidateModels = config.modelOrder.slice(i);
    try {
      return await callOpenRouter({
        prompt: safePrompt,
        modelCandidates: candidateModels,
        temperature: config.temperature,
        systemPrompt: config.systemPrompt,
      });
    } catch (error) {
      errors.push(error?.message || "Unknown OpenRouter error");
    }
  }

  throw new Error(`All OpenRouter model attempts failed: ${errors.join(" | ")}`);
}

export default generateAIResponse;
