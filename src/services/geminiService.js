import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
let genAI = null;
let model = null;

if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
  // Use Gemini 2.0 Flash as the default model
  model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
}

/**
 * Helper to build the system instruction block incorporating real-time zone data.
 * @param {Array} zones Current stadium zones from Firestore.
 */
function buildSystemInstruction(zones) {
  let contextStr = "StadiumPulse AI - Live Crowd Context:\n";
  zones.forEach(z => {
    contextStr += `- ${z.name}: Occupancy ${z.occupancy}/${z.capacity}, Wait: ${z.waitTime}m\n`;
  });

  return `You are StadiumPulse Oracle, an AI assistant for managing a stadium.
You help staff route crowds, identify bottlenecks, and make operational decisions.
Here is the live data you must base your answers on:
${contextStr}
Keep your responses concise, actionable, and friendly. Do not use markdown headers heavily, prefer short bullet points.`;
}

export const sendMessageToGemini = async (message, history, currentZones) => {
  if (!model) {
    throw new Error("Gemini API key is not configured. Please check VITE_GEMINI_API_KEY in your .env");
  }

  try {
    const systemInstruction = buildSystemInstruction(currentZones);
    
    // Convert history format to Gemini format
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const chatSession = model.startChat({
      systemInstruction,
      history: formattedHistory,
    });

    const result = await chatSession.sendMessage(message);
    return result.response.text();
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    throw error;
  }
};
