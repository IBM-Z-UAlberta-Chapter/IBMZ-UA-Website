import { ArrowLeft } from 'lucide-react';
import { ClubLogoMark, TrussGrid } from './TrussMotifs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface NotFoundPageProps {
  onGoHome: () => void;
}

export function NotFoundPage({ onGoHome }: NotFoundPageProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-navy-900 px-5 py-20 text-center text-beige">
      <TrussGrid
        opacityClass="opacity-[0.1]"
        className="absolute left-1/2 top-1/2 h-[520px] w-[400px] -translate-x-1/2 -translate-y-1/2"
      />

      <div className="relative z-10 max-w-lg rounded-[10px] border border-navy-700 bg-navy-950/90 p-8 sm:p-10">
        <div className="flex items-center justify-center gap-3">
          <ClubLogoMark size={36} />
          <Badge variant="pink">RC=0404</Badge>
        </div>

        <h1 className="mt-6 font-display text-5xl sm:text-6xl font-extrabold tracking-tight text-beige">
          404
        </h1>
        <p className="mt-3 font-mono text-sm uppercase tracking-[0.14em] text-indigo">
          DATASET OR ROUTE NOT FOUND
        </p>
        <p className="mt-3 text-base leading-relaxed text-beige-dim">
          That path does not exist on the IBM Z UAlberta Chapter site. Return to the main chapter
          page to browse events, labs, and projects.
        </p>

        <div className="mt-8 flex justify-center">
          <Button type="button" variant="primary" onClick={onGoHome}>
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            <span>Back to chapter home</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
