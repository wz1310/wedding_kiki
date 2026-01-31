
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateRomanticPoem(bride: string, groom: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Tuliskan sebuah puisi pendek romantis untuk undangan pernikahan Rizki Rahma Kurnia dan Hinka. Gunakan nada yang elegan, suci, dan penuh syukur. Maksimal 3 bait.`,
        config: {
            temperature: 0.7,
        }
      });
      return response.text || "Cinta adalah anugerah terindah yang menyatukan dua jiwa dalam satu ikatan suci.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Dua hati, satu janji. Dalam naungan restu Ilahi, kami melangkah bersama menuju masa depan yang penuh berkah.";
    }
  }

  async summarizeWishes(wishes: string[]): Promise<string> {
    if (wishes.length === 0) return "";
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Ringkaslah pesan-pesan doa dari tamu undangan berikut menjadi satu paragraf ungkapan terima kasih yang indah dari mempelai: ${wishes.join(". ")}`,
      });
      return response.text || "Terima kasih atas segala doa dan harapan baik untuk kami.";
    } catch (error) {
      return "Terima kasih atas doa restunya.";
    }
  }
}

export const geminiService = new GeminiService();
