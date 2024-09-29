import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../config';
const genAI = new GoogleGenerativeAI(String(GEMINI_API_KEY));
export const analyzeImage = async (imagesBase64) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const promptText = "Read the water meter and return the numeric value";
    const image = {
        inlineData: {
            data: imagesBase64,
            mimeType: "image/png",
        },
    };
    const result = await model.generateContent([promptText, image]);
    return result.response.text();
};
