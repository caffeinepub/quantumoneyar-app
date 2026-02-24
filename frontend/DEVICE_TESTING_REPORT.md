# Quantumoney AR - Device Testing Report Template

**Date:** _________________  
**Tester:** _________________  
**Build Version:** 200  
**Package ID:** app.quantumoneyar.qmy

---

## Device Information

### Android Device
- **Model:** _________________
- **OS Version:** _________________
- **Screen Size:** _________________
- **RAM:** _________________

### iOS Device
- **Model:** _________________
- **OS Version:** _________________
- **Screen Size:** _________________
- **RAM:** _________________

---

## Installation Testing

### Android AAB Installation
- [ ] AAB file generated successfully
- [ ] File size: _______ MB
- [ ] Installation via bundletool successful
- [ ] App icon appears on home screen
- [ ] App launches without errors

**Notes:**
_________________________________________________________________
_________________________________________________________________

### iOS IPA Installation
- [ ] IPA file generated successfully
- [ ] File size: _______ MB
- [ ] Installation via Xcode/TestFlight successful
- [ ] App icon appears on home screen
- [ ] App launches without errors

**Notes:**
_________________________________________________________________
_________________________________________________________________

---

## Functional Testing

### Authentication & Profile
- [ ] Login with Internet Identity works
- [ ] User profile creation successful
- [ ] Profile editing works
- [ ] Language selection (PT/EN) persists
- [ ] Logout clears data properly

**Issues Found:**
_________________________________________________________________
_________________________________________________________________

### Camera & AR Functionality
- [ ] Camera permission prompt appears
- [ ] Camera feed displays correctly (no black screen)
- [ ] AR overlay elements visible
- [ ] Crosshair displays
- [ ] "Encontre moedas!" message shows
- [ ] Coin collection works (+1 QMY, +10 XP)
- [ ] Bloquear button functional
- [ ] Resgatar button functional
- [ ] Camera runs for 30+ minutes without issues

**Issues Found:**
_________________________________________________________________
_________________________________________________________________

### GPS & Location
- [ ] Location permission prompt appears
- [ ] GPS tracking works on map
- [ ] User location marker displays
- [ ] Nearby coins/monsters display
- [ ] Distance calculations accurate (within 10m)
- [ ] Map zoom controls work
- [ ] Map panning smooth

**Issues Found:**
_________________________________________________________________
_________________________________________________________________

### Wallet & Balances
- [ ] QMY balance displays correctly
- [ ] Locked QMY shows properly
- [ ] Vesting schedule visible
- [ ] Send QMY function works
- [ ] Receive QMY function works
- [ ] Transaction history loads
- [ ] Balance updates in real-time

**Issues Found:**
_________________________________________________________________
_________________________________________________________________

### DAO & Governance
- [ ] Proposals list loads
- [ ] Voting power calculated correctly (1 QMY = 1 vote)
- [ ] Vote submission works
- [ ] Vote confirmation appears
- [ ] Proposal creation (if balance ≥ 100K QMY)
- [ ] DAO canister ID displays (x5shd-hqaaa-aaaap-qrdgq-cai)

**Issues Found:**
_________________________________________________________________
_________________________________________________________________

### UI & Navigation
- [ ] Header displays correctly
- [ ] Logo visible
- [ ] Language flags functional
- [ ] Balance display accurate
- [ ] Bottom navigation works
- [ ] All 5 tabs functional (Profile, BCQ, DAO, AR, MAPA)
- [ ] Side drawer opens/closes
- [ ] All menu items accessible
- [ ] Page transitions smooth
- [ ] Responsive layout on device screen
- [ ] Safe area handling (notch/status bar)
- [ ] No UI overflow or clipping

**Issues Found:**
_________________________________________________________________
_________________________________________________________________

---

## Data Persistence Testing

### Initial State Recording
**Before Installation:**
- XP: _______
- Level: _______
- Available QMY: _______
- Locked QMY: _______
- Total QMY: _______
- Transaction Count: _______

