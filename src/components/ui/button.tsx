import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 dark:focus-visible:ring-white",
  {
    variants: {
      variant: {
        default:
          "bg-black text-white hover:bg-black/90 shadow-sm dark:bg-white dark:text-black dark:hover:bg-white/90",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 shadow-sm dark:text-white",
        outline:
          "border border-black bg-transparent text-black hover:bg-black/5 shadow-sm dark:border-white dark:text-white dark:hover:bg-white/5",
        secondary:
          "bg-zinc-100 text-black hover:bg-zinc-200 shadow-sm dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600",
        ghost:
          "hover:bg-zinc-100 text-black dark:hover:bg-zinc-700 dark:text-white",
        link: "text-black underline-offset-4 hover:underline dark:text-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-6 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
