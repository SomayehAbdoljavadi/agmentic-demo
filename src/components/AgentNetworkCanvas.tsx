import { useEffect, useRef, useCallback } from "react";

interface AgentNode {
  x: number;
  y: number;
  label: string;
  radius: number;
  color: string;
  glowColor: string;
  pulse: number;
  pulseSpeed: number;
  activity: number; // 0-1, how "active" this node is
}

interface Particle {
  x: number;
  y: number;
  targetIdx: number;
  sourceIdx: number;
  progress: number;
  speed: number;
  size: number;
  opacity: number;
  phase: number; // 0=toAgent, 1=toCore
}

const AGENT_LABELS = ["Sales", "Marketing", "Product", "Finance", "Strategy"];
const AGENT_COLORS_DARK = [
  "80, 180, 255",   // Sales - blue
  "255, 140, 80",   // Marketing - orange
  "100, 220, 180",  // Product - teal
  "255, 200, 80",   // Finance - gold
  "180, 140, 255",  // Strategy - purple
];
const AGENT_COLORS_LIGHT = [
  "40, 120, 220",
  "220, 100, 40",
  "30, 160, 120",
  "200, 150, 30",
  "130, 80, 220",
];

const CORE_COLOR_DARK = "140, 180, 255";
const CORE_COLOR_LIGHT = "60, 100, 220";
const GOV_COLOR_DARK = "200, 160, 255";
const GOV_COLOR_LIGHT = "120, 80, 200";

const AgentNetworkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const nodesRef = useRef<AgentNode[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);
  const scrollRef = useRef(0);

  const prefersReduced = useRef(false);

  const isDark = () => document.documentElement.classList.contains("dark");

  const buildLayout = useCallback((w: number, h: number) => {
    const cx = w * 0.5;
    const cy = h * 0.5;
    const ringRadius = Math.min(w, h) * 0.3;

    const nodes: AgentNode[] = AGENT_LABELS.map((label, i) => {
      const angle = -Math.PI / 2 + (i / AGENT_LABELS.length) * Math.PI * 2;
      return {
        x: cx + Math.cos(angle) * ringRadius,
        y: cy + Math.sin(angle) * ringRadius,
        label,
        radius: 6,
        color: isDark() ? AGENT_COLORS_DARK[i] : AGENT_COLORS_LIGHT[i],
        glowColor: isDark() ? AGENT_COLORS_DARK[i] : AGENT_COLORS_LIGHT[i],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.01,
        activity: 0,
      };
    });

    nodesRef.current = nodes;

    // Seed particles
    const particles: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push(makeParticle(w, h, nodes));
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY / window.innerHeight;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      buildLayout(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const dark = isDark();
      const dt = prefersReduced.current ? 0.3 : 1;
      timeRef.current += 0.016 * dt;
      const t = timeRef.current;

      const cx = w * 0.5;
      const cy = h * 0.48;
      const scroll = scrollRef.current;
      const expandFactor = 1 + Math.min(scroll, 0.5) * 0.15;

      const nodes = nodesRef.current;
      const particles = particlesRef.current;
      const coreColor = dark ? CORE_COLOR_DARK : CORE_COLOR_LIGHT;
      const govColor = dark ? GOV_COLOR_DARK : GOV_COLOR_LIGHT;

      // Update node colors for theme changes
      nodes.forEach((node, i) => {
        node.color = dark ? AGENT_COLORS_DARK[i] : AGENT_COLORS_LIGHT[i];
        node.glowColor = node.color;
        node.pulse += node.pulseSpeed * dt;
        node.activity = 0.3 + Math.sin(t * 0.8 + i * 1.2) * 0.3;
      });

      // Recalculate positions with expand
      const ringRadius = Math.min(w, h) * 0.28 * expandFactor;
      nodes.forEach((node, i) => {
        const angle = -Math.PI / 2 + (i / nodes.length) * Math.PI * 2;
        node.x = cx + Math.cos(angle) * ringRadius;
        node.y = cy + Math.sin(angle) * ringRadius;
      });

      // --- Draw connections: agents to core ---
      nodes.forEach((node) => {
        const pulseVal = 0.5 + Math.sin(node.pulse) * 0.2;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(cx, cy);
        ctx.strokeStyle = `rgba(${coreColor}, ${0.06 + pulseVal * 0.06})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // --- Draw connection: core to governance ---
      const govY = cy - ringRadius * 0.65;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx, govY);
      ctx.strokeStyle = `rgba(${govColor}, ${0.12 + Math.sin(t) * 0.05})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // --- Update & draw particles ---
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.progress += p.speed * dt;

        if (p.progress >= 1) {
          if (p.phase === 0) {
            // Switch to phase 1: agent → core
            p.phase = 1;
            p.progress = 0;
            p.speed = 0.003 + Math.random() * 0.004;
            p.sourceIdx = p.targetIdx;
          } else {
            // Respawn
            particles[i] = makeParticle(w, h, nodes);
            continue;
          }
        }

        let sx: number, sy: number, ex: number, ey: number;

        if (p.phase === 0) {
          // External → agent
          const node = nodes[p.targetIdx];
          const angle = -Math.PI / 2 + (p.targetIdx / nodes.length) * Math.PI * 2;
          const spawnDist = Math.max(w, h) * 0.6;
          sx = cx + Math.cos(angle) * spawnDist;
          sy = cy + Math.sin(angle) * spawnDist;
          ex = node.x;
          ey = node.y;
        } else {
          // Agent → core
          const node = nodes[p.sourceIdx];
          sx = node.x;
          sy = node.y;
          ex = cx;
          ey = cy;
        }

        const prog = p.progress;
        // Ease in-out
        const easedProg = prog < 0.5 ? 2 * prog * prog : 1 - Math.pow(-2 * prog + 2, 2) / 2;
        p.x = sx + (ex - sx) * easedProg;
        p.y = sy + (ey - sy) * easedProg;

        const fadeIn = Math.min(prog * 5, 1);
        const fadeOut = Math.min((1 - prog) * 5, 1);
        const alpha = fadeIn * fadeOut * p.opacity;

        const color = p.phase === 0 ? nodes[p.targetIdx].color : coreColor;

        // Particle glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        grad.addColorStop(0, `rgba(${color}, ${alpha * 0.6})`);
        grad.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.fill();
      }

      // --- Draw agent nodes ---
      nodes.forEach((node) => {
        const pulseScale = 0.7 + Math.sin(node.pulse) * 0.3;
        const glowSize = (node.radius + node.activity * 4) * expandFactor;

        // Outer glow
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize * 6);
        grad.addColorStop(0, `rgba(${node.glowColor}, ${0.15 * pulseScale})`);
        grad.addColorStop(0.5, `rgba(${node.glowColor}, ${0.05 * pulseScale})`);
        grad.addColorStop(1, `rgba(${node.glowColor}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowSize * 6, 0, Math.PI * 2);
        ctx.fill();

        // Core node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * expandFactor, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${node.color}, ${0.7 + pulseScale * 0.3})`;
        ctx.fill();

        // Label
        ctx.fillStyle = `rgba(${node.color}, ${0.5 + pulseScale * 0.3})`;
        ctx.font = `${10 * expandFactor}px 'Space Grotesk', sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(node.label, node.x, node.y + node.radius * expandFactor + 16);
      });

      // --- Draw Decision Core ---
      const coreActivity = 0.5 + Math.sin(t * 0.6) * 0.3;
      const coreRadius = 10 * expandFactor;

      // Core outer glow
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius * 8);
      coreGrad.addColorStop(0, `rgba(${coreColor}, ${0.25 * coreActivity})`);
      coreGrad.addColorStop(0.4, `rgba(${coreColor}, ${0.08 * coreActivity})`);
      coreGrad.addColorStop(1, `rgba(${coreColor}, 0)`);
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius * 8, 0, Math.PI * 2);
      ctx.fill();

      // Core ring
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius * 1.8, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${coreColor}, ${0.15 + coreActivity * 0.15})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Core dot
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${coreColor}, ${0.6 + coreActivity * 0.4})`;
      ctx.fill();

      // Core label
      ctx.fillStyle = `rgba(${coreColor}, ${0.5 + coreActivity * 0.3})`;
      ctx.font = `${11 * expandFactor}px 'Space Grotesk', sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("Decision Core", cx, cy + coreRadius + 18);

      // --- Draw Governance Layer ---
      const govActivity = 0.4 + Math.sin(t * 0.4 + 1) * 0.3;
      const govRadius = 7 * expandFactor;

      const govGrad = ctx.createRadialGradient(cx, govY, 0, cx, govY, govRadius * 5);
      govGrad.addColorStop(0, `rgba(${govColor}, ${0.2 * govActivity})`);
      govGrad.addColorStop(1, `rgba(${govColor}, 0)`);
      ctx.fillStyle = govGrad;
      ctx.beginPath();
      ctx.arc(cx, govY, govRadius * 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, govY, govRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${govColor}, ${0.5 + govActivity * 0.4})`;
      ctx.fill();

      ctx.fillStyle = `rgba(${govColor}, ${0.4 + govActivity * 0.3})`;
      ctx.font = `${10 * expandFactor}px 'Space Grotesk', sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("Governance", cx, govY + govRadius + 14);

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [buildLayout]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.8 }}
    />
  );
};

function makeParticle(w: number, h: number, nodes: AgentNode[]): Particle {
  const targetIdx = Math.floor(Math.random() * nodes.length);
  return {
    x: 0,
    y: 0,
    targetIdx,
    sourceIdx: targetIdx,
    progress: Math.random(),
    speed: 0.002 + Math.random() * 0.004,
    size: 1 + Math.random() * 1.5,
    opacity: 0.4 + Math.random() * 0.4,
    phase: 0,
  };
}

export default AgentNetworkCanvas;
