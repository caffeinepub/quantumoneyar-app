# Specification

## Summary
**Goal:** Activate AR lock/unlock coin buttons, enable monster rescue in AR, sync AR interaction states to the map, fix footer positioning across all pages, and remove all "Caffeine" references from footers.

**Planned changes:**
- Activate the Lock and Unlock buttons in the AR camera view (CameraARActionBar) to call the existing `useLockCoin` and `useUnlockCoin` mutations, show loading states, and persist the updated lock state in `arInteractionsStore` and `mockGameplayState`.
- Enable monster rescue in the AR view via the action bar, calling the backend capture mutation, updating `mockGameplayState`, recording a `creature-capture` history event via `useGameplayHistory`, and playing a `SpawnCollectFX` animation on success.
- Sync Leaflet map spawn markers with the current lock/capture state from localStorage so locked coins and captured monsters appear with distinct marker styles after AR interactions.
- Reduce bottom padding/margin on the footer across all pages (Home, Profile, Map, AR, legal pages) so the footer appears closer to the last content section without shifting page content upward.
- Remove all "Caffeine" / "Built with Caffeine" / "Powered by Caffeine" attribution text and links from the Footer component and any other page-level footer text throughout the application.

**User-visible outcome:** Players can now lock and unlock coins directly in AR, rescue monsters visible in the AR camera, see those interactions reflected on the map, and all page footers appear with less dead space and no Caffeine branding.
