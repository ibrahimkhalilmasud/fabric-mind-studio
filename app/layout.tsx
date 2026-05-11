import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fabric Mind Studio",
  description:
    "AI-powered fashion concept generation, couture moodboards, and fabric intelligence for luxury design teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#09080d] text-[#f4ecff]">{children}</body>
    </html>
  );
}
