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

const NEURON_COUNT = 40;

// Per-node angular offsets (radians). Sales (index 0) shifted ~30° counterclockwise.
const ANGLE_OFFSETS = [Math.PI * 0.01, 0, 0, 0, 0];

function buildCluster(): NeuralCluster {
  const neurons: Neuron[] = [];
  for (let i = 0; i < NEURON_COUNT; i++) {
    neurons.push({
      angleOffset: (i / NEURON_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 1.2,
      orbitRadius: 57 + Math.random() * 105,
      orbitSpeed: 0.04 + Math.random() * 0.10,
      floatPhase: Math.random() * Math.PI * 2,
      floatAmp: 3 + Math.random() * 5,
      size: 0.6 + Math.random() * 1,
    });
  }

  // Build connections — nearby + cross + random long-range
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
    // Random long-range connection for organic feel
    if (i % 3 === 0) {
      const j = Math.floor(Math.random() * NEURON_COUNT);
      if (j !== i) connections.push([i, j]);
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
    for (let i = 0; i < 70; i++) {
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

      // Spawn new pulses — multiple directions, varied origins
      cluster.nextPulseTime -= 0.016 * dt;
      if (cluster.nextPulseTime <= 0) {
        // Spawn 1-3 pulses at once from different connections
        const count = 1 + Math.floor(Math.random() * 3);
        for (let s = 0; s < count; s++) {
          const conn = connections[Math.floor(Math.random() * connections.length)];
          // Randomly reverse direction for variety
          const [from, to] = Math.random() > 0.5 ? [conn[0], conn[1]] : [conn[1], conn[0]];
          pulses.push({
            fromIdx: from,
            toIdx: to,
            progress: 0,
            speed: 0.01 + Math.random() * 0.02,
          });
        }
        cluster.nextPulseTime = 0.08 + Math.random() * 0.5;
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

      const ringRadius = Math.min(w, h) * 0.36 * expandFactor;
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
            p.speed = 0.00004 + Math.random() * 0.00006;
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
          // Randomize spawn angle for directional diversity
          const baseAngle = -Math.PI / 2 + (p.targetIdx / nodes.length) * Math.PI * 2 + (ANGLE_OFFSETS[p.targetIdx] || 0);
          const angleSpread = (Math.random() - 0.5) * Math.PI * 1.2; // ±108° variation
          const spawnAngle = baseAngle + angleSpread;
          const spawnDist = Math.max(w, h) * (0.5 + Math.random() * 0.3);
          sx = cx + Math.cos(spawnAngle) * spawnDist;
          sy = cy + Math.sin(spawnAngle) * spawnDist;
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
        // Smooth gentle easing — slow start, steady drift, soft arrival
        const easedProg = prog * prog * (3 - 2 * prog); // smoothstep
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

      // --- Three concentric governance rings with scanning wave ---
      const ringRadii = [govRingRadius * 0.75, govRingRadius, govRingRadius * 1.18];
      const ringWidths = [0.8, 1.8 + govPulseVal * 2, 0.6];
      const ringBaseAlphas = [govRingAlpha * 0.4, govRingAlpha, govRingAlpha * 0.3];

      // Ripple outward animation
      const ripple = (Math.sin(t * 0.8) + 1) * 0.5; // 0-1

      for (let ri = 0; ri < 3; ri++) {
        const r = ringRadii[ri] + ripple * 3 * (ri - 1); // subtle outward ripple
        const alpha = ringBaseAlphas[ri];

        // Soft glow around each ring
        const glowGrad = ctx.createRadialGradient(cx, cy, r - 6, cx, cy, r + 10);
        glowGrad.addColorStop(0, `rgba(${govColor}, 0)`);
        glowGrad.addColorStop(0.4, `rgba(${govColor}, ${alpha * 0.2})`);
        glowGrad.addColorStop(1, `rgba(${govColor}, 0)`);
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, r + 10, 0, Math.PI * 2);
        ctx.fill();

        // Ring stroke
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${govColor}, ${alpha})`;
        ctx.lineWidth = ringWidths[ri];
        ctx.stroke();
      }

      // --- Scanning wave: rotating bright arc along each ring ---
      const scanAngle = t * 0.4; // slow rotation
      const scanArcLength = Math.PI * 0.4; // ~72° sweep

      for (let ri = 0; ri < 3; ri++) {
        const r = ringRadii[ri] + ripple * 3 * (ri - 1);
        const offset = ri * Math.PI * 0.25; // stagger each ring's scan
        const startAngle = scanAngle + offset;
        const endAngle = startAngle + scanArcLength;

        // Bright arc
        ctx.beginPath();
        ctx.arc(cx, cy, r, startAngle, endAngle);
        ctx.strokeStyle = `rgba(${govColor}, ${0.25 + govPulseVal * 0.3})`;
        ctx.lineWidth = ringWidths[ri] + 1;
        ctx.stroke();

        // Leading glow dot
        const leadAngle = endAngle;
        const lx = cx + Math.cos(leadAngle) * r;
        const ly = cy + Math.sin(leadAngle) * r;
        const dotGrad = ctx.createRadialGradient(lx, ly, 0, lx, ly, 8);
        dotGrad.addColorStop(0, `rgba(${govColor}, ${0.4 + govPulseVal * 0.3})`);
        dotGrad.addColorStop(1, `rgba(${govColor}, 0)`);
        ctx.fillStyle = dotGrad;
        ctx.beginPath();
        ctx.arc(lx, ly, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Occasional validation wave burst (when particles arrive) ---
      if (govPulseVal > 0.05) {
        for (let ri = 0; ri < 3; ri++) {
          const r = ringRadii[ri];
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${govColor}, ${govPulseVal * 0.4})`;
          ctx.lineWidth = 3 * govPulseVal;
          ctx.stroke();
        }
      }

      // Label below outermost ring
      const outerR = ringRadii[2] + ripple * 3;
      ctx.fillStyle = `rgba(${govColor}, ${0.4 + govBreath * 0.2 + govPulseVal * 0.3})`;
      ctx.font = `${10 * expandFactor}px 'Space Grotesk', sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("Governance", cx, cy + outerR + 20);

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
    speed: 0.00003 + Math.random() * 0.00005,
    size: 1 + Math.random() * 1.5,
    opacity: 0.4 + Math.random() * 0.4,
    phase: 0,
  };
}

export default AgentNetworkCanvas;
