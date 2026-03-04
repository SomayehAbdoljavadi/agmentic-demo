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
  activity: number;
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
  phase: number;
}

interface Neuron {
  angleOffset: number;
  orbitRadius: number;
  orbitSpeed: number;
  floatPhase: number;
  floatAmp: number;
  size: number;
}

interface NeuronPulse {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
}

interface NeuralCluster {
  neurons: Neuron[];
  connections: [number, number][];
  pulses: NeuronPulse[];
  nextPulseTime: number;
}

const AGENT_LABELS = ["Sales", "Marketing", "Product", "Finance", "Strategy"];
const AGENT_COLORS_DARK = [
  "80, 180, 255",
  "255, 140, 80",
  "100, 220, 180",
  "255, 200, 80",
  "180, 140, 255",
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

const NEURON_COUNT = 28;

// Per-node angular offsets (radians). Sales (index 0) shifted ~30° counterclockwise.
const ANGLE_OFFSETS = [-Math.PI * 0.10, 0, 0, 0, 0];

function buildCluster(): NeuralCluster {
  const neurons: Neuron[] = [];
  for (let i = 0; i < NEURON_COUNT; i++) {
    neurons.push({
      angleOffset: (i / NEURON_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.8,
      orbitRadius: 18 + Math.random() * 22,
      orbitSpeed: 0.08 + Math.random() * 0.12,
      floatPhase: Math.random() * Math.PI * 2,
      floatAmp: 2 + Math.random() * 3,
      size: 0.8 + Math.random() * 1,
    });
  }

  // Build connections — connect nearby neurons
  const connections: [number, number][] = [];
  for (let i = 0; i < NEURON_COUNT; i++) {
    for (let d = 1; d <= 3; d++) {
      const j = (i + d) % NEURON_COUNT;
      connections.push([i, j]);
    }
    if (i % 2 === 0) {
      const j = (i + Math.floor(NEURON_COUNT / 2)) % NEURON_COUNT;
      connections.push([i, j]);
    }
  }

  return { neurons, connections, pulses: [], nextPulseTime: Math.random() * 2 };
}

function getNeuronPos(neuron: Neuron, cx: number, cy: number, t: number, expandFactor: number): [number, number] {
  const angle = neuron.angleOffset + t * neuron.orbitSpeed;
  const r = neuron.orbitRadius * expandFactor;
  const fx = Math.sin(t * 0.5 + neuron.floatPhase) * neuron.floatAmp;
  const fy = Math.cos(t * 0.7 + neuron.floatPhase) * neuron.floatAmp;
  return [cx + Math.cos(angle) * r + fx, cy + Math.sin(angle) * r + fy];
}

const AgentNetworkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const nodesRef = useRef<AgentNode[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);
  const scrollRef = useRef(0);
  const clustersRef = useRef<NeuralCluster[]>([]);
  const govClusterRef = useRef<NeuralCluster>(buildCluster());
  const govPulseRef = useRef(0);
  const prefersReduced = useRef(false);

  const isDark = () => document.documentElement.classList.contains("dark");

  const buildLayout = useCallback((w: number, h: number) => {
    const cx = w * 0.5;
    const cy = h * 0.5;
    const ringRadius = Math.min(w, h) * 0.3;

    const nodes: AgentNode[] = AGENT_LABELS.map((label, i) => {
      const angle = -Math.PI / 2 + (i / AGENT_LABELS.length) * Math.PI * 2 + (ANGLE_OFFSETS[i] || 0);
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

    // Build neural clusters for each node + governance
    if (clustersRef.current.length === 0) {
      clustersRef.current = AGENT_LABELS.map(() => buildCluster());
    }

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

    const drawCluster = (
      cluster: NeuralCluster,
      nodeCx: number,
      nodeCy: number,
      color: string,
      t: number,
      expandFactor: number,
      dt: number
    ) => {
      const { neurons, connections, pulses } = cluster;

      // Compute neuron positions
      const positions: [number, number][] = neurons.map((n) =>
        getNeuronPos(n, nodeCx, nodeCy, t, expandFactor)
      );

      // Draw connections
      for (const [a, b] of connections) {
        const [ax, ay] = positions[a];
        const [bx, by] = positions[b];
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = `rgba(${color}, 0.08)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Update and draw pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed * dt;
        if (p.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const [ax, ay] = positions[p.fromIdx];
        const [bx, by] = positions[p.toIdx];
        const px = ax + (bx - ax) * p.progress;
        const py = ay + (by - ay) * p.progress;
        const alpha = Math.sin(p.progress * Math.PI) * 0.6;

        const grad = ctx.createRadialGradient(px, py, 0, px, py, 4);
        grad.addColorStop(0, `rgba(${color}, ${alpha})`);
        grad.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Spawn new pulses
      cluster.nextPulseTime -= 0.016 * dt;
      if (cluster.nextPulseTime <= 0) {
        const conn = connections[Math.floor(Math.random() * connections.length)];
        pulses.push({
          fromIdx: conn[0],
          toIdx: conn[1],
          progress: 0,
          speed: 0.015 + Math.random() * 0.015,
        });
        cluster.nextPulseTime = 0.3 + Math.random() * 1.2;
      }

      // Draw neurons
      for (const [nx, ny] of positions) {
        // Soft glow
        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, 5);
        grad.addColorStop(0, `rgba(${color}, 0.25)`);
        grad.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(nx, ny, 5, 0, Math.PI * 2);
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(nx, ny, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 0.5)`;
        ctx.fill();
      }
    };

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
      const cy = h * 0.5;
      const scroll = scrollRef.current;
      const expandFactor = 1 + Math.min(scroll, 0.5) * 0.15;

      const nodes = nodesRef.current;
      const particles = particlesRef.current;
      const coreColor = dark ? CORE_COLOR_DARK : CORE_COLOR_LIGHT;
      const govColor = dark ? GOV_COLOR_DARK : GOV_COLOR_LIGHT;

      nodes.forEach((node, i) => {
        node.color = dark ? AGENT_COLORS_DARK[i] : AGENT_COLORS_LIGHT[i];
        node.glowColor = node.color;
        node.pulse += node.pulseSpeed * dt;
        node.activity = 0.3 + Math.sin(t * 0.8 + i * 1.2) * 0.3;
      });

      const ringRadius = Math.min(w, h) * 0.28 * expandFactor;
      nodes.forEach((node, i) => {
        const angle = -Math.PI / 2 + (i / nodes.length) * Math.PI * 2 + (ANGLE_OFFSETS[i] || 0);
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


      // --- Decay governance pulse ---
      govPulseRef.current *= 0.97;

      // --- Update & draw particles ---
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.progress += p.speed * dt;

        if (p.progress >= 1) {
          if (p.phase === 0) {
            p.phase = 1;
            p.progress = 0;
            p.speed = 0.003 + Math.random() * 0.004;
            p.sourceIdx = p.targetIdx;
          } else {
            // Particle arrived at core — trigger governance ring pulse
            govPulseRef.current = Math.min(govPulseRef.current + 0.4, 1);
            particles[i] = makeParticle(w, h, nodes);
            continue;
          }
        }

        let sx: number, sy: number, ex: number, ey: number;

        if (p.phase === 0) {
          const node = nodes[p.targetIdx];
          const angle = -Math.PI / 2 + (p.targetIdx / nodes.length) * Math.PI * 2 + (ANGLE_OFFSETS[p.targetIdx] || 0);
          const spawnDist = Math.max(w, h) * 0.6;
          sx = cx + Math.cos(angle) * spawnDist;
          sy = cy + Math.sin(angle) * spawnDist;
          ex = node.x;
          ey = node.y;
        } else {
          const node = nodes[p.sourceIdx];
          sx = node.x;
          sy = node.y;
          ex = cx;
          ey = cy;
        }

        const prog = p.progress;
        const easedProg = prog < 0.5 ? 2 * prog * prog : 1 - Math.pow(-2 * prog + 2, 2) / 2;
        p.x = sx + (ex - sx) * easedProg;
        p.y = sy + (ey - sy) * easedProg;

        const fadeIn = Math.min(prog * 5, 1);
        const fadeOut = Math.min((1 - prog) * 5, 1);
        const alpha = fadeIn * fadeOut * p.opacity;

        const color = p.phase === 0 ? nodes[p.targetIdx].color : coreColor;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        grad.addColorStop(0, `rgba(${color}, ${alpha * 0.6})`);
        grad.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.fill();
      }

      // --- Draw agent nodes ---
      nodes.forEach((node) => {
        const pulseScale = 0.7 + Math.sin(node.pulse) * 0.3;
        const glowSize = (node.radius + node.activity * 4) * expandFactor;

        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize * 6);
        grad.addColorStop(0, `rgba(${node.glowColor}, ${0.15 * pulseScale})`);
        grad.addColorStop(0.5, `rgba(${node.glowColor}, ${0.05 * pulseScale})`);
        grad.addColorStop(1, `rgba(${node.glowColor}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowSize * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * expandFactor, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${node.color}, ${0.7 + pulseScale * 0.3})`;
        ctx.fill();

        ctx.fillStyle = `rgba(${node.color}, ${0.5 + pulseScale * 0.3})`;
        ctx.font = `${10 * expandFactor}px 'Space Grotesk', sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(node.label, node.x, node.y + node.radius * expandFactor + 16);
      });

      // --- Draw neural clusters around each agent node ---
      nodes.forEach((node, i) => {
        if (clustersRef.current[i]) {
          drawCluster(clustersRef.current[i], node.x, node.y, node.color, t, expandFactor, dt);
        }
      });

      // --- Draw Decision Core ---
      const coreActivity = 0.5 + Math.sin(t * 0.6) * 0.3;
      const coreRadius = 10 * expandFactor;

      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius * 8);
      coreGrad.addColorStop(0, `rgba(${coreColor}, ${0.25 * coreActivity})`);
      coreGrad.addColorStop(0.4, `rgba(${coreColor}, ${0.08 * coreActivity})`);
      coreGrad.addColorStop(1, `rgba(${coreColor}, 0)`);
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius * 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius * 1.8, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${coreColor}, ${0.15 + coreActivity * 0.15})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${coreColor}, ${0.6 + coreActivity * 0.4})`;
      ctx.fill();

      ctx.fillStyle = `rgba(${coreColor}, ${0.5 + coreActivity * 0.3})`;
      ctx.font = `${11 * expandFactor}px 'Space Grotesk', sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("Decision Core", cx, cy + coreRadius + 18);

      // --- Draw Governance Ring around Decision Core ---
      const govBreath = 0.3 + Math.sin(t * 0.5) * 0.15;
      const govPulseVal = govPulseRef.current;
      const govRingRadius = coreRadius * 6.9;
      const govRingAlpha = (0.12 + govBreath * 0.1 + govPulseVal * 0.35);

      // Inner fill — subtle supervisory area
      const govAreaGrad = ctx.createRadialGradient(cx, cy, coreRadius * 1.5, cx, cy, govRingRadius);
      govAreaGrad.addColorStop(0, `rgba(${govColor}, ${0.02 + govPulseVal * 0.04})`);
      govAreaGrad.addColorStop(0.7, `rgba(${govColor}, ${0.04 + govPulseVal * 0.06})`);
      govAreaGrad.addColorStop(1, `rgba(${govColor}, 0)`);
      ctx.fillStyle = govAreaGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, govRingRadius, 0, Math.PI * 2);
      ctx.fill();

      // Outer soft glow
      const govGlowGrad = ctx.createRadialGradient(cx, cy, govRingRadius - 12, cx, cy, govRingRadius + 25);
      govGlowGrad.addColorStop(0, `rgba(${govColor}, 0)`);
      govGlowGrad.addColorStop(0.35, `rgba(${govColor}, ${govRingAlpha * 0.25})`);
      govGlowGrad.addColorStop(0.7, `rgba(${govColor}, ${govRingAlpha * 0.12})`);
      govGlowGrad.addColorStop(1, `rgba(${govColor}, 0)`);
      ctx.fillStyle = govGlowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, govRingRadius + 25, 0, Math.PI * 2);
      ctx.fill();

      // Main ring stroke
      ctx.beginPath();
      ctx.arc(cx, cy, govRingRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${govColor}, ${govRingAlpha})`;
      ctx.lineWidth = 2 + govPulseVal * 2;
      ctx.stroke();

      // Second thinner ring
      ctx.beginPath();
      ctx.arc(cx, cy, govRingRadius + 8, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${govColor}, ${govRingAlpha * 0.35})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Label below ring
      ctx.fillStyle = `rgba(${govColor}, ${0.4 + govBreath * 0.2 + govPulseVal * 0.3})`;
      ctx.font = `${10 * expandFactor}px 'Space Grotesk', sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("Governance", cx, cy + govRingRadius + 20);

      // --- Draw governance neural cluster along the ring ---
      {
        const gc = govClusterRef.current;
        const gcPositions: [number, number][] = gc.neurons.map((n, ni) => {
          // Distribute neurons along the ring circumference
          const baseAngle = (ni / gc.neurons.length) * Math.PI * 2;
          const angle = baseAngle + t * n.orbitSpeed * 0.5;
          const r = govRingRadius + Math.sin(t * 0.5 + n.floatPhase) * n.floatAmp;
          return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
        });

        // Connections
        for (const [a, b] of gc.connections) {
          const [ax, ay] = gcPositions[a];
          const [bx, by] = gcPositions[b];
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.strokeStyle = `rgba(${govColor}, 0.06)`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        // Pulses
        for (let pi = gc.pulses.length - 1; pi >= 0; pi--) {
          const pulse = gc.pulses[pi];
          pulse.progress += pulse.speed * dt;
          if (pulse.progress >= 1) { gc.pulses.splice(pi, 1); continue; }
          const [ax, ay] = gcPositions[pulse.fromIdx];
          const [bx, by] = gcPositions[pulse.toIdx];
          const px = ax + (bx - ax) * pulse.progress;
          const py = ay + (by - ay) * pulse.progress;
          const alpha = Math.sin(pulse.progress * Math.PI) * 0.5;
          const pg = ctx.createRadialGradient(px, py, 0, px, py, 4);
          pg.addColorStop(0, `rgba(${govColor}, ${alpha})`);
          pg.addColorStop(1, `rgba(${govColor}, 0)`);
          ctx.fillStyle = pg;
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Spawn pulses
        gc.nextPulseTime -= 0.016 * dt;
        if (gc.nextPulseTime <= 0) {
          const conn = gc.connections[Math.floor(Math.random() * gc.connections.length)];
          gc.pulses.push({ fromIdx: conn[0], toIdx: conn[1], progress: 0, speed: 0.012 + Math.random() * 0.012 });
          gc.nextPulseTime = 0.4 + Math.random() * 1.5;
        }

        // Neurons
        for (const [nx, ny] of gcPositions) {
          const ng = ctx.createRadialGradient(nx, ny, 0, nx, ny, 5);
          ng.addColorStop(0, `rgba(${govColor}, 0.2)`);
          ng.addColorStop(1, `rgba(${govColor}, 0)`);
          ctx.fillStyle = ng;
          ctx.beginPath();
          ctx.arc(nx, ny, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(nx, ny, 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${govColor}, 0.45)`;
          ctx.fill();
        }
      }

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
