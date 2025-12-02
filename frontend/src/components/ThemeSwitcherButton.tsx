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

export function ThemeSwitcherButton() {
  const { setTheme, theme } = useTheme();
  const [flashOverlay, setFlashOverlay] = useState<"light" | "dark" | null>(null);

  const handleSetTheme = (newTheme: string) => {
    if (newTheme !== theme) {
      // Step 1: trigger overlay
      setFlashOverlay(newTheme === "light" ? "light" : "dark");

      // Step 2: switch theme while overlay is active
      setTheme(newTheme);

      // Step 3: remove overlay after animation
      setTimeout(() => setFlashOverlay(null), 2000); // match animation duration
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

      {/* Flashbang overlay */}
      {flashOverlay === "light" && (
        <div className="fixed inset-0 bg-white animate-flashbang pointer-events-none z-40" />
      )}
      {flashOverlay === "dark" && (
        <div className="fixed inset-0 bg-black animate-flashbang pointer-events-none z-40" />
      )}
    </>
  );
}
