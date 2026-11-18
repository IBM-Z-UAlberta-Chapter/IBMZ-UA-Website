import * as React from 'react';
import { Check, Copy, Mail } from 'lucide-react';
import { CLUB_EMAILS } from '../config';
import {
  PARTNER_SLOTS_COUNT,
  SPONSOR_PERK_LABELS,
  SPONSOR_TIERS,
  type SponsorTierId,
} from '../data/sponsors';
import { SectionHeader } from './SectionHeader';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function SponsorsSection() {
  const [copiedEmail, setCopiedEmail] = React.useState<string | null>(null);
  const [mobileTier, setMobileTier] = React.useState<SponsorTierId>('gold');

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      window.setTimeout(() => setCopiedEmail(null), 2400);
    } catch {
      // Fallback for restricted clipboard contexts
      setCopiedEmail(email);
      window.setTimeout(() => setCopiedEmail(null), 2400);
    }
  };

  return (
    <section
      id="sponsors"
      aria-labelledby="sponsors-heading"
      className="beige-surface bg-beige py-16 text-navy-900 md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
        <SectionHeader
          index="07"
          tag="// 07 SPONSORS"
          title="Partner with us"
          intro="Support UAlberta students learning enterprise computing, and put your team in front of them."
          titleId="sponsors-heading"
          variant="beige"
        />

        {/* Desktop 3-Column Tier Comparison Matrix */}
        <div className="mt-12 hidden md:grid md:grid-cols-3 md:items-stretch md:gap-5">
          {SPONSOR_TIERS.map((tier) => {
            const isGold = Boolean(tier.highlighted);
            return (
              <article
                key={tier.id}
                className={`relative flex flex-col overflow-hidden rounded-[10px] border p-7 transition-transform duration-200 ${
                  isGold
                    ? 'border-navy-900 bg-navy-900 text-beige -translate-y-2 shadow-xl'
                    : 'border-navy-900/20 bg-navy-900/[0.03] text-navy-900'
                }`}
              >
                {isGold && (
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-pink" />
                )}
                <div className="flex items-center justify-between gap-2">
                  <h3
                    className={`font-mono text-sm font-semibold uppercase tracking-[0.14em] ${
                      isGold ? 'text-beige' : 'text-navy-900'
                    }`}
                  >
                    {tier.name}
                  </h3>
                  {tier.badge && (
                    <Badge variant="turquoise" className="border-sky text-sky bg-sky/10">
                      {tier.badge}
                    </Badge>
                  )}
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                  <span
                    className={`font-display text-4xl lg:text-5xl font-extrabold tracking-tight tabular-nums ${
                      isGold ? 'text-beige' : 'text-navy-900'
                    }`}
                  >
                    {tier.price}
                  </span>
                  <span
                    className={`font-mono text-xs uppercase tracking-[0.14em] ${
                      isGold ? 'text-beige-dim' : 'text-navy-900/70'
                    }`}
                  >
                    {tier.currency}
                  </span>
                </div>

                <dl
                  className={`mt-6 flex-1 divide-y border-t ${
                    isGold
                      ? 'divide-navy-700 border-navy-700'
                      : 'divide-navy-900/15 border-navy-900/15'
                  }`}
                >
                  {SPONSOR_PERK_LABELS.map((row) => (
                    <div key={row.key} className="py-3.5">
                      <dt
                        className={`font-mono text-[11px] uppercase tracking-[0.14em] ${
                          isGold ? 'text-sky' : 'text-navy-900/65'
                        }`}
                      >
                        {row.label}
                      </dt>
                      <dd
                        className={`mt-1 text-sm leading-snug ${
                          isGold ? 'text-beige' : 'text-navy-900'
                        }`}
                      >
                        {tier.perks[row.key]}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            );
          })}
        </div>

        {/* Mobile Tab Switcher (Bronze | Silver | Gold) */}
        <div className="mt-10 md:hidden">
          <Tabs
            value={mobileTier}
            onValueChange={(value) => setMobileTier(value as SponsorTierId)}
          >
            <TabsList
              aria-label="Sponsorship tiers"
              className="grid w-full grid-cols-3 border border-navy-900/20 bg-navy-900/5"
            >
              {SPONSOR_TIERS.map((tier) => (
                <TabsTrigger
                  key={tier.id}
                  value={tier.id}
                  className="bg-transparent text-navy-900 data-[state=active]:bg-navy-900 data-[state=active]:text-beige"
                >
                  {tier.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {SPONSOR_TIERS.map((tier) => {
              const isGold = Boolean(tier.highlighted);
              return (
                <TabsContent key={tier.id} value={tier.id}>
                  <article
                    className={`relative overflow-hidden rounded-[10px] border p-6 ${
                      isGold
                        ? 'border-navy-900 bg-navy-900 text-beige'
                        : 'border-navy-900/20 bg-navy-900/[0.03] text-navy-900'
                    }`}
                  >
                    {isGold && (
                      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-pink" />
                    )}
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.14em]">
                        {tier.name}
                      </h3>
                      {tier.badge && (
                        <Badge variant="turquoise" className="border-sky text-sky bg-sky/10">
                          {tier.badge}
                        </Badge>
                      )}
                    </div>

                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="font-display text-4xl font-extrabold tracking-tight tabular-nums">
                        {tier.price}
                      </span>
                      <span
                        className={`font-mono text-xs uppercase tracking-[0.14em] ${
                          isGold ? 'text-beige-dim' : 'text-navy-900/70'
                        }`}
                      >
                        {tier.currency}
                      </span>
                    </div>

                    <dl
                      className={`mt-5 divide-y border-t ${
                        isGold
                          ? 'divide-navy-700 border-navy-700'
                          : 'divide-navy-900/15 border-navy-900/15'
                      }`}
                    >
                      {SPONSOR_PERK_LABELS.map((row) => (
                        <div key={row.key} className="py-3">
                          <dt
                            className={`font-mono text-[11px] uppercase tracking-[0.14em] ${
                              isGold ? 'text-sky' : 'text-navy-900/65'
                            }`}
                          >
                            {row.label}
                          </dt>
                          <dd className="mt-1 text-sm">{tier.perks[row.key]}</dd>
                        </div>
                      ))}
                    </dl>
                  </article>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>

        {/* Opt-in & Currency Footnote */}
        <p className="mt-6 font-mono text-xs text-navy-900/75">
          Resume sharing is opt-in and requires student consent. All amounts in CAD.
        </p>

        {/* CTA Row + Copy Both Contact Emails */}
        <div className="mt-8 flex flex-wrap items-center gap-3.5">
          <Button asChild variant="primaryBlue">
            <a
              href={`mailto:${CLUB_EMAILS.join(',')}?subject=${encodeURIComponent(
                'IBM Z UAlberta Chapter Sponsorship Package Inquiry'
              )}`}
            >
              <Mail className="h-5 w-5" strokeWidth={1.75} />
              <span>Request the sponsorship package</span>
            </a>
          </Button>

          {CLUB_EMAILS.map((email) => {
            const isCopied = copiedEmail === email;
            return (
              <Button
                key={email}
                type="button"
                variant="secondaryBeige"
                onClick={() => handleCopyEmail(email)}
                aria-live="polite"
              >
                {isCopied ? (
                  <>
                    <Check className="h-4 w-4 text-cobalt-dark" strokeWidth={2} />
                    <span>Copied {email}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" strokeWidth={1.5} />
                    <span>Copy {email}</span>
                  </>
                )}
              </Button>
            );
          })}
        </div>

        {/* Partner Slots Row */}
        <div className="mt-14">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-navy-900/70">
            CURRENT PARTNERS
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: PARTNER_SLOTS_COUNT }).map((_, idx) => (
              <div
                key={idx}
                className="flex h-24 items-center justify-center rounded-[10px] border border-dashed border-navy-900/30 bg-navy-900/[0.02] px-4 text-center"
              >
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-navy-900/60">
                  Partner slot open
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
