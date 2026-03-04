import { motion } from "framer-motion";

const VisionSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh-strong" />
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-6">Long-Term Vision</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight">
            Building the Operating System for{" "}
            <span className="text-gradient-glow">AI-Driven Organizations</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-12">
            We envision a world where every organizational decision is informed by structured intelligence, 
            validated by specialized AI, and aligned with strategic objectives — creating a new standard 
            for how enterprises think, decide, and act.
          </p>
        </motion.div>

        {/* Network visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative mx-auto w-full max-w-lg aspect-square"
        >
          {/* Central node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center animate-glow-pulse z-10">
            <span className="text-xs font-display font-bold text-primary">AI Core</span>
          </div>

          {/* Department nodes */}
          {[
            { label: "Sales", angle: 0, dist: 140 },
            { label: "Marketing", angle: 72, dist: 140 },
            { label: "Product", angle: 144, dist: 140 },
            { label: "Finance", angle: 216, dist: 140 },
            { label: "Strategy", angle: 288, dist: 140 },
          ].map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const x = Math.cos(rad) * node.dist;
            const y = Math.sin(rad) * node.dist;
            return (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                className="absolute top-1/2 left-1/2 w-14 h-14 rounded-full bg-card border border-border flex items-center justify-center"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
              >
                <span className="text-[10px] font-display font-semibold text-foreground">{node.label}</span>
              </motion.div>
            );
          })}

          {/* Connection lines via SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
            {[0, 72, 144, 216, 288].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = 200 + Math.cos(rad) * 140;
              const y = 200 + Math.sin(rad) * 140;
              return (
                <motion.line
                  key={i}
                  x1="200"
                  y1="200"
                  x2={x}
                  y2={y}
                  stroke="hsl(var(--primary))"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.2 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                />
              );
            })}
          </svg>

          {/* Outer glow rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-primary/5 animate-pulse-glow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full border border-primary/3" />
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;