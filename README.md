# IBM Z UAlberta Chapter Website

Official web hub for the **IBM Z UAlberta Chapter**, a student-run enterprise computing community at the University of Alberta. Built to recruit student members, coordinate bi-weekly labs and datathons, showcase student working groups, and present sponsorship opportunities to campus and industry partners.

---

## Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 + custom HSL brand tokens + Radix UI primitives (`src/components/ui/`)
- **Motion & Icons:** `motion/react` (reduced-motion safe) + `lucide-react`
- **Routing:** Zero-dependency History API page routing (`/`, `/about`, `/events`, `/learn`, `/projects`, `/talks`, `/team`, `/sponsors`, `/join`, plus `404`)
- **Testing:** Node built-in test runner (`npx tsx --test src/utils/filters.test.ts`) + TypeScript strict check (`npm run lint`)

---

## Project Structure

```text
.
├── public/
│   └── assets/aistudio/          # Uploaded static media (logo mark & full-bleed Hero canvas)
├── src/
│   ├── config.ts                 # Single source of truth for Discord, LinkedIn, Form, and Emails
│   ├── index.css                 # Tailwind v4 theme tokens, typography, card & focus rules
│   ├── App.tsx                   # Client-side route dispatcher & shared sticky chrome
│   ├── utils/
│   │   ├── filters.ts            # Pure event filter, date formatter, keyboard nav, & route helpers
│   │   └── filters.test.ts       # Unit tests for filtering, routing, and data invariants
│   ├── components/
│   │   ├── ui/                   # Accessible Radix UI wrappers (Button, Badge, Dialog, Sheet, Tabs, Accordion)
│   │   ├── HeroSection.tsx       # Full-bleed interactive Data-into-Z canvas + Chapter Directory grid
│   │   ├── AboutSection.tsx      # 3-pillar sticky chapter overview (/about)
│   │   ├── EventsSection.tsx     # Filterable event list with alternating brand accents (/events)
│   │   ├── LearnSection.tsx      # Interactive 4-track curriculum rail, JCL lab preview, & Resources (/learn)
│   │   ├── ProjectsSection.tsx   # Asymmetric working-group showcase (/projects)
│   │   ├── PresentationsSection.tsx # Horizontal slide deck gallery & preview modal (/talks)
│   │   ├── TeamSection.tsx       # Leadership & VP roster grid (/team)
│   │   ├── SponsorsSection.tsx   # CAD sponsorship comparison matrix & email copy tools (/sponsors)
│   │   ├── JoinAndFooter.tsx     # 3-step Join page (/join) & site-wide footer
│   │   ├── Navbar.tsx            # Responsive desktop bar + mobile drawer navigation
│   │   ├── JclTerminal.tsx       # Interactive JES2 return-code lab preview snippet
│   │   ├── TrussMotifs.tsx       # Custom SVG brand club logo, background truss, & section dividers
│   │   ├── SectionHeader.tsx     # Consistent mono-tag + H1 + intro block across sub-pages
│   │   └── NotFoundPage.tsx      # RC=0404 mainframe-themed 404 fallback page
│   └── data/                     # Modular domain-driven content architecture (one file per entry)
│       ├── events/
│       │   ├── types.ts          # EventItem, EventFormat, EventTag, EventAccent, EventTimeline
│       │   ├── index.ts          # Exports EVENTS array
│       │   ├── xplore-bootcamp.ts
│       │   ├── intro-to-jcl.ts
│       │   ├── mini-datathon.ts
│       │   └── career-panel.ts
│       ├── learn/
│       │   ├── types.ts          # LearnModule interface
│       │   ├── index.ts          # Exports LEARN_MODULES (4 tracks)
│       │   ├── xplore-foundations.ts
│       │   ├── enterprise-linux-jcl.ts
│       │   ├── mainframe-pipelines.ts
│       │   └── systems-security.ts
│       ├── resources/
│       │   ├── types.ts          # ResourceItem interface
│       │   ├── index.ts          # Exports RESOURCES array
│       │   └── *.ts              # 6 individual documentation/tool cards
│       ├── projects/
│       │   ├── types.ts          # ProjectItem & ProjectStatus
│       │   ├── index.ts          # Exports PROJECTS array
│       │   ├── mainframe-pipeline-starter.ts
│       │   ├── datathon-starter-kit.ts
│       │   └── chapter-website.ts
│       ├── presentations/
│       │   ├── types.ts          # PresentationItem interface
│       │   ├── index.ts          # Exports PRESENTATIONS array
│       │   ├── mainframes-vs-cloud.ts
│       │   ├── jcl-in-30-minutes.ts
│       │   └── chapter-kickoff.ts
│       ├── sponsors/
│       │   ├── types.ts          # SponsorTier & SponsorTierId
│       │   ├── index.ts          # Exports SPONSOR_TIERS, SPONSOR_PERK_LABELS, PARTNER_SLOTS_COUNT
│       │   ├── bronze.ts         # $500+ CAD
│       │   ├── silver.ts         # $1,050+ CAD
│       │   └── gold.ts           # $1,450+ CAD
│       └── team/
│           ├── types.ts          # TeamMember interface
│           ├── index.ts          # Exports LEADERSHIP_TEAM & VP_TEAM
│           ├── leadership/       # IBM Z Ambassador & Co-Presidents
│           │   ├── ibm-z-ambassador.ts
│           │   ├── co-president-1.ts
│           │   └── co-president-2.ts
│           └── vp/               # Seven VP portfolios
│               ├── vp-technology.ts
│               ├── vp-academics.ts
│               ├── vp-finance.ts
│               ├── vp-administration.ts
│               ├── vp-outreach.ts
│               ├── vp-external.ts
│               └── vp-marketing.ts
├── index.html                    # Fonts & OpenGraph metadata
├── metadata.json                 # Application metadata
└── package.json                  # Scripts & dependencies
```

