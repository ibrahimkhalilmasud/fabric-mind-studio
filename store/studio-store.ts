import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ConceptResult, FabricInsight, MoodboardImage, StudioInput } from "@/types";

type StudioState = {
  input: StudioInput;
  concept: ConceptResult | null;
  fabricInsight: FabricInsight | null;
  moodboard: MoodboardImage[];
  setInput: (input: StudioInput) => void;
  setConcept: (concept: ConceptResult, fabricInsight: FabricInsight) => void;
  setMoodboard: (images: MoodboardImage[]) => void;
};

const defaultInput: StudioInput = {
  garmentType: "Evening gown",
  targetAudience: "Luxury red-carpet clientele",
  fabricType: "silk",
  occasion: "Cannes gala night",
  luxuryLevel: "haute-couture",
  styleInspiration: "Runway futurism with old-money tailoring",
  colorPalette: "obsidian black, champagne gold, and moonlight silver",
};

export const useStudioStore = create<StudioState>()(
  persist(
    (set) => ({
      input: defaultInput,
      concept: null,
      fabricInsight: null,
      moodboard: [],
      setInput: (input) => set({ input }),
      setConcept: (concept, fabricInsight) => set({ concept, fabricInsight }),
      setMoodboard: (images) => set({ moodboard: images }),
    }),
    {
      name: "fabric-mind-studio-state",
      partialize: (state) => ({
        input: state.input,
        concept: state.concept,
        fabricInsight: state.fabricInsight,
        moodboard: state.moodboard,
      }),
    },
  ),
);
