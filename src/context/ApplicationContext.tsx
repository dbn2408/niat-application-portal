
import React, { createContext, useState, useContext } from "react";

export type ApplicationStep = "login" | "personalDetails" | "examBooking" | "payment" | "takeExam" | "campusConnect" | "complete";
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
  stream?: string;
  yearOf12thCompletion?: string;
}

interface ExamSlotType {
  date: Date | undefined;
  time: string;
  examType?: "immediate" | "scheduled";
}

interface CampusConnectType {
  campusCenter?: string;
  date?: Date;
  time?: string;
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
  examCompleted: boolean;
  setExamCompleted: (value: boolean) => void;
  campusConnect: CampusConnectType;
  setCampusConnect: (details: CampusConnectType) => void;
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
  stream: "",
  yearOf12thCompletion: "",
};

const defaultExamSlot: ExamSlotType = {
  date: undefined,
  time: "",
  examType: undefined,
};

const defaultCampusConnect: CampusConnectType = {
  campusCenter: "",
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
  const [examCompleted, setExamCompleted] = useState(false);
  const [campusConnect, setCampusConnect] = useState<CampusConnectType>(defaultCampusConnect);

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
        examCompleted,
        setExamCompleted,
        campusConnect,
        setCampusConnect,
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
