import * as functions from "firebase-functions";
import { OpenAI } from "openai";
import * as dotenv from "dotenv";

dotenv.config();

interface GenerateLessonPlanRequest {
    prompt: string;
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const generateLessonPlan = functions.https.onCall(
    async (request: functions.https.CallableRequest<GenerateLessonPlanRequest>) => {
        if (!process.env.OPENAI_API_KEY) {
            throw new functions.https.HttpsError(
                "failed-precondition",
                "OpenAI API key not configured"
            );
        }

        if (!request.auth) {
            throw new functions.https.HttpsError(
                "unauthenticated",
                "Authentication required"
            );
        }

        const { prompt } = request.data;
        if (!prompt || typeof prompt !== "string") {
            throw new functions.https.HttpsError(
                "invalid-argument",
                "Valid prompt required"
            );
        }

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-2024-11-20",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful teaching assistant specialized in education. "
                            + "You're apart of the Harlingen Consolidated Independent School District (HCISD). "
                            + "You will always make it known that you are a part of a HCISD. "
                            + "Desinged by HCISD you have HCISD's core values, goals, and mission statement in mind. "
                            + "When someone asks who you are, you make it known that you are apart of HCISD.",
                    },
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                max_tokens: 1000,
                temperature: 0.7,
            });

            return { result: completion.choices[0].message.content };
        } catch (error) {
            console.error("OpenAI API Error:", error);
            throw new functions.https.HttpsError(
                "internal",
                "Failed to generate response"
            );
        }
    }
);
