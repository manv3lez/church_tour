import { GoogleGenAI, Modality, Type } from "@google/genai";
import { ARTWORKS } from "../constants";
import { LanguageCode, LanguageOption } from "../types";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Identifies the artwork from a base64 image string.
 */
export const identifyArtwork = async (base64Image: string): Promise<string | null> => {
  // We prepare a prompt that lists the possibilities to help the model narrow it down.
  const artworkContext = ARTWORKS.map(a => `ID: ${a.id}, Title: ${a.title}, Desc: ${a.description.substring(0, 50)}...`).join('\n');
  
  const prompt = `
    You are an art guide in a church. Look at this image. 
    It corresponds to one of the following artworks defined by their ID and description:
    
    ${artworkContext}
    
    Analyze the visual features. Return a JSON object with a single field "id" matching the ID of the artwork. 
    If the image does not plausibly match any of these, return "id": "UNKNOWN".
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING }
          }
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    if (result.id && result.id !== 'UNKNOWN') {
      return result.id;
    }
    return null;

  } catch (error) {
    console.error("Error identifying artwork:", error);
    throw error;
  }
};

/**
 * Generates audio for a given text in a specific language.
 * Uses a two-step process: Translate (if needed) -> TTS.
 */
export const generateAudio = async (text: string, language: LanguageOption): Promise<string> => {
  try {
    let textToSpeak = text;

    // Step 1: Translate if not English
    if (language.code !== LanguageCode.ENGLISH) {
      const translationResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Translate the following religious artwork description into ${language.label} (${language.code}). Maintain a respectful, reverent tone suitable for a church tour. \n\nOriginal Text: "${text}"`,
      });
      textToSpeak = translationResponse.text || text;
    }

    // Step 2: Generate Speech
    const ttsResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: textToSpeak }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            // We use a default voice, the model is quite good at adapting to the language of the text
            prebuiltVoiceConfig: { voiceName: 'Puck' }, 
          },
        },
      },
    });

    const audioData = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!audioData) {
      throw new Error("No audio data received from Gemini.");
    }

    return audioData;

  } catch (error) {
    console.error("Error generating audio:", error);
    throw error;
  }
};

/**
 * Decodes the base64 PCM data from Gemini into an AudioBuffer
 * Note: Gemini TTS returns raw PCM (24kHz typically).
 */
export const decodeGeminiAudio = async (base64Data: string, audioContext: AudioContext): Promise<AudioBuffer> => {
    const binaryString = atob(base64Data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    
    // Convert to Int16 PCM
    const dataInt16 = new Int16Array(bytes.buffer);
    
    // Create AudioBuffer
    // Gemini 2.5 Flash TTS typically outputs at 24000Hz mono
    const sampleRate = 24000; 
    const channelCount = 1;
    const buffer = audioContext.createBuffer(channelCount, dataInt16.length, sampleRate);
    const channelData = buffer.getChannelData(0);

    for (let i = 0; i < dataInt16.length; i++) {
        // Convert int16 to float32 [-1.0, 1.0]
        channelData[i] = dataInt16[i] / 32768.0;
    }

    return buffer;
};
