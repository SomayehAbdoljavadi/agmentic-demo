import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface DemoAccessContextType {
  isVerified: boolean;
  openDemoGate: () => void;
  isModalOpen: boolean;
  closeModal: () => void;
  markVerified: () => void;
  revokeAccess: () => void;
}

const DemoAccessContext = createContext<DemoAccessContextType | null>(null);

export const useDemoAccess = () => {
  const ctx = useContext(DemoAccessContext);
  if (!ctx) throw new Error("useDemoAccess must be used within DemoAccessProvider");
  return ctx;
};

export const DemoAccessProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const openDemoGate = useCallback(() => {
    if (isVerified) {
      window.location.href = "/demo";
    } else {
      setIsModalOpen(true);
    }
  }, [isVerified]);

  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const markVerified = useCallback(() => {
    setIsVerified(true);
    setIsModalOpen(false);
  }, []);

  const revokeAccess = useCallback(() => {
    setIsVerified(false);
  }, []);

  return (
    <DemoAccessContext.Provider value={{ isVerified, openDemoGate, isModalOpen, closeModal, markVerified, revokeAccess }}>
      {children}
    </DemoAccessContext.Provider>
  );
};
