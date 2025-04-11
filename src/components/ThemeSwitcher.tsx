
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Toggle } from "@/components/ui/toggle";

export const ThemeSwitcher = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Toggle 
      variant="outline" 
      aria-label="Toggle theme" 
      pressed={isDarkMode}
      onPressedChange={toggleTheme}
      className="border-0"
    >
      {isDarkMode ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-300" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-purple-500" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Toggle>
  );
};
