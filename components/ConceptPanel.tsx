import type { ConceptResult } from "@/types";

type Props = {
  concept: ConceptResult | null;
};

export default function ConceptPanel({ concept }: Props) {
  if (!concept) {
    return <section className="glass-panel rounded-3xl p-5 md:p-6">Generate a concept to see couture direction.</section>;
  }

  const rows: Array<[string, string]> = [
    ["Couture Concept", concept.coutureConcept],
    ["Luxury Description", concept.luxuryDescription],
    ["Runway Styling", concept.runwayStylingNotes],
    ["Silhouette", concept.silhouetteAnalysis],
    ["Accessories", concept.accessoryRecommendations],
    ["Marketing Copy", concept.fashionMarketingCopy],
  ];

  return (
    <section className="glass-panel rounded-3xl p-5 md:p-6" aria-live="polite">
      <h2 className="mb-4 text-xl font-semibold">Luxury Garment Direction</h2>
      <div className="space-y-3">
        {rows.map(([label, text]) => (
          <div key={label} className="rounded-xl border border-white/15 bg-black/20 p-3">
            <h3 className="mb-1 text-sm font-semibold text-[#ffdfa2]">{label}</h3>
            <p className="text-sm leading-relaxed text-[#f6f2ff]">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
