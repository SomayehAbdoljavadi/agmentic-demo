import { useRef, useEffect, useCallback } from "react";

interface Node {
  label: string;
  angle: number;
  orbitSpeed: number;
  orbitRadius: number;
  color: string;
  glowColor: string;
  size: number;
}

const NODES: Node[] = [
  { label: "Strategy", angle: 0, orbitSpeed: 0.08, orbitRadius: 0.26, color: "#60a5fa", glowColor: "rgba(96,165,250,0.5)", size: 28 },
  { label: "Sales", angle: 72, orbitSpeed: 0.065, orbitRadius: 0.26, color: "#818cf8", glowColor: "rgba(129,140,248,0.5)", size: 26 },
  { label: "Marketing", angle: 144, orbitSpeed: 0.055, orbitRadius: 0.26, color: "#22d3ee", glowColor: "rgba(34,211,238,0.5)", size: 26 },
  { label: "Product", angle: 216, orbitSpeed: 0.07, orbitRadius: 0.26, color: "#a78bfa", glowColor: "rgba(167,139,250,0.5)", size: 27 },
  { label: "Finance", angle: 288, orbitSpeed: 0.06, orbitRadius: 0.26, color: "#67e8f9", glowColor: "rgba(103,232,249,0.5)", size: 25 },
];

interface Particle {
  x: number;
  y: number;
  progress: number;
  speed: number;
  nodeIndex: number;
  returning: boolean;
  opacity: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

const AICoreVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const nodeAnglesRef = useRef<number[]>(NODES.map((n) => (n.angle * Math.PI) / 180));
  const timeRef = useRef(0);
  const lastTimeRef = useRef(0);

