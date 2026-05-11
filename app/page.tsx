"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import ConceptPanel from "@/components/ConceptPanel";
import FabricCard from "@/components/FabricCard";
import ProjectLibrary from "@/components/ProjectLibrary";
import StudioForm from "@/components/StudioForm";
import { useProjectRecovery } from "@/hooks/useProjectRecovery";
import { listProjects, saveProject } from "@/lib/storage";
import { useStudioStore } from "@/store/studio-store";
import type { MoodboardImage, StudioProject } from "@/types";
import { exportBriefPdf, exportProjectJson } from "@/utils/exporters";

const MoodboardPanel = dynamic(() => import("@/components/MoodboardPanel"), {
  ssr: false,
  loading: () => <section className="glass-panel rounded-3xl p-6">Loading moodboard tools...</section>,
});

export default function Home() {
  const { input, concept, fabricInsight, moodboard, setInput, setConcept, setMoodboard } = useStudioStore();
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<StudioProject[]>([]);
  const { isOnline } = useProjectRecovery();

  const canExport = useMemo(() => Boolean(concept && fabricInsight), [concept, fabricInsight]);

  const generateConcept = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/concept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await response.json();
      if (response.ok) {
        setConcept(data.concept, data.fabricInsight);
      }
    } finally {
      setLoading(false);
    }
  };

  const generateMoodboard = async (prompt: string) => {
    const response = await fetch("/api/moodboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, count: 3 }),
    });
    const data = await response.json();
    if (response.ok) {
      setMoodboard(data.images as MoodboardImage[]);
    }
  };

  const saveCurrentProject = async () => {
    if (!concept || !fabricInsight) return;
    const project: StudioProject = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      input,
      concept,
      fabricInsight,
      moodboard,
    };
    await saveProject(project);
    setProjects(await listProjects());
  };

  useEffect(() => {
    listProjects().then(setProjects);
  }, []);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-5 px-4 py-6 md:px-8">
      <header className="glass-panel rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.35em] text-white/70">Fabric Mind Studio</p>
        <h1 className="mt-2 text-3xl font-bold md:text-5xl gold-gradient">AI Luxury Fashion Concept Platform</h1>
        <p className="mt-3 max-w-3xl text-sm text-white/80 md:text-base">
          Generate couture concepts, runway moodboards, and fabric intelligence. Works online with Gemini + Pollinations and remains usable offline with local persistence.
        </p>
        <p className="mt-3 inline-block rounded-full border border-white/20 px-3 py-1 text-xs">
          Status: {isOnline ? "Online" : "Offline mode active"}
        </p>
      </header>

      <section className="grid gap-5 lg:grid-cols-2">
        <StudioForm value={input} onChange={setInput} onSubmit={generateConcept} loading={loading} />
        <ConceptPanel concept={concept} />
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <FabricCard insight={fabricInsight} />
        <ProjectLibrary projects={projects} />
      </section>

      <MoodboardPanel images={moodboard} onGenerate={generateMoodboard} onSave={saveCurrentProject} />

      <section className="glass-panel rounded-3xl p-5 md:p-6">
        <h2 className="mb-3 text-xl font-semibold">Export Design Brief</h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={!canExport}
            className="rounded-xl bg-[#f4c95d] px-3 py-2 text-sm text-black disabled:opacity-60"
            onClick={() => concept && fabricInsight && exportBriefPdf(input, concept, fabricInsight, moodboard)}
          >
            Export PDF Brief
          </button>
          <button
            type="button"
            disabled={!canExport}
            className="rounded-xl bg-white/20 px-3 py-2 text-sm disabled:opacity-60"
            onClick={() => exportProjectJson({ input, concept, fabricInsight, moodboard })}
          >
            Export Project JSON
          </button>
          <button type="button" className="rounded-xl bg-white/20 px-3 py-2 text-sm" onClick={saveCurrentProject}>
            Save Offline Project
          </button>
        </div>
      </section>
    </main>
  );
}
