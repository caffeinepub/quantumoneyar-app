# Specification

## Summary
**Goal:** Fully rebuild the QuantumoneyAR PWA so that all player data (XP, QMY balances, spawns, profile) is sourced from the real ICP backend canister, the AR game is fully playable with lock/unlock/capture actions, and the HUD displays static realistic QMY coin images instead of floating animations.

**Planned changes:**
- Rebuild `backend/main.mo` to expose all required endpoints: `getPlayerState`, `claimWelcomeBonus` (idempotent, 100 XP + 100 unlocked QMY + 9×100 QMY monthly vesting), `lockCoin` (+10 XP), `unlockCoin` (-15 XP), `captureMonster` (+20 XP), `getSpawnList`, `getUserProfile`, `setDisplayName`, `setProfilePhoto`, and `getVestingSchedule`; all mutations authenticated via caller Principal
- Rebuild `GameStateContext` to fetch all player data from the canister on mount and window focus; expose `xp`, `lockedQMY`, `unlockedQMY`, `capturedMonsters`, `lockedCoins`, `vestingSchedule`, `refetch`, and `triggerWelcomeBonus`; remove localStorage-only derivations
- Rebuild `useArActions.ts` so `useLockCoin`, `useUnlockCoin`, and `useCaptureMonster` are React Query mutations calling the real canister endpoints; on success, invalidate the playerState query and update `arInteractionsStore`
- Rebuild `CameraARActionBar` to show contextual buttons: "Lock QMY" for unlocked coin spawns, "Unlock QMY" for locked coin spawns, "Rescue Monster" for uncaptured monster spawns — each with a loading spinner and XP delta toast on success; `SpawnCollectFX` shown after monster capture; lock/unlock actions available only on the AR page
- Add `useSpawnList` hook that fetches spawn data from the canister; `mockSpawns.ts` retained as fallback only (labeled with `// FALLBACK ONLY — used when canister is unreachable`)
- Rebuild HUD page: remove all floating/drifting coin animations; add static realistic 3D QMY coin images as decorative elements; keep animated space background; display canister-backed XP, locked QMY, unlocked QMY; add "Go to Quantumoney.app" button; show `WelcomeBonusModal` on first login and auto-trigger `claimWelcomeBonus`
- Rebuild Profile page to read all data from canister (displayName, XP, balances, captured monster count, vesting schedule); inline editable display name saved via `setDisplayName`; profile photo uploaded/loaded via `setProfilePhoto`; default avatar fallback
- Rebuild Leaflet map integration so locked coin markers and captured monster markers reflect real-time canister state via `arInteractionsStore`; map state updated via `postMessage` on `arInteractionsStore` changes

**User-visible outcome:** Players can log in, receive a one-time welcome bonus synced to the canister, see their real XP and QMY balances everywhere in the app, interact with AR spawns (lock coins, unlock coins, capture monsters) exclusively from the AR camera page with live canister updates, and view their profile and map with accurate real-time data matching Quantumoney.app.
