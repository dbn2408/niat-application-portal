
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Clock, Zap } from "lucide-react";
import { format, addDays, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useApplication } from "@/context/ApplicationContext";
import AppLayout from "@/components/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Generate available dates (next 30 days)
const today = new Date();
const availableDates: Date[] = Array.from({ length: 30 }, (_, i) => 
  addDays(today, i + 7) // Start from next week
);

// Filter out weekends
const filteredDates = availableDates.filter(
  (date) => date.getDay() !== 0 && date.getDay() !== 6
);

// Available time slots
const timeSlots = [
  "09:00 AM - 11:00 AM",
  "11:30 AM - 01:30 PM",
  "02:00 PM - 04:00 PM",
  "04:30 PM - 06:30 PM",
];

const ExamBooking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    examSlot, 
    setExamSlot, 
    isAuthenticated, 
    personalDetails,
    setPaymentComplete 
  } = useApplication();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(examSlot.date);
  const [selectedTime, setSelectedTime] = useState(examSlot.time || "");
  const [isLoading, setIsLoading] = useState(false);
  const [examMode, setExamMode] = useState("scheduled");
  const [onDemandDate, setOnDemandDate] = useState<Date | undefined>(addDays(new Date(), 1));

  // Redirect if not authenticated or missing personal details
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else if (!personalDetails.studentName || !personalDetails.email) {
      navigate("/personal-details");
    }
  }, [isAuthenticated, navigate, personalDetails]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate selections
    if (examMode === "scheduled" && (!selectedDate || !selectedTime)) {
      toast({
        title: "Selection Required",
        description: "Please select both a date and time slot for your exam.",
        variant: "destructive",
      });
      return;
    }

    if (examMode === "onDemand" && !onDemandDate) {
      toast({
        title: "Selection Required",
        description: "Please select a date for your on-demand exam.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Save exam slot details and redirect to payment
    setTimeout(() => {
      setExamSlot({
        date: examMode === "scheduled" ? selectedDate : onDemandDate,
        time: examMode === "scheduled" ? selectedTime : "Any time (On-Demand)",
      });
      setIsLoading(false);
      toast({
        title: "Exam Slot Selected",
        description: "Please complete the payment to confirm your slot.",
      });
      navigate("/payment");
    }, 1000);
  };

  return (
    <AppLayout activeStep={2}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Book Exam Slot</h2>
          <p className="text-gray-500">
            Select a convenient date and time for your NIAT admission test.
          </p>
        </div>

        <Tabs defaultValue="scheduled" value={examMode} onValueChange={setExamMode}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="scheduled" className="text-sm">Scheduled Exam</TabsTrigger>
            <TabsTrigger value="onDemand" className="text-sm">On-Demand Exam</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scheduled">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="md:col-span-3 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarIcon className="h-5 w-5 text-niat-500" />
                  <h3 className="font-medium">Select Date</h3>
                </div>
                <Card>
                  <CardContent className="p-3">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      disabled={(date) => {
                        // Disable dates that are not in the filteredDates array
                        return !filteredDates.some(d => isSameDay(d, date));
                      }}
                      className={cn("rounded-md border pointer-events-auto")}
                    />
                  </CardContent>
                </Card>
                <div className="text-sm text-gray-500">
                  Note: Weekends are not available for the scheduled admission test.
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-niat-500" />
                  <h3 className="font-medium">Select Time Slot</h3>
                </div>
                <Card>
                  <CardContent className="p-4">
                    <RadioGroup value={selectedTime} onValueChange={handleTimeSelect} className="space-y-3">
                      {timeSlots.map((slot) => (
                        <div 
                          key={slot}
                          className={`border rounded-lg p-3 cursor-pointer ${
                            selectedTime === slot ? "border-niat-500 bg-niat-50" : "border-gray-200"
                          }`}
                        >
                          <RadioGroupItem value={slot} id={slot} className="sr-only" />
                          <Label htmlFor={slot} className="flex items-center cursor-pointer">
                            <span>{slot}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="onDemand">
            <div className="space-y-6">
              <div className="bg-niat-50 p-5 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="bg-niat-500/20 p-2 rounded-full">
                    <Zap className="h-5 w-5 text-niat-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-niat-700 mb-1">On-Demand Exam Benefits</h3>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Take the exam at any time within 24 hours of your chosen date</li>
                      <li>• No need to schedule a specific time slot</li>
                      <li>• Same exam pattern and duration as scheduled tests</li>
                      <li>• Results delivered within 48 hours</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarIcon className="h-5 w-5 text-niat-500" />
                    <h3 className="font-medium">Select Date</h3>
                  </div>
                  <Card>
                    <CardContent className="p-3">
                      <Calendar
                        mode="single"
                        selected={onDemandDate}
                        onSelect={setOnDemandDate}
                        disabled={(date) => {
                          // Disable dates before tomorrow
                          return date < today;
                        }}
                        className={cn("rounded-md border pointer-events-auto")}
                      />
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-niat-500" />
                    <h3 className="font-medium">Exam Details</h3>
                  </div>
                  <Card>
                    <CardContent className="p-4 space-y-4">
                      <div>
                        <div className="font-medium mb-1">Duration</div>
                        <div className="text-sm text-gray-600">2 hours</div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Format</div>
                        <div className="text-sm text-gray-600">Computer-based multiple-choice</div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Sections</div>
                        <div className="text-sm text-gray-600">Aptitude, Reasoning, Domain Knowledge</div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Requirements</div>
                        <div className="text-sm text-gray-600">Laptop/desktop with webcam, stable internet</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="pt-4 border-t">
          <div className="bg-muted/50 p-4 rounded-lg mb-4">
            <h3 className="font-medium mb-2">Important Information:</h3>
            <ul className="space-y-1 text-sm">
              <li>• A payment of ₹600 will be required to confirm your exam slot</li>
              <li>• You must complete the exam in a single sitting</li>
              <li>• Be ready 15 minutes before your exam time</li>
              <li>• Make sure you have a stable internet connection</li>
              <li>• Valid ID proof and webcam access required for verification</li>
            </ul>
          </div>

          <div className="flex justify-between items-center">
            <div>
              {examMode === "scheduled" && selectedDate && selectedTime && (
                <div className="text-sm">
                  <p className="font-medium">Your selection:</p>
                  <p className="font-bold text-niat-700">
                    {format(selectedDate, "EEEE, MMM dd, yyyy")} | {selectedTime}
                  </p>
                </div>
              )}
              {examMode === "onDemand" && onDemandDate && (
                <div className="text-sm">
                  <p className="font-medium">Your selection:</p>
                  <p className="font-bold text-niat-700">
                    {format(onDemandDate, "EEEE, MMM dd, yyyy")} | Any time (On-Demand)
                  </p>
                </div>
              )}
            </div>
            <Button 
              onClick={handleSubmit} 
              className="bg-niat-500 hover:bg-niat-600"
              disabled={isLoading || 
                (examMode === "scheduled" && (!selectedDate || !selectedTime)) ||
                (examMode === "onDemand" && !onDemandDate)
              }
            >
              {isLoading ? "Processing..." : "Proceed to Payment"}
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ExamBooking;
