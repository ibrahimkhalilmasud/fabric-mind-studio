"use client";

import type { StudioProject } from "@/types";

type Props = {
  projects: StudioProject[];
};

export default function ProjectLibrary({ projects }: Props) {
  return (
    <section className="glass-panel rounded-3xl p-5 md:p-6" aria-label="Offline project library">
      <h2 className="mb-3 text-xl font-semibold">Offline Project Recovery</h2>
      {projects.length === 0 ? (
        <p className="text-sm text-white/75">No saved projects yet.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {projects.slice(0, 6).map((project) => (
            <li key={project.id} className="rounded-xl border border-white/15 bg-black/20 p-3">
              <p className="font-semibold">{project.input.garmentType} — {project.input.occasion}</p>
              <p className="text-white/70">{new Date(project.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
