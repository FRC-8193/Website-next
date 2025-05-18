"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SlSocialFacebook } from "react-icons/sl";
import { FaGithub } from "react-icons/fa6";
import SocialIcon from "@/components/ui/SocialIcon";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/admin") {
    return null;
  }

  return (
    <motion.footer
      className="border-t border-zinc-200 bg-white py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex flex-row items-center gap-2 pb-3">
              <Image
                src="/images/team-logo.png"
                alt="Steel Stingers Logo"
                width={50}
                height={50}
                draggable={false}
              />
              <span className="flex text-xl font-bold text-black">
                Steel Stingers
              </span>
            </div>
            <p className="text-sm text-zinc-600">
              FRC Team 8193 from New Lothrop, Michigan
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-black uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/blog"
                  className="text-zinc-600 transition-colors hover:text-black"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/robots"
                  className="text-zinc-600 transition-colors hover:text-black"
                >
                  Our Robots
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-zinc-600 transition-colors hover:text-black"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-black uppercase">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/#sponsors"
                  className="text-zinc-600 transition-colors hover:text-black"
                >
                  Our Sponsors
                </Link>
              </li>
              <li>
                <Link
                  href="/donate"
                  className="text-zinc-600 transition-colors hover:text-black"
                >
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-black uppercase">
              Contact
            </h4>
            <address className="not-italic">
              <p className="mb-2 text-sm text-zinc-600">
                New Lothrop Area Public Schools
              </p>
              <p className="mb-2 text-sm text-zinc-600">
                <Link
                  href="mailto:robotics@newlothrop.k12.mi.us"
                  className="text-zinc-600 transition-colors hover:text-black"
                >
                  robotics@newlothrop.k12.mi.us
                </Link>
              </p>
            </address>
            <div className="mt-4 flex space-x-4">
              <SocialIcon
                href="https://github.com/FRC-8193"
                icon={FaGithub}
                label="GitHub"
              />
              <SocialIcon
                href="https://www.facebook.com/people/New-Lothrop-Robotics-The-Steel-Stingers/100082742922158/"
                icon={SlSocialFacebook}
                label="Facebook"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
