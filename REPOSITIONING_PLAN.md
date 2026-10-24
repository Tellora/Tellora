# Tellora Media — US-first Repositioning Plan

Status: **Phase 0 and Phase 1 complete (partial: see below). Awaiting answers before Phase 2.**

### Phase 1 shipped
- `/us`, `/for-electrical-contractors`, rebuilt `/case-studies/atoms-electrical/` (real client facts, TODO placeholders for metrics/timeline/testimonial)
- `CLAIMS_LOG.md` created; `US_PAGES_LIVE = false` flag keeps new US pages `noindex` and out of the sitemap until TODOs are filled
- **Deferred (waiting on facts):** US footwear case study page; ALFA case study (no data exists); polishing Goodlife / Air Right pages (existing copy unverified)
- Calendly embed deferred (third-party script needs approval); link button used instead

## Phase 0 — Discovery

| Question | Finding |
|---|---|
| Framework | Next.js **14.2.35** (App Router), React 18.2, TypeScript, `output: "export"` (fully static export, `trailingSlash: true`) |
| Routing | File-based App Router. Public pages live in `src/app/(site)/…` (route group with shared layout); admin in `src/app/admin`. Dynamic routes (`[slug]`) must export `generateStaticParams` + `dynamicParams = false` |
| Styling | Tailwind CSS 3.4 + a neubrutalist utility layer in `src/styles/globals.css` (`brutalist-border`, `brutalist-card`, shadows, `heading-massive`, etc.). Colors via CSS vars (`--primary` yellow, `--accent` purple, `--secondary` red). Fonts via `next/font/google` (Plus Jakarta Sans + Outfit, `display: swap`) |
| Animation | framer-motion + Lenis smooth scroll; shared helpers in `src/components/animations/ScrollChoreography.tsx` |
| Content source | Mixed: hardcoded TS data (`src/data/case-studies.ts`, `blog-posts.ts`, `service-pages.ts`, `team.ts`), **Supabase** tables fetched client-side (services, jobs, FAQs, team, settings) and at build time (case study / blog slugs). `getClients()` currently returns `[]`, so the homepage `LogoCloud` renders nothing |
| SEO / meta | Next Metadata API (`export const metadata` / `generateMetadata`), central `SEO_CONFIG` + `getCanonicalUrl` in `src/lib/seo.ts`, JSON-LD components in `src/components/seo/schema/*`, `src/app/sitemap.ts`, `src/app/robots.ts`. No `next-seo` |
| Analytics | GA4 via `src/components/analytics/GoogleAnalytics.tsx` + `src/lib/gtag.ts` (`event()` helper), production-only, needs `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Social pixels in `SocialPixels.tsx` |
| Case-study structure | `src/data/case-studies.ts` (`CaseStudy` interface: summary, challenge, execution, strategicInsight, roadmap[], techStack, stats[], links) rendered by one template `src/app/(site)/case-studies/[slug]/page.tsx`; list at `case-studies/CaseStudiesClient.tsx`; homepage grid in `components/WorkShowcase.tsx` (maps `caseStudies`) |
| Nav / footer | `src/components/Header.tsx` (flat `navLinks` array, desktop dock + full-screen mobile menu, no dropdown), `src/components/Footer.tsx` (CTA, link columns, newsletter, "Global Office" HQ block), plus mobile `MobileDock.tsx` |
| Contact | `ContactClient.tsx` + `components/ContactForm.tsx` → `submitContactForm()` writes to Supabase `inbox_messages` (shown in admin inbox). No email sending / server code exists |

## Contradictions and blockers found (need your answers — see end of Phase 0 message)

1. **Atoms Electrical data conflicts with the brief.** `src/data/case-studies.ts` describes Atoms as *"based in Utrecht"*, services = Content Creation + Social Media, stats = "12% engagement". The brief says *Eureka, MO*, local SEO / GMB / Google Ads. One of them is wrong.
2. **"Live Google reviews widget, not hardcoded"** cannot be built without a third-party embed script (Elfsight, Trustindex, etc.) or a Places API key + server, and this is a static export. That is a new dependency/key.
3. **Contact routing to different inboxes** (India → abhay@, US → us@, UK/Other → both) needs a backend or email service. The site is static; today it only writes to Supabase.
4. **Unverified claims in the brief copy** ("5.0 ⭐ / 10+ verified reviews", "40–60% cost advantage", "20+ qualified leads per month", "senior strategists on every account", "9am–5pm EST availability") — I will use your copy as written but tag each with `TODO: verify` in `WEBSITE_TODOS.md` unless told otherwise.

## Files to create / modify (planned) — ~38 files

### Phase 1 — New pages (11)
- CREATE `src/app/(site)/us/page.tsx`, `src/app/(site)/us/UsClient.tsx`
- CREATE `src/app/(site)/for-electrical-contractors/page.tsx`, `.../ElectricalClient.tsx`
- CREATE `src/data/us-market.ts` (copy, FAQs, mini case cards, services — single source for pages + schema)
- MODIFY `src/data/case-studies.ts` (rewrite Atoms; add US footwear (anonymised), ALFA; extend interface with optional `location`, `results`, `timeline`, `testimonial`)
- MODIFY `src/app/(site)/case-studies/[slug]/page.tsx` (render new optional sections: timeline, results placeholders, pull-quote, CTA)
- CREATE `src/components/us/ChartPlaceholder.tsx`, `src/components/us/FaqAccordion.tsx` (reuse existing FAQ styling)
- CREATE `public/og-us.png`, `public/og-electrical.png`, `public/og-atoms.png` (placeholders, marked TODO)

### Phase 2 — Homepage / nav / footer (9)
- MODIFY `src/components/Header.tsx` (add "US / International →" CTA + "For US Businesses" link; nothing removed/reordered)
- MODIFY `src/components/Footer.tsx` (HQ block, hours, US contact, trust badges)
- MODIFY `src/components/Hero.tsx` (GLOBAL stat → link to `/us`)
- MODIFY `src/components/WorkShowcase.tsx` (pin Atoms first)
- MODIFY `src/app/(site)/HomeClient.tsx` (logo bar, region strip, geo banner mount)
- CREATE `src/components/GeoHintBanner.tsx` (dismissible, localStorage)
- CREATE `src/components/ClientLogoBar.tsx`, `src/components/RegionStrip.tsx`
- MODIFY `src/components/MobileDock.tsx` only if needed (not planned)

### Phase 3 — SEO / schema / tracking (9)
- MODIFY `src/lib/seo.ts` (US contact constants), `src/app/sitemap.ts`
- CREATE `src/components/seo/schema/ProfessionalServiceSchema.tsx`, `ReviewSchema.tsx` (AggregateRating + Review)
- MODIFY `src/components/seo/schema/OrganizationSchema.tsx` (link both locations), `LocalBusinessSchema.tsx`
- MODIFY `src/lib/gtag.ts` (named event helpers)
- CREATE `ANALYTICS.md`
- MODIFY `src/components/Breadcrumbs.tsx` only if gaps found

### Phase 4 — Contact (3)
- MODIFY `src/app/(site)/contact/ContactClient.tsx`, `src/components/ContactForm.tsx`, `src/lib/store.ts` (region field stored with message)

### Phase 5 — Blog (3)
- MODIFY `src/data/blog-posts.ts` (new category + 3 TODO-body posts), `blog/BlogClient.tsx` (category chip), `blog/[slug]/page.tsx` (render placeholder state)

### Phase 6 — Trust signals (3)
- CREATE `src/components/TrustBadges.tsx`, `ResponseTimeBanner.tsx`, `OwnershipNote.tsx`, `GoogleReviewsWidget.tsx` (placeholder until embed choice is made)

### Phase 7 — Docs (2)
- CREATE `WEBSITE_TODOS.md`; update this file with shipped vs planned

## Files over 500 lines expected to be touched
None planned (largest touched: `case-studies.ts` ≈310 lines, `Header.tsx` ≈260).

## Not touched
`.env*`, `.dev.vars`, `.github/workflows/deploy.yml`, `next.config.js`, `public/_headers`, `node_modules`.
