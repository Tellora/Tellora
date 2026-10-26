# Website TODOs: US / International Repositioning

Every open item from the repositioning work, grouped by type. File and line references are accurate as of the final commit of this work (search the repo for `TODO` to re-find any of them). Related docs: `CLAIMS_LOG.md` (basis for each public claim), `ANALYTICS.md`, `REPOSITIONING_PLAN.md`.

## 0. How to publish the US pages

The two new US pages (`/us`, `/for-electrical-contractors`) are deliberately **noindex and left out of the sitemap** because they still hold placeholder content.

1. Fill in the items below (at minimum: sections 1 to 4 and the claims in section 6).
2. In `src/lib/seo.ts`, change `US_PAGES_LIVE` from `false` to `true`. This removes `noindex` from both pages and adds them to `sitemap.xml`.
3. Run `scripts/add-inbox-region.sql` in the Supabase SQL editor (before deploying the region-aware contact form; see section 7).
4. Deploy, then in Google Search Console submit `/sitemap.xml` and request indexing for `/us/` and `/for-electrical-contractors/`.
5. Blog drafts publish separately: remove `draft: true` from a post in `src/data/blog-posts.ts` once its body is written (section 2).

---

## 1. Links and contact details

| Item | Where | Notes |
|---|---|---|
| Calendly US audit link | `src/lib/seo.ts:31` (`US_CONTACT.calendlyUrl`) | One value powers the CTA buttons on `/us`, `/for-electrical-contractors` and the contact confirmation. Until set, the buttons go to `/contact/`. Also referenced at `us/page.tsx:48`, `for-electrical-contractors/page.tsx:38` |
| Calendly **embed** | `us/page.tsx:216`, `ContactForm.tsx:80` | Needs approval for a third-party script. Link buttons are used instead. Also needed to track real bookings (see `ANALYTICS.md`) |
| US email address | `src/lib/seo.ts:29` (`US_CONTACT.email`) | Confirm the mailbox exists (e.g. us@telloramediahq.com). Shows in the footer and `/us` once set |
| US phone number | `src/lib/seo.ts:30` (`US_CONTACT.phone`), `Footer.tsx:144` | Shows in the footer once set |
| Clutch, GoodFirms, DesignRush profile links | `src/components/TrustBadges.tsx:9-11` | A badge appears automatically once a URL is set. Also add to the footer by editing nothing else |
| Atoms Electrical testimonial (Adam Holes) | `for-electrical-contractors/page.tsx:125`; `case-studies.ts:282` | Only publish a real, approved quote |
| Region-based email routing | `src/lib/store.ts:139` | **Not implemented.** Recommended: Resend (3,000 free emails/month) via a Supabase edge function. Routing plan: India to abhay@telloramediahq.com, US to the US address, UK/Other to both |
| Live Google reviews widget | `src/components/Testimonials.tsx:104` (slot marked `LIVE-REVIEWS-WIDGET-SLOT` at line 184) | Decide between Elfsight (~$10/mo, no backend) or Google Places API + Supabase edge function (free up to quota, needs key management). One change updates homepage, `/us` and `/contact` |
| GA4 Measurement ID in the build | `ANALYTICS.md:8` | **Blocker to verify:** `.github/workflows/deploy.yml` does not pass `NEXT_PUBLIC_GA_MEASUREMENT_ID`, so GA4 may not be recording on the live site. Not edited because deploy configs were out of scope |

## 2. Copy

| Item | Where |
|---|---|
| Atoms Electrical: client's starting situation (challenge) | `src/data/case-studies.ts:241` |
| Atoms Electrical: confirm specifics of each workstream | `src/data/case-studies.ts:243` |
| Atoms Electrical: confirm "strategic insight" line | `src/data/case-studies.ts:245` |
| Atoms Electrical: confirm SEO title/description once results approved | `src/data/case-studies.ts:284` |
| `/us` FAQ: day-to-day tools and weekly rhythm | `src/data/us-market.ts:103` |
| `/us` FAQ: communication channels | `src/data/us-market.ts:108` |
| `/us` FAQ: Local Services Ads wording (verification / background-check support) | `src/data/us-market.ts:113` |
| `/us` FAQ: reporting cadence | `src/data/us-market.ts:118` |
| `/us` FAQ: engagement length and pricing model | `src/data/us-market.ts:127` |
| Remove literal "TODO:" text from the FAQ answers above (they are also in the FAQ schema) | `src/data/us-market.ts` |
| Blog draft 1: "How US electrical contractors can win local SEO in 2026": intro and 5 section bodies | `src/data/blog-posts.ts:257-267` |
| Blog draft 2: "Google LSAs vs. Google Ads": intro and 5 bodies (verify against current Google docs) | `src/data/blog-posts.ts:283-293` |
| Blog draft 3: "Why US small businesses are hiring Indian marketing agencies": intro and 5 bodies (no unsourced statistics) | `src/data/blog-posts.ts:309-319` |
| Blog drafts: real read times | `src/data/blog-posts.ts:250, 276, 302` |
| Contact page: reconcile the old "return a custom growth plan within 24 hours" line, "Global Office 24/7 Active" and "taking on 2 new partners" with the new commitments | `src/app/(site)/contact/ContactClient.tsx` (intro paragraph and Active Hours card) |
| Confirm the UK mention ("India, the US, and the UK") | `src/components/RegionStrip.tsx:1` |

