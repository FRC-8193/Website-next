"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu as MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

type NavItem = {
  label: string;
  href: string;
};

export default function Header() {
  const pathname = usePathname();
  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Robots", href: "/robots" },
    { label: "Contact", href: "/contact" },
  ];
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (pathname === "/admin") {
    return null;
  }

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/team-logo-transparent.png"
              alt="The Steel Stingers Logo"
              width={75}
              height={75}
              draggable={false}
            />
            <span className="text-xl font-bold text-black dark:text-white">
              The Steel Stingers
            </span>
          </Link>
        </div>
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <button
                aria-label="Open navigation menu"
                className="p-2 text-black focus:ring-2 focus:ring-black focus:outline-none focus:ring-inset dark:text-white dark:focus:ring-white"
              >
                <MenuIcon size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="mb-6"></SheetHeader>
              <nav>
                <div className="flex flex-col items-center space-y-2">
                  {navItems.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/" && pathname.startsWith(item.href));
                    return (
                      <div key={item.href}>
                        <SheetClose asChild>
                          <Button
                            variant={isActive ? "secondary" : "ghost"}
                            className={`w-40 justify-center text-lg ${
                              isActive
                                ? "font-semibold text-black dark:text-white"
                                : "text-zinc-700 dark:text-zinc-300"
                            }`}
                            asChild
                          >
                            <Link href={item.href} tabIndex={0}>
                              {item.label}
                            </Link>
                          </Button>
                        </SheetClose>
                      </div>
                    );
                  })}
                </div>
              </nav>
              <div className="mt-auto flex justify-center pb-6">
                <ThemeToggle />
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex items-center space-x-8">
            <ul className="flex space-x-8">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`transition-colors hover:text-black dark:hover:text-white ${
                        isActive
                          ? "font-bold text-black dark:text-white"
                          : "text-zinc-600 dark:text-zinc-300"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="absolute right-10">
              <ThemeToggle />
            </div>
          </nav>
        )}
      </div>
    </motion.header>
  );
}
