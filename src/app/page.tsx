"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ── Network canvas background ──────────────────────────────────────────────
function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const BLUE = "#1B8EF8";
    const NODE_COUNT = 32;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(27,142,248,${0.12 * (1 - dist / 180)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(27,142,248,0.35)";
        ctx.fill();

        // Move
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40"
    />
  );
}

// ── Animated node icon (hero version — large, pulsing center) ──────────────
function AnimatedNodeIcon({ size = 80 }: { size?: number }) {
  const r = size / 2;
  const dist = r * 0.68;
  const outerR = r * 0.14;
  const centerR = r * 0.09;
  const angles = [270, 30, 150];
  const pts = angles.map((a) => {
    const rad = (a * Math.PI) / 180;
    return { x: r + dist * Math.cos(rad), y: r + dist * Math.sin(rad) };
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      {pts.map((p, i) => (
        <line key={i} x1={r} y1={r} x2={p.x} y2={p.y} stroke="#1B8EF8" strokeWidth="1.5" strokeOpacity="1" />
      ))}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={outerR} fill="#1B8EF8" fillOpacity="1" />
      ))}
      {/* Outer ping ring */}
      <circle cx={r} cy={r} r={centerR * 3.5} fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.3">
        <animate attributeName="r" values={`${centerR * 2};${centerR * 5};${centerR * 2}`} dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite" />
      </circle>
      {/* Center node — solid white */}
      <circle cx={r} cy={r} r={centerR} fill="#ffffff">
        <animate attributeName="r" values={`${centerR};${centerR * 1.4};${centerR}`} dur="2.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

// ── Nav ────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-md border-b border-white/5" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/lenryx-logo-v2.svg" alt="LENRYX.ai" style={{ height: 40, width: "auto" }} />
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="#what-we-are" className="hover:text-white transition-colors">What We Are</a>
          <a href="#model" className="hover:text-white transition-colors">The Model</a>
          <a href="#team" className="hover:text-white transition-colors">Team</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          <a
            href="#contact"
            className="border border-[#1B8EF8] text-[#1B8EF8] px-4 py-1.5 rounded hover:bg-[#1B8EF8] hover:text-black transition-all text-sm font-medium"
          >
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </nav>
  );
}

// ── Node motif SVG (mirrors the logo icon) ─────────────────────────────────
function NodeIcon({ size = 48 }: { size?: number }) {
  const r = size / 2;
  const dist = r * 0.68;
  const outerR = r * 0.16;
  const centerR = r * 0.11;
  const angles = [270, 30, 150];
  const pts = angles.map((a) => {
    const rad = (a * Math.PI) / 180;
    return { x: r + dist * Math.cos(rad), y: r + dist * Math.sin(rad) };
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      {pts.map((p, i) => (
        <line key={i} x1={r} y1={r} x2={p.x} y2={p.y} stroke="#1B8EF8" strokeWidth="1.5" strokeOpacity="1" />
      ))}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={outerR} fill="#1B8EF8" fillOpacity="1" />
      ))}
      <circle cx={r} cy={r} r={centerR} fill="#ffffff" />
    </svg>
  );
}

// ── Pillars + interactive founder reveal ───────────────────────────────────
const pillars = [
  {
    num: "01",
    title: "Strategy",
    subtitle: "What to do.",
    body: "We diagnose where you are, define where you're going, and map the path. No generic frameworks — precision decisions built on your actual situation.",
    founder: {
      initials: "JG",
      name: "Jason Gallen",
      title: "Strategy & Venture Architecture",
      bio: "Multi-venture operator and strategic advisor at The Gallen Group. Jason builds and scales businesses at the intersection of brand, distribution, and digital systems — with active ventures spanning CPG, SaaS, media, and eCommerce.",
      edge: "His edge: connecting ventures into ecosystems where partnerships, talent, and technology compound into leverage.",
      links: [] as {label:string;href:string}[],
    },
  },
  {
    num: "02",
    title: "Leadership",
    subtitle: "Who drives it.",
    body: "Human performance, team alignment, and the conviction to execute. The best strategy fails without the right people driving it.",
    founder: {
      initials: "JR",
      name: "JM Ryerson",
      title: "Leadership & Human Performance",
      bio: "Co-founder & CEO of Let's Go Win. JM has founded and sold three successful businesses, and now helps high-achieving professionals and organizations unlock elite performance — without burning out.",
      edge: "Bestselling author (Let's Go Win, Champion's Daily Playbook, Upgrade), international speaker, and Leadership & Performance Coach with 20+ years mastering what it takes to build thriving teams.",
      links: [],
    },
  },
  {
    num: "03",
    title: "Systems + AI",
    subtitle: "How it gets done.",
    body: "Intelligent systems that scale execution without scaling headcount. The infrastructure that makes strategy repeatable and output measurable.",
    founder: {
      initials: "AL",
      name: "Andreas Lengyel",
      title: "Systems & AI Infrastructure",
      bio: "Purpose-driven AI enthusiast and software engineer with deep technical depth in software engineering, fintech, and startup infrastructure.",
      edge: "The systems architect who turns strategy into scalable, intelligent execution.",
      links: [{ label: "LinkedIn", href: "https://linkedin.com/in/andreaslengyels" }, { label: "GitHub", href: "https://github.com/AndreasL" }],
    },
  },
];

function PillarsWithFounders() {
  const [active, setActive] = useState<number | null>(null);
  const founder = active !== null ? pillars[active].founder : null;

  return (
    <section className="pt-12 pb-20 px-6 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <span className="text-[#1B8EF8] text-xs font-medium tracking-[0.25em] uppercase">The Pillars</span>
        <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 mb-4 tracking-tight">
          Three disciplines.<br />
          <span className="text-gray-500 font-normal">One integrated system.</span>
        </h2>
        <p className="text-gray-600 text-sm mb-12">Select a pillar to meet the founder who leads it.</p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {pillars.map((p, i) => (
            <button
              key={p.num}
              onClick={() => setActive(active === i ? null : i)}
              className={`text-left group rounded-xl border transition-all duration-300 overflow-hidden focus:outline-none ${
                active === i
                  ? "border-[#1B8EF8] bg-[#0D1F35]"
                  : "border-white/5 bg-[#111111] hover:border-[#1B8EF8]/40"
              }`}
            >
              <div className={`h-0.5 transition-colors duration-300 ${active === i ? "bg-[#1B8EF8]" : "bg-[#1B8EF8]/40 group-hover:bg-[#1B8EF8]"}`} />
              <div className="p-8">
                <span className="text-[#1B8EF8]/40 text-xs font-mono tracking-widest">{p.num}</span>
                <h3 className="text-white font-bold text-xl mt-3 mb-1">{p.title}</h3>
                <p className="text-[#1B8EF8] text-sm mb-4">{p.subtitle}</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{p.body}</p>
                <span className={`text-xs tracking-wide transition-colors duration-200 ${active === i ? "text-[#1B8EF8]" : "text-gray-600 group-hover:text-[#1B8EF8]/70"}`}>
                  {active === i ? "Hide founder ↑" : "Meet the founder →"}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Founder reveal panel */}
        {founder && (
          <div className="rounded-xl border border-[#1B8EF8]/25 bg-[#0A0A0A] overflow-hidden">
            <div className="h-0.5 bg-[#1B8EF8]" />
            <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar */}
              <div className="shrink-0">
                <div className="w-16 h-16 rounded-full border border-[#1B8EF8]/50 flex items-center justify-center bg-black">
                  <span className="text-[#1B8EF8] font-bold tracking-widest">{founder.initials}</span>
                </div>
              </div>
              {/* Bio */}
              <div className="flex-1">
                <h3 className="text-white font-bold text-xl mb-1">{founder.name}</h3>
                <p className="text-[#1B8EF8] text-xs font-medium tracking-[0.15em] uppercase mb-5">{founder.title}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">{founder.bio}</p>
                <p className="text-white/50 text-xs leading-relaxed italic">{founder.edge}</p>
                {founder.links.length > 0 && (
                  <div className="flex gap-4 mt-5">
                    {founder.links.map((l) => (
                      <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                        className="text-xs text-[#1B8EF8]/60 hover:text-[#1B8EF8] transition-colors">
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Nav />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <NetworkCanvas />
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* SVG logo — animation baked in, no overlay hack */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lenryx-logo-v2.svg"
            alt="LENRYX.ai"
            className="mx-auto mb-8"
            style={{ width: 480, height: "auto", maxWidth: "90vw" }}
          />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight mb-6">
            Where Intelligence<br />
            <span className="text-[#1B8EF8]">Becomes Execution.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            LENRYX is the operating layer where strategy, leadership, and AI systems converge —
            turning intelligence into measurable output.
          </p>
          <a
            href="#contact"
            className="inline-block bg-[#1B8EF8] text-black font-semibold px-8 py-3.5 rounded hover:bg-[#1B8EF8]/90 transition-colors text-sm tracking-wide"
          >
            Start a Conversation
          </a>
        </div>
        {/* Blue connecting line to next section */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-px h-16 bg-gradient-to-b from-[#1B8EF8]/60 to-[#1B8EF8]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#1B8EF8]" />
        </div>
      </section>

      {/* ── WHAT WE ARE ──────────────────────────────────────────────── */}
      <section id="what-we-are" className="pt-20 pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <span className="text-[#1B8EF8] text-xs font-medium tracking-[0.25em] uppercase">What We Are</span>
          <div className="mt-12 grid md:grid-cols-2 gap-12 items-start">
            {/* What we DO */}
            <div className="border border-[#1B8EF8]/20 rounded-xl p-8 bg-[#0A0A0A]">
              <div className="flex items-center gap-3 mb-6">
                <p className="text-[#1B8EF8] text-xs tracking-[0.2em] uppercase">What we do</p>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
                We build the machine.<br />Then we make sure it runs.
              </h2>
              <p className="text-gray-400 leading-relaxed">
                We embed inside your organization and build the operating infrastructure that converts intelligence into output.
              </p>
              <p className="text-gray-400 leading-relaxed mt-4">
                That means: diagnosing where execution breaks down, building AI-powered systems that scale what&apos;s working, and developing the leadership capacity to sustain it — without adding headcount or complexity.
              </p>
              <p className="text-white/70 leading-relaxed mt-4 font-medium">
                We don&apos;t advise and leave. We build the machine. Then we make sure it runs.
              </p>
            </div>
            {/* What we're NOT — with contrast */}
            <div className="border border-white/5 rounded-xl p-8 bg-[#0A0A0A]">
              <p className="text-gray-500 text-xs tracking-[0.2em] uppercase mb-6">What we&apos;re not</p>
              <ul className="space-y-5">
                {[
                  { not: "A consulting firm that hands you a deck", is: "Operators who build the actual system" },
                  { not: "An AI dev shop that builds features", is: "Architects who connect AI to business outcomes" },
                  { not: "A fractional team you have to manage", is: "A layer that runs and delivers" },
                  { not: "Another framework with no follow-through", is: "Execution until it works" },
                ].map((item) => (
                  <li key={item.not} className="flex flex-col gap-1">
                    <span className="flex items-start gap-2 text-gray-600 text-sm">
                      <span className="text-red-500/50 mt-0.5 shrink-0">✗</span>
                      <span>{item.not}</span>
                    </span>
                    <span className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="text-[#1B8EF8] mt-0.5 shrink-0">✓</span>
                      <span>{item.is}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section connector */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#1B8EF8]/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#1B8EF8]/40" />
        </div>
      </div>

      {/* ── THREE PILLARS + FOUNDER REVEAL ───────────────────────────── */}
      <PillarsWithFounders />

      {/* ── THE MODEL ─────────────────────────────────────────────────── */}
      <section id="model" className="py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[#1B8EF8] text-xs font-medium tracking-[0.25em] uppercase">The Model</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 mb-16 tracking-tight">
            Intelligence in.<br />
            <span className="text-[#1B8EF8]">Execution out.</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-0">
            {[
              { label: "Intelligence", sub: "Your existing knowledge, data, and insight" },
              { label: "Strategy", sub: "What to do and why" },
              { label: "Leadership", sub: "Who drives it" },
              { label: "Systems", sub: "How it scales" },
              { label: "Output", sub: "Measurable results" },
            ].map((step, i) => (
              <div key={step.label} className="flex flex-col md:flex-row items-center">
                <div className="flex flex-col items-center text-center w-32">
                  <div className="w-12 h-12 rounded-full border border-[#1B8EF8]/60 bg-black flex items-center justify-center mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#1B8EF8]" />
                  </div>
                  <p className="text-white text-sm font-semibold">{step.label}</p>
                  <p className="text-gray-600 text-xs mt-1 leading-snug">{step.sub}</p>
                </div>
                {i < 4 && (
                  <div className="w-px h-8 md:w-8 md:h-px bg-[#1B8EF8]/25 my-2 md:my-0 md:mx-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* team section replaced by pillar-driven founder reveal above */}

            {/* ── CONTACT ───────────────────────────────────────────────────── */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Ready to turn intelligence<br />into execution?
          </h2>
          <p className="text-gray-400 text-lg mb-12">
            Let&apos;s talk about what LENRYX can do for your organization.
          </p>
          <form className="text-left space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#1B8EF8]/50 transition-colors text-sm"
              />
              <input
                type="text"
                placeholder="Company"
                className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#1B8EF8]/50 transition-colors text-sm"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#1B8EF8]/50 transition-colors text-sm"
            />
            <textarea
              placeholder="Tell us about your situation..."
              rows={4}
              className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#1B8EF8]/50 transition-colors text-sm resize-none"
            />
            <button
              type="submit"
              className="w-full bg-[#1B8EF8] text-black font-semibold py-3.5 rounded-lg hover:bg-[#1B8EF8]/90 transition-colors text-sm tracking-wide"
            >
              Send Message
            </button>
          </form>
          <p className="text-gray-600 text-sm mt-6">
            Or reach us directly at{" "}
            <a href="mailto:contact@lenryx.ai" className="text-[#1B8EF8] hover:underline">
              contact@lenryx.ai
            </a>
          </p>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
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
