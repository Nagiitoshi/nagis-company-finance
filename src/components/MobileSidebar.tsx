
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Home, PlusCircle, MinusCircle, BarChart3 } from "lucide-react";
import { cn } from "../lib/utils";
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

const navItems = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    label: "Entradas",
    icon: PlusCircle,
    href: "/entradas",
  },
  {
    label: "Saídas",
    icon: MinusCircle,
    href: "/saidas",
  },
  {
    label: "Relatórios",
    icon: BarChart3,
    href: "/relatorios",
  },
];

export const MobileSidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { isDarkMode } = useTheme();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className={cn("w-64 p-0", isDarkMode ? "bg-gray-800" : "bg-white")}>
        <div className="h-full px-3 py-4">
          <nav className="space-y-1 mt-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                  location.pathname === item.href
                    ? "bg-primary/10 text-primary font-medium"
                    : isDarkMode ? "text-gray-300" : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};
