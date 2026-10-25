# Analytics: US / International Funnel

## How tracking works
- GA4 loads through `gtag.js` in `src/components/analytics/GoogleAnalytics.tsx`. It only runs in **production builds** and only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set at build time.
- Page views are sent on every route change (including `/us`, `/for-electrical-contractors`, `/case-studies/atoms-electrical/`), so the new pages are covered once GA4 is active.
- There is **no Google Tag Manager** in the codebase. Events are sent with `gtag` and also pushed to `window.dataLayer`, so a GTM container can be added later without code changes.

> **TODO (blocker): verify GA4 is actually firing in production.** `.github/workflows/deploy.yml` does not pass `NEXT_PUBLIC_GA_MEASUREMENT_ID` to the build step (only the Supabase variables). Unless the ID is injected another way, the live site sends no analytics. We did not edit the deploy workflow; add the variable (as a GitHub Actions secret/variable) and redeploy, then confirm in GA4 Realtime.

## Conversion events
Defined in `src/lib/gtag.ts` (`trackEvent`). Mark these as **key events** in GA4 (Admin > Events).

| Event name | Fires when | Parameters | Where |
|---|---|---|---|
| `us_audit_booking_click` | Visitor clicks "Book a free 20-min audit" (links to the Calendly URL once `US_CONTACT.calendlyUrl` is set; to `/contact/` until then) | `location`: `hero`, `footer_cta`, `electrical_hero` | `/us`, `/for-electrical-contractors` |
| `electrical_audit_form_submit` | Free local SEO audit form is saved successfully | `form`: `local_seo_audit` | `/for-electrical-contractors` |
| `contact_region_selected` | Visitor picks a region in the contact form dropdown | `region`: India / United States / United Kingdom / Other | `/contact` (wired in Phase 4) |

### Notes and limits
- **Calendly:** with a plain link we can only measure the *click*, not a completed booking. Real booking events need the Calendly embed (its `calendly.event_scheduled` message), which requires approving a third-party script. TODO: revisit when the embed is approved.
- Events are no-ops when GA is not configured and never throw, so they cannot break a page.
- Test in GA4 **Realtime** / DebugView after the Measurement ID is set. Remember the geo banner uses the browser time zone, not analytics.

## Recommended GA4 setup (manual)
1. Create a comparison/segment for visitors from the United States.
2. Mark the three events above as key events.
3. Add an exploration: `/us` view -> `us_audit_booking_click` -> `electrical_audit_form_submit`.
