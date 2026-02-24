# Quantumoney AR - Complete Native Build Guide
## Capacitor 6+ Android AAB + iOS IPA Generation

**Version:** Build 200  
**Last Updated:** January 23, 2026  
**Package ID:** app.quantumoneyar.qmy  
**App Name:** Quantumoney AR  
**Status:** ✅ **READY FOR NATIVE PACKAGING**

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Quick Start](#quick-start)
4. [Step-by-Step Instructions](#step-by-step-instructions)
5. [Android AAB Build](#android-aab-build)
6. [iOS IPA Build](#ios-ipa-build)
7. [Testing on Real Devices](#testing-on-real-devices)
8. [Store Submission](#store-submission)
9. [Data Persistence Verification](#data-persistence-verification)
10. [Troubleshooting](#troubleshooting)

---

## Overview

This guide provides complete instructions for generating native mobile packages for Quantumoney AR using Capacitor 6+.

### Build Outputs

- **Android AAB:** `android/app/build/outputs/bundle/release/app-release.aab`
- **iOS IPA:** Generated via Xcode Archive workflow

### Architecture

- **Frontend:** React 19.1.0 + TypeScript + Vite
- **Mobile Framework:** Capacitor 6+ (WebView wrapper)
- **Backend:** ICP Canisters (ippxc-5iaaa-aaaae-qgwqq-cai + x5shd-hqaaa-aaaap-qrdgq-cai)
- **State Management:** React Query + GameStateContext
- **Styling:** Tailwind CSS (mobile-first)

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

