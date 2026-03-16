import { Link } from "react-router-dom";
import { useDemoAccess } from "@/contexts/DemoAccessContext";
import logoAndName from "@/assets/logo_and_name.png";

const Footer = () => {
  const { openDemoGate } = useDemoAccess();

  return (
    <footer className="border-t border-border/30 bg-card/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img src={logoAndName} alt="Agmentic" className="h-12" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Mindshift from now to the Agmentic world.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Platform</h4>
            <div className="space-y-2.5">
              <Link to="/product" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Product</Link>
              <button
                onClick={openDemoGate}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Demo
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <div className="space-y-2.5">
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Connect</h4>
            <div className="space-y-2.5">
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Twitter</a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Agmentic. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
