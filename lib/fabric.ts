import type { FabricInsight } from "@/types";

const fabricProfiles: Record<string, Omit<FabricInsight, "fabric">> = {
  silk: {
    drapeBehavior: "Fluid with elegant ripple and soft fall around the body.",
    textureProfile: "Natural sheen, smooth hand-feel, luminous under light.",
    luxuryScore: 92,
    stiffnessAnalysis: "Low stiffness, excellent movement.",
    recommendedGarments: "Bias gowns, blouses, evening camisoles, draped skirts.",
    coutureSuitability: "Excellent for couture draping and light layering.",
  },
  satin: {
    drapeBehavior: "Medium-fluid with controlled glide and reflective folds.",
    textureProfile: "Glossy face, sleek tactile finish, refined depth.",
    luxuryScore: 88,
    stiffnessAnalysis: "Low-to-medium stiffness.",
    recommendedGarments: "Slip dresses, structured eveningwear, luxury suiting accents.",
    coutureSuitability: "Very good for polished couture silhouettes.",
  },
  chiffon: {
    drapeBehavior: "Airy, transparent, and highly flowing.",
    textureProfile: "Sheer and weightless with subtle grain.",
    luxuryScore: 84,
    stiffnessAnalysis: "Very low stiffness.",
    recommendedGarments: "Layered gowns, sleeves, overlays, scarves.",
    coutureSuitability: "Ideal for ethereal couture layering.",
  },
  lace: {
    drapeBehavior: "Flexible with patterned hold depending on base mesh.",
    textureProfile: "Decorative texture with dimensional motifs.",
    luxuryScore: 90,
    stiffnessAnalysis: "Medium stiffness by motif density.",
    recommendedGarments: "Couture bodices, overlays, sleeves, veils.",
    coutureSuitability: "Excellent as statement couture detailing.",
  },
  jacquard: {
    drapeBehavior: "Structured drape with rich body.",
    textureProfile: "Woven pattern depth with architectural texture.",
    luxuryScore: 86,
    stiffnessAnalysis: "Medium-to-high stiffness.",
    recommendedGarments: "Tailored coats, gowns with volume, statement jackets.",
    coutureSuitability: "Strong for sculptural couture forms.",
  },
  organza: {
    drapeBehavior: "Crisp and airy with volumetric memory.",
    textureProfile: "Sheer, crisp, and subtly lustrous.",
    luxuryScore: 85,
    stiffnessAnalysis: "Medium-high stiffness.",
    recommendedGarments: "Overskirts, couture sleeves, bows, veils.",
    coutureSuitability: "Excellent for shape-building couture effects.",
  },
  velvet: {
    drapeBehavior: "Heavy, rich drape with plush depth.",
    textureProfile: "Dense pile with high tactile luxury.",
    luxuryScore: 94,
    stiffnessAnalysis: "Medium stiffness with weight-driven fall.",
    recommendedGarments: "Evening gowns, capes, tuxedo jackets, winter couture.",
    coutureSuitability: "Outstanding for opulent couture storytelling.",
  },
};

export function getFabricInsight(fabric: string): FabricInsight {
  const key = fabric.trim().toLowerCase();
  const base =
    fabricProfiles[key] ??
    ({
      drapeBehavior: "Balanced drape suitable for adaptive luxury silhouettes.",
      textureProfile: "Distinct tactile profile with design-flexible finish.",
      luxuryScore: 80,
      stiffnessAnalysis: "Medium stiffness.",
      recommendedGarments: "Dresses, separates, and statement layering pieces.",
      coutureSuitability: "Good couture compatibility with custom finishing.",
    } satisfies Omit<FabricInsight, "fabric">);

  return {
    fabric,
    ...base,
  };
}
