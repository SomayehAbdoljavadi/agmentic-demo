import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroNarrative from "@/components/HeroNarrative";
import MindshiftSection from "@/components/MindshiftSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="bg-background">
      <Navbar />
      <HeroNarrative />
      <MindshiftSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
