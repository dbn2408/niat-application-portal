
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Smartphone, CreditCardIcon } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { useApplication } from "@/context/ApplicationContext";
import AppLayout from "@/components/AppLayout";

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setPaymentComplete, isAuthenticated, personalDetails } = useApplication();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if not authenticated or missing personal details
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else if (!personalDetails.name || !personalDetails.email) {
      navigate("/personal-details");
    }
  }, [isAuthenticated, navigate, personalDetails]);

  // Card payment state
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === "card") {
      // Validate card details
      if (!cardDetails.cardNumber || cardDetails.cardNumber.length < 16 ||
          !cardDetails.cardName || 
          !cardDetails.expiryDate || 
          !cardDetails.cvv || cardDetails.cvv.length < 3) {
        toast({
          title: "Invalid Card Details",
          description: "Please enter valid card information.",
          variant: "destructive",
        });
        return;
      }
    }

    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentComplete(true);
      setIsLoading(false);
      toast({
        title: "Payment Successful",
        description: "Your application fee has been paid successfully.",
      });
      navigate("/exam-booking");
    }, 1500);
  };

  return (
    <AppLayout activeStep={2}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Application Fee Payment</h2>
          <p className="text-gray-500">
            Pay the application fee of ₹600 to proceed with your NIAT admission process.
          </p>
        </div>

        <Card className="border-none bg-muted/30">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-lg">NIAT Admission Application Fee</h3>
                <p className="text-sm text-gray-500">One-time payment</p>
              </div>
              <div className="text-xl font-bold">₹600</div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label>Payment Method</Label>
            <RadioGroup 
              value={paymentMethod} 
              onValueChange={setPaymentMethod}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === "card" ? "border-niat-500 bg-niat-50" : "border-gray-200"}`}>
                <RadioGroupItem value="card" id="card" className="sr-only" />
                <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                  <CreditCard className="h-5 w-5 text-niat-500" />
                  <span>Credit/Debit Card</span>
                </Label>
              </div>
              <div className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === "upi" ? "border-niat-500 bg-niat-50" : "border-gray-200"}`}>
                <RadioGroupItem value="upi" id="upi" className="sr-only" />
                <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer">
                  <Smartphone className="h-5 w-5 text-niat-500" />
                  <span>UPI Payment</span>
                </Label>
              </div>
              <div className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === "netbanking" ? "border-niat-500 bg-niat-50" : "border-gray-200"}`}>
                <RadioGroupItem value="netbanking" id="netbanking" className="sr-only" />
                <Label htmlFor="netbanking" className="flex items-center gap-2 cursor-pointer">
                  <CreditCardIcon className="h-5 w-5 text-niat-500" />
                  <span>Net Banking</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {paymentMethod === "card" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.cardNumber}
                  onChange={handleCardInputChange}
                  maxLength={16}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  name="cardName"
                  placeholder="Name on card"
                  value={cardDetails.cardName}
                  onChange={handleCardInputChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={cardDetails.expiryDate}
                    onChange={handleCardInputChange}
                    maxLength={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    type="password"
                    value={cardDetails.cvv}
                    onChange={handleCardInputChange}
                    maxLength={3}
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "upi" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="upiId">UPI ID</Label>
                <Input
                  id="upiId"
                  placeholder="name@upi"
                />
              </div>
            </div>
          )}

          {paymentMethod === "netbanking" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Bank</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {["SBI", "HDFC", "ICICI", "Axis", "Kotak", "Others"].map((bank) => (
                    <div key={bank} className="border rounded-lg p-4 cursor-pointer hover:border-niat-500">
                      {bank} Bank
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t flex justify-between items-center">
            <div>
              <p className="font-medium">Total Amount:</p>
              <p className="text-2xl font-bold">₹600</p>
            </div>
            <Button 
              type="submit" 
              className="bg-niat-500 hover:bg-niat-600"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Pay Now"}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default Payment;