### After Installation
**After Native App Login:**
- [ ] XP matches
- [ ] Level matches
- [ ] Available QMY matches
- [ ] Locked QMY matches
- [ ] Total QMY matches
- [ ] Transaction history present
- [ ] Vesting schedule intact
- [ ] User preferences preserved

**Issues Found:**
_________________________________________________________________
_________________________________________________________________

### Session Persistence
- [ ] Close app → Reopen: Data persists
- [ ] Logout → Login: Data restored
- [ ] Kill app → Relaunch: State maintained

**Issues Found:**
_________________________________________________________________
_________________________________________________________________

### Offline Functionality
- [ ] Enable airplane mode: App continues to work
- [ ] Cached data accessible offline
- [ ] Disable airplane mode: Sync resumes
- [ ] Changes sync correctly after reconnection

**Issues Found:**
_________________________________________________________________
_________________________________________________________________

### Cross-Device Sync
- [ ] Change on web app → Appears in native app
- [ ] Change in native app → Appears on web app
- [ ] Sync time: _______ seconds
- [ ] No data conflicts

**Issues Found:**
_________________________________________________________________
_________________________________________________________________

---

## Performance Testing

### Launch Performance
- [ ] Cold start time: _______ seconds (target: < 3s)
- [ ] Warm start time: _______ seconds
- [ ] Splash screen displays correctly

**Issues Found:**
_________________________________________________________________
_________________________________________________________________

### Runtime Performance
- [ ] Navigation smooth (no lag)
- [ ] Scrolling smooth
- [ ] Camera feed smooth (30+ FPS)
- [ ] No memory leaks (30+ min test)
- [ ] Battery drain acceptable
- [ ] No overheating

**Issues Found:**
_________________________________________________________________
_________________________________________________________________

### Stability
- [ ] No crashes during 1-hour test
- [ ] No freezes or hangs
- [ ] Error handling works
- [ ] Graceful degradation on errors

**Crashes/Errors:**
_________________________________________________________________
_________________________________________________________________

---

## Store Compliance

### Permissions
- [ ] Camera permission justified
- [ ] Location permission justified
- [ ] No unnecessary permissions requested
- [ ] Permission descriptions clear (Portuguese)

**Issues Found:**
_________________________________________________________________
_________________________________________________________________

### Content
- [ ] No prohibited content
- [ ] Age-appropriate (13+)
- [ ] No external payment systems
- [ ] No cryptocurrency trading interfaces
- [ ] Portuguese language content correct

**Issues Found:**
_________________________________________________________________
_________________________________________________________________

---

## Canister Connectivity

### ICP Integration
- [ ] Game canister accessible (ippxc-5iaaa-aaaae-qgwqq-cai)
- [ ] DAO canister accessible (x5shd-hqaaa-aaaap-qrdgq-cai)
- [ ] Canister calls successful
- [ ] Response times acceptable (< 2s)
- [ ] Error handling for canister failures

**Issues Found:**
_________________________________________________________________
_________________________________________________________________

---

## Critical Issues

List any critical issues that must be fixed before store submission:

1. _________________________________________________________________
2. _________________________________________________________________
3. _________________________________________________________________

---

## Minor Issues

List any minor issues that can be addressed in future updates:

1. _________________________________________________________________
2. _________________________________________________________________
3. _________________________________________________________________

---

## Overall Assessment

### Android Build
- [ ] **PASS** - Ready for Google Play Store submission
- [ ] **FAIL** - Critical issues must be fixed

**Summary:**
_________________________________________________________________
_________________________________________________________________

### iOS Build
- [ ] **PASS** - Ready for Apple App Store submission
- [ ] **FAIL** - Critical issues must be fixed

**Summary:**
_________________________________________________________________
_________________________________________________________________

---

## Recommendations

_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

## Sign-Off

**Tester Signature:** _________________  
**Date:** _________________  
**Status:** [ ] Approved  [ ] Rejected  [ ] Needs Revision

---

**© 2025 HTgamers - Quantumoney AR Device Testing Report**
