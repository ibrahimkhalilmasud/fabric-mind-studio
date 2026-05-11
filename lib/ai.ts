import { createLocalConcept } from "@/utils/local-generation";
import type { ConceptResult, StudioInput } from "@/types";

const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-1.5-flash";

function parseJsonFromText(text: string): ConceptResult | null {
  try {
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean) as Partial<ConceptResult>;
    if (
      parsed.coutureConcept &&
      parsed.luxuryDescription &&
      parsed.runwayStylingNotes &&
      parsed.silhouetteAnalysis &&
      parsed.accessoryRecommendations &&
      parsed.fashionMarketingCopy
    ) {
      return parsed as ConceptResult;
    }
    return null;
  } catch {
    return null;
  }
}

export async function generateConcept(input: StudioInput): Promise<ConceptResult> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return createLocalConcept(input);
  }

  const prompt = `You are a luxury fashion creative director. Return strict JSON with keys: coutureConcept, luxuryDescription, runwayStylingNotes, silhouetteAnalysis, accessoryRecommendations, fashionMarketingCopy.
Input: ${JSON.stringify(input)}.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.8,
            responseMimeType: "application/json",
          },
        }),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(`Gemini request failed: ${response.status}`);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text as string | undefined;
    if (!text) {
      return createLocalConcept(input);
    }

    return parseJsonFromText(text) ?? createLocalConcept(input);
  } catch {
    return createLocalConcept(input);
  }
}
