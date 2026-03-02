# Specification

## Summary
**Goal:** Unify authentication and canister configuration in quantumoneyar.app so it shares the exact same Internet Identity principal and backend canisters as quantumoney.app, eliminating duplicate profiles.

**Planned changes:**
- Configure the AuthClient in quantumoneyar.app to use `https://identity.ic0.app` as the sole identity provider
- Replace all canister ID constants with the canonical IDs from quantumoney.app:
  - Frontend/Website: `crjop-jyaaa-aaaah-atfaq-cai`
  - Gold Paper & Docs: `whu4t-kiaaa-aaaah-qsc5q-cai`
  - Governance/Treasury: `nemlr-6aaaa-aaaan-q32la-cai`
  - Logic: `ckmsk-taaaa-aaaah-atfca-cai`
  - QMY Ledger: `5o54h-giaaa-aaaad-aentq-cai`
- On app initialization, clear any stale localStorage/sessionStorage identity or session data from previous misconfigured sessions
- Force a fresh Internet Identity login if a stale session is detected

**User-visible outcome:** Logging in with the same Internet Identity account on both quantumoneyar.app and quantumoney.app produces the same principal, the same profile, XP, QMY balance, and gameplay history — no duplicate profiles.
