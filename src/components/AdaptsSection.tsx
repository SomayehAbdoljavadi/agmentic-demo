import { motion } from "framer-motion";
import { Link2, Brain, MessageSquare, Bell } from "lucide-react";

const cards = [
  {
    icon: Link2,
    title: "Connected to Your Marketing Stack.",
    description: "Lucy integrates with your entire marketing ecosystem — channels, CRMs, eCommerce, analytics, data warehouses, and trend platforms — to deliver one holistic view of performance.",
  },
  {
    icon: Brain,
    title: "Lucy Learns How You Work.",
    description: "Upload playbooks, training docs, and client context — Lucy adapts to your agency's methods and preferences. Over time, she mirrors how your team thinks and operates.",
  },
  {
    icon: MessageSquare,
    title: "Native in Your Systems.",
    description: "Lucy is built to act like a colleague — she works where you work. You can chat with her in Slack or email her with questions or tasks.",
  },
  {
    icon: Bell,
    title: "Lucy is Proactive.",
    description: "She constantly reviews performance, flags issues, and surfaces insights before they impact results.",
  },
];

const AdaptsSection = () => {
  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-display mb-16 text-center"
        >
          Lucy Adapts to You.
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 md:p-10 rounded-2xl bg-card border border-border hover:border-primary/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-6">
                <card.icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <h3 className="text-xl md:text-2xl font-display mb-3">{card.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdaptsSection;
