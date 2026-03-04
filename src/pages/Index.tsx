import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import AgentsSection from "@/components/AgentsSection";
import AgentWorkflowSection from "@/components/AgentWorkflowSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import DashboardSection from "@/components/DashboardSection";
import DemoPreviewSection from "@/components/DemoPreviewSection";
import TargetCustomersSection from "@/components/TargetCustomersSection";
import VisionSection from "@/components/VisionSection";
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
      <AgentWorkflowSection />
      <ArchitectureSection />
      <DashboardSection />
      <DemoPreviewSection />
      <TargetCustomersSection />
      <VisionSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;