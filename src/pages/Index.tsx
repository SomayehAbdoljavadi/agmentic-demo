import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AgentsSection from "@/components/AgentsSection";
import FeaturesSection from "@/components/FeaturesSection";
import ChatDemoSection from "@/components/ChatDemoSection";
import AdaptsSection from "@/components/AdaptsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TrustSection from "@/components/TrustSection";
import NewsSection from "@/components/NewsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AgentsSection />
      <FeaturesSection />
      <ChatDemoSection />
      <AdaptsSection />
      <TestimonialsSection />
      <TrustSection />
      <NewsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
