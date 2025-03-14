
import React from "react";
import { useApplication } from "@/context/ApplicationContext";
import { Circle, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AppLayoutProps {
  children: React.ReactNode;
  activeStep: number;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, activeStep }) => {
  // Calculate progress percentage based on active step (now out of 5 steps)
  const progressPercentage = (activeStep / 5) * 100;

  const steps = [
    { id: 1, name: "Login" },
    { id: 2, name: "Personal Details" },
    { id: 3, name: "Exam & Payment" },
    { id: 4, name: "Take Exam" },
    { id: 5, name: "Campus Connect" }
  ];

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
        <Progress value={progressPercentage} className="mb-6 h-2" />
        
        <div className="flex justify-center">
          <div className="flex flex-col md:flex-row w-full px-4 justify-between md:gap-4 gap-3">
            {steps.map((step) => (
              <div 
                key={step.id}
                className={`step-rectangle ${activeStep >= step.id ? "active" : ""} ${activeStep > step.id ? "complete" : ""}`}
              >
                <div className="flex items-center gap-2">
                  <div className="step-progress">
                    {activeStep > step.id ? (
                      <CheckCircle className="h-6 w-6 text-primary" />
                    ) : activeStep === step.id ? (
                      <Circle className="h-6 w-6 fill-primary stroke-primary" />
                    ) : (
                      <Circle className="h-6 w-6 stroke-gray-400" />
                    )}
                  </div>
                  <span>{step.name}</span>
                </div>
                {step.id === 2 && (
                  <div className="text-xs text-gray-600 pl-8 mt-1">
                    Lead Type, Name, Email, Personal Info
                  </div>
                )}
                {step.id === 3 && (
                  <div className="text-xs text-gray-600 pl-8 mt-1">
                    Select Exam Type, Schedule, Payment
                  </div>
                )}
                {step.id === 5 && (
                  <div className="text-xs text-gray-600 pl-8 mt-1">
                    Select Campus, Date & Time
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 container mb-8">
        <div className="bg-niat-100 rounded-lg shadow-sm border border-niat-200 p-6 max-w-4xl mx-auto">
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
