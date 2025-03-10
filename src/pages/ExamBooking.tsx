
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Clock } from "lucide-react";
import { format, addDays, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useApplication } from "@/context/ApplicationContext";
import AppLayout from "@/components/AppLayout";

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
    paymentComplete 
  } = useApplication();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(examSlot.date);
  const [selectedTime, setSelectedTime] = useState(examSlot.time || "");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if not authenticated, missing personal details, or payment incomplete
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else if (!personalDetails.studentName || !personalDetails.email) {
      navigate("/personal-details");
    } else if (!paymentComplete) {
      navigate("/payment");
    }
  }, [isAuthenticated, navigate, personalDetails, paymentComplete]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate selections
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Selection Required",
        description: "Please select both a date and time slot for your exam.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Save exam slot details and navigate to complete
    setTimeout(() => {
      setExamSlot({
        date: selectedDate,
        time: selectedTime,
      });
      setIsLoading(false);
      toast({
        title: "Exam Slot Booked",
        description: "Your NIAT admission test slot has been successfully booked.",
      });
      navigate("/complete");
    }, 1000);
  };

  return (
    <AppLayout activeStep={3}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Book Exam Slot</h2>
          <p className="text-gray-500">
            Select a convenient date and time for your NIAT admission test.
          </p>
        </div>

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
              Note: Weekends are not available for the admission test.
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

        <div className="pt-4 border-t">
          <div className="bg-muted/50 p-4 rounded-lg mb-4">
            <h3 className="font-medium mb-2">Exam Details:</h3>
            <ul className="space-y-1 text-sm">
              <li>• Duration: 2 hours</li>
              <li>• Format: Computer-based multiple-choice</li>
              <li>• Sections: Aptitude, Reasoning, Domain Knowledge</li>
              <li>• Required: Valid ID proof, Admit Card (will be emailed)</li>
            </ul>
          </div>

          <div className="flex justify-between items-center">
            <div>
              {selectedDate && selectedTime && (
                <div className="text-sm">
                  <p className="font-medium">Your selection:</p>
                  <p className="font-bold text-niat-700">
                    {format(selectedDate, "EEEE, MMM dd, yyyy")} | {selectedTime}
                  </p>
                </div>
              )}
            </div>
            <Button 
              onClick={handleSubmit} 
              className="bg-niat-500 hover:bg-niat-600"
              disabled={isLoading || !selectedDate || !selectedTime}
            >
              {isLoading ? "Booking..." : "Confirm Booking"}
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ExamBooking;
