import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { prompt?: string; count?: number };
    const prompt = body.prompt?.trim();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const count = Math.max(1, Math.min(6, body.count ?? 3));
    const images = Array.from({ length: count }).map((_, index) => {
      const seed = `${Date.now()}-${index}`;
      return {
        id: seed,
        prompt,
        url: `https://image.pollinations.ai/prompt/${encodeURIComponent(
          `${prompt}, haute couture runway, editorial luxury fashion photography, 8k details`,
        )}?seed=${seed}&nologo=true`,
        createdAt: new Date().toISOString(),
      };
    });

    return NextResponse.json({ images }, { headers: { "Cache-Control": "public, max-age=60" } });
  } catch {
    return NextResponse.json({ error: "Unable to generate moodboard" }, { status: 500 });
  }
}
