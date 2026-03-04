import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-4">About Agmentic</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-8">
              Building the Operating System for AI-Driven Organizations
            </h1>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>
                We believe the most important challenge facing modern organizations isn't data collection — it's decision coordination. Companies have more data than ever, yet decisions remain fragmented, siloed, and misaligned.
              </p>
              <p>
                Agmentic was founded to solve this. We're building a platform that transforms how organizations make decisions — using AI agents that reason across departments, validate against strategy, and deliver aligned, explainable recommendations.
              </p>
              <p>
                Our team brings together expertise in artificial intelligence, enterprise software, and organizational strategy. We're backed by leading investors who share our vision of AI-augmented decision making as the next frontier in enterprise software.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16 grid md:grid-cols-3 gap-6"
          >
            {[
              { value: "20+", label: "AI Agents" },
              { value: "5", label: "Decision Layers" },
              { value: "100%", label: "Explainable AI" },
            ].map((stat) => (
              <div key={stat.label} className="p-6 rounded-2xl bg-card border border-border text-center">
                <p className="text-3xl font-display font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-16 text-center"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:opacity-90 transition-opacity"
            >
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
