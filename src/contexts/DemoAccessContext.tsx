import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface DemoAccessContextType {
  isVerified: boolean;
  openDemoGate: () => void;
  isModalOpen: boolean;
  closeModal: () => void;
  markVerified: () => void;
}

const DemoAccessContext = createContext<DemoAccessContextType | null>(null);

export const useDemoAccess = () => {
  const ctx = useContext(DemoAccessContext);
  if (!ctx) throw new Error("useDemoAccess must be used within DemoAccessProvider");
  return ctx;
};

export const DemoAccessProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(() => {
    // Check session storage for existing verification
    const verified = sessionStorage.getItem("demo_verified");
    return verified === "true";
  });

  const openDemoGate = useCallback(() => {
    if (isVerified) {
      // Already verified in this session — navigate directly
      window.location.href = "/demo";
    } else {
      setIsModalOpen(true);
    }
  }, [isVerified]);

  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const markVerified = useCallback(() => {
    setIsVerified(true);
    sessionStorage.setItem("demo_verified", "true");
    setIsModalOpen(false);
  }, []);

  return (
    <DemoAccessContext.Provider value={{ isVerified, openDemoGate, isModalOpen, closeModal, markVerified }}>
      {children}
    </DemoAccessContext.Provider>
  );
};