## 3. Assets

| Item | Where |
|---|---|
| Designed OG images (currently copies of existing images) for `/us`, `/for-electrical-contractors`, Atoms case study | `public/og-us.png`, `public/og-electrical.png`, `public/og-atoms.png`; referenced at `us/page.tsx:41`, `for-electrical-contractors/page.tsx:30` |
| Real Atoms Electrical hero image (currently a generic Unsplash stock photo labelled with the client's name) | `src/data/case-studies.ts` (`atoms-electrical.image`) |
| Logo file mapping for `public/clients/` (files are unlabeled) and missing logos for Goodlife, Air Right, Ella Creations, Astrology Light, US footwear brand | `src/components/ClientLogoBar.tsx:6`, `src/data/us-market.ts:26-32`, `src/components/us/ClientLogo.tsx:6` |
| Confirm the Atoms logo file (`clientlogo (9).png`) | `src/data/us-market.ts:28` |
| Cover images for blog drafts | `src/data/blog-posts.ts:251, 277, 303` |
| Replace chart placeholders with real charts | `src/components/us/ChartPlaceholder.tsx:3`; used by `case-studies/[slug]/page.tsx` Results section |

## 4. Data (needs real numbers; do not invent)

| Item | Where |
|---|---|
| Atoms Electrical engagement start date and current duration | `src/data/case-studies.ts:270` |
| 90-day / 6-month / 12-month milestones | `src/data/case-studies.ts:270` (`timeline`) |
| Before/after traffic, leads and revenue; permission to publish numbers | `src/data/case-studies.ts:260, 276` |
| US D2C footwear brand: scope of work and results (case study page not built) | `src/data/us-market.ts:73, 89` |
| ALFA case study: no data exists on the site (page not built) | n/a |
| Goodlife Diagnostics and Air Right: existing copy is unverified (the Atoms copy was placeholder, so these may be too) | `src/data/case-studies.ts`; `src/data/us-market.ts:94` |
| Supabase: check the `case_studies` table for an `atoms-electrical` row that still holds the old Utrecht copy. The page prefers some database fields (title, description, image) over the code copy | Supabase / admin panel |
| Hero "GLOBAL / CLIENT REACH" stat is stored in the admin panel and overrides the code default; the card is linked to `/us` by code either way | Admin panel > company stats |

## 5. Business details

| Item | Where |
|---|---|
| Correct India HQ address (old code said Shahdara, SEO notes say South Extension II) and pincode | `src/components/Footer.tsx:135` (shows only "Delhi, India"), `src/app/(site)/contact/ContactClient.tsx:32` (still shows the Shahdara street address publicly). The street address is deliberately omitted from Organization/LocalBusiness schema until confirmed |
| US office or virtual office (add a US address/phone to the US schema only if real) | `src/components/seo/schema/ProfessionalServiceSchema.tsx:8` |

## 6. Legal and claims (see `CLAIMS_LOG.md` for the full list)

| Claim | Status |
|---|---|
| "5.0 on Google, 10+ verified reviews": re-check the count and rating on the day of publishing | Verified by owner; re-check |
| "Typically priced 40-60% below comparable US agencies": keep evidence (e.g. several US agency quotes) | Pending evidence |
| "You own your ad accounts, website, creative, and all data from day one": confirm contracts match | Pending contract check |
| "We respond to inquiries within 4 business hours (IST or EST)": confirm someone owns this | Pending |
| "Serving clients across India, the US, and the UK": confirm a UK client exists | Pending |
| Permission to show client names and logos (logo bar, mini case cards, footwear brand) | Pending permission |
| US footwear brand: permission to name it | Pending permission |
| Review/AggregateRating schema deliberately **not** added (Google does not show stars for a business's own reviews, and misleading markup risks a manual action) | Omitted by design |

## 7. Technical and infrastructure

| Item | Notes |
|---|---|
| Run `scripts/add-inbox-region.sql` in Supabase | Adds `inbox_messages.region`. Until it runs, the site still saves every message and keeps the region inside the message text, but the admin region filter will not find those |
| Confirm Supabase row-level security allows anonymous inserts into `inbox_messages` | The contact and audit forms now show an error when a save fails (previously they showed false success), so a blocked insert becomes visible |
| `hreflang` | Not added, as instructed. Add only if the site is later split into regional variants (e.g. `/us/` as a full variant) |
| Core Web Vitals | Lighthouse mobile on a gzip-served production build: `/us` 93, `/for-electrical-contractors` 91, home 89, CLS about 0, blocking time 0. **LCP is 3.2-3.7s (target under 2.5s)** on all pages including the old homepage. About 86% is render delay, so the cause is site-wide (hydration, preloader overlay, or font swap), not the new pages. Needs a separate decision. Make sure the live host compresses assets |
| Run Lighthouse against the live site once deployed | The local numbers above are simulated |
| Mark the three new events as key events in GA4 | See `ANALYTICS.md` |

## 8. Deferred scope (not built; waiting on facts)

- Case study page for the US D2C footwear brand
- Case study page for ALFA
- Rebuilding the Goodlife Diagnostics and Air Right case studies to the new template
- Calendly embed
- Region-based email routing
- Live Google reviews widget
- Clutch / GoodFirms / DesignRush badges (need live profiles)
- Designed OG images
