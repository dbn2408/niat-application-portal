
import React from "react";
import { useApplication } from "@/context/ApplicationContext";
import { Check } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
  activeStep: number;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, activeStep }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white shadow-sm py-4">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-niat-500 text-white p-1 rounded text-xl font-bold">NIAT</span>
              <span className="text-gray-800 font-medium">Application Portal</span>
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
              <p className="text-center mt-2">Personal Details</p>
            </div>
            <div className={`step-item ${activeStep >= 2 ? "active" : ""} ${activeStep > 2 ? "complete" : ""}`}>
              <div className="step">
                {activeStep > 2 ? <Check size={20} className="step-icon" /> : 2}
              </div>
              <p className="text-center mt-2">Pay Application Fee</p>
            </div>
            <div className={`step-item ${activeStep >= 3 ? "active" : ""} ${activeStep > 3 ? "complete" : ""}`}>
              <div className="step">
                {activeStep > 3 ? <Check size={20} className="step-icon" /> : 3}
              </div>
              <p className="text-center mt-2">Book Exam Slot</p>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 container mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-6 max-w-4xl mx-auto">
          {children}
        </div>
      </main>

      <footer className="bg-white shadow-sm py-4 border-t">
        <div className="container text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} NIAT - NxtWave Institute of Advanced Technologies
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
