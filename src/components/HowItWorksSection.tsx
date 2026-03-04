import { motion } from "framer-motion";
import { Database, Users, FileText, Bot, Shield } from "lucide-react";

const steps = [
  {
    icon: Database,
    step: "01",
    title: "Data Ingestion",
    description: "Connect company systems — CRM, ERP, analytics, and more — into a unified data layer.",
  },
  {
    icon: Users,
    step: "02",
    title: "Profile Generation",
    description: "Automatically generate profiles for accounts, markets, products, and strategic segments.",
  },
  {
    icon: FileText,
    step: "03",
    title: "Decision Intelligence Reports",
    description: "AI generates structured decision reports with scoring, context, and recommendations.",
  },
  {
    icon: Bot,
    step: "04",
    title: "Agent Validation",
    description: "Specialized AI agents review decisions from Sales, Marketing, Finance, and Product perspectives.",
  },
  {
    icon: Shield,
    step: "05",
    title: "Executive Governance",
    description: "Strategy layer aligns all decisions with company objectives, ensuring coherent execution.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="section-padding relative overflow-hidden bg-surface">
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-4">How It Works</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold">
            From Raw Data to{" "}
            <span className="text-gradient-primary">Aligned Decisions</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/10 to-transparent -translate-x-1/2" />

          <div className="space-y-8 md:space-y-0">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`relative md:flex items-center gap-8 md:mb-14 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`md:w-1/2 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                  <div className={`p-6 rounded-2xl glass-card hover:glow-sm transition-all duration-300 inline-block ${i % 2 === 0 ? "md:ml-auto" : ""}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <s.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-xs font-mono text-primary font-semibold">STEP {s.step}</span>
                    </div>
                    <h3 className="text-lg font-display font-semibold mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />

                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;