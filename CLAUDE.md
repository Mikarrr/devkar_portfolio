# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a portfolio website built with **Payload CMS 3.x** and **Next.js 15** (App Router). It uses the Payload Website Template as a foundation with custom enhancements including GSAP animations, custom cursor, smooth scrolling (Locomotive), and a custom SiteSettings global.

**Tech Stack:**
- Payload CMS 3.58.0 (headless CMS with admin panel)
- Next.js 15.4.4 (App Router, React 19)
- SQLite database (via `@payloadcms/db-sqlite`)
- TailwindCSS + shadcn/ui components
- GSAP for animations
- Locomotive Scroll for smooth scrolling
- Lexical rich text editor

## Development Commands

```bash
# Install dependencies (uses pnpm)
pnpm install

# Start development server (runs on localhost:3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
pnpm lint:fix

# Run all tests (integration + E2E)
pnpm test

# Run only integration tests
pnpm test:int

# Run only E2E tests (Playwright)
pnpm test:e2e

# Generate TypeScript types from Payload collections
pnpm generate:types

# Generate import map for admin panel
pnpm generate:importmap

# Create database migration (for production with Postgres)
pnpm payload migrate:create

# Run database migrations
pnpm payload migrate

# Seed database with demo content
# Navigate to /admin and click "Seed Database" button
# Or visit /api/seed endpoint
```

## Architecture

### Dual App Structure

The project runs **two applications in one Next.js instance**:

1. **Frontend** (`src/app/(frontend)/`)
   - Public-facing portfolio website
   - Server-side rendered pages using Next.js App Router
   - Dynamic routes for pages (`[slug]`) and posts (`posts/[slug]`)
   - Uses Payload data via local API calls

2. **Admin Panel** (`src/app/(payload)/`)
   - Payload CMS admin interface at `/admin`
   - REST API at `/api/*`
   - GraphQL API at `/api/graphql`

### Payload Configuration

**Main config:** [src/payload.config.ts](src/payload.config.ts)

**Collections** (stored in database):
- `pages` - Dynamic pages with layout builder
- `posts` - Blog posts with categories
- `media` - File uploads with image optimization
- `categories` - Nested taxonomy for posts
- `users` - Admin users with authentication

**Globals** (singleton data):
- `header` - Navigation links and header data
- `footer` - Footer links and content
- `site-settings` - Custom global for branding, contact info, social media, analytics, maintenance mode

**Plugins** (in [src/plugins/index.ts](src/plugins/index.ts)):
- SEO Plugin - Meta tags, Open Graph
- Search Plugin - Full-text search for posts
- Form Builder Plugin - Dynamic forms
- Redirects Plugin - URL redirects
- Nested Docs Plugin - Hierarchical categories

### Layout Builder System

Pages and posts use a **block-based layout builder** where content is composed of reusable blocks:

**Block registry:** [src/blocks/RenderBlocks.tsx](src/blocks/RenderBlocks.tsx)

**Available blocks:**
- `archive` - Post archive/listing
- `content` - Rich text content
- `cta` - Call-to-action
- `formBlock` - Contact/email forms
- `mediaBlock` - Images/videos

**To add new blocks:**
1. Create block config in `src/blocks/[BlockName]/config.ts`
2. Create React component in `src/blocks/[BlockName]/Component.tsx`
3. Register in `blockComponents` object in `RenderBlocks.tsx`
4. Add to collection's `blocks` field array

### Frontend Routing

- `/` - Homepage
- `/[slug]` - Dynamic pages (e.g., `/about`, `/contact`)
- `/posts` - Blog archive
- `/posts/[slug]` - Individual blog posts
- `/posts/page/[pageNumber]` - Paginated blog archive
- `/search` - Search results page

### Data Fetching Pattern

Frontend pages fetch data using **server-side functions** in `src/utilities/`:
- `getDocument()` - Fetch single document by collection and slug
- `getGlobals()` - Fetch global singletons (header, footer, settings)
- `getMeUser()` - Get current authenticated user

