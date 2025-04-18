
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/button";
import { LogOut, User } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="container mx-auto py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-primary">Nagi's Company</h1>
        </div>
        
        {user && (
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <User size={16} className="text-primary" />
              </div>
              <span className="text-sm font-medium hidden sm:inline-block">
                {user.name}
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={logout} 
              className="text-muted-foreground"
            >
              <LogOut size={18} />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
