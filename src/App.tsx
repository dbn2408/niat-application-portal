
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApplicationProvider } from "./context/ApplicationContext";
import Index from "./pages/Index";
import PersonalDetails from "./pages/PersonalDetails";
import Payment from "./pages/Payment";
import ExamBooking from "./pages/ExamBooking";
import Complete from "./pages/Complete";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ApplicationProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/personal-details" element={<PersonalDetails />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/exam-booking" element={<ExamBooking />} />
            <Route path="/complete" element={<Complete />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ApplicationProvider>
  </QueryClientProvider>
);

export default App;
