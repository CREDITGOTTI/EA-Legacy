import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn relative isolate inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-none text-xs font-bold uppercase tracking-[0.14em] cursor-pointer transition-[transform,color,background-color,border-color,box-shadow] duration-300 [clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,10px_100%,0_calc(100%-10px))] before:pointer-events-none before:absolute before:inset-y-0 before:-left-1/2 before:-z-10 before:w-1/3 before:skew-x-[-20deg] before:bg-gradient-to-r before:from-transparent before:via-ivory/35 before:to-transparent before:opacity-0 before:transition-[left,opacity] before:duration-500 after:pointer-events-none after:absolute after:inset-x-3 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-gold after:to-transparent after:opacity-40 hover:before:left-[120%] hover:before:opacity-100 active:translate-y-px active:shadow-[inset_0_3px_10px_color-mix(in_oklab,var(--obsidian)_45%,transparent)] motion-reduce:before:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-1",
  {
    variants: {
      variant: {
        default: "border border-primary bg-primary text-primary-foreground shadow hover:border-legacy hover:bg-legacy",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background/65 shadow-sm backdrop-blur hover:border-gold hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "border border-transparent hover:border-border hover:bg-accent/70 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        legacy: "border border-legacy bg-legacy text-obsidian shadow-legacy hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:shadow-[0_0_28px_color-mix(in_oklab,var(--legacy)_32%,transparent)]",
        gold: "border border-gold/75 bg-background/15 text-gold backdrop-blur-md hover:-translate-y-0.5 hover:border-legacy hover:bg-gold hover:text-obsidian",
        dark: "border border-emerald bg-obsidian text-ivory hover:-translate-y-0.5 hover:border-legacy hover:bg-emerald",
        glass: "border border-border bg-background/35 text-foreground backdrop-blur-md hover:border-gold hover:bg-surface/80 hover:text-gold",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-11 px-4 text-[10px]",
        lg: "h-13 px-7",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
