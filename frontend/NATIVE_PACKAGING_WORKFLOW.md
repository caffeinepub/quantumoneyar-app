# Quantumoney AR - Native Mobile Packaging Workflow
## Complete Guide for Android AAB & iOS IPA Generation

**Project:** Quantumoney AR  
**Version:** Build 200  
**Package ID:** app.quantumoneyar.qmy  
**Last Updated:** January 23, 2026  
**Status:** ✅ **READY FOR NATIVE PACKAGING**

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Quick Start](#quick-start)
4. [Android AAB Build](#android-aab-build)
5. [iOS IPA Build](#ios-ipa-build)
6. [Data Persistence Verification](#data-persistence-verification)
7. [Store Submission](#store-submission)
8. [Testing Checklist](#testing-checklist)
9. [Troubleshooting](#troubleshooting)
10. [Timeline Estimate](#timeline-estimate)

---

## 🎯 Overview

This workflow provides complete instructions for generating native mobile packages from the Quantumoney AR Progressive Web App using Capacitor 6+.

### What You'll Generate

| Platform | Output Format | File Name | Location |
|----------|--------------|-----------|----------|
| **Android** | AAB (App Bundle) | `quantumoneyar-release.aab` | `android/app/build/outputs/bundle/release/` |
| **iOS** | IPA (App Archive) | `QuantumoneyAR.ipa` | Generated via Xcode Organizer |

### Architecture Confirmation

- ✅ **PWA Base:** React 19.1.0 + TypeScript 5.8.3 + Vite 5.4.1
- ✅ **Mobile Framework:** Capacitor 6+ (WebView wrapper)
- ✅ **Backend:** ICP Canisters (ippxc-5iaaa-aaaae-qgwqq-cai + x5shd-hqaaa-aaaap-qrdgq-cai)
- ✅ **State Management:** React Query + GameStateContext
- ✅ **Styling:** Tailwind CSS 3.4.17 (mobile-first)
- ✅ **Language:** Portuguese (PT-BR) with English (EN-US) support

---

## 🔧 Prerequisites

### Required Software

#### For Android Build

| Software | Version | Installation |
|----------|---------|--------------|
| **Node.js** | 20.x or higher | [nodejs.org](https://nodejs.org) |
| **pnpm** | 8.x or higher | `npm install -g pnpm` |
| **Java JDK** | 17 or higher | [adoptium.net](https://adoptium.net) |
| **Android Studio** | Latest | [developer.android.com](https://developer.android.com/studio) |
| **Android SDK** | API 33+ | Via Android Studio |
| **Gradle** | 8.x | Included with Android Studio |

#### For iOS Build (macOS Only)

| Software | Version | Installation |
|----------|---------|--------------|
| **macOS** | 12.0+ | Required |
| **Xcode** | 15.0+ | Mac App Store |
| **CocoaPods** | 1.12+ | `sudo gem install cocoapods` |
| **Node.js** | 20.x or higher | [nodejs.org](https://nodejs.org) |
| **pnpm** | 8.x or higher | `npm install -g pnpm` |

### Environment Setup

