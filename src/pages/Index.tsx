import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AppShell } from "@/components/layout/app-shell"
import { DashboardPage } from "@/modules/dashboard/pages/dashboard"

const Index = () => {
  // Redirect to dashboard as default landing page
  return (
    <AppShell>
      <DashboardPage />
    </AppShell>
  );
};

export default Index;
