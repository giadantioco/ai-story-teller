import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import type { NextApiRequest, NextApiResponse } from "next";

const AGE_RULES: Record<string, string> = {
  "2-3":
    "80-150 words. Sentences of 3-6 words. Lots of repetition and onomatopoeia (e.g. 'splash!', 'meow'). Everyday objects and situations (animals, bath time, mealtime, bedtime). No conflict.",
  "3-4":
    "150-300 words. Simple sentences. A small problem that is solved quickly. Name the emotions (happy, sad, surprised). A repeated refrain.",
  "4-5":
    "300-500 words. Clear beginning, middle and end. A small challenge, friendship, a bit of humor, a gentle moral.",
};

const THEMES = ["animals", "bedtime", "friendship", "magic", "adventure"];

const clean = (s: unknown) =>
  String(s ?? "")
    .replace(/[\n\r]/g, " ")
    .trim()
    .slice(0, 40);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { age, theme, protagonist, friend } = req.body;

  if (!AGE_RULES[age] || !THEMES.includes(theme) || !clean(protagonist)) {
    return res.status(400).json({ error: "Parameters not valid" });
  }

  const prompt = `Write a story in English for children aged ${age}.
    Theme: ${theme}.
    Protagonist: ${clean(protagonist)}.${
      clean(friend) ? `\nFriend/adventure companion: ${clean(friend)}.` : ""
    }
    Rules for this age: ${AGE_RULES[age]}
    Always: no fear, danger, violence, villains or sadness; warm and reassuring tone; peaceful ending.
    Format: the title on the first line (no symbols), then an empty line, then the story split into short paragraphs.`;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash-lite",
      safetySettings: [
        HarmCategory.HARM_CATEGORY_HARASSMENT,
        HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      ].map((category) => ({
        category,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
      })),
    });

    const result = await model.generateContent(prompt);
    const output = result.response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!output)
      return res.status(500).json({ error: "Error creating the story" });
    return res.status(200).json({ output });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Error while generating story" });
  }
}
