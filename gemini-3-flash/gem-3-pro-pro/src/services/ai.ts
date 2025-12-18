import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Message } from "../types";

// Access your API key as an environment variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const getAIResponse = async (history: Message[], userMessage: string): Promise<string> => {
    if (!API_KEY) {
        console.warn("VITE_GEMINI_API_KEY is not set.");
        return "I'm sorry, I can't reply right now. (Missing API Key)";
    }

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        // Using gemini-2.0-flash-exp as requested/tested for better availability on free tier occasionally
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // Convert internal message history to Gemini format
        // Map last 10 messages
        let formattedHistory = history.slice(-10).map(m => ({
            role: m.senderId === 'me' ? 'user' : 'model',
            parts: [{ text: m.text }],
        }));

        // CRITICAL FIX: Google Generative AI requires the first message in history to be from 'user'.
        // If we have history like [model, user, model], we must drop the first 'model' message.
        // We also need to handle empty history (which is fine, startChat handles new message separately).

        // Find index of first 'user' message
        const firstUserIndex = formattedHistory.findIndex(m => m.role === 'user');

        // If no user message found in history, send empty history (the current prompt userMessage will start it)
        if (firstUserIndex === -1) {
            formattedHistory = [];
        } else {
            // Slice from the first user message
            formattedHistory = formattedHistory.slice(firstUserIndex);
        }

        // Also ensuring alternation is generally good practice, but API is main stickler for "starts with user".
        // For now, simple trimming should suffice for the "First content should be with role 'user'" error.

        const chat = model.startChat({
            history: formattedHistory,
        });

        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        const text = response.text();
        return text;
    } catch (error: any) {
        console.error("Error fetching AI response:", error);

        if (error.message?.includes('429') || error.status === 429) {
            return "I'm receiving too many messages right now (Rate Limit Exceeded). Please wait a moment and try again.";
        }

        return `Sorry, I encountered an error: ${error.message || "Unknown error"}`;
    }
};
