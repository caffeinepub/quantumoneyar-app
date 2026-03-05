# Specification

## Summary
**Goal:** Apply critical fixes to the Quantumoney AR app: enforce a single 1000 QMY registration bonus per ICP wallet, replace 2D coin images with animated 3D coins, redesign legal pages with responsive layouts, and clean up Caffeine references and OMY token symbol inconsistencies.

**Planned changes:**
- **Backend:** Record each registered ICP principal in stable storage; on registration, check if already registered — if yes, return a "welcome back" response with 0 QMY; if no, grant exactly 1000 QMY (100 unlocked + 900 locked over 9 months) and store the principal. Cap total registration supply at 100,000,000 QMY. Expose a query to check registration status.
- **Frontend (Registration flow):** On login, call the backend registration check; if already registered, show a "Welcome back!" modal with current QMY balance and vesting progress instead of the welcome bonus modal. Prevent duplicate bonus claim calls per session. Add i18n strings for "Welcome back!" in English and Portuguese.
- **Frontend (Home page):** Remove all static 2D QMY coin images and replace them with interactive 3D animated QMY coins using React Three Fiber — gold metallic material, ambient and point lighting, continuous rotation and bobbing animation via `useFrame`. Ensure the 3D canvas does not block existing UI interactions.
- **Frontend (Terms & Conditions):** Redo the layout of `Terms.tsx` to be fully responsive: sticky table of contents sidebar on desktop, collapsible accordion/dropdown navigation on mobile, clear typography hierarchy (h1/h2/h3), anchor links per section, and a back-to-top button. Preserve all content from `legalContent.ts`.
- **Frontend (Privacy Policy):** Redo the layout of `PrivacyPolicy.tsx` with the same responsive structure as the updated Terms page. Preserve all content from `legalContent.ts`.
- **Frontend (Caffeine cleanup):** Remove all "Caffeine" text from the entire frontend — Footer component, `index.html`, JSX/TSX files, and comments. Footer should only show social share links and "By HTgamers".
- **Frontend (Token symbol):** Audit all frontend source files and `legalContent.ts`; replace every occurrence of "OMY" (as a token name) with "QMY".

**User-visible outcome:** Users with an existing registered wallet see a "Welcome back!" screen instead of a duplicate bonus offer. The Home page displays animated 3D gold QMY coins. Legal pages are fully readable and navigable on all screen sizes. No "Caffeine" branding or "OMY" token symbol appears anywhere in the app.
