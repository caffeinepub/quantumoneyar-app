# Specification

## Summary
**Goal:** Final sync pass for QuantumoneyAR covering profile photo uploads, monster capture XP reward, animated home background, footer ICP reference, and editable display name.

**Planned changes:**
- Add profile photo upload on the Profile page: an "Edit Photo" button opens a file picker, the selected image is stored as a blob in the backend per principal, and displayed in both the Profile page header and the Header auth dropdown (fallback to default avatar if none set).
- Award +20 XP to the player when a monster is successfully rescued in the AR camera view; apply the XP mutation to the backend, update GameStateContext immediately, reflect in the Header balance display, Profile XP counter, and gameplay history.
- Render the existing HomeSpaceBackground canvas as a full-screen animated backdrop on the Home/HUD page with twinkling stars, floating planets, comets, and drifting golden ICP and QMY coin images; background must not appear on other pages.
- Add an ICP reference to the Footer component showing the ICP logo/icon and a "Powered by ICP" label linking to https://internetcomputer.org, displayed alongside the existing social share links (WhatsApp, X, Telegram, Instagram), with no Caffeine branding.
- Display and allow inline editing of the authenticated user's display name on the Profile page, fetched from and persisted to the backend actor, reflected in the Header auth dropdown after saving.

**User-visible outcome:** Users can upload a profile photo and edit their display name on the Profile page; capturing a monster awards +20 XP immediately; the Home page shows a lively animated space background; the footer shows a "Powered by ICP" badge alongside social share links.
