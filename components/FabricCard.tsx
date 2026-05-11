"use client";

import { motion } from "framer-motion";
import type { FabricInsight } from "@/types";

type Props = {
  insight: FabricInsight | null;
};

export default function FabricCard({ insight }: Props) {
  if (!insight) {
    return <section className="glass-panel rounded-3xl p-5 md:p-6">Fabric intelligence will appear after generation.</section>;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="glass-panel rounded-3xl p-5 md:p-6"
      aria-label="Fabric intelligence panel"
    >
      <h2 className="mb-3 text-xl font-semibold">Fabric Intelligence — {insight.fabric}</h2>
      <ul className="space-y-2 text-sm leading-relaxed">
        <li><strong>Drape:</strong> {insight.drapeBehavior}</li>
        <li><strong>Texture:</strong> {insight.textureProfile}</li>
        <li><strong>Luxury Score:</strong> {insight.luxuryScore}/100</li>
        <li><strong>Stiffness:</strong> {insight.stiffnessAnalysis}</li>
        <li><strong>Recommended Garments:</strong> {insight.recommendedGarments}</li>
        <li><strong>Couture Suitability:</strong> {insight.coutureSuitability}</li>
      </ul>
    </motion.section>
  );
}
