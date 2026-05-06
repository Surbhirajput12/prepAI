import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
console.log("API Key exists:", !!apiKey);
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
  const models = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
  const data = await models.json();
  console.log(data.models.map(m => m.name));
}

listModels().catch(console.error);
