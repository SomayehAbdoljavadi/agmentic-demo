import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import heroImage from "@/assets/hero-ai-face.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-end pb-20 md:pb-28 overflow-hidden">
      {/* Hero image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.img
          src={heroImage}
          alt="Agmentic AI - Particle face visualization"
          className="w-full h-full object-cover object-center opacity-80"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-transparent h-32" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4"
        >
          Multi Agentic Teams for Marketing.
        </motion.p>

        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-normal leading-[0.95]"
          >
            Introducing{" "}
            <em className="text-gradient-primary">Agmentic.</em>
          </motion.h1>

          <motion.a
            href="#request-access"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-foreground text-background font-medium text-sm rounded-full hover:opacity-90 transition-opacity w-fit"
          >
            Request Access
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
