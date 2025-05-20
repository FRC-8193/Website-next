import { motion, type Variants } from "motion/react";
import type { IconType } from "react-icons";

interface SocialIconProps {
  href: string;
  icon: IconType;
  label: string;
  variants?: Variants;
  iconSize?: number;
  className?: string;
  hoverScale?: number;
}

export default function SocialIcon({
  href,
  icon: Icon,
  label,
  variants,
  iconSize = 28,
  className = "text-gray-500 hover:text-black transition-colors dark:text-zinc-300 dark:hover:text-white",
  hoverScale = 1.1,
}: SocialIconProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={label}
      whileHover={{ scale: hoverScale }}
      variants={variants}
    >
      <Icon size={iconSize} />
    </motion.a>
  );
}
