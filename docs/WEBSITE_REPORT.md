# Optizaworks website report

Date: 28 July 2026

## Executive summary

Optizaworks is a working Next.js 15 agency website with an English/French public experience, a database-backed portfolio and content system, a protected admin area, and a persistent contact inbox. The repository has been cleaned and reorganized so browser UI, server implementation, and shared contracts have explicit boundaries.

The production build, TypeScript checks, ESLint checks, strict unused-code checks, database checks, and live route smoke tests all pass.

## Architecture

```text
app/                    Route composition and thin HTTP adapters
components/             Public and admin React UI
backend/
  admin/                CMS queries, mutations, and audit logging
  auth/                 Password hashing and database sessions
  contact/              Validation, throttling, and persistence
  content/              Published-content database queries
  db/                   Drizzle client, schema, seed, and migrations
  i18n/                 Request locale resolution
shared/
  admin/                Form definitions and safe shared types
  contact/              Contact API contract
  content/              Typed starter data and public DTOs
  i18n/                 Locale configuration and translations
public/                 Runtime images and logos only
docs/source-material/   Archived source references, excluded from runtime
```

This boundary keeps SQLite, Drizzle, password/session logic, rate limiting, and admin mutations out of client components. The generated browser chunks were scanned and contain no `better-sqlite3`, Node crypto, session-table, or contact-table signatures.

## Cleanup completed

- Removed the unused `ServiceCard` component and six obsolete placeholder project illustrations.
- Removed 26 duplicate image/logo files from the repository root.
- Removed the unused boxed logo and four superseded PNG project screenshots; the active transparent logo and optimized WebP screenshots remain.
- Removed generated logs and cache artifacts and added log files to `.gitignore`.
- Moved eight historical HTML reference pages into `docs/source-material` so they no longer obscure the application root.
- Removed stale exports, unused record types, unused localization helpers, and raw database exports.
- Consolidated three duplicated service-icon maps into one shared component registry.
- Split the former all-in-one admin action module into authentication, content, message, and audit modules.
- Split contact request/response types from server-only validation and persistence.
- Moved TypeScript incremental output into `.next/cache`.
- Removed the now-empty legacy `lib`, root `drizzle`, and `scripts` directories.

At least 45 obsolete/generated files were removed, reducing the repository by approximately 6.8 MiB while preserving all live content.

## Current functionality

- Public home, about, services, products, news, careers, references, contact, portfolio, and case-study routes.
- English/French locale switching via a validated locale cookie.
- Animated hero, service orbit, institution logo motion, selected work, FAQ, CTA, smooth scrolling, and reduced-motion handling.
- Filterable and paginated portfolio with 17 stored projects.
- Contact validation, honeypot protection, rate limiting, SQLite persistence, and admin inbox workflow.
- Admin authentication with scrypt password hashes, opaque sessions, secure cookie settings, and login throttling.
- Admin CRUD for projects, organizations, services, products, news, and FAQs, plus audit logging.

## Database condition

The Drizzle schema contains 11 application tables plus the migration journal. Current content counts verified against the active database:

| Content | Rows |
| --- | ---: |
| Projects | 17 |
| Organizations | 17 |
| Services | 8 |
| Products | 3 |
| FAQs | 5 |
| News items | 6 |
| Admin users | 1 |
| Contact messages | 0 |

All 21 unique images and logos referenced by database records exist under `public/`. A fresh temporary database also migrated and seeded successfully from the reorganized backend paths.

## Validation results

| Check | Result |
| --- | --- |
| `npm run typecheck` | Pass |
| ESLint with zero warnings | Pass |
| TypeScript unused locals/parameters | Pass |
| Next.js optimized production build | Pass |
| Browser-bundle backend leakage scan | Pass |
| English home route | 200, correct `lang` |
| French locale switch and home route | 200, correct `lang` |
| Filtered portfolio route | 200 |
| Admin login route | 200 |
| Invalid contact API request | 400 with stable error code |

Production build measurements:

- Shared first-load JavaScript: 103 kB
- Home route: 19.1 kB route code, 171 kB first load
- Portfolio route: 4.35 kB route code, 154 kB first load
- Contact route: 4.7 kB route code, 107 kB first load
- Source footprint: 69 TypeScript/TSX/CSS files, about 318 kB and 7,646 lines

