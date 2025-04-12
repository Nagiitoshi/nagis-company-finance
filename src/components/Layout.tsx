
import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

export const Layout = ({ children }: { children: ReactNode }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={cn(
      "min-h-screen flex flex-col",
      isDarkMode ? "bg-gray-900" : "bg-gray-50"
    )}>
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="container mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};
