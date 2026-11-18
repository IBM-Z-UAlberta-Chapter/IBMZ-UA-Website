import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[6px] font-medium transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 shrink-0 cursor-pointer',
  {
    variants: {
      variant: {
        primary:
          'bg-pink text-beige text-[18px] font-semibold px-6 py-3 min-h-[48px] hover:bg-pink-hover hover:-translate-y-0.5 active:translate-y-0',
        primaryBlue:
          'bg-cobalt-dark text-beige text-[18px] font-semibold px-6 py-3 min-h-[48px] hover:bg-[#2563eb] hover:-translate-y-0.5 active:translate-y-0',
        primaryCompact:
          'bg-pink text-beige text-[16px] font-semibold px-5 py-2.5 min-h-[44px] hover:bg-pink-hover hover:-translate-y-0.5 active:translate-y-0',
        secondary:
          'bg-transparent border border-turquoise text-turquoise text-[16px] font-semibold px-6 py-3 min-h-[48px] hover:bg-turquoise/10',
        secondaryBeige:
          'bg-transparent border border-navy-900 text-navy-900 text-[16px] font-semibold px-6 py-3 min-h-[48px] hover:bg-navy-900/10',
        ghost:
          'bg-transparent text-turquoise text-[15px] font-medium px-3 py-2 min-h-[44px] hover:text-beige group',
        ghostBeige:
          'bg-transparent text-navy-900 text-[15px] font-medium px-3 py-2 min-h-[44px] hover:text-pink group',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