## Quality estimates

These are engineering estimates from source inspection and the production build, not Lighthouse measurements from a controlled browser lab.

| Area | Estimate | Notes |
| --- | ---: | --- |
| Performance | 78/100 | Healthy bundle size and image components; animated hero remains the main cost. |
| Accessibility | 84/100 | Good semantic structure and reduced-motion support; a few small/low-contrast decorative labels need browser testing. |
| SEO | 74/100 | Core metadata and semantic pages exist; localized URLs, hreflang, sitemap, and structured data are still needed. |
| Best practices | 82/100 | Strong TypeScript and server boundaries; production headers and automated browser tests are missing. |
| Mobile responsiveness | 87/100 | Responsive layouts and reduced effects are implemented; low-end device profiling is still required. |
| Security | 81/100 | Solid session, hashing, validation, and throttling foundations; CSP, MFA, and proxy/IP configuration need deployment work. |
| Maintainability | 86/100 | Clear boundaries and shared types; large visual components and translation ownership can be decomposed further over time. |

## Performance risks

| Severity | Potential bottleneck | Expected effect | Recommended action | Worth fixing? |
| --- | --- | --- | --- | --- |
| Medium | Hero canvas, drone, meteor, particle, and motion layers | Extra hydration, animation work, and GPU usage on weaker devices | Profile on representative phones; dynamically load nonessential layers and keep off-screen/reduced-motion pauses | Yes, before a large campaign |
| Medium | Multiple continuous carousel/logo animations | Ongoing compositor work and battery consumption | Pause with Intersection Observer and when the document is hidden; expose a pause control for auto-moving content | Yes |
| Medium | Active source images up to 337 kB | Slower first uncached appearance if several are requested together | Convert the largest partner assets to modern formats and specify accurate responsive sizes | Yes |
| Low-Medium | Repeated backdrop blur on navigation and animated cards | Additional GPU compositing, especially on mobile Safari | Keep the current look but reduce blur strength/layers under mobile breakpoints | Only if profiling shows frame drops |
| Low | Framer Motion, Lenis, and icon dependencies | Adds client JavaScript, but current route bundles remain reasonable | Preserve selective imports and avoid placing animation providers on routes that do not use them | Monitor |
| Low | Dynamic locale cookie rendering | Reduces full-page caching opportunities rather than client FPS | Move to locale-prefixed routes if CDN caching and international SEO become priorities | Yes at scale |

No large 3D models, video backgrounds, external font downloads, or backend packages were found in browser chunks. Next/Image is used for displayed content imagery, and non-priority images use lazy loading by default.

## Accessibility and UX items still requiring browser verification

- Test keyboard and screen-reader behavior for every animated carousel control and admin form.
- Confirm the smallest hero/status text meets WCAG contrast at every viewport.
- Consider an explicit pause control for auto-moving content in addition to reduced-motion support.
- The navigation search control is visual but does not yet provide a complete search experience.
- Run real-device checks at 320 px width and with 200% text zoom.

## Production scaling assessment

The front-end architecture can scale to a larger production website without inherently becoming slow, provided animation layers are profiled and route-level loading remains selective.

The full application should not yet be horizontally scaled unchanged. SQLite is appropriate for local development or one persistent Node server, but not for ephemeral serverless filesystems or multiple writers. Before horizontal or serverless deployment:

1. Move the Drizzle connection from local SQLite to PostgreSQL or a managed libSQL/Turso service.
2. Add locale-prefixed URLs, hreflang, sitemap, robots, canonical URLs, and structured metadata.
3. Add integration and end-to-end tests for authentication, contact submission, CMS mutations, locale switching, and portfolio filtering.
4. Add a production CSP and other security headers; configure trusted proxy/IP handling and secret rotation.
5. Profile the animated home page on low/mid-range mobile hardware and lazy-load optional atmosphere effects.
6. Add object storage for admin-managed uploads and pagination to large admin datasets.
7. Initialize and use version control/remote backups if this workspace is not already backed up.

## Conclusion

The repository is substantially cleaner, the backend is visible and isolated, the current database content is intact, and the project passes all source/build checks. It is ready for continued development and a single-instance production deployment after environment secrets and deployment headers are configured. Database infrastructure, international SEO, automated tests, and real-device animation profiling are the main requirements before large-scale production use.
