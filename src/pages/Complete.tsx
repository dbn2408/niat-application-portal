
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  CalendarDays, 
  User, 
  CreditCard, 
  Printer, 
  Download, 
  Link, 
  Calendar 
} from "lucide-react";
import { format } from "date-fns";
import { useApplication } from "@/context/ApplicationContext";
import AppLayout from "@/components/AppLayout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Complete = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    isAuthenticated, 
    personalDetails, 
    paymentComplete, 
    examSlot 
  } = useApplication();
  
  const [openReschedule, setOpenReschedule] = useState(false);
  const [newSlot, setNewSlot] = useState(examSlot.time);
  
  // Redirect if not authenticated or missing required information
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else if (!personalDetails.studentName || !personalDetails.email) {
      navigate("/personal-details");
    } else if (!examSlot.date || !examSlot.time) {
      navigate("/exam-booking");
    } else if (!paymentComplete) {
      navigate("/payment");
    }
  }, [isAuthenticated, navigate, personalDetails, paymentComplete, examSlot]);

  const applicationId = "NIAT" + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  const handleReschedule = () => {
    toast({
      title: "Exam Rescheduled",
      description: "Your exam has been successfully rescheduled.",
    });
    setOpenReschedule(false);
  };
  
  const handleStartExam = () => {
    toast({
      title: "Redirecting to Exam Portal",
      description: "You will now be redirected to the NIAT Exam Portal.",
    });
    // In a real app, this would redirect to the exam platform
    window.open("https://examportal.niatindia.com", "_blank");
  };

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
                <button 
                  onClick={() => setOpenReschedule(true)} 
                  className="text-niat-500 text-sm hover:underline mt-1 flex items-center"
                >
                  <Calendar className="h-3 w-3 mr-1" /> Reschedule
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-niat-50 p-5 rounded-lg max-w-md mx-auto">
          <h3 className="font-bold text-niat-700 mb-2">Exam Information</h3>
          <p className="text-sm mb-3">
            Your online admission test will be conducted via our secure exam portal. Please be ready 15 minutes before your scheduled time.
          </p>
          <Button 
            onClick={handleStartExam}
            className="w-full bg-niat-500 hover:bg-niat-600 mb-3"
          >
            <Link className="h-4 w-4 mr-2" /> Go to Exam Portal
          </Button>
          <p className="text-xs text-gray-500">
            The exam portal link will be activated 30 minutes before your scheduled time.
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
      
      {/* Reschedule Dialog */}
      <Dialog open={openReschedule} onOpenChange={setOpenReschedule}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reschedule Your Exam</DialogTitle>
            <DialogDescription>
              Select a new time slot for your admission test.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="mb-4">
              <div className="font-medium text-sm mb-2">Current Slot:</div>
              <div className="bg-muted p-3 rounded-md text-sm">
                {examSlot.date && format(examSlot.date, "EEEE, MMMM dd, yyyy")} | {examSlot.time}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="font-medium text-sm">Select New Time:</div>
              <RadioGroup 
                value={newSlot} 
                onValueChange={setNewSlot}
                className="space-y-2"
              >
                {["09:00 AM - 11:00 AM", "11:30 AM - 01:30 PM", "02:00 PM - 04:00 PM", "04:30 PM - 06:30 PM"]
                  .filter(slot => slot !== examSlot.time)
                  .map(slot => (
                    <div 
                      key={slot}
                      className={`border rounded-lg p-3 cursor-pointer ${
                        newSlot === slot ? "border-niat-500 bg-niat-50" : "border-gray-200"
                      }`}
                    >
                      <RadioGroupItem value={slot} id={slot} className="sr-only" />
                      <Label htmlFor={slot} className="flex items-center cursor-pointer">
                        <span>{slot}</span>
                      </Label>
                    </div>
                  ))
                }
              </RadioGroup>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenReschedule(false)}>Cancel</Button>
            <Button onClick={handleReschedule} className="bg-niat-500 hover:bg-niat-600">
              Confirm Reschedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Complete;
