
import { useAuth } from "../contexts/AuthContext";
import { DashboardCards } from "../components/DashboardCards";
import { DashboardCharts } from "../components/DashboardCharts";
import { MobileSidebar } from "../components/MobileSidebar";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { UserX } from "lucide-react";

const Dashboard = () => {
  const { user, deleteAccount } = useAuth();

  const handleDeleteAccount = () => {
    deleteAccount();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo, {user?.name}! Veja o resumo das suas finanças.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex items-center gap-2">
                <UserX size={16} />
                <span className="hidden md:inline">Excluir Conta</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="dark:bg-gray-800">
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Ela excluirá permanentemente sua conta e todos os dados associados.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="dark:bg-gray-700">Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive">
                  Sim, excluir minha conta
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <MobileSidebar />
        </div>
      </div>

      <DashboardCards />
      <DashboardCharts />
    </div>
  );
};

export default Dashboard;
