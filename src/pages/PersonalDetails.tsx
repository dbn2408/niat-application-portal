
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useApplication, LeadType } from "@/context/ApplicationContext";
import AppLayout from "@/components/AppLayout";
import { MapPin, GraduationCap, User, Users, Mail, Phone } from "lucide-react";

// List of Indian states
const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", 
  "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry"
];

// Sample districts by state (for demo purposes, not complete)
const districtsByState: Record<string, string[]> = {
  "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Visakhapatnam"],
  "Telangana": ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Karimnagar", "Khammam", "Medchal", "Nalgonda", "Nizamabad", "Warangal"],
  "Karnataka": ["Bangalore", "Belgaum", "Bellary", "Bijapur", "Dakshina Kannada", "Dharwad", "Gulbarga", "Mysore", "Tumkur"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Cuddalore", "Erode", "Kanchipuram", "Madurai", "Salem", "Thanjavur", "Tiruchirappalli"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Amravati", "Kolhapur"],
  // Add more as needed for other states
};

// Top 15 Indian languages
const indianLanguages = [
  "Hindi", "Bengali", "Telugu", "Marathi", "Tamil", "Urdu", "Gujarati", 
  "Kannada", "Malayalam", "Odia", "Punjabi", "Assamese", "Maithili", "Sanskrit", "English"
];

// Education levels
const educationLevels = [
  "Primary School", "High School", "Intermediate/+2", "Bachelor's Degree", 
  "Master's Degree", "PhD", "Diploma", "Certification", "Other"
];

