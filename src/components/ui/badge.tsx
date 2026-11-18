import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-[6px] border px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] whitespace-nowrap shrink-0',
  {
    variants: {
      variant: {
        turquoise: 'border-turquoise/40 text-turquoise bg-turquoise/5',
        sky: 'border-sky/45 text-sky bg-sky/5',
        pink: 'border-pink/70 text-beige bg-pink/10',
        beigeNavy: 'border-navy-900/25 text-navy-900 bg-navy-900/5',
        beigePink: 'border-pink text-navy-900 bg-pink/10',
      },
    },
    defaultVariants: {
      variant: 'turquoise',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
