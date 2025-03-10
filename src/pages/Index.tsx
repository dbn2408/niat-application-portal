
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Lightbulb, Smartphone, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useApplication } from "@/context/ApplicationContext";

const techFacts = [
  {
    id: 1,
    title: "AI Revolution",
    description: "Learn how to leverage AI to build intelligent applications that transform industries."
  },
  {
    id: 2,
    title: "Blockchain Development",
    description: "Discover the power of decentralized applications and smart contracts."
  },
  {
    id: 3,
    title: "Cloud Computing",
    description: "Master cloud-native architectures to build scalable and resilient systems."
  },
  {
    id: 4,
    title: "Quantum Computing",
    description: "Prepare for the future with quantum algorithms and quantum-resistant cryptography."
  }
];

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setIsAuthenticated } = useApplication();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

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
    if (!otp || otp.length !== 4 || !/^\d+$/.test(otp)) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 4-digit OTP.",
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

  React.useEffect(() => {
    if (otpSent) {
      // Change tech fact every 5 seconds
      const interval = setInterval(() => {
        setCurrentFactIndex((prev) => (prev + 1) % techFacts.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [otpSent]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Left Panel - Trust Building Content */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-primary to-primary/80 text-white p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Begin Your Journey in Tech Excellence
          </h1>
          <p className="text-lg mb-8">
            NIAT provides world-class education in cutting-edge technologies, preparing students for the careers of tomorrow.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-white/10 p-2 rounded-full">
                <Smartphone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-xl">Industry-Ready Skills</h3>
                <p className="text-white/80">Curriculum designed with industry partners to ensure relevant skill development</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-white/10 p-2 rounded-full">
                <Lightbulb className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-xl">Innovation-Focused</h3>
                <p className="text-white/80">Learn to build innovative solutions to real-world problems</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-white/10 p-2 rounded-full">
                <ChevronRight className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-xl">Career Accelerator</h3>
                <p className="text-white/80">Get placed in top tech companies with our placement assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Panel - Login Form */}
      <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="bg-primary text-white p-2 rounded-md text-2xl font-bold">NIAT</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">NxtWave Institute of Advanced Technologies</h1>
            <p className="text-gray-600 mt-2">Admission Application Portal</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LogIn className="h-5 w-5 text-primary" />
                Login to Application Portal
              </CardTitle>
              <CardDescription>
                {!otpSent 
                  ? "Enter your phone number to receive an OTP for login" 
                  : "Enter the OTP sent to your phone"}
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
                      placeholder="Enter 4-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={4}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      OTP sent to {phone}. 
                      <button 
                        className="text-primary hover:underline ml-1"
                        onClick={() => setOtpSent(false)}
                      >
                        Change
                      </button>
                    </p>
                  </div>
                  
                  {/* Tech Fact Card */}
                  <div className="mt-6 bg-secondary/10 p-4 rounded-lg border border-secondary/20">
                    <div className="flex items-start gap-3">
                      <div className="bg-secondary/20 p-2 rounded-full">
                        <Lightbulb className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-primary">
                          {techFacts[currentFactIndex].title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {techFacts[currentFactIndex].description}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-3 italic">
                      At NIAT, we teach you how to build and use cutting-edge technologies.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {!otpSent ? (
                <Button 
                  className="w-full bg-primary hover:bg-primary/90" 
                  onClick={handleSendOtp}
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send OTP"}
                </Button>
              ) : (
                <Button 
                  className="w-full bg-primary hover:bg-primary/90" 
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
    </div>
  );
};

export default Index;
