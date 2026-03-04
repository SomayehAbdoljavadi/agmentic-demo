import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import darkBg from "@/assets/dark-bg.png";

const CTASection = () => {
  return (
    <section id="request-access" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <img src={darkBg} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6"
        >
          Join the Next Generation of Marketing
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl lg:text-7xl font-display mb-10"
        >
          Request<br />Early Access.
        </motion.h2>

        <motion.a
          href="#"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background font-medium rounded-full hover:opacity-90 transition-opacity text-base"
        >
          Request Access
          <ArrowUpRight className="w-5 h-5" />
        </motion.a>
      </div>
    </section>
  );
};

export default CTASection;
