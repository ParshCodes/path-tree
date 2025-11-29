"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Your Profile", href: "/profile" },
  { label: "Classes", href: "/classes" },
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
      <nav className="mx-auto flex max-w-6xl items-center justify-center gap-10 py-4">
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
      </nav>
    </header>
  );
}
