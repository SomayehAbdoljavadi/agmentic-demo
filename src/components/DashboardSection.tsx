import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, TrendingUp, Megaphone, Package, DollarSign, Target } from "lucide-react";

const metrics = [
  { label: "Sales Opportunity Score", value: "87", unit: "/100", change: "+12 vs Q1", positive: true },
  { label: "Marketing Campaign Priority", value: "High", unit: "", change: "3 campaigns flagged", positive: true },
  { label: "Product Feature Demand", value: "94", unit: "/100", change: "2 features trending", positive: true },
  { label: "Financial Margin Impact", value: "+14.2%", unit: "", change: "Above threshold", positive: true },
  { label: "Strategic Alignment Index", value: "91.2", unit: "%", change: "4/5 agents aligned", positive: true },
];

const agentStatuses = [
  { icon: TrendingUp, name: "Sales Agent", verdict: "Approve", confidence: 92, color: "text-success" },
  { icon: Megaphone, name: "Marketing Agent", verdict: "Approve", confidence: 87, color: "text-success" },
  { icon: Package, name: "Product Agent", verdict: "Flag", confidence: 74, color: "text-warning" },
  { icon: DollarSign, name: "Finance Agent", verdict: "Approve", confidence: 91, color: "text-success" },
  { icon: Target, name: "Strategy Agent", verdict: "Approve", confidence: 95, color: "text-success" },
];

const DashboardSection = () => {
  return (
    <section className="section-padding relative overflow-hidden bg-surface">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-4">Product Dashboard</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-5">
            Decision Intelligence in Action
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A simulated view of the enterprise dashboard powering AI-augmented decisions.
          </p>
        </motion.div>

        {/* Dashboard mock */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card-strong p-1.5 glow-md"
        >
          <div className="rounded-xl bg-card border border-border overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border bg-surface/50">
              <div className="w-3 h-3 rounded-full bg-destructive/50" />
              <div className="w-3 h-3 rounded-full bg-warning/50" />
              <div className="w-3 h-3 rounded-full bg-success/50" />
              <span className="ml-4 text-xs text-muted-foreground font-mono">agmentic.ai / dashboard / decision-report</span>
            </div>

            <div className="p-5 md:p-8">
              {/* Company header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Company Profile</p>
                  <p className="font-display font-bold text-lg">Acme Corporation</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 text-success text-xs font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Decision Approved
                </div>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                {metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="p-4 rounded-lg bg-surface border border-border"
                  >
                    <p className="text-[10px] text-muted-foreground mb-2 leading-tight">{m.label}</p>
                    <p className="text-xl font-display font-bold">{m.value}<span className="text-sm font-normal text-muted-foreground">{m.unit}</span></p>
                    <p className="text-[10px] text-success mt-1">{m.change}</p>
                  </motion.div>
                ))}
              </div>

              {/* Agent review panel */}
              <div>
                <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">Agent Review Panel</p>
                <div className="space-y-2">
                  {agentStatuses.map((agent, i) => (
                    <motion.div
                      key={agent.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.08 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-surface border border-border"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <agent.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium flex-1">{agent.name}</span>
                      <span className={`text-xs font-medium ${agent.color} flex items-center gap-1`}>
                        {agent.verdict === "Flag" && <AlertTriangle className="w-3 h-3" />}
                        {agent.verdict === "Approve" && <CheckCircle2 className="w-3 h-3" />}
                        {agent.verdict}
                      </span>
                      <span className="text-xs text-muted-foreground w-16 text-right">{agent.confidence}%</span>
                      {/* Mini bar */}
                      <div className="w-20 h-1.5 rounded-full bg-border overflow-hidden hidden md:block">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${agent.confidence}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                          className={`h-full rounded-full ${agent.verdict === "Flag" ? "bg-warning" : "bg-primary"}`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardSection;