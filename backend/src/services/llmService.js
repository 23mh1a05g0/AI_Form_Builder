import Groq from "groq-sdk";
import dotenv from "dotenv";
import { validateSchema } from "../utils/schemaValidator.js";

dotenv.config();

const client = new Groq({
  apiKey: process.env.LLM_API_KEY,
});

export const generateText = async (prompt) => {
  let attempts = 0;
  const maxRetries = 2;

  while (attempts <= maxRetries) {
    try {
      const response = await client.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `
You are a JSON Schema generator.

STRICT RULES:
- Return ONLY valid JSON
- No explanation, no markdown, no HTML
- Output must start with { and end with }

TASK:
Convert user request into JSON Schema (Draft 7)

FORMAT:
{
  "type": "object",
  "properties": {
    "fieldName": {
      "type": "string",
      "title": "Field Name"
    }
  },
  "required": []
}
`,
          },
          {
            role: "user",
            content: `
${prompt}

REMEMBER:
Return ONLY JSON schema.
`,
          },
        ],
        temperature: 0.3,
      });

      const raw = response.choices?.[0]?.message?.content || "";
      console.log("Raw AI Output:", raw);

      const cleaned = raw.replace(/```json|```/g, "").trim();

      const jsonStart = cleaned.indexOf("{");
      const jsonEnd = cleaned.lastIndexOf("}");

      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error("No valid JSON found in AI response");
      }

      const extracted = cleaned.substring(jsonStart, jsonEnd + 1);

      let parsed;
      try {
        parsed = JSON.parse(extracted);
      } catch (err) {
        console.error("JSON Parse Error:", extracted);
        throw new Error("Invalid JSON from AI");
      }

      const isValid = validateSchema(parsed);

      if (!isValid) {
        throw new Error("Schema validation failed");
      }

      return parsed;

    } catch (error) {
      attempts++;
      console.error(`Attempt ${attempts} failed:`, error.message);

      if (attempts > maxRetries) {
        throw new Error(
          "Failed to generate valid schema after multiple attempts."
        );
      }

      console.log("Retrying...");
    }
  }
};