
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, CalendarDays, User, CreditCard, Printer, Download } from "lucide-react";
import { format } from "date-fns";
import { useApplication } from "@/context/ApplicationContext";
import AppLayout from "@/components/AppLayout";

const Complete = () => {
  const navigate = useNavigate();
  const { 
    isAuthenticated, 
    personalDetails, 
    paymentComplete, 
    examSlot 
  } = useApplication();
  
  // Redirect if not authenticated or missing required information
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else if (!personalDetails.studentName || !personalDetails.email) {
      navigate("/personal-details");
    } else if (!paymentComplete) {
      navigate("/payment");
    } else if (!examSlot.date || !examSlot.time) {
      navigate("/exam-booking");
    }
  }, [isAuthenticated, navigate, personalDetails, paymentComplete, examSlot]);

  const applicationId = "NIAT" + Math.floor(Math.random() * 10000).toString().padStart(4, '0');

  return (
    <AppLayout activeStep={4}>
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-niat-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-niat-500" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight">Application Complete!</h2>
          <p className="text-gray-500 mt-2">
            Your NIAT admission application has been successfully submitted.
          </p>
        </div>

        <div className="bg-muted/30 p-6 rounded-lg max-w-md mx-auto">
          <div className="text-sm font-medium mb-1">Application ID</div>
          <div className="text-xl font-bold mb-4">{applicationId}</div>
          
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-niat-500 mt-0.5" />
              <div>
                <div className="text-sm font-medium">Applicant</div>
                <div className="font-medium">{personalDetails.studentName}</div>
                <div className="text-sm text-gray-500">{personalDetails.email}</div>
                <div className="text-sm text-gray-500">{personalDetails.studentNumber}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CreditCard className="h-5 w-5 text-niat-500 mt-0.5" />
              <div>
                <div className="text-sm font-medium">Payment</div>
                <div className="font-medium">₹600 Application Fee</div>
                <div className="text-sm text-gray-500">Transaction ID: TXNID{Math.floor(Math.random() * 1000000)}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CalendarDays className="h-5 w-5 text-niat-500 mt-0.5" />
              <div>
                <div className="text-sm font-medium">Exam Slot</div>
                <div className="font-medium">
                  {examSlot.date && format(examSlot.date, "EEEE, MMMM dd, yyyy")}
                </div>
                <div className="text-sm text-gray-500">{examSlot.time}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-niat-50 p-4 rounded-lg max-w-md mx-auto">
          <p className="text-sm">
            An email with your application details and admission test instructions has been sent to {personalDetails.email}. Please check your inbox.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Button className="flex items-center gap-2" variant="outline">
            <Printer className="h-4 w-4" />
            Print Application
          </Button>
          <Button className="flex items-center gap-2 bg-niat-500 hover:bg-niat-600">
            <Download className="h-4 w-4" />
            Download Admit Card
          </Button>
        </div>

        <div className="text-sm text-gray-500 pt-4">
          For any assistance regarding your application or the admission test, please contact <br />
          <a href="mailto:admissions@niat.edu" className="text-niat-500 hover:underline">admissions@niat.edu</a> | +91 1234567890
        </div>
      </div>
    </AppLayout>
  );
};

export default Complete;
