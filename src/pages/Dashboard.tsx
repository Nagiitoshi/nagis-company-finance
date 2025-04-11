
import { useEffect } from "react";
import { DashboardCards } from "../components/DashboardCards";
import { DashboardCharts } from "../components/DashboardCharts";
import { MobileSidebar } from "../components/MobileSidebar";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo, {user?.name}! Veja o resumo das suas finanças.
          </p>
        </div>
        <MobileSidebar />
      </div>

      <DashboardCards />
      <DashboardCharts />
    </div>
  );
};

export default Dashboard;
