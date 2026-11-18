import * as React from 'react';
import { useReducedMotion } from 'motion/react';
import { TrussCorner } from './TrussMotifs';
import { Badge } from './ui/badge';

interface JclToken {
  text: string;
  tone: 'slash' | 'name' | 'keyword' | 'string' | 'dim';
}

const JCL_LINES: JclToken[][] = [
  [
    { text: '//', tone: 'slash' },
    { text: 'IBMZUALB ', tone: 'name' },
    { text: 'JOB ', tone: 'keyword' },
    { text: '(UALBERTA),', tone: 'dim' },
    { text: "'WELCOME'", tone: 'string' },
    { text: ',', tone: 'dim' },
    { text: 'CLASS=', tone: 'keyword' },
    { text: 'A', tone: 'string' },
    { text: ',', tone: 'dim' },
    { text: 'MSGCLASS=', tone: 'keyword' },
    { text: 'H', tone: 'string' },
  ],
  [
    { text: '//', tone: 'slash' },
    { text: 'STEP01   ', tone: 'name' },
    { text: 'EXEC ', tone: 'keyword' },
    { text: 'PGM=', tone: 'keyword' },
    { text: 'IEBGENER', tone: 'string' },
  ],
  [
    { text: '//', tone: 'slash' },
    { text: 'SYSPRINT ', tone: 'name' },
    { text: 'DD ', tone: 'keyword' },
    { text: 'SYSOUT=*', tone: 'dim' },
  ],
  [
    { text: '//', tone: 'slash' },
    { text: 'SYSIN    ', tone: 'name' },
    { text: 'DD ', tone: 'keyword' },
    { text: 'DUMMY', tone: 'string' },
  ],
  [
    { text: '//', tone: 'slash' },
    { text: 'SYSUT2   ', tone: 'name' },
    { text: 'DD ', tone: 'keyword' },
    { text: 'SYSOUT=*', tone: 'dim' },
  ],
  [
    { text: '//', tone: 'slash' },
    { text: 'SYSUT1   ', tone: 'name' },
    { text: 'DD ', tone: 'keyword' },
    { text: '*', tone: 'dim' },
  ],
  [{ text: 'HELLO, UALBERTA. NOW LEARNING Z/OS.', tone: 'dim' }],
  [{ text: '/*', tone: 'slash' }],
];

function tokenClass(tone: JclToken['tone']) {
  switch (tone) {
    case 'slash':
      return 'text-indigo';
    case 'name':
      return 'text-beige';
    case 'keyword':
      return 'text-sky';
    case 'string':
      return 'text-turquoise';
    case 'dim':
      return 'text-beige-dim';
  }
}

export function JclTerminal() {
  const prefersReducedMotion = useReducedMotion();
  const [visibleLines, setVisibleLines] = React.useState<number>(() =>
    prefersReducedMotion ? JCL_LINES.length : 1
  );

  React.useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleLines(JCL_LINES.length);
      return;
    }

    let current = 1;
    const timer = window.setInterval(() => {
      current += 1;
      setVisibleLines(current);
      if (current >= JCL_LINES.length) {
        window.clearInterval(timer);
      }
    }, 180);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  const showMaxCc = visibleLines >= JCL_LINES.length;

  return (
    <div className="relative rounded-[10px] border border-turquoise/35 bg-navy-950 p-4 sm:p-5">
      <TrussCorner position="top-right" className="absolute right-2.5 top-2.5" />

      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-navy-700/80 pb-3 pr-10">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-navy-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-navy-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-navy-700" />
        </div>
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-beige-dim">
          JOB: IBMZUALB
        </span>
      </div>

      {/* JCL Listing */}
      <pre
        aria-label="Sample JCL job deck output"
        className="mt-4 overflow-x-auto font-mono text-[10px] sm:text-[11.5px] leading-[1.75] min-h-[180px] sm:min-h-[205px]"
      >
        <code>
          {JCL_LINES.slice(0, visibleLines).map((tokens, lineIdx) => {
            const isLastVisible = lineIdx === visibleLines - 1;
            return (
              <div key={lineIdx} className="whitespace-pre">
                {tokens.map((tok, tokIdx) => (
                  <span key={tokIdx} className={tokenClass(tok.tone)}>
                    {tok.text}
                  </span>
                ))}
                {isLastVisible && <span className="terminal-cursor ml-1" aria-hidden="true" />}
              </div>
            );
          })}
        </code>
      </pre>

      {/* Terminal status footer */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-navy-700/80 pt-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-beige-dim">
          SUBSYSTEM: JES2 · SAMPLE DECK
        </span>
        <div className="flex items-center gap-2">
          <Badge
            variant="turquoise"
            className={`transition-opacity duration-300 ${
              showMaxCc ? 'opacity-100' : 'opacity-0'
            }`}
          >
            MAXCC=0000
          </Badge>
        </div>
      </div>
    </div>
  );
}
