
import React from "react";
import { useApplication } from "@/context/ApplicationContext";
import { Check } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
  activeStep: number;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, activeStep }) => {
  return (
    <div className="min-h-screen bg-niat-50 flex flex-col">
      <header className="bg-primary text-white shadow-sm py-4">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/lovable-uploads/ed96fbb9-fc0b-493c-a77f-41a96f947096.png"
                alt="NIAT Logo"
                className="h-12"
              />
              <span className="text-white font-medium hidden md:inline">Application Portal</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mt-8 mb-4">
        <div className="flex justify-center">
          <div className="flex flex-col md:flex-row w-full px-4 justify-center md:gap-0 gap-8">
            <div className={`step-item ${activeStep >= 1 ? "active" : ""} ${activeStep > 1 ? "complete" : ""}`}>
              <div className="step">
                {activeStep > 1 ? <Check size={20} className="step-icon" /> : 1}
              </div>
              <p className="text-center mt-2 text-gray-700">Personal Details</p>
            </div>
            <div className={`step-item ${activeStep >= 2 ? "active" : ""} ${activeStep > 2 ? "complete" : ""}`}>
              <div className="step">
                {activeStep > 2 ? <Check size={20} className="step-icon" /> : 2}
              </div>
              <p className="text-center mt-2 text-gray-700">Exam Booking</p>
            </div>
            <div className={`step-item ${activeStep >= 3 ? "active" : ""} ${activeStep > 3 ? "complete" : ""}`}>
              <div className="step">
                {activeStep > 3 ? <Check size={20} className="step-icon" /> : 3}
              </div>
              <p className="text-center mt-2 text-gray-700">Payment</p>
            </div>
            <div className={`step-item ${activeStep >= 4 ? "active" : ""} ${activeStep > 4 ? "complete" : ""}`}>
              <div className="step">
                {activeStep > 4 ? <Check size={20} className="step-icon" /> : 4}
              </div>
              <p className="text-center mt-2 text-gray-700">Complete</p>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 container mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-niat-100 p-6 max-w-4xl mx-auto">
          {children}
        </div>
      </main>

      <footer className="bg-primary text-white shadow-sm py-4 border-t">
        <div className="container text-center text-white/80 text-sm">
          © {new Date().getFullYear()} NIAT - NxtWave Institute of Advanced Technologies
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
