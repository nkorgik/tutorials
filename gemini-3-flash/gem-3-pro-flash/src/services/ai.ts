import { GoogleGenerativeAI } from "@google/generative-ai";

// Explicitly check for API Key and provide a clear error if missing
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

if (!API_KEY) {
    console.error("CRITICAL: VITE_GOOGLE_API_KEY is missing! Pulse requires this key in your .env file.");
}

// Some newer models might require v1 or have different auth scopes
const genAI = new GoogleGenerativeAI(API_KEY || "");

export const getAIResponse = async (systemPrompt: string, userMessage: string, history: any[]) => {
    if (!API_KEY) {
        throw new Error("API Key is missing. Please check your .env file.");
    }

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: systemPrompt
        });

        const chat = model.startChat({ history });
        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        return response.text();
    } catch (error: any) {
        if (error.message?.includes("403")) {
            throw new Error(`Authentication Error (403): This usually means your API Key is missing or not authorized for "gemini-2.5-flash". Check if the key is in .env as VITE_GOOGLE_API_KEY.`);
        }
        throw error;
    }
};
