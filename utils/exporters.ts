import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import type { ConceptResult, FabricInsight, MoodboardImage, StudioInput } from "@/types";

function downloadBlob(filename: string, blob: Blob) {
  const href = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(href);
}

export function exportProjectJson(data: object) {
  downloadBlob(
    `fabric-mind-project-${new Date().toISOString()}.json`,
    new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
  );
}

export async function exportMoodboardSnapshot(element: HTMLElement) {
  const canvas = await html2canvas(element, {
    backgroundColor: "#09080d",
    scale: 2,
  });
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  if (blob) {
    downloadBlob(`fabric-moodboard-${Date.now()}.png`, blob);
  }
}

export function downloadImage(url: string, index: number) {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `moodboard-${index + 1}.png`;
  anchor.target = "_blank";
  anchor.rel = "noreferrer";
  anchor.click();
}

export function exportBriefPdf(input: StudioInput, concept: ConceptResult, fabricInsight: FabricInsight, moodboard: MoodboardImage[]) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const lines = [
    "Fabric Mind Studio — Design Brief",
    "",
    `Garment Type: ${input.garmentType}`,
    `Target Audience: ${input.targetAudience}`,
    `Fabric Type: ${input.fabricType}`,
    `Occasion: ${input.occasion}`,
    `Luxury Level: ${input.luxuryLevel}`,
    `Style Inspiration: ${input.styleInspiration}`,
    `Color Palette: ${input.colorPalette}`,
    "",
    `Couture Concept: ${concept.coutureConcept}`,
    `Luxury Description: ${concept.luxuryDescription}`,
    `Runway Styling Notes: ${concept.runwayStylingNotes}`,
    `Silhouette Analysis: ${concept.silhouetteAnalysis}`,
    `Accessory Recommendations: ${concept.accessoryRecommendations}`,
    `Fashion Marketing Copy: ${concept.fashionMarketingCopy}`,
    "",
    `Fabric Drape: ${fabricInsight.drapeBehavior}`,
    `Texture Profile: ${fabricInsight.textureProfile}`,
    `Luxury Score: ${fabricInsight.luxuryScore}`,
    `Stiffness Analysis: ${fabricInsight.stiffnessAnalysis}`,
    `Recommended Garments: ${fabricInsight.recommendedGarments}`,
    `Couture Suitability: ${fabricInsight.coutureSuitability}`,
    "",
    `Moodboard Images: ${moodboard.length}`,
  ];

  const wrapped = doc.splitTextToSize(lines.join("\n"), 520);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(wrapped, 40, 50);
  doc.save(`fabric-design-brief-${Date.now()}.pdf`);
}
