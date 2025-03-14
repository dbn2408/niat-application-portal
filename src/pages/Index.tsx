
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Lightbulb, Smartphone, ChevronRight, GraduationCap, BookOpen, LampDesk, Code, Users, ArrowRight, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useApplication } from "@/context/ApplicationContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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

// Campaign content variations
const campaignContent = [
  {
    id: "default",
    title: "Begin Your Journey in Tech Excellence",
    description: "NIAT provides world-class education in cutting-edge technologies, preparing students for the careers of tomorrow.",
    features: [
      {
        icon: <Smartphone className="h-6 w-6" />,
        title: "Industry-Ready Skills",
        description: "Curriculum designed with industry partners to ensure relevant skill development"
      },
      {
        icon: <Lightbulb className="h-6 w-6" />,
        title: "Innovation-Focused",
        description: "Learn to build innovative solutions to real-world problems"
      },
      {
        icon: <ChevronRight className="h-6 w-6" />,
        title: "Career Accelerator",
        description: "Get placed in top tech companies with our placement assistance"
      }
    ],
    media: null // No media for default
  },
  {
    id: "social",
    title: "Tech Leaders Start at NIAT",
    description: "Join our exclusive program designed for the leaders of tomorrow's tech revolution.",
    features: [
      {
        icon: <Users className="h-6 w-6" />,
        title: "Networking Opportunities",
        description: "Connect with industry professionals and build your career network"
      },
      {
        icon: <Briefcase className="h-6 w-6" />,
        title: "Internship Guaranteed",
        description: "All students receive internship placements with top companies"
      },
      {
        icon: <ArrowRight className="h-6 w-6" />,
        title: "Fast-Track Learning",
        description: "Accelerated curriculum to get you job-ready in record time"
      }
    ],
    media: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "email",
    title: "Special Enrollment Program",
    description: "You've been selected for our exclusive fast-track program with special pricing.",
    features: [
      {
        icon: <GraduationCap className="h-6 w-6" />,
        title: "Elite Mentorship",
        description: "One-on-one guidance from industry veterans"
      },
      {
        icon: <BookOpen className="h-6 w-6" />,
        title: "Advanced Curriculum",
        description: "Access to specialized courses not available to regular students"
      },
      {
        icon: <LampDesk className="h-6 w-6" />,
        title: "Research Opportunities",
        description: "Work on real-world research projects with our faculty"
      }
    ],
    media: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];

// OTP Facts
const otpFacts = [
  {
    title: "Multi-Factor Authentication",
    description: "OTPs are a crucial part of MFA systems, adding an additional layer of security beyond passwords."
  },
  {
    title: "Time-Based OTPs",
    description: "Modern OTPs use time-based algorithms that make them valid only for a short period, typically 30-60 seconds."
  },
  {
    title: "Biometric Integration",
    description: "Next-gen authentication combines OTPs with biometric verification for enhanced security."
  },
  {
    title: "Passwordless Future",
    description: "Many security experts predict OTPs and biometrics will eventually replace traditional passwords completely."
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
  const [modalOpen, setModalOpen] = useState(false);
  
  // Determine which campaign content to show (could be based on URL param in real implementation)
  const [activeCampaign, setActiveCampaign] = useState("default");
  const campaign = campaignContent.find(c => c.id === activeCampaign) || campaignContent[0];

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

  // For campaign selection (in a real app would be coming from URL params)
  const handleChangeCampaign = (id) => {
    setActiveCampaign(id);
  };

  React.useEffect(() => {
    if (otpSent) {
      // Change tech fact every 5 seconds
      const interval = setInterval(() => {
        setCurrentFactIndex((prev) => (prev + 1) % otpFacts.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [otpSent]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header - NIAT Clone */}
      <header className="bg-white border-b sticky top-0 z-30">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/ed96fbb9-fc0b-493c-a77f-41a96f947096.png" 
              alt="NIAT Logo" 
              className="h-12"
            />
            <span className="text-gray-800 font-medium hidden md:inline">NxtWave Institute of Advanced Technologies</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-niat-500">Home</a>
            <a href="#" className="text-gray-700 hover:text-niat-500">Programs</a>
            <a href="#" className="text-gray-700 hover:text-niat-500">About</a>
            <a href="#" className="text-gray-700 hover:text-niat-500">Contact</a>
          </nav>
          <Button 
            className="bg-niat-500 hover:bg-niat-600"
            onClick={() => setModalOpen(true)}
          >
            Apply Now
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-playfair">
                Become a Tech Leader of Tomorrow
              </h1>
              <p className="text-lg text-gray-700 mb-8 max-w-md">
                NIAT offers cutting-edge education in advanced technologies, preparing you for high-demand careers in the digital economy.
              </p>
              <Button 
                className="bg-niat-500 hover:bg-niat-600 text-lg px-8 py-6"
                onClick={() => setModalOpen(true)}
              >
                Apply Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="w-full md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop" 
                alt="Students learning technology" 
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 font-playfair">Our Advanced Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-niat-50 rounded-full flex items-center justify-center mb-4">
                <Code className="h-8 w-8 text-niat-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-playfair">Advanced Programming</h3>
              <p className="text-gray-600 mb-4">Master modern programming languages and frameworks with our industry-aligned curriculum.</p>
              <a href="#" className="text-niat-500 font-medium flex items-center">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-niat-50 rounded-full flex items-center justify-center mb-4">
                <LampDesk className="h-8 w-8 text-niat-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-playfair">Artificial Intelligence</h3>
              <p className="text-gray-600 mb-4">Develop cutting-edge AI applications with hands-on projects and expert mentorship.</p>
              <a href="#" className="text-niat-500 font-medium flex items-center">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-niat-50 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="h-8 w-8 text-niat-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-playfair">Career Accelerator</h3>
              <p className="text-gray-600 mb-4">Get placed in top tech companies with our comprehensive placement preparation program.</p>
              <a href="#" className="text-niat-500 font-medium flex items-center">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Now Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Panel - Campaign Content */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-primary to-primary/80 text-white p-8">
              <div className="flex justify-center mb-6">
                <img 
                  src="/lovable-uploads/ed96fbb9-fc0b-493c-a77f-41a96f947096.png" 
                  alt="NIAT Logo" 
                  className="h-20"
                />
              </div>
              
              {campaign.media && campaign.media.includes('youtube') ? (
                <div className="aspect-video mb-6">
                  <iframe 
                    src={campaign.media} 
                    className="w-full h-full rounded" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              ) : campaign.media ? (
                <img src={campaign.media} alt="Campaign visual" className="rounded-lg mb-6 w-full" />
              ) : null}
              
              <h2 className="text-2xl md:text-3xl font-bold mb-4 font-playfair">{campaign.title}</h2>
              <p className="text-lg mb-6">{campaign.description}</p>
              
              <div className="space-y-4">
                {campaign.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-white/10 p-2 rounded-full">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{feature.title}</h3>
                      <p className="text-white/80">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Campaign switcher - for demo purposes only */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm text-white/60 mb-2">Demo: Select campaign type</p>
                <div className="flex space-x-2">
                  {campaignContent.map(c => (
                    <button 
                      key={c.id}
                      onClick={() => handleChangeCampaign(c.id)}
                      className={`px-3 py-1 rounded text-sm ${
                        activeCampaign === c.id 
                          ? 'bg-white text-primary' 
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                    >
                      {c.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Panel - Login Form */}
            <div className="w-full md:w-1/2 p-6">
              <DialogHeader className="mb-4 text-left">
                <DialogTitle className="text-2xl flex items-center gap-2 font-playfair">
                  <LogIn className="h-5 w-5 text-primary" />
                  Login to Application Portal
                </DialogTitle>
                <DialogDescription>
                  {!otpSent 
                    ? "Enter your phone number to receive an OTP for login" 
                    : "Enter the OTP sent to your phone"}
                </DialogDescription>
              </DialogHeader>
              
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
                  
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 mt-2" 
                    onClick={handleSendOtp}
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send OTP"}
                  </Button>
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
                  
                  {/* OTP Tech Fact Card */}
                  <div className="mt-6 bg-secondary/10 p-4 rounded-lg border border-secondary/20">
                    <div className="flex items-start gap-3">
                      <div className="bg-secondary/20 p-2 rounded-full">
                        <Lightbulb className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-primary">
                          {otpFacts[currentFactIndex].title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {otpFacts[currentFactIndex].description}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-3 italic">
                      Modern authentication methods keep your account secure.
                    </p>
                  </div>
                  
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90" 
                    onClick={handleVerifyOtp}
                    disabled={isLoading}
                  >
                    {isLoading ? "Verifying..." : "Verify & Continue"}
                  </Button>
                </div>
              )}
              
              <div className="mt-6 text-center text-sm text-gray-500">
                For assistance, contact admissions@niat.edu | +91 1234567890
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
