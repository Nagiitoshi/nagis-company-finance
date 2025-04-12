
import { Link, useLocation } from "react-router-dom";
import { Home, PlusCircle, MinusCircle, BarChart3 } from "lucide-react";
import { cn } from "../lib/utils";
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

export const Sidebar = () => {
  const location = useLocation();
  const { isDarkMode } = useTheme();

  return (
    <aside className={cn(
      "w-64 border-r hidden md:block",
      isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"
    )}>
      <div className="h-full px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
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
    </aside>
  );
};
