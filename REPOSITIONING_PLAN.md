# Tellora Media — US-first Repositioning Plan

Status: **Phase 0 and Phase 1 complete (partial: see below). Phase 2 complete. Awaiting answers before Phase 3.**

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


### Phase 2 shipped (with the defaults chosen because the Phase 2 questions were not answered)
- Header: "For US Businesses" appended to the nav (nothing removed/reordered); "US / International →" link in the top bar on desktop. The desktop dock now appears from 1280px up (below that the hamburger shows); this also fixes an existing bug where the hamburger button was pushed off-screen between 768 and 1180px.
- Homepage: client logo bar under hero (real Atoms logo + text placeholders), India/US/UK strip before How It Works, Atoms pinned first in THE RESULTS (links to its own page), GLOBAL stat card links to /us, dismissible geo hint banner (browser time zone, no external calls, dismissal in localStorage).
- Footer: "India HQ: Delhi, India" (street address TODO), hours, US contact lines (hidden until values set), trust badges (Google 5.0 only; Clutch/GoodFirms/DesignRush render once a profile URL is set).

### Phase 3 shipped
- Meta/OG for `/us`, `/for-electrical-contractors`, Atoms case study (placeholder OG images; wording adjusted per CLAIMS_LOG); `ProfessionalService` (US service-area instance, no address) + existing LocalBusiness (India HQ); `Service` schema on the electrical page (service pages already had it); `FAQPage` on `/us`; `BreadcrumbList` added to careers, careers/[id], seo-checker (other pages already had it)
- **Not done by design:** AggregateRating/Review schema (Google policy risk); sitemap entries for US pages stay behind `US_PAGES_LIVE`
- Analytics: `trackEvent` helper + 3 named events, documented in `ANALYTICS.md`. **GA4 may not be firing in production** (build workflow does not pass the Measurement ID). Not changed: deploy config is off-limits
- Lighthouse (mobile, simulated, gzip, local): `/us` 93, `/for-electrical-contractors` 91, home 89; CLS ~0, TBT 0; **LCP 3.2-3.7s (target 2.5s)**, sitewide cause (see status message)
- `submitContactForm` now returns whether the save succeeded

### Phase 4 shipped
- `/contact`: required "Where are you located?" dropdown (India / United States / United Kingdom / Other); region saved as its own field; response-time banner; success panel with hours + live IST/ET times; failed saves now show an error (previously false success); budget and timeline are now saved with the message (they were collected but dropped)
- `scripts/add-inbox-region.sql` + `SUPABASE_MASTER_SCHEMA.sql` updated. **Run the SQL in Supabase before deploying.** Until then the site retries without the column and puts `[Region: X]` in the message text, so no enquiry is lost (tested with a mocked Supabase)
- Admin inbox: region badge on every row and in the message header, plus a region filter
- Contact page time zones use real zones (DST-safe) instead of fixed offsets
- Email routing by region **not implemented** (TODO: Resend via Supabase edge function)
- Calendly: link button appears once `US_CONTACT.calendlyUrl` is set; no embed (needs third-party script approval)

### Phase 5 shipped
- Category "US Market Insights" + 3 scaffold posts (title, H2 outline as questions, TODO bodies, proper meta + BlogPosting/Breadcrumb schema)
- Posts carry `draft: true`: page exists but is `noindex`, hidden from `/blog`, the sitemap and related-post lists, and the category chip stays hidden until a non-draft post exists. Remove `draft` from a post once the body is written and approved
