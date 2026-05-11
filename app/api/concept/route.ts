import { NextResponse } from "next/server";
import { generateConcept } from "@/lib/ai";
import { getFabricInsight } from "@/lib/fabric";
import type { StudioInput } from "@/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as StudioInput;

    if (!input?.garmentType || !input?.fabricType || !input?.targetAudience) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [concept, fabricInsight] = await Promise.all([
      generateConcept(input),
      Promise.resolve(getFabricInsight(input.fabricType)),
    ]);

    return NextResponse.json({ concept, fabricInsight }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Unable to generate concept" }, { status: 500 });
  }
}
