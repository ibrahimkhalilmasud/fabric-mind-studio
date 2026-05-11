export type StudioInput = {
  garmentType: string;
  targetAudience: string;
  fabricType: string;
  occasion: string;
  luxuryLevel: "accessible" | "premium" | "haute-couture";
  styleInspiration: string;
  colorPalette: string;
};

export type ConceptResult = {
  coutureConcept: string;
  luxuryDescription: string;
  runwayStylingNotes: string;
  silhouetteAnalysis: string;
  accessoryRecommendations: string;
  fashionMarketingCopy: string;
};

export type FabricInsight = {
  fabric: string;
  drapeBehavior: string;
  textureProfile: string;
  luxuryScore: number;
  stiffnessAnalysis: string;
  recommendedGarments: string;
  coutureSuitability: string;
};

export type MoodboardImage = {
  id: string;
  prompt: string;
  url: string;
  createdAt: string;
};

export type StudioProject = {
  id: string;
  createdAt: string;
  input: StudioInput;
  concept: ConceptResult;
  fabricInsight: FabricInsight;
  moodboard: MoodboardImage[];
};
