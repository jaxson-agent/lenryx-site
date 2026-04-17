import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LENRYX.ai — Where Intelligence Becomes Execution",
  description: "LENRYX is the operating layer where strategy, leadership, and AI systems converge — turning intelligence into measurable output.",
  openGraph: {
    title: "LENRYX.ai",
    description: "Where Intelligence Becomes Execution",
    url: "https://lenryx.ai",
    siteName: "LENRYX.ai",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
