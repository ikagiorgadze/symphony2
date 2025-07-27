import { Toaster } from "@/components/ui/toaster";
import "./i18n";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WorkflowBuilderProvider } from "./contexts/WorkflowBuilderContext";
import Index from "./pages/Index";
import PMSPage from "./pages/pms";
import ChannelManagerPage from "./pages/channel-manager";
import BookingEnginePage from "./pages/booking-engine";
import RevenueManagementPage from "./pages/revenue-management";
import CRMPage from "./pages/crm";
import POSPage from "./pages/pos";
import HousekeepingPage from "./pages/housekeeping";
import PaymentGatewayPage from "./pages/payment-gateway";
import GuestExperiencePage from "./pages/guest-experience";
import AnalyticsPage from "./pages/analytics";
import AccessControlPage from "./pages/access-control";
import GuestIntelligencePage from "./pages/guest-intelligence";
import OTAPage from "./pages/ota";
import FinancePage from "./pages/finance";
import AdminPage from "./pages/admin";
import WorkflowsPage from "./pages/workflows";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WorkflowBuilderProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Index />} />
            <Route path="/pms/*" element={<PMSPage />} />
            <Route path="/channel-manager/*" element={<ChannelManagerPage />} />
            <Route path="/booking-engine/*" element={<BookingEnginePage />} />
            <Route path="/revenue-management/*" element={<RevenueManagementPage />} />
            <Route path="/crm/*" element={<CRMPage />} />
            <Route path="/guest-intelligence/*" element={<GuestIntelligencePage />} />
            <Route path="/pos/*" element={<POSPage />} />
            <Route path="/housekeeping/*" element={<HousekeepingPage />} />
            <Route path="/payment-gateway/*" element={<PaymentGatewayPage />} />
            <Route path="/guest-experience/*" element={<GuestExperiencePage />} />
            <Route path="/analytics/*" element={<AnalyticsPage />} />
            <Route path="/access-control/*" element={<AccessControlPage />} />
            <Route path="/ota/*" element={<OTAPage />} />
            <Route path="/finance/*" element={<FinancePage />} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/workflows/*" element={<WorkflowsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </WorkflowBuilderProvider>
  </QueryClientProvider>
);

export default App;
