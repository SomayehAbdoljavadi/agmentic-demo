import { motion } from "framer-motion";
import { MessageSquare, Layout, Bot, Globe, ArrowRight } from "lucide-react";
import { useDemoAccess } from "@/contexts/DemoAccessContext";

const products = [
  {
    icon: MessageSquare,
    name: "Agmentic Demo",
    status: "Live",
    description: "Experience AI-augmented decision making in action. Ask questions, get structured intelligence.",
    actionLabel: "Try Demo",
    gated: true,
  },
  {
    icon: Layout,
    name: "Agmentic App",
    status: "Coming Soon",
    description: "The full platform for teams — turning fragmented data into aligned, explainable decisions.",
    actionLabel: "Learn More",
    gated: false,
  },
  {
    icon: Bot,
    name: "Agmentic Agents",
    status: "Coming Soon",
    description: "Autonomous AI agents that research, analyze, and recommend — working alongside your team 24/7.",
    actionLabel: "Learn More",
    gated: false,
  },
  {
    icon: Globe,
    name: "Agmentic Browsers",
    status: "Coming Soon",
    description: "AI-powered browsing that understands context, extracts insights, and connects the dots across the web.",
    actionLabel: "Learn More",
    gated: false,
  },
];

const ProductsSection = () => {
  const { openDemoGate } = useDemoAccess();

  return (
    <section className="py-32 md:py-40 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-4">
            What We're Building
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
            Products born from the{" "}
            <span className="text-gradient-primary">mindshift</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Each product is a piece of our vision — AI that augments human intelligence across every workflow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 flex flex-col"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <product.icon className="w-6 h-6 text-primary" />
                </div>
                <span
                  className={`text-[10px] uppercase tracking-widest font-medium px-3 py-1 rounded-full ${
                    product.status === "Live"
                      ? "bg-[hsl(var(--success))]/15 text-[hsl(var(--success))]"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {product.status}
                </span>
              </div>

              <h3 className="text-xl font-display font-bold mb-3">{product.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                {product.description}
              </p>

              <button
                onClick={product.gated ? openDemoGate : undefined}
                className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80 transition-opacity self-start"
              >
                {product.actionLabel}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
