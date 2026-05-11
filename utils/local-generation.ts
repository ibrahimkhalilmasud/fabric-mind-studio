import type { ConceptResult, StudioInput } from "@/types";

export function createLocalConcept(input: StudioInput): ConceptResult {
  const luxuryTone =
    input.luxuryLevel === "haute-couture"
      ? "ultra-exclusive couture"
      : input.luxuryLevel === "premium"
        ? "premium editorial"
        : "accessible luxury";

  return {
    coutureConcept: `${input.garmentType} designed for ${input.targetAudience}, crafted in ${input.fabricType} with ${input.styleInspiration} DNA and a ${input.colorPalette} palette for ${input.occasion}.`,
    luxuryDescription: `A ${luxuryTone} concept balancing craftsmanship and visual drama through intentional textile behavior and high-impact finishing details.`,
    runwayStylingNotes: `Style with tonal layering, directional footwear, and bold contrast accessories to amplify runway presence for ${input.occasion}.`,
    silhouetteAnalysis: `The silhouette emphasizes proportion play: a sculpted upper line with fluid movement through the lower shape to elevate ${input.garmentType}.`,
    accessoryRecommendations: `Recommend metallic accents, architectural jewelry, and structured carry pieces aligned to ${input.colorPalette}.`,
    fashionMarketingCopy: `Introducing a ${input.luxuryLevel} statement in ${input.fabricType}: a modern icon for ${input.targetAudience} seeking confident elegance.`,
  };
}
