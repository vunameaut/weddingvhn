import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/DoQuan" replace />} />
          <Route path="/admin" element={<Admin />} />

          {/* Bản Chú Rể: /DoQuan */}
          <Route path="/DoQuan" element={<Index role="groom" />} />
          <Route path="/DoQuan/:recipientCode" element={<Index role="groom" />} />
          <Route path="/doquan" element={<Index role="groom" />} />
          <Route path="/doquan/:recipientCode" element={<Index role="groom" />} />
          <Route path="/chu-re" element={<Index role="groom" />} />
          <Route path="/chu-re/:recipientCode" element={<Index role="groom" />} />

          {/* Bản Cô Dâu: /MaiLinh */}
          <Route path="/MaiLinh" element={<Index role="bride" />} />
          <Route path="/MaiLinh/:recipientCode" element={<Index role="bride" />} />
          <Route path="/mailinh" element={<Index role="bride" />} />
          <Route path="/mailinh/:recipientCode" element={<Index role="bride" />} />
          <Route path="/co-dau" element={<Index role="bride" />} />
          <Route path="/co-dau/:recipientCode" element={<Index role="bride" />} />

          {/* Custom recipient code */}
          <Route path="/:recipientCode" element={<Index role="groom" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

