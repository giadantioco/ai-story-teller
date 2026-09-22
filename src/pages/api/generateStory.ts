import { GoogleGenerativeAI } from "@google/generative-ai";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { prompt } = req.body;

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);
        const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash-lite" });
        const result = await model.generateContent(prompt);

        const output = result.response.candidates?.[0]?.content?.parts?.[0]?.text;

        return res.status(200).json({ output });
    } catch (error) {
        console.error("Errore Gemini:", error);
        return res.status(500).json({ error: "Errore nella generazione" });
    }
}