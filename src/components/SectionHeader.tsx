import { motion, useReducedMotion } from 'motion/react';

interface SectionHeaderProps {
  index: string;
  tag: string;
  title: string;
  intro: string;
  titleId: string;
  variant?: 'dark' | 'beige';
  className?: string;
}

export function SectionHeader({
  index,
  tag,
  title,
  intro,
  titleId,
  variant = 'dark',
  className = '',
}: SectionHeaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const isBeige = variant === 'beige';

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <div className="flex flex-wrap items-end gap-4 sm:gap-6">
        <span
          aria-hidden="true"
          className={`select-none text-[64px] sm:text-[88px] md:text-[96px] leading-[0.85] ${
            isBeige ? 'index-numeral-light' : 'index-numeral-dark'
          }`}
        >
          {index}
        </span>
        <div className="pb-1">
          <p
            className={`font-mono text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.14em] ${
              isBeige ? 'text-cobalt-dark' : 'text-turquoise'
            }`}
          >
            {tag}
          </p>
          <h1
            id={titleId}
            className={`mt-1.5 font-mono font-semibold tracking-[-0.01em] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] ${
              isBeige ? 'text-navy-900' : 'text-beige'
            }`}
          >
            {title}
          </h1>
        </div>
      </div>

      <p
        className={`mt-4 max-w-[65ch] text-base leading-[1.7] ${
          isBeige ? 'text-navy-900/80' : 'text-beige-dim'
        }`}
      >
        {intro}
      </p>

      <div
        className={`relative mt-6 h-px w-full ${
          isBeige ? 'bg-navy-900/20' : 'bg-navy-700'
        }`}
      >
        <span
          aria-hidden="true"
          className="absolute left-0 top-[-1px] h-[3px] w-7 bg-pink"
        />
      </div>
    </motion.div>
  );
}
