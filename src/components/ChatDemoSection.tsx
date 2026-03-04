import { motion } from "framer-motion";
import { Check } from "lucide-react";

const messages = [
  {
    sender: "user",
    text: "Hi Agmentic! Every Monday at 9am, generate a weekly report for all my clients and send me an email with a summary of the most important areas to look at.",
  },
  {
    sender: "agmentic",
    text: "Absolutely! I will handle the weekly reporting going forward.",
    hasTask: true,
    taskLabel: "Task Created",
  },
  {
    sender: "user",
    text: "Also make sure to filter out all irrelevant searches by updating our negative keyword structure for clients running Google Ads.",
  },
  {
    sender: "agmentic",
    text: "On it! Adding that to my agenda each day.",
    hasTask: true,
    taskLabel: "Task Updated",
  },
];

const ChatDemoSection = () => {
  return (
    <section className="section-padding">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-5">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] space-y-3 ${
                  msg.sender === "user"
                    ? "bg-secondary rounded-2xl rounded-br-sm px-5 py-4"
                    : ""
                }`}
              >
                {msg.sender === "agmentic" && (
                  <span className="text-xs uppercase tracking-widest text-accent-foreground">Agmentic</span>
                )}
                <p className={`text-sm leading-relaxed ${msg.sender === "agmentic" ? "text-foreground" : "text-secondary-foreground"}`}>
                  {msg.text}
                </p>
                {msg.hasTask && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent rounded-lg text-xs text-accent-foreground">
                    <Check className="w-3 h-3" />
                    {msg.taskLabel}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChatDemoSection;
