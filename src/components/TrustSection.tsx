import { motion } from "framer-motion";
import { Shield, User, Eye } from "lucide-react";

const items = [
  { icon: Shield, title: "Privacy", description: "Your data, fully protected." },
  { icon: User, title: "Control", description: "You're always in charge." },
  { icon: Eye, title: "Transparency", description: "Clear actions, no black box." },
];

const TrustSection = () => {
  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center mx-auto mb-4">
              <item.icon className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="text-lg font-display mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrustSection;
