"use client";

import { useEffect, useRef } from "react";

export default function SpinningTriangle({ size = 320 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Add padding so labels never clip at canvas edge
    const padding = size * 0.22;
    const total = size + padding * 2;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = total * dpr;
    canvas.height = total * dpr;
    canvas.style.width = `${total}px`;
    canvas.style.height = `${total}px`;
    ctx.scale(dpr, dpr);

    const cx = total / 2;
    const cy = total / 2;
    const radius = size * 0.36;      // vertex distance from center
    const nodeR = size * 0.028;      // vertex circle radius
    const BLUE = "#1B8EF8";
    const WHITE = "#ffffff";
    const GRAY = "#9CA3AF";
    const PERIOD = 24000;            // 24s full rotation
    const labels = ["Strategy", "Leadership", "Systems"];

    let animId: number;

    // Pulse state
    let pulseT = 0;

    const draw = (now: number) => {
      ctx.clearRect(0, 0, total, total);

      // Current rotation angle
      const angle = ((now % PERIOD) / PERIOD) * Math.PI * 2;
      pulseT = (now % 2500) / 2500; // 0→1 every 2.5s

      // Vertex positions (equilateral triangle, starts apex-up)
      const verts = [0, 1, 2].map((i) => {
        const a = angle + (i * Math.PI * 2) / 3 - Math.PI / 2;
        return { x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) };
      });

      // Draw edges
      ctx.strokeStyle = BLUE;
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(verts[0].x, verts[0].y);
      ctx.lineTo(verts[1].x, verts[1].y);
      ctx.lineTo(verts[2].x, verts[2].y);
      ctx.closePath();
      ctx.stroke();

      // Draw spokes to center
      ctx.strokeStyle = BLUE;
      ctx.lineWidth = 0.75;
      ctx.globalAlpha = 0.4;
      verts.forEach((v) => {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(v.x, v.y);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;

      // Draw vertex nodes
      verts.forEach((v) => {
        ctx.beginPath();
        ctx.arc(v.x, v.y, nodeR, 0, Math.PI * 2);
        ctx.fillStyle = BLUE;
        ctx.fill();
      });

      // Draw labels — always upright, positioned outside each node
      const labelOffset = nodeR + size * 0.065;
      ctx.font = `500 ${Math.round(size * 0.042)}px Inter, Helvetica, Arial, sans-serif`;
      ctx.fillStyle = GRAY;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      verts.forEach((v, i) => {
        // Push label outward from center
        const dx = v.x - cx;
        const dy = v.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const lx = v.x + (dx / dist) * labelOffset;
        const ly = v.y + (dy / dist) * labelOffset;
        ctx.fillText(labels[i], lx, ly);
      });

      // Center pulse rings
      const pulse1 = Math.sin(pulseT * Math.PI); // 0→1→0
      const pulse2 = Math.sin(((pulseT + 0.5) % 1) * Math.PI); // offset

      [[pulse1, WHITE, 0.8], [pulse2, BLUE, 0.5]].forEach(([p, color, maxA]) => {
        const r = nodeR + (p as number) * radius * 0.22;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = color as string;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = (maxA as number) * (1 - (p as number));
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      // Center dot — breathes slightly
      const dotR = nodeR * 0.9 + Math.sin(pulseT * Math.PI) * nodeR * 0.3;
      ctx.beginPath();
      ctx.arc(cx, cy, dotR, 0, Math.PI * 2);
      ctx.fillStyle = WHITE;
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [size]);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
}
