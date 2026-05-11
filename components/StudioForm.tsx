"use client";

import type { StudioInput } from "@/types";

type Props = {
  value: StudioInput;
  onChange: (value: StudioInput) => void;
  onSubmit: () => void;
  loading: boolean;
};

export default function StudioForm({ value, onChange, onSubmit, loading }: Props) {
  const set = (key: keyof StudioInput, next: string) => onChange({ ...value, [key]: next } as StudioInput);

  return (
    <section className="glass-panel rounded-3xl p-5 md:p-6" aria-label="Fashion concept input form">
      <h2 className="mb-4 text-xl font-semibold">AI Fashion Concept Generator</h2>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Garment Type
          <input className="rounded-xl border border-white/20 bg-black/30 p-2" value={value.garmentType} onChange={(e) => set("garmentType", e.target.value)} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Target Audience
          <input className="rounded-xl border border-white/20 bg-black/30 p-2" value={value.targetAudience} onChange={(e) => set("targetAudience", e.target.value)} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Fabric Type
          <select className="rounded-xl border border-white/20 bg-black/30 p-2" value={value.fabricType} onChange={(e) => set("fabricType", e.target.value)}>
            {["silk", "satin", "chiffon", "lace", "jacquard", "organza", "velvet"].map((fabric) => (
              <option key={fabric} value={fabric}>{fabric}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Occasion
          <input className="rounded-xl border border-white/20 bg-black/30 p-2" value={value.occasion} onChange={(e) => set("occasion", e.target.value)} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Luxury Level
          <select className="rounded-xl border border-white/20 bg-black/30 p-2" value={value.luxuryLevel} onChange={(e) => set("luxuryLevel", e.target.value)}>
            <option value="accessible">Accessible</option>
            <option value="premium">Premium</option>
            <option value="haute-couture">Haute Couture</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm md:col-span-2">
          Style Inspiration
          <textarea className="rounded-xl border border-white/20 bg-black/30 p-2" rows={2} value={value.styleInspiration} onChange={(e) => set("styleInspiration", e.target.value)} />
        </label>
        <label className="flex flex-col gap-1 text-sm md:col-span-2">
          Color Palette
          <input className="rounded-xl border border-white/20 bg-black/30 p-2" value={value.colorPalette} onChange={(e) => set("colorPalette", e.target.value)} />
        </label>
      </div>
      <button
        type="button"
        className="mt-4 rounded-xl bg-[#f4c95d] px-4 py-2 text-black transition hover:bg-[#ffd978] disabled:opacity-70"
        onClick={onSubmit}
        disabled={loading}
        aria-label="Generate fashion concept"
      >
        {loading ? "Generating..." : "Generate Concept"}
      </button>
    </section>
  );
}
