import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VisionSection from "@/components/VisionSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FullPageScroll from "@/components/FullPageScroll";

const sectionLabels = [
  "Hero",
  "Vision",
  "Contact",
];

const SectionWrapper = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`min-h-screen flex flex-col justify-center bg-background ${className}`}>
    {children}
  </div>
);

const Index = () => {
  return (
    <div className="bg-background">
      <Navbar />
      <FullPageScroll sectionLabels={sectionLabels}>
        <HeroSection />
        <VisionSection />
        <SectionWrapper>
          <CTASection />
          <Footer />
        </SectionWrapper>
      </FullPageScroll>
    </div>
  );
};

export default Index;
