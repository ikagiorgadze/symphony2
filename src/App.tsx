import { Toaster } from "@/components/ui/toaster";
import "./i18n";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WorkflowBuilderProvider } from "./contexts/WorkflowBuilderContext";
import Index from "./pages/Index";
import PMSPage from "./pages/pms";
import CRMPage from "./pages/crm";
import POSPage from "./pages/pos";
import OTAPage from "./pages/ota";
import ChannelManagerPage from "./pages/channel-manager";
import WorkflowsPage from "./pages/workflows";
import GuestExperiencePage from "./pages/guest-experience";
import AnalyticsPage from "./pages/analytics";
import HousekeepingPage from "./pages/housekeeping";
import FinancePage from "./pages/finance";
import AdminPage from "./pages/admin";
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
            <Route path="/crm/*" element={<CRMPage />} />
            <Route path="/pos/*" element={<POSPage />} />
            <Route path="/ota/*" element={<OTAPage />} />
            <Route path="/channel-manager/*" element={<ChannelManagerPage />} />
            <Route path="/workflows/*" element={<WorkflowsPage />} />
            <Route path="/guest-experience/*" element={<GuestExperiencePage />} />
            <Route path="/analytics/*" element={<AnalyticsPage />} />
            <Route path="/housekeeping/*" element={<HousekeepingPage />} />
            <Route path="/finance/*" element={<FinancePage />} />
            <Route path="/admin/*" element={<AdminPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </WorkflowBuilderProvider>
  </QueryClientProvider>
);

export default App;
