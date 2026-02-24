# Quantumoney AR - Native Mobile Packaging Guide
## Android AAB + iOS IPA Generation for Store Submission

**Version:** 1.0  
**Date:** January 23, 2026  
**Web App:** https://quantumoneyar.app  
**Package ID:** app.quantumoneyar.qmy  
**Build System:** Capacitor 6+

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Quick Start](#quick-start)
4. [Android AAB Build](#android-aab-build)
5. [iOS IPA Build](#ios-ipa-build)
6. [Data Persistence Verification](#data-persistence-verification)
7. [Testing on Real Devices](#testing-on-real-devices)
8. [Store Submission](#store-submission)
9. [Troubleshooting](#troubleshooting)

---

## Overview

This guide provides complete instructions for generating native mobile packages (Android AAB and iOS IPA) for Quantumoney AR. The application is built as a hybrid app using Capacitor 6+, which wraps the existing web application at https://quantumoneyar.app in a native WebView container.

### Architecture

- **Web App:** https://quantumoneyar.app (React + TypeScript + Tailwind CSS)
- **Backend:** Internet Computer Protocol (ICP) canisters
  - Game Canister: `ippxc-5iaaa-aaaae-qgwqq-cai`
  - DAO Canister: `x5shd-hqaaa-aaaap-qrdgq-cai`
- **Mobile Framework:** Capacitor 6+ (WebView wrapper)
- **Data Persistence:** ICP Canisters + localStorage + Capacitor Storage

### Key Features

✅ Fullscreen WebView execution (no browser UI)  
✅ Native camera access for AR functionality  
✅ GPS/location services for geo-based gameplay  
✅ Persistent data across sessions and devices  
✅ Offline functionality with local cache  
✅ Store-compliant permissions and content  

---

## Prerequisites

### Required Software

#### For Android AAB

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **pnpm** package manager: `npm install -g pnpm`
- **Java JDK** 17+ ([Download](https://adoptium.net/))
- **Android Studio** ([Download](https://developer.android.com/studio))
- **Android SDK** (installed via Android Studio)
- **Gradle** (included with Android Studio)

#### For iOS IPA (macOS only)

- **macOS** 12.0+ (Monterey or later)
- **Xcode** 14+ ([Download from App Store](https://apps.apple.com/app/xcode/id497799835))
- **CocoaPods**: `sudo gem install cocoapods`
- **Apple Developer Account** (for code signing)

### Environment Setup

