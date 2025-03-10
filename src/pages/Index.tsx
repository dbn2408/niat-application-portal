
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useApplication } from "@/context/ApplicationContext";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setIsAuthenticated } = useApplication();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = () => {
    if (!phone || phone.length !== 10 || !/^\d+$/.test(phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
      toast({
        title: "OTP Sent",
        description: "OTP has been sent to your phone number.",
      });
    }, 1000);
  };

  const handleVerifyOtp = () => {
    if (!otp || otp.length !== 6 || !/^\d+$/.test(otp)) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsAuthenticated(true);
      toast({
        title: "Login Successful",
        description: "You have successfully logged in!",
      });
      navigate("/personal-details");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="bg-niat-500 text-white p-2 rounded-md text-2xl font-bold">NIAT</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">NxtWave Institute of Advanced Technologies</h1>
          <p className="text-gray-600 mt-2">Admission Application Portal</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LogIn className="h-5 w-5 text-niat-500" />
              Login to Application Portal
            </CardTitle>
            <CardDescription>
              Enter your phone number to receive an OTP for login
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!otpSent ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter 10-digit phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={10}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">OTP</Label>
                  <Input
                    id="otp"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    OTP sent to {phone}. 
                    <button 
                      className="text-niat-500 hover:underline ml-1"
                      onClick={() => setOtpSent(false)}
                    >
                      Change
                    </button>
                  </p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            {!otpSent ? (
              <Button 
                className="w-full bg-niat-500 hover:bg-niat-600" 
                onClick={handleSendOtp}
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </Button>
            ) : (
              <Button 
                className="w-full bg-niat-500 hover:bg-niat-600" 
                onClick={handleVerifyOtp}
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify & Continue"}
              </Button>
            )}
          </CardFooter>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-500">
          For assistance, contact admissions@niat.edu | +91 1234567890
        </div>
      </div>
    </div>
  );
};

export default Index;
