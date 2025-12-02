"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { SurpriseOverlay } from "@/components/SurpriseOverlay";

export function ThemeSwitcherButton() {
  const { setTheme, theme } = useTheme();
  const [surprise, setSurprise] = useState(false);

  const handleSetTheme = (newTheme: string) => {
    if (newTheme === "light" && theme === "dark") {
      // Step 1: switch theme immediately
      setTheme("light");

      // Step 2: trigger staged effect
      setSurprise(true);

      // Reset after sequence
      setTimeout(() => setSurprise(false), 4000); // slightly longer than overlay
    } else {
      setTheme(newTheme);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleSetTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSetTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSetTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Overlay sequence */}
      {surprise && <SurpriseOverlay trigger={surprise} />}
    </>
  );
}
