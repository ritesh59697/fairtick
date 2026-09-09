import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-white text-zinc-950 shadow hover:bg-zinc-100",
        secondary:
          "border-white/10 bg-zinc-800/80 text-zinc-200 hover:bg-zinc-700/80",
        destructive:
          "border-rose-500/30 bg-rose-500/15 text-rose-300 hover:bg-rose-500/25",
        outline:
          "border-white/20 bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] hover:text-white",
        success:
          "border-emerald-500/30 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25",
        warning:
          "border-amber-500/30 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
