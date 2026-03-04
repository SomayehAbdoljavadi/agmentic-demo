import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import AgentsSection from "@/components/AgentsSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import DemoPreviewSection from "@/components/DemoPreviewSection";
import TargetCustomersSection from "@/components/TargetCustomersSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <AgentsSection />
      <ArchitectureSection />
      <DemoPreviewSection />
      <TargetCustomersSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
