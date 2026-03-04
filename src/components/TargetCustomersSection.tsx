import { motion } from "framer-motion";
import { Building2, Rocket, Globe, TrendingUp, ShoppingBag } from "lucide-react";

const customers = [
  { icon: Building2, label: "B2B Companies" },
  { icon: Rocket, label: "SaaS Companies" },
  { icon: Globe, label: "Enterprise Organizations" },
  { icon: TrendingUp, label: "Venture Capital Firms" },
  { icon: ShoppingBag, label: "Retail Ecosystems" },
];

const TargetCustomersSection = () => {
  return (
    <section className="section-padding bg-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-4">Who It's For</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Built for Decision-Driven Organizations
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {customers.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-card border border-border text-center hover:border-primary/20 transition-colors"
            >
              <c.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-sm font-medium">{c.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetCustomersSection;
