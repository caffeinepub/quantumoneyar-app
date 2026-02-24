# Quantumoney AR - Complete Native Mobile Build Guide
## Android AAB & iOS IPA Generation for Store Submission

**Version:** 1.0  
**Last Updated:** January 23, 2026  
**Build Target:** Capacitor 6+  
**App ID:** app.quantumoneyar.qmy  
**App Name:** Quantumoney AR

---

## Executive Summary

This guide provides complete step-by-step instructions for generating **Android AAB** and **iOS IPA** packages from the existing Quantumoney AR web application at https://quantumoneyar.app. The application is ready for native mobile packaging via Capacitor 6+ with all configurations in place.

**Timeline Estimate:** 2-3 business days for complete build and testing process.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Initial Setup](#2-initial-setup)
3. [Android AAB Generation](#3-android-aab-generation)
4. [iOS IPA Generation](#4-ios-ipa-generation)
5. [Data Persistence Verification](#5-data-persistence-verification)
6. [Device Testing](#6-device-testing)
7. [Store Submission](#7-store-submission)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Prerequisites

### Required Software

#### For Android Builds:
- **Node.js:** 18.x or 20.x LTS
- **npm/pnpm:** Latest version
- **Java JDK:** 17 (OpenJDK recommended)
- **Android Studio:** Latest stable version
- **Android SDK:** API Level 33+ (Android 13+)
- **Gradle:** 8.0+ (included with Android Studio)

#### For iOS Builds (macOS only):
- **macOS:** 12.0 (Monterey) or later
- **Xcode:** 14.0 or later
- **CocoaPods:** 1.11.0 or later
- **Apple Developer Account:** Required for signing

### Environment Variables