  const initStars = useCallback((count: number) => {
    starsRef.current = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.6 + 0.1,
      twinkleSpeed: Math.random() * 2 + 1,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));
  }, []);

  const initParticles = useCallback((count: number) => {
    particlesRef.current = Array.from({ length: count }, () => ({
      x: 0, y: 0,
      progress: Math.random(),
      speed: Math.random() * 0.3 + 0.15,
      nodeIndex: Math.floor(Math.random() * NODES.length),
      returning: Math.random() > 0.5,
      opacity: 0,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    initStars(120);
    initParticles(25);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (timestamp: number) => {
      const dt = lastTimeRef.current ? (timestamp - lastTimeRef.current) / 1000 : 0.016;
      lastTimeRef.current = timestamp;
      timeRef.current += dt;
      const t = timeRef.current;

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h / 2;
      const minDim = Math.min(w, h);

      ctx.clearRect(0, 0, w, h);

      // No background — fully transparent canvas

      // Stars
      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(t * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(star.x * w, star.y * h, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,200,255,${star.opacity * twinkle})`;
        ctx.fill();
      });

      // Orbit rings (subtle)
      NODES.forEach((node) => {
        const r = node.orbitRadius * minDim;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(100,140,255,0.06)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Update node angles
      nodeAnglesRef.current = nodeAnglesRef.current.map(
        (a, i) => a + NODES[i].orbitSpeed * dt
      );

      // Compute node positions
      const nodePositions = NODES.map((node, i) => {
        const a = nodeAnglesRef.current[i];
        const r = node.orbitRadius * minDim;
        return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
      });

      // Connection beams (curved)
      nodePositions.forEach((pos, i) => {
        const node = NODES[i];
        const grad = ctx.createLinearGradient(cx, cy, pos.x, pos.y);
        grad.addColorStop(0, "rgba(96,165,250,0.3)");
        grad.addColorStop(0.5, node.glowColor.replace("0.5", "0.15"));
        grad.addColorStop(1, node.glowColor.replace("0.5", "0.05"));

        // Curved connection
        const midX = (cx + pos.x) / 2 + Math.sin(nodeAnglesRef.current[i] * 2) * 15;
        const midY = (cy + pos.y) / 2 + Math.cos(nodeAnglesRef.current[i] * 2) * 15;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.quadraticCurveTo(midX, midY, pos.x, pos.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // Energy particles along connections
      particlesRef.current.forEach((p) => {
        p.progress += p.speed * dt;
        if (p.progress > 1) {
          p.progress = 0;
          p.returning = !p.returning;
          p.nodeIndex = Math.floor(Math.random() * NODES.length);
        }

        const pos = nodePositions[p.nodeIndex];
        const prog = p.returning ? 1 - p.progress : p.progress;
        const ease = prog * prog * (3 - 2 * prog); // smoothstep

        const midX = (cx + pos.x) / 2 + Math.sin(nodeAnglesRef.current[p.nodeIndex] * 2) * 15;
        const midY = (cy + pos.y) / 2 + Math.cos(nodeAnglesRef.current[p.nodeIndex] * 2) * 15;

        // Quadratic bezier interpolation
        const t1 = 1 - ease;
        const px = t1 * t1 * cx + 2 * t1 * ease * midX + ease * ease * pos.x;
        const py = t1 * t1 * cy + 2 * t1 * ease * midY + ease * ease * pos.y;

        p.opacity = Math.sin(p.progress * Math.PI) * 0.9;

        const pGrad = ctx.createRadialGradient(px, py, 0, px, py, 4);
        pGrad.addColorStop(0, `rgba(150,200,255,${p.opacity})`);
        pGrad.addColorStop(1, `rgba(150,200,255,0)`);
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = pGrad;
        ctx.fill();
      });

      // AI Core — multi-layer glow
      const coreRadius = minDim * 0.055;

      // Outer pulse rings
      for (let ring = 0; ring < 3; ring++) {
        const pulse = Math.sin(t * 1.2 + ring * 0.8) * 0.3 + 0.7;
        const ringR = coreRadius * (2.2 + ring * 0.8) * pulse;
        ctx.beginPath();
        ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(96,165,250,${0.06 - ring * 0.015})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Core glow layers
      const coreGlow3 = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius * 2.5);
      coreGlow3.addColorStop(0, "rgba(99,102,241,0.12)");
      coreGlow3.addColorStop(1, "rgba(99,102,241,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = coreGlow3;
      ctx.fill();

      const coreGlow2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius * 1.6);
      coreGlow2.addColorStop(0, "rgba(96,165,250,0.2)");
      coreGlow2.addColorStop(1, "rgba(96,165,250,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius * 1.6, 0, Math.PI * 2);
      ctx.fillStyle = coreGlow2;
      ctx.fill();

      // Core sphere
      const coreGrad = ctx.createRadialGradient(cx - coreRadius * 0.2, cy - coreRadius * 0.2, 0, cx, cy, coreRadius);
      coreGrad.addColorStop(0, "rgba(180,210,255,0.95)");
      coreGrad.addColorStop(0.4, "rgba(96,165,250,0.8)");
      coreGrad.addColorStop(0.8, "rgba(79,70,229,0.6)");
      coreGrad.addColorStop(1, "rgba(55,48,163,0.3)");
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Core label
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.font = `600 ${Math.max(9, minDim * 0.022)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("AI Core", cx, cy);

      // Department nodes
      nodePositions.forEach((pos, i) => {
        const node = NODES[i];
        const r = node.size * (minDim / 500);
        const breathe = Math.sin(t * 1.5 + i) * 0.08 + 1;
        const finalR = r * breathe;

        // Node glow
        const nGlow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, finalR * 2.5);
        nGlow.addColorStop(0, node.glowColor.replace("0.5", "0.15"));
        nGlow.addColorStop(1, node.glowColor.replace("0.5", "0"));
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, finalR * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = nGlow;
        ctx.fill();

        // Node body — glass effect
        const nGrad = ctx.createRadialGradient(
          pos.x - finalR * 0.2, pos.y - finalR * 0.2, 0,
          pos.x, pos.y, finalR
        );
        nGrad.addColorStop(0, "rgba(30,40,80,0.9)");
        nGrad.addColorStop(0.7, "rgba(20,25,50,0.85)");
        nGrad.addColorStop(1, "rgba(15,20,40,0.7)");
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, finalR, 0, Math.PI * 2);
        ctx.fillStyle = nGrad;
        ctx.fill();

        // Node border
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, finalR, 0, Math.PI * 2);
        ctx.strokeStyle = node.color.replace(")", ",0.4)").replace("rgb", "rgba");
        ctx.lineWidth = 1;
        ctx.stroke();

        // Node label
        ctx.fillStyle = node.color;
        ctx.font = `500 ${Math.max(8, minDim * 0.018)}px "Space Grotesk", sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.label, pos.x, pos.y);
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initStars, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
};

export default AICoreVisualization;