---

## Content Maintenance Guide (Adding or Updating Entries)

Every section stores its entries in a dedicated domain folder under `src/data/`, with **one TypeScript file per entry** and a barrel `index.ts` that assembles the ordered array.

### 1. Updating Global Links or Contact Emails
Edit **`src/config.ts`**:
- `JOIN_FORM_URL`: Google Form for student signups.
- `DISCORD_URL`: Chapter Discord invite URL.
- `LINKEDIN_URL`: Official LinkedIn company page.
- `CLUB_EMAILS`: Tuple of contact emails displayed in the footer and sponsor outreach actions.
- `GITHUB_URL` / `INSTAGRAM_URL`: Update when chapter handles are finalized.

### 2. Adding a New Event
1. Create a new file inside `src/data/events/` (for example, `src/data/events/cobol-night.ts`):
   ```ts
   import { DISCORD_URL } from '../../config';
   import type { EventItem } from './types';

   export const cobolNightEvent: EventItem = {
     id: 'evt-cobol-night',
     title: 'COBOL Workshop Night',
     date: '2026-10-22', // Use YYYY-MM-DD or null if unconfirmed
     format: 'In person',
     location: 'CSC B-10',
     durationLabel: '90 min',
     tag: 'Lab', // 'Lab' | 'Competition' | 'Talk' | 'Flagship'
     timeline: 'upcoming', // Switch to 'past' after the event finishes
     description: 'Write and compile your first structured COBOL report program on z/OS.',
     url: DISCORD_URL,
     accent: 'pink', // 'pink' | 'cobalt' | 'indigo' | 'turquoise'
     isConfirmed: true,
   };
   ```
2. Import and append `cobolNightEvent` in `src/data/events/index.ts`.

### 3. Updating Curriculum Tracks or Resources
- Tracks live in `src/data/learn/` (currently `TRACK 01` through `TRACK 04`). Add/edit track files and export them in `src/data/learn/index.ts`.
- Reference tiles live in `src/data/resources/`. Each tile accepts an `iconName` from `'compass' | 'code' | 'server' | 'terminal' | 'layers' | 'git-branch'`.

### 4. Updating Projects, Presentations, or Team Members
- **Projects (`src/data/projects/`)**: Flip `confirmed: true` once scope and repository links are active.
- **Talks (`src/data/presentations/`)**: Set `slidesUrl` to your published Google Slides/PDF link and flip `confirmed: true` to replace the preview modal badge with a direct slide deck link.
- **Team (`src/data/team/leadership/` and `src/data/team/vp/`)**: Update `name`, `initials`, optional `photoUrl` (e.g., `/team/first-last.jpg`), and `linkedinUrl`, then set `confirmed: true`.

### 5. Updating Sponsorship Tiers
Each tier has its own file (`bronze.ts`, `silver.ts`, `gold.ts`) inside `src/data/sponsors/`. Update contribution minimums or table perks directly in the matching file.

---

## Design System Tokens

- **Dark Surface Base:** `navy-900` (`#11183c`), `navy-950` (`#0b1129`), `navy-800` (`#1b2150`), `navy-700` (`#2c306d`)
- **Light Surface Rhythm:** Warm `beige` (`#fffff0`) used on `/events` and `/sponsors`
- **Brand Accents:** Focal `pink` (`#e801a0`), `sky` (`#78a9ff`), `cobalt` (`#4589ff`), `indigo` (`#8c7bff`), `turquoise` (`#47dbd9`)
- **Typography:** `Bricolage Grotesque` (hero display & index numerals), `IBM Plex Mono` (headings, tags, terminal & metadata), `Poppins` (body copy & subheadings)

---

## Development & Verification Commands

```bash
# Install dependencies
npm install

# Run local dev server on port 3000
npm run dev

# Run TypeScript compiler typecheck
npm run lint

# Run unit tests for filters, routes, and chapter data invariants
npx tsx --test src/utils/filters.test.ts

# Build production static bundle into dist/
npm run build
```
