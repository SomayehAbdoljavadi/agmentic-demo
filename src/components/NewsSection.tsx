import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const NewsSection = () => {
  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4"
        >
          News
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-display mb-12"
        >
          Keep up with Lucy.<br />Read our News.
        </motion.h2>

        <motion.a
          href="#"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="group block p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-colors"
        >
          <h3 className="text-xl md:text-2xl font-display mb-3 group-hover:text-accent-foreground transition-colors">
            Epiminds Raises $6.6 Million For AI Marketing Agents
          </h3>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            Epiminds, founded by ex-Google and Spotify execs, raises $6.6 million from Lightspeed 
            to build agent-based AI that automates workflows for advertising and marketing agencies.
          </p>
          <div className="mt-4 inline-flex items-center gap-1 text-sm text-accent-foreground">
            Read Article <ArrowUpRight className="w-4 h-4" />
          </div>
        </motion.a>
      </div>
    </section>
  );
};

export default NewsSection;
