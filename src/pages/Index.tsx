import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VisionSection from "@/components/VisionSection";
import CTASection from "@/components/CTASection";
import FullPageScroll from "@/components/FullPageScroll";

const sectionLabels = [
  "Hero",
  "Vision",
  "Contact",
];

const Index = () => {
  return (
    <div className="bg-background">
      <Navbar />
      <FullPageScroll sectionLabels={sectionLabels}>
        <HeroSection />
        <VisionSection />
        <CTASection />
      </FullPageScroll>
    </div>
  );
};

export default Index;
