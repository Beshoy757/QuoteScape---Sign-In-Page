
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const visualizeLandscape = async (base64Image: string, prompt: string): Promise<string | null> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1],
              mimeType: 'image/png',
            },
          },
          {
            text: `Act as a high-end landscape designer. Edit this yard photo to include: ${prompt}. Maintain the original house architecture but replace the ground, lawn, and landscaping. Ensure photo-realistic lighting and textures.`,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Landscape visualization failed:", error);
    return null;
  }
};

export const generateProfessionalQuote = async (projectDetails: any) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a detailed landscaping quote for: ${JSON.stringify(projectDetails)}. 
      Break it down into Materials, Labor, and Equipment. 
      Provide a professional summary and timeline. 
      Format the output as clean JSON with keys: items (array of {desc, cost}), total, and duration.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  desc: { type: Type.STRING },
                  cost: { type: Type.NUMBER }
                },
                required: ["desc", "cost"]
              }
            },
            total: { type: Type.NUMBER },
            duration: { type: Type.STRING }
          },
          required: ["items", "total", "duration"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Quote generation failed:", error);
    return null;
  }
};
