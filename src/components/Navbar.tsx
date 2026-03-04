import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-20 py-5 bg-background/80 backdrop-blur-xl border-b border-border/50"
    >
      <div className="flex items-center gap-2">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-primary">
          <path d="M14 2L2 8L14 14L26 8L14 2Z" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M2 20L14 26L26 20" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M2 14L14 20L26 14" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
        <span className="text-lg font-medium tracking-tight text-foreground">epiminds</span>
      </div>

      <div className="flex items-center gap-6">
        <a href="#" className="hidden md:block text-sm text-muted-foreground hover:text-foreground transition-colors">
          Careers
        </a>
        <a
          href="#request-access"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full border border-border bg-secondary text-foreground hover:bg-muted transition-colors"
        >
          Request Access
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
