
import React, { createContext, useState, useContext } from "react";

export type ApplicationStep = "login" | "personalDetails" | "payment" | "examBooking" | "complete";
export type LeadType = "parent" | "student";

interface PersonalDetailsType {
  leadType: LeadType;
  parentName: string;
  parentNumber: string;
  studentName: string;
  studentNumber: string;
  email: string;
  state: string;
  district: string;
  language: string;
  education: string;
  dob?: Date;
  gender?: string;
  address?: string;
  city?: string;
  pincode?: string;
  qualification?: string;
}

interface ExamSlotType {
  date: Date | undefined;
  time: string;
}

interface ApplicationContextType {
  currentStep: ApplicationStep;
  setCurrentStep: (step: ApplicationStep) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  personalDetails: PersonalDetailsType;
  setPersonalDetails: (details: PersonalDetailsType) => void;
  paymentComplete: boolean;
  setPaymentComplete: (value: boolean) => void;
  examSlot: ExamSlotType;
  setExamSlot: (slot: ExamSlotType) => void;
}

const defaultPersonalDetails: PersonalDetailsType = {
  leadType: "student",
  parentName: "",
  parentNumber: "",
  studentName: "",
  studentNumber: "",
  email: "",
  state: "",
  district: "",
  language: "",
  education: "",
  dob: undefined,
  gender: "",
  address: "",
  city: "",
  pincode: "",
  qualification: "",
};

const defaultExamSlot: ExamSlotType = {
  date: undefined,
  time: "",
};

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<ApplicationStep>("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [personalDetails, setPersonalDetails] = useState<PersonalDetailsType>(defaultPersonalDetails);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [examSlot, setExamSlot] = useState<ExamSlotType>(defaultExamSlot);

  return (
    <ApplicationContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        isAuthenticated,
        setIsAuthenticated,
        personalDetails,
        setPersonalDetails,
        paymentComplete,
        setPaymentComplete,
        examSlot,
        setExamSlot,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = (): ApplicationContextType => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error("useApplication must be used within an ApplicationProvider");
  }
  return context;
};