const PersonalDetails = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { personalDetails, setPersonalDetails, isAuthenticated } = useApplication();
  const [isLoading, setIsLoading] = useState(false);
  const [districts, setDistricts] = useState<string[]>([]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState(personalDetails);

  // Update districts when state changes
  useEffect(() => {
    if (formData.state) {
      setDistricts(districtsByState[formData.state] || []);
      // Reset district if the state changes and current district is not in the new state's districts
      if (!districtsByState[formData.state]?.includes(formData.district)) {
        setFormData(prev => ({ ...prev, district: "" }));
      }
    } else {
      setDistricts([]);
    }
  }, [formData.state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLeadTypeChange = (value: LeadType) => {
    setFormData({
      ...formData,
      leadType: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const isParent = formData.leadType === "parent";
    
    const requiredFields = [
      { name: 'parentName', label: 'Parent Name' },
      { name: 'parentNumber', label: 'Parent Phone Number' },
      { name: 'studentName', label: 'Student Name' },
      { name: 'studentNumber', label: 'Student Phone Number' },
      { name: 'email', label: 'Email' },
      { name: 'state', label: 'State' },
      { name: 'district', label: 'District' },
      { name: 'language', label: 'Preferred Language' },
      { name: 'education', label: 'Current Education' },
    ];
    
    // Check required fields
    for (const field of requiredFields) {
      if (!formData[field.name as keyof typeof formData]) {
        toast({
          title: "Missing Information",
          description: `${field.label} is required.`,
          variant: "destructive",
        });
        return;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Phone validation for both parent and student numbers
    if (!/^\d{10}$/.test(formData.parentNumber)) {
      toast({
        title: "Invalid Parent Phone Number",
        description: "Please enter a valid 10-digit phone number for parent.",
        variant: "destructive",
      });
      return;
    }
    
    if (!/^\d{10}$/.test(formData.studentNumber)) {
      toast({
        title: "Invalid Student Phone Number",
        description: "Please enter a valid 10-digit phone number for student.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Save to context and navigate to next step
    setTimeout(() => {
      setPersonalDetails(formData);
      setIsLoading(false);
      toast({
        title: "Details Saved",
        description: "Your personal details have been saved successfully.",
      });
      navigate("/payment");
    }, 1000);
  };

  return (
    <AppLayout activeStep={1}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Personal Details</h2>
          <p className="text-gray-500">
            Please provide the required information for the NIAT application process.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Lead Type Selection */}
          <div className="space-y-3">
            <Label>I am a</Label>
            <RadioGroup
              value={formData.leadType}
              onValueChange={(value) => handleLeadTypeChange(value as LeadType)}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className={cn(
                "flex items-center space-x-2 border rounded-lg p-4 cursor-pointer transition-colors",
                formData.leadType === "parent" ? "border-primary bg-primary/5" : "border-gray-200"
              )}>
                <RadioGroupItem value="parent" id="parent" />
                <Label htmlFor="parent" className="flex items-center cursor-pointer">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  Parent
                </Label>
              </div>
              
              <div className={cn(
                "flex items-center space-x-2 border rounded-lg p-4 cursor-pointer transition-colors",
                formData.leadType === "student" ? "border-primary bg-primary/5" : "border-gray-200"
              )}>
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student" className="flex items-center cursor-pointer">
                  <User className="h-5 w-5 mr-2 text-primary" />
                  Student
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Conditional ordering based on lead type */}
            {formData.leadType === "parent" ? (
              <>
                {/* Parent details first */}
                <div className="space-y-2">
                  <Label htmlFor="parentName" className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-primary" />
                    Parent Name
                  </Label>
                  <Input
                    id="parentName"
                    name="parentName"
                    placeholder="Enter parent's full name"
                    value={formData.parentName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentNumber" className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-primary" />
                    Parent Phone Number
                  </Label>
                  <Input
                    id="parentNumber"
                    name="parentNumber"
                    placeholder="Enter parent's phone number"
                    value={formData.parentNumber}
                    onChange={handleInputChange}
                    maxLength={10}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentName" className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-primary" />
                    Student Name
                  </Label>
                  <Input
                    id="studentName"
                    name="studentName"
                    placeholder="Enter student's full name"
                    value={formData.studentName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentNumber" className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-primary" />
                    Student Phone Number
                  </Label>
                  <Input
                    id="studentNumber"
                    name="studentNumber"
                    placeholder="Enter student's phone number"
                    value={formData.studentNumber}
                    onChange={handleInputChange}
                    maxLength={10}
                  />
                </div>
              </>
            ) : (
              <>
                {/* Student details first */}
                <div className="space-y-2">
                  <Label htmlFor="studentName" className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-primary" />
                    Student Name
                  </Label>
                  <Input
                    id="studentName"
                    name="studentName"
                    placeholder="Enter your full name"
                    value={formData.studentName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentNumber" className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-primary" />
                    Student Phone Number
                  </Label>
                  <Input
                    id="studentNumber"
                    name="studentNumber"
                    placeholder="Enter your phone number"
                    value={formData.studentNumber}
                    onChange={handleInputChange}
                    maxLength={10}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentName" className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-primary" />
                    Parent Name
                  </Label>
                  <Input
                    id="parentName"
                    name="parentName"
                    placeholder="Enter parent's full name"
                    value={formData.parentName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentNumber" className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-primary" />
                    Parent Phone Number
                  </Label>
                  <Input
                    id="parentNumber"
                    name="parentNumber"
                    placeholder="Enter parent's phone number"
                    value={formData.parentNumber}
                    onChange={handleInputChange}
                    maxLength={10}
                  />
                </div>
              </>
            )}

            {/* Common fields for both lead types */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleInputChange}
              />
              <p className="text-xs text-gray-500">Can be either parent's or student's email</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="education" className="flex items-center">
                <GraduationCap className="h-4 w-4 mr-2 text-primary" />
                Current Education
              </Label>
              <Select
                value={formData.education}
                onValueChange={(value) => handleSelectChange("education", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  {educationLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="state" className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                State
              </Label>
              <Select
                value={formData.state}
                onValueChange={(value) => handleSelectChange("state", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="district" className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                District
              </Label>
              <Select
                value={formData.district}
                onValueChange={(value) => handleSelectChange("district", value)}
                disabled={!formData.state}
              >
                <SelectTrigger>
                  <SelectValue placeholder={
                    formData.state ? "Select district" : "Please select a state first"
                  } />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language" className="flex items-center">
                Preferred Language
              </Label>
              <Select
                value={formData.language}
                onValueChange={(value) => handleSelectChange("language", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {indianLanguages.map((language) => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save & Continue"}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default PersonalDetails;
