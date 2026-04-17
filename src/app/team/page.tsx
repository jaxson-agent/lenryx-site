import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Team — LENRYX.ai",
  description: "Meet the three founders behind LENRYX — strategy, leadership, and AI systems working as one operating layer.",
};

const team = [
  {
    initials: "AL",
    name: "Andreas Lengyel",
    title: "Systems & AI Infrastructure",
    pillar: "Systems + AI",
    location: "Palo Alto, CA",
    bio: "Purpose-driven AI enthusiast and software engineer with deep technical depth in software engineering, fintech, and startup infrastructure.",
    extended: "Andreas is the systems architect who translates strategy and leadership direction into scalable, intelligent infrastructure. His background spans fintech, startup engineering, and AI native systems — giving LENRYX the technical credibility to build operating layers that actually run at scale.",
    edge: "The systems architect who turns strategy into scalable, intelligent execution.",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com/in/andreaslengyels" },
      { label: "GitHub", href: "https://github.com/AndreasL" },
    ] as { label: string; href: string }[],
  },
  {
    initials: "JR",
    name: "JM Ryerson",
    title: "Leadership & Human Performance",
    pillar: "Leadership",
    location: "Boca Raton, FL",
    bio: "Co-founder & CEO of Let's Go Win. JM has founded and sold three successful businesses, and now helps high-achieving professionals and organizations unlock elite performance — without burning out.",
    extended: "With 20+ years mastering what it takes to build thriving companies and elite teams, JM brings a framework for sustainable high performance that goes beyond tactics — building the leadership capacity that makes execution repeatable. His clients don't just hit numbers. They build cultures that compound.",
    edge: "Bestselling author (Let's Go Win, Champion's Daily Playbook, Upgrade), international speaker, and Leadership & Performance Coach.",
    links: [],
  },
  {
    initials: "JG",
    name: "Jason Gallen",
    title: "Strategy & Venture Architecture",
    pillar: "Strategy",
    location: null,
    bio: "Multi-venture operator and strategic advisor at The Gallen Group. Jason builds and scales businesses at the intersection of brand, distribution, and digital systems — with active ventures spanning CPG, SaaS, media, and eCommerce.",
    extended: "Jason's edge is connecting ventures into ecosystems where partnerships, talent, and technology compound into leverage. He operates across multiple layers simultaneously — strategy, deal-making, brand direction, growth planning, and execution oversight — bringing the same rigor to every engagement LENRYX takes on.",
    edge: "Connecting ventures into ecosystems where partnerships, talent, and technology compound into leverage.",
    links: [],
  },
];

