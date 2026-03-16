import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroNarrative from "@/components/HeroNarrative";
import MindshiftSection from "@/components/MindshiftSection";
import SocietySection from "@/components/SocietySection";
import LabSection from "@/components/LabSection";
import ProductsSection from "@/components/ProductsSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="bg-background">
      <Navbar />
      <HeroNarrative />
      <MindshiftSection />
      <SocietySection />
      <LabSection />
      <ProductsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
