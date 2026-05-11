"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { MoodboardImage } from "@/types";
import { downloadImage, exportMoodboardSnapshot } from "@/utils/exporters";

type Props = {
  images: MoodboardImage[];
  onGenerate: (prompt: string) => Promise<void>;
  onSave: () => Promise<void>;
};

export default function MoodboardPanel({ images, onGenerate, onSave }: Props) {
  const [prompt, setPrompt] = useState("Runway editorial, cinematic couture, dramatic lighting");
  const [loading, setLoading] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

  const generate = async () => {
    setLoading(true);
    await onGenerate(prompt);
    setLoading(false);
  };

  return (
    <section className="glass-panel rounded-3xl p-5 md:p-6" aria-label="Moodboard generator">
      <div className="mb-3 flex flex-col gap-2 md:flex-row">
        <input
          aria-label="Moodboard prompt"
          className="flex-1 rounded-xl border border-white/20 bg-black/30 p-2 text-sm"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
        />
        <button type="button" className="rounded-xl bg-white/20 px-4 py-2 text-sm" onClick={generate} disabled={loading}>
          {loading ? "Generating..." : "Generate Moodboard"}
        </button>
      </div>
      <div ref={boardRef} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <figure key={image.id} className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
            <Image
              src={image.url}
              alt={`Moodboard concept ${index + 1}`}
              width={640}
              height={800}
              className="h-56 w-full object-cover"
              loading="lazy"
              unoptimized
            />
            <figcaption className="flex items-center justify-between p-2 text-xs">
              <span>Concept {index + 1}</span>
              <button type="button" className="rounded bg-white/20 px-2 py-1" onClick={() => downloadImage(image.url, index)}>
                Download
              </button>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="rounded-xl bg-[#d8afff] px-3 py-2 text-black" onClick={() => boardRef.current && exportMoodboardSnapshot(boardRef.current)}>
          Export Moodboard Snapshot
        </button>
        <button type="button" className="rounded-xl bg-white/20 px-3 py-2" onClick={onSave}>
          Save to Offline Library
        </button>
      </div>
    </section>
  );
}