export default function TeamPage() {
  return (
    <main className="bg-black min-h-screen text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/lenryx-logo-v2.svg" alt="LENRYX.ai" style={{ height: 40, width: "auto" }} />
          </Link>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">← Back</Link>
            <Link href="/#contact" className="border border-[#1B8EF8] text-[#1B8EF8] px-4 py-1.5 rounded hover:bg-[#1B8EF8] hover:text-black transition-all text-sm font-medium">
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-32 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-20">
            <span className="text-[#1B8EF8] text-xs font-medium tracking-[0.25em] uppercase">The Founders</span>
            {/* Animated triangle — spins slowly, each founder cycles through the top */}
            <div className="mb-10">
              <svg viewBox="0 0 300 260" className="w-48 md:w-72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <style>{`
                  @keyframes spinTriangle {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                  }
                  .spinning-group {
                    transform-origin: 150px 130px;
                    animation: spinTriangle 24s linear infinite;
                  }
                  @keyframes counterSpin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(-360deg); }
                  }
                  .label-node {
                    transform-box: fill-box;
                    transform-origin: center;
                    animation: counterSpin 24s linear infinite;
                  }
                `}</style>

                {/* Spinning group — triangle + nodes */}
                <g className="spinning-group">
                  {/* Edges */}
                  <line x1="150" y1="20" x2="40" y2="200" stroke="#1B8EF8" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="150" y1="20" x2="260" y2="200" stroke="#1B8EF8" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="40"  y1="200" x2="260" y2="200" stroke="#1B8EF8" strokeWidth="1.5" strokeLinecap="round"/>
                  {/* Spokes */}
                  <line x1="150" y1="130" x2="150" y2="20"  stroke="#1B8EF8" strokeWidth="0.75" strokeOpacity="0.4"/>
                  <line x1="150" y1="130" x2="40"  y2="200" stroke="#1B8EF8" strokeWidth="0.75" strokeOpacity="0.4"/>
                  <line x1="150" y1="130" x2="260" y2="200" stroke="#1B8EF8" strokeWidth="0.75" strokeOpacity="0.4"/>
                  {/* Vertex nodes */}
                  <circle cx="150" cy="20"  r="7" fill="#1B8EF8"/>
                  <circle cx="40"  cy="200" r="7" fill="#1B8EF8"/>
                  <circle cx="260" cy="200" r="7" fill="#1B8EF8"/>
                  {/* Labels — counter-rotate so they stay readable */}
                  <g className="label-node" style={{transformOrigin: "150px 6px"}}>
                    <text x="150" y="9" textAnchor="middle" fill="#9CA3AF" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="500">Strategy</text>
                  </g>
                  <g className="label-node" style={{transformOrigin: "40px 215px"}}>
                    <text x="40" y="218" textAnchor="middle" fill="#9CA3AF" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="500">Leadership</text>
                  </g>
                  <g className="label-node" style={{transformOrigin: "260px 215px"}}>
                    <text x="260" y="218" textAnchor="middle" fill="#9CA3AF" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="500">Systems</text>
                  </g>
                </g>

                {/* Center — fixed, doesn't spin */}
                <circle cx="150" cy="130" r="5" fill="none" stroke="#ffffff" strokeWidth="1.2">
                  <animate attributeName="r" values="5;22;5" dur="2.5s" repeatCount="indefinite"/>
                  <animate attributeName="stroke-opacity" values="0.8;0;0.8" dur="2.5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="150" cy="130" r="5" fill="none" stroke="#1B8EF8" strokeWidth="0.8">
                  <animate attributeName="r" values="5;22;5" dur="2.5s" begin="1.25s" repeatCount="indefinite"/>
                  <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="2.5s" begin="1.25s" repeatCount="indefinite"/>
                </circle>
                <circle cx="150" cy="130" r="4.5" fill="#ffffff">
                  <animate attributeName="r" values="4.5;6;4.5" dur="2.5s" repeatCount="indefinite"/>
                </circle>
              </svg>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-5 tracking-tight leading-tight">
              The triangle isn&apos;t decoration.
            </h1>
            <p className="text-gray-400 text-lg max-w-xl leading-relaxed mb-10">
              Each node is a founder. Each line is where two of them overlap. The center — where all three converge — is the force multiplier.<br /><br />
              That&apos;s where LENRYX operates.
            </p>
            <ul className="space-y-4 max-w-xl">
              {[
                { label: "Operators, not advisors", desc: "We focus on what actually moves — not on what looks good in a deck." },
                { label: "Systems thinkers", desc: "We connect strategy, people, and process into one working layer." },
                { label: "A force multiplier", desc: "AI powered systems compress what used to take months into days, and days into hours." },
                { label: "Execution-focused", desc: "The goal is always output — not a deliverable, not a framework, results." },
              ].map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="text-[#1B8EF8] mt-0.5 shrink-0">→</span>
                  <span>
                    <span className="text-white text-sm font-medium">{item.label} — </span>
                    <span className="text-gray-500 text-sm">{item.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Team cards — full detail */}
          <div className="space-y-8">
            {team.map((m, i) => (
              <div key={m.name} className="group bg-[#0A0A0A] rounded-xl border border-white/5 hover:border-[#1B8EF8]/20 transition-all duration-300 overflow-hidden">
                <div className="h-0.5 bg-[#1B8EF8]" />
                <div className="p-10 md:p-12">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Avatar + pillar badge */}
                    <div className="shrink-0 flex flex-col items-center gap-3">
                      <div className="w-20 h-20 rounded-full border border-[#1B8EF8]/50 flex items-center justify-center bg-black">
                        <span className="text-[#1B8EF8] font-bold text-lg tracking-widest">{m.initials}</span>
                      </div>
                      <span className="text-[#1B8EF8]/60 text-xs tracking-widest font-mono uppercase">{String(i + 1).padStart(2, "0")}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline gap-3 mb-1">
                        <h2 className="text-white font-bold text-2xl">{m.name}</h2>
                        <span className="text-[#1B8EF8]/50 text-xs tracking-widest uppercase border border-[#1B8EF8]/20 rounded px-2 py-0.5">{m.pillar}</span>
                      </div>
                      <p className="text-[#1B8EF8] text-sm font-medium tracking-[0.12em] uppercase mb-1">{m.title}</p>
                      {m.location && <p className="text-gray-600 text-xs mb-6">{m.location}</p>}
                      {!m.location && <div className="mb-6" />}

                      <div className="h-px bg-white/5 mb-6" />

                      <p className="text-gray-400 leading-relaxed mb-4">{m.bio}</p>
                      <p className="text-gray-500 leading-relaxed mb-6">{m.extended}</p>
                      <p className="text-white/40 text-sm italic leading-relaxed">{m.edge}</p>

                      {m.links.length > 0 && (
                        <div className="flex gap-5 mt-6 pt-6 border-t border-white/5">
                          {m.links.map((l) => (
                            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                              className="text-sm text-[#1B8EF8]/60 hover:text-[#1B8EF8] transition-colors">
                              {l.label} ↗
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <p className="text-gray-500 mb-6">Ready to work with this team?</p>
            <Link href="/#contact" className="inline-block bg-[#1B8EF8] text-black font-semibold px-8 py-3.5 rounded hover:bg-[#1B8EF8]/90 transition-colors text-sm tracking-wide">
              Start a Conversation
            </Link>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lenryx-logo-v2.svg" alt="LENRYX.ai" style={{ height: 36, width: "auto" }} />
          <p className="text-gray-600 text-sm">© 2026 LENRYX. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
