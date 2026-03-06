import { motion } from "framer-motion";

const VisionSection = () => {
  return (
    <section className="h-screen w-full flex items-center relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh-strong" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left — Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-center"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-4">
            Long-Term Vision
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-display font-bold leading-tight mb-5">
            Building the Operating System for{" "}
            <span className="text-gradient-glow">AI-Driven Organizations</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md">
            We envision a world where every organizational decision is informed by structured intelligence,
            validated by specialized AI, and aligned with strategic objectives — creating a new standard
            for how enterprises think, decide, and act.
          </p>
        </motion.div>

        {/* Right — Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative mx-auto w-full max-w-[min(22vw,320px)] lg:max-w-[min(28vw,380px)] aspect-square"
        >
          {/* Central node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center animate-glow-pulse z-10">
            <span className="text-[10px] font-display font-bold text-primary">AI Core</span>
          </div>

          {/* Department nodes */}
          {[
            { label: "Sales", angle: 0, dist: 42 },
            { label: "Marketing", angle: 72, dist: 42 },
            { label: "Product", angle: 144, dist: 42 },
            { label: "Finance", angle: 216, dist: 42 },
            { label: "Strategy", angle: 288, dist: 42 },
          ].map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const xPct = 50 + Math.cos(rad) * node.dist;
            const yPct = 50 + Math.sin(rad) * node.dist;
            return (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                className="absolute w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center"
                style={{
                  left: `${xPct}%`,
                  top: `${yPct}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <span className="text-[9px] font-display font-semibold text-foreground">{node.label}</span>
              </motion.div>
            );
          })}

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {[0, 72, 144, 216, 288].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = 50 + Math.cos(rad) * 42;
              const y = 50 + Math.sin(rad) * 42;
              return (
                <motion.line
                  key={i}
                  x1="50" y1="50" x2={x} y2={y}
                  stroke="hsl(var(--primary))"
                  strokeWidth="0.4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.25 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                />
              );
            })}
          </svg>

          {/* Glow rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full border border-primary/5 animate-pulse-glow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full border border-primary/[0.03]" />
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;