These functions use Payload's **local API** (not HTTP), which is faster and type-safe.

### Custom Features Added

**Custom Components:**
- **CustomCursor** - Custom animated cursor (`src/components/customCurosr/`)
- **SmoothScroll** - Locomotive scroll integration (`src/components/smoothScroll/`)
- **GSAP Animations** - Transition animations (`src/components/animGSAP/`)
  - `animTransition.tsx` - Page transitions
  - `animStart.tsx` - Initial load animations
  - `animAbout.tsx` - About section animations
  - `animTechnology.tsx` - Technology section animations
- **Custom Buttons** - Reveal button components (`src/components/buttonRev/`, `src/components/buttonRevArrow/`)

**SiteSettings Global** ([src/SiteSettings/config.ts](src/SiteSettings/config.ts)):
- Branding (logo, favicon)
- Contact information (email, phone, location, timezone)
- Social media platforms array
- Analytics tracking IDs (GA, GTM, Facebook Pixel)
- Maintenance mode toggle

### Styling

- **Base styles:** `src/app/(frontend)/styles.scss` (compiled to CSS)
- **Global SCSS:** `src/app/(frontend)/_globals.scss`
- **Variables:** `src/app/(frontend)/_variables.scss`
- **TailwindCSS:** [tailwind.config.mjs](tailwind.config.mjs)
- **shadcn/ui components:** `src/components/ui/`

SCSS files are compiled to CSS (e.g., `styles.scss` → `styles.css`). Import the compiled CSS in React components.

### Draft Preview & Live Preview

- Draft content is previewed at `/next/preview?slug=...&collection=...`
- Live preview updates in real-time as you edit in admin panel
- On-demand revalidation via `afterChange` hooks automatically rebuilds pages

### Access Control

Defined in `src/access/`:
- `anyone.ts` - Public read access
- `authenticated.ts` - Logged-in users only
- `authenticatedOrPublished.ts` - Public can read published, authenticated can read drafts

### Environment Variables

Required variables (see [.env.example](.env.example)):
```
DATABASE_URI=file:./local.db          # SQLite file path
PAYLOAD_SECRET=<random-string>         # JWT encryption
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
CRON_SECRET=<random-string>            # For scheduled jobs
PREVIEW_SECRET=<random-string>         # For draft previews
```

### Database

**Development:** Uses SQLite with `push: true` mode (auto-migrates schema changes)

**Production (Postgres):**
1. Set `push: false` in config
2. Run `pnpm payload migrate:create` after schema changes
3. Run `pnpm payload migrate` on server before starting

### Testing

- **Integration tests:** Vitest ([vitest.config.mts](vitest.config.mts))
- **E2E tests:** Playwright ([playwright.config.ts](playwright.config.ts))
- Test files in `tests/` directory

### Build & Deployment

**Production build:**
1. `pnpm build` - Builds Next.js app and generates sitemap
2. `pnpm start` - Runs production server

**Deployment options:**
- Payload Cloud (recommended)
- Vercel (with Vercel Postgres adapter)
- Self-hosting (Node.js server, Docker)

**Note:** If deploying to Vercel, scheduled publish uses cron jobs which may be limited to daily on free tier.

### Important File Paths

- **Payload config:** `src/payload.config.ts`
- **Next.js config:** `next.config.js`
- **Collections:** `src/collections/`
- **Blocks:** `src/blocks/`
- **Globals:** `src/Footer/`, `src/Header/`, `src/SiteSettings/`
- **Frontend pages:** `src/app/(frontend)/`
- **API routes:** `src/app/(payload)/api/`
- **Components:** `src/components/`
- **Utilities:** `src/utilities/`
- **Generated types:** `src/payload-types.ts`

### Key Conventions

- Use **server components** by default in `app/(frontend)/`
- Add `.client.tsx` suffix for client components
- Import from `@/` paths (TypeScript path alias for `src/`)
- Run `pnpm generate:types` after changing collection schemas
- Collection slugs must match their usage in code (e.g., `pages`, `posts`, `media`)
