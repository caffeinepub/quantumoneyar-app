# Quantumoney AR - Native Build Complete Guide
## Android AAB + iOS IPA Generation

**Build Version:** 200  
**Last Updated:** January 23, 2026  
**Package ID:** app.quantumoneyar.qmy  
**Status:** ✅ **READY FOR NATIVE PACKAGING**

---

## Executive Summary

This document provides complete instructions for generating native Android AAB and iOS IPA packages for Quantumoney AR, ready for submission to Google Play Store and Apple App Store.

### Build Outputs

- **Android AAB:** `android/app/build/outputs/bundle/release/app-release.aab`
- **iOS IPA:** Generated via Xcode Archive → Distribute workflow

---

## Prerequisites

### Required Software

#### For Android Builds
- **Node.js:** 18.x or higher
- **pnpm:** 8.x or higher
- **Java JDK:** 17 or higher
- **Android Studio:** Latest version
- **Android SDK:** API Level 33+
- **Gradle:** 8.x (included with Android Studio)

#### For iOS Builds (macOS only)
- **macOS:** 12.0 (Monterey) or higher
- **Xcode:** 14.0 or higher
- **CocoaPods:** Latest version
- **Apple Developer Account:** Required for distribution

### Installation Commands

