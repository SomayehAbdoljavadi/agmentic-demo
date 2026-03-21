import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useDemoAccess } from "@/contexts/DemoAccessContext";
import logoAndName from "@/assets/logo_and_name.png";

const navLinks = [
  { label: "Product", to: "/product" },
  { label: "Demo", to: "/demo", gated: true },
  { label: "About", to: "/about" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openDemoGate } = useDemoAccess();

  const handleNavClick = (link: typeof navLinks[0], e: React.MouseEvent) => {
    if (link.gated) {
      e.preventDefault();
      openDemoGate();
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-2xl border-b border-border/30"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center">
          <img src={logoAndName} alt="Agmentic" className="h-[34px]" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={(e) => handleNavClick(link, e)}
              className={`text-sm transition-colors ${
                location.pathname === link.to
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => openDemoGate()}
            className="hidden md:inline-flex items-center px-5 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity glow-sm"
          >
            Request Demo
          </button>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-border/30 bg-background/95 backdrop-blur-2xl px-6 py-4 space-y-3"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={(e) => {
                handleNavClick(link, e);
                setMobileOpen(false);
              }}
              className="block text-sm text-muted-foreground hover:text-foreground py-2"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => { openDemoGate(); setMobileOpen(false); }}
            className="block text-sm font-medium text-primary py-2"
          >
            Request Demo
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
