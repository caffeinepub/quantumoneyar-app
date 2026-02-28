# Specification

## Summary
**Goal:** Fix multiple UI bugs in the Profile page: incorrect Coins Captured count, broken XP bar visual fill, and truncated/unlinked canister IDs.

**Planned changes:**
- Fix "Coins Captured" stat in Profile.tsx to use `userStats.coins || walletBalance` instead of defaulting to 0
- Fix XP progress bar width calculation to use `Math.min((currentXP / nextLevelXP) * 100, 100)` so it visually reflects real XP progress
- Fix canister ID display to show full IDs without truncation, each wrapped in a clickable anchor linking to `https://icscan.io/canister/<id>` with `target="_blank"` for all five Carteira A canisters (Frontend, Ledger QMY, Logic, Docs, Governance)
- Ensure Game Stats section shows "Coins Captured", "Total QMY" (from QMY Ledger canister), and "Monsters" (captured/total format, e.g. "0/50")

**User-visible outcome:** The Profile page correctly displays the real wallet balance as Coins Captured, shows a properly filled XP bar, and renders all five canister IDs in full as clickable ICScan links.
