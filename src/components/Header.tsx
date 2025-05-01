"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
};

export default function Header() {
  const pathname = usePathname();
  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    // { label: "Team", href: "/team" },
    { label: "Robots", href: "/robots" },
    // { label: "Sponsors", href: "/sponsors" },
    { label: "Contact", href: "/contact" },
  ];

  if (pathname === "/admin") {
    return null;
  }

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/team-logo-transparent.png"
              alt="Steel Stingers Logo"
              width={75}
              height={75}
              draggable={false}
            />
            <span className="text-xl font-bold text-black">Steel Stingers</span>
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-8">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-zinc-600 transition-colors hover:text-black ${
                      isActive ? "font-bold text-black" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}
