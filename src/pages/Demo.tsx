import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useDemoAccess } from "@/contexts/DemoAccessContext";
import DemoChat from "@/components/DemoChat";

const Demo = () => {
  const navigate = useNavigate();
  const { isVerified, revokeAccess } = useDemoAccess();

  useEffect(() => {
    if (!isVerified) {
      navigate("/", { replace: true });
    }
  }, [isVerified, navigate]);

  useEffect(() => {
    return () => {
      revokeAccess();
    };
  }, [revokeAccess]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20">
        <DemoChat />
      </div>
    </div>
  );
};

export default Demo;
