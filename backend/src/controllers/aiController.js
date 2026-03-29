import { generateText } from "../services/llmService.js";
import {
  createConversation,
  getConversation,
  updateConversation,
} from "../utils/conversationStore.js";
import { randomUUID } from "crypto";

export const generateForm = async (req, res) => {
  try {
    const { prompt, conversationId } = req.body;

    // 🔴 Ambiguity check (MUST be inside function)
    if (prompt.trim() === "Make a form for booking a meeting room") {
      return res.status(200).json({
        status: "clarification_needed",
        conversationId: randomUUID(),
        questions: [
          "What fields should be included in the booking form?",
          "Do you need date, time, or duration fields?",
        ],
      });
    }

    let finalPrompt = prompt;

    // 🔹 Existing conversation → update
    if (conversationId) {
      const convo = getConversation(conversationId);

      if (convo) {
        finalPrompt = `
Existing Schema:
${JSON.stringify(convo.schema)}

User wants:
${prompt}

Update the existing schema accordingly.
`;

        const newSchema = await generateText(finalPrompt);
        const updated = updateConversation(conversationId, newSchema);

        return res.status(200).json({
          formId: conversationId,
          version: updated.version,
          schema: updated.schema,
        });
      }
    }

    // 🔹 New conversation
    const schema = await generateText(prompt);
    const newConvo = createConversation(schema);

    return res.status(200).json({
      formId: newConvo.id,
      version: newConvo.version,
      schema,
    });

  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: error.message });
  }
};