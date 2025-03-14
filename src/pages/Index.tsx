import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
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

const campaignContent = [
  {
    id: "default",
    title: "Begin Your Tech Journey",
    subtitle: "NIAT provides world-class education in cutting-edge technologies.",
    features: [
      { icon: <Smartphone className="h-6 w-6" />, title: "Industry-Ready Skills" },
      { icon: <Lightbulb className="h-6 w-6" />, title: "Innovation-Focused" },
      { icon: <ChevronRight className="h-6 w-6" />, title: "Career Accelerator" }
    ],
    media: null
  },
  {
    id: "social",
    title: "Tech Leaders Start Here",
    subtitle: "Join our exclusive program designed for tomorrow's tech innovators.",
    features: [
      { icon: <Users className="h-6 w-6" />, title: "Networking Opportunities" },
      { icon: <Briefcase className="h-6 w-6" />, title: "Guaranteed Internships" },
      { icon: <ArrowRight className="h-6 w-6" />, title: "Fast-Track Learning" }
    ],
    media: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "email",
    title: "Special Enrollment Program",
    subtitle: "You've been selected for our exclusive fast-track opportunity.",
    features: [
      { icon: <GraduationCap className="h-6 w-6" />, title: "Elite Mentorship" },
      { icon: <BookOpen className="h-6 w-6" />, title: "Advanced Curriculum" },
      { icon: <LampDesk className="h-6 w-6" />, title: "Research Opportunities" }
    ],
    media: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];

const otpFacts = [
  {
    title: "Multi-Factor Authentication",
    description: "OTPs add an additional layer of security beyond passwords."
  },
  {
    title: "Time-Based OTPs",
    description: "Modern OTPs are valid only for a short period, typically 30-60 seconds."
  },
  {
    title: "Biometric Integration",
    description: "Next-gen authentication combines OTPs with biometric verification."
  },
  {
    title: "Passwordless Future",
    description: "OTPs and biometrics will eventually replace traditional passwords."
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

  const handleChangeCampaign = (id) => {
    setActiveCampaign(id);
  };

  React.useEffect(() => {
    if (otpSent) {
      const interval = setInterval(() => {
        setCurrentFactIndex((prev) => (prev + 1) % otpFacts.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [otpSent]);

  return (
    <div className="min-h-screen bg-niat-50 flex flex-col">
      <header className="bg-primary text-white border-b sticky top-0 z-30">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/ed96fbb9-fc0b-493c-a77f-41a96f947096.png" 
              alt="NIAT Logo" 
              className="h-12"
            />
            <span className="text-white font-medium hidden md:inline">NxtWave Institute of Advanced Technologies</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white/90 hover:text-white hover:underline">Home</a>
            <a href="#" className="text-white/90 hover:text-white hover:underline">Programs</a>
            <a href="#" className="text-white/90 hover:text-white hover:underline">About</a>
            <a href="#" className="text-white/90 hover:text-white hover:underline">Contact</a>
          </nav>
          <Button 
            className="bg-secondary hover:bg-secondary/90 text-primary"
            onClick={() => setModalOpen(true)}
          >
            Apply Now
          </Button>
        </div>
      </header>

      <section className="bg-gradient-to-br from-niat-100 to-niat-200 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary font-playfair">
                Become a Tech Leader of Tomorrow
              </h1>
              <p className="text-lg text-gray-700 mb-8 max-w-md">
                NIAT offers cutting-edge education in advanced technologies, preparing you for high-demand careers in the digital economy.
              </p>
              <Button 
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
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

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 font-playfair text-primary">Our Advanced Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-niat-50 p-6 rounded-lg shadow-md border border-niat-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-niat-200 rounded-full flex items-center justify-center mb-4">
                <Code className="h-8 w-8 text-niat-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-playfair text-primary">Advanced Programming</h3>
              <p className="text-gray-700 mb-4">Master modern programming languages and frameworks with our industry-aligned curriculum.</p>
              <a href="#" className="text-niat-500 font-medium flex items-center">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
            
            <div className="bg-niat-50 p-6 rounded-lg shadow-md border border-niat-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-niat-200 rounded-full flex items-center justify-center mb-4">
                <LampDesk className="h-8 w-8 text-niat-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-playfair text-primary">Artificial Intelligence</h3>
              <p className="text-gray-700 mb-4">Develop cutting-edge AI applications with hands-on projects and expert mentorship.</p>
              <a href="#" className="text-niat-500 font-medium flex items-center">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
            
            <div className="bg-niat-50 p-6 rounded-lg shadow-md border border-niat-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-niat-200 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="h-8 w-8 text-niat-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-playfair text-primary">Career Accelerator</h3>
              <p className="text-gray-700 mb-4">Get placed in top tech companies with our comprehensive placement preparation program.</p>
              <a href="#" className="text-niat-500 font-medium flex items-center">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 bg-gradient-to-br from-niat-600 to-niat-500 text-white p-6">
              <div className="flex justify-center mb-4">
                <img 
                  src="/lovable-uploads/ed96fbb9-fc0b-493c-a77f-41a96f947096.png" 
                  alt="NIAT Logo" 
                  className="h-16"
                />
              </div>
              
              {campaign.media && (
                <div className="mb-4">
                  {campaign.media.includes('youtube') ? (
                    <div className="rounded-lg overflow-hidden">
                      <AspectRatio ratio={16/9}>
                        <iframe 
                          src={campaign.media} 
                          className="w-full h-full" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        ></iframe>
                      </AspectRatio>
                    </div>
                  ) : (
                    <AspectRatio ratio={16/9}>
                      <img 
                        src={campaign.media} 
                        alt="Campaign visual" 
                        className="rounded-lg object-cover w-full h-full"
                      />
                    </AspectRatio>
                  )}
                </div>
              )}
              
              <h2 className="text-2xl font-bold mb-2 font-playfair">{campaign.title}</h2>
              <p className="text-white/90 mb-4">{campaign.subtitle}</p>
              
              <div className="grid grid-cols-1 gap-2">
                {campaign.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="bg-white/10 p-2 rounded-full">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{feature.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-sm text-white/60 mb-2">Demo: Select campaign type</p>
                <div className="flex space-x-2">
                  {campaignContent.map(c => (
                    <button 
                      key={c.id}
                      onClick={() => handleChangeCampaign(c.id)}
                      className={`px-3 py-1 rounded text-sm ${
                        activeCampaign === c.id 
                          ? 'bg-white text-niat-500' 
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                    >
                      {c.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 p-6 bg-niat-50">
              <DialogHeader className="mb-4 text-left">
                <DialogTitle className="text-2xl flex items-center gap-2 font-playfair text-primary">
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
                      className="border-niat-200 focus:border-primary"
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
                      className="border-niat-200 focus:border-primary"
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
                  
                  <div className="mt-6 bg-niat-100 p-4 rounded-lg border border-niat-200">
                    <div className="flex items-start gap-3">
                      <div className="bg-secondary p-2 rounded-full">
                        <Lightbulb className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-primary">
                          {otpFacts[currentFactIndex].title}
                        </h3>
                        <p className="text-sm text-gray-700 mt-1">
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
