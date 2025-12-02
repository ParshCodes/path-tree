"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeSwitcherButton } from "@/components/ThemeSwitcherButton";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Your Profile", href: "/profile" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="border-b bg-background">
      <nav className="mx-auto flex max-w-6xl items-center justify-between py-4 px-6">
        {/* Left side: nav links + Classes dropdown */}
        <div className="flex items-center gap-10">
          {navItems.map((item) => (
            <div key={item.href} className="relative">
              <Link
                href={item.href}
                className={cn(
                  "text-lg font-medium text-muted-foreground transition-colors hover:text-foreground",
                  isActive(item.href) && "text-foreground"
                )}
              >
                {item.label}
              </Link>

              {isActive(item.href) && (
                <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-blue-400" />
              )}
            </div>
          ))}

          {/* Classes Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "flex items-center gap-1 text-lg font-medium text-muted-foreground transition-colors hover:text-foreground outline-none",
                (pathname.startsWith("/classes") ||
                  pathname.startsWith("/program-of-study")) &&
                  "text-foreground"
              )}
            >
              Classes
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem asChild>
                <Link href="/classes" className="cursor-pointer">
                  Class Search
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/program-of-study" className="cursor-pointer">
                  Program of Study
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right side: auth + theme toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="rounded-md border border-blue-500 bg-blue-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-600"
          >
            Sign up
          </Link>
          <ThemeSwitcherButton />
        </div>
      </nav>
    </header>
  );
}