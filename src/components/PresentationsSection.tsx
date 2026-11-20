import * as React from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Presentation } from 'lucide-react';
import { PRESENTATIONS, type PresentationItem } from '../data/presentations';
import { SectionHeader } from './SectionHeader';
import { TrussCorner } from './TrussMotifs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './ui/dialog';

export function PresentationsSection() {
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const [previewDeck, setPreviewDeck] = React.useState<PresentationItem | null>(null);

  const scrollTrack = (direction: 'prev' | 'next') => {
    const el = trackRef.current;
    if (!el) return;
    const step = Math.min(el.clientWidth * 0.8, 420);
    el.scrollBy({
      left: direction === 'next' ? step : -step,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="talks"
      aria-labelledby="talks-heading"
      className="bg-navy-900 py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            index="05"
            tag="// 05 TALKS & DECKS"
            title="Presentations"
            intro="Slides and recordings from our workshops and talks."
            titleId="talks-heading"
            className="flex-1"
          />

          {/* Desktop Carousel Controls */}
          <div className="hidden sm:flex items-center gap-2 shrink-0 pb-1">
            <button
              type="button"
              onClick={() => scrollTrack('prev')}
              aria-label="Scroll presentations left"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[6px] border border-navy-700 bg-navy-800 text-beige hover:border-turquoise/60 hover:text-turquoise transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => scrollTrack('next')}
              aria-label="Scroll presentations right"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[6px] border border-navy-700 bg-navy-800 text-beige hover:border-turquoise/60 hover:text-turquoise transition-colors cursor-pointer"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll-Snap Row */}
        <div
          ref={trackRef}
          tabIndex={0}
          aria-label="Presentations slide deck gallery"
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
        >
          {PRESENTATIONS.map((deck) => (
            <article
              key={deck.id}
              className="z-card w-[84vw] max-w-[380px] shrink-0 snap-start overflow-hidden p-5 sm:w-[360px]"
            >
              {/* 16:9 Slide Area */}
              <div className="relative flex aspect-video flex-col justify-between rounded-[6px] border border-navy-700 bg-navy-950 p-5">
                <TrussCorner position="top-right" className="absolute right-2 top-2" />

                <div className="flex items-center justify-between pr-8">
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-indigo">
                    {deck.code}
                  </span>
                  {!deck.confirmed && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-sky">
                      TBD
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-mono text-lg sm:text-xl font-semibold leading-snug text-beige">
                    {deck.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-beige-dim line-clamp-2">
                    {deck.subtitle}
                  </p>
                </div>
              </div>

              {/* Meta & Link below slide */}
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-xs text-sky truncate">{deck.dateLabel}</p>
                  <p className="mt-0.5 text-sm text-beige-dim truncate">{deck.speaker}</p>
                </div>

                {deck.slidesUrl ? (
                  <a
                    href={deck.slidesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-turquoise hover:text-beige transition-colors shrink-0"
                  >
                    <span>View slides</span>
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPreviewDeck(deck)}
                    aria-label={`View slides for ${deck.title}`}
                    className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-turquoise hover:text-beige transition-colors shrink-0 cursor-pointer"
                  >
                    <span>View slides</span>
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Placeholder Slide Deck Preview Dialog */}
      <Dialog
        open={previewDeck !== null}
        onOpenChange={(open) => {
          if (!open) setPreviewDeck(null);
        }}
      >
        <DialogContent>
          {previewDeck && (
            <>
              <div className="pr-10">
                <Badge variant="sky">
                  {previewDeck.code}
                  {!previewDeck.confirmed ? ' · TBD' : ''}
                </Badge>
                <DialogTitle className="mt-3">{previewDeck.title}</DialogTitle>
                <DialogDescription className="mt-2">
                  {previewDeck.summary}
                </DialogDescription>
              </div>
              <div className="mt-5 flex items-center gap-3 rounded-[8px] border border-navy-700 bg-navy-800/70 p-4 font-mono text-xs text-beige-dim">
                <Presentation className="h-5 w-5 text-turquoise shrink-0" strokeWidth={1.5} />
                <span>
                  Slides and recording links will be published here right after the workshop runs.
                </span>
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setPreviewDeck(null)}
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
