import { GoogleGenAI, Modality, Type } from "@google/genai";
import { ARTWORKS } from "../constants";
import { LanguageCode, LanguageOption } from "../types";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Identifies the artwork from a base64 image string.
 * @param base64Image The image data.
 * @param locationFilter Optional filter for the location (e.g., 'Entrance').
 */
export const identifyArtwork = async (base64Image: string, locationFilter?: string): Promise<string | null> => {
  // Filter the candidates based on location. 
  // This drastically reduces the search space and improves accuracy.
  let candidates = ARTWORKS;
  if (locationFilter && locationFilter !== 'All Locations') {
    candidates = ARTWORKS.filter(a => a.location === locationFilter);
  }

  // Debug log to see how many candidates we are checking against
  console.log(`Identifying against ${candidates.length} candidates in zone: ${locationFilter}`);

  // Prepare context
  const artworkContext = candidates.map(a => 
    `ID: ${a.id}
Title: ${a.title}
Location: ${a.location}
Description: ${a.description}`
  ).join('\n---\n');
  
  const prompt = `
    You are an expert art historian and iconographer specializing in Catholic church art.
    
    Task: Identify which of the provided artworks matches the image.
    
    CONTEXT:
    The user is standing in the "${locationFilter || 'Unknown'}" area of the church.
    Only consider the candidates listed below that are found in this location.
    
    CRITICAL INSTRUCTION:
    The provided descriptions are primarily *theological*. 
    
    TO IDENTIFY ACCURATELY:
    1. **Visual Analysis**: Analyze the image for specific figures, symbols, and attributes (e.g., Keys=Peter, Sword=Paul, Lily=Joseph, Stone Basin=Baptismal Font).
    2. **Iconography Match**: Match these visual cues to the **Title** of the candidate artworks.
    3. **Context Confirmation**: Use the **Description** to distinguish between similar subjects.
    
    CANDIDATE ARTWORKS:
    ${artworkContext}
    
    Return a JSON object with a single field "id".
    If the image clearly does not match any of the candidates, return "id": "UNKNOWN".
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
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
