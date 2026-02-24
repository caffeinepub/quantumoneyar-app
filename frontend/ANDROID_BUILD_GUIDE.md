# Android Build Guide - Quantumoney AR

Complete guide for building and submitting Quantumoney AR to Google Play Store.

**Last Updated:** February 10, 2026  
**Version:** 1.0

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Keystore Generation](#keystore-generation)
3. [Build Configuration](#build-configuration)
4. [Building the AAB](#building-the-aab)
5. [Testing the Build](#testing-the-build)
6. [Google Play Store Submission](#google-play-store-submission)
7. [Privacy Policy Requirements](#privacy-policy-requirements)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

1. **Node.js 18+**
   - Download: https://nodejs.org/
   - Verify: `node --version`

2. **pnpm**
   - Install: `npm install -g pnpm`
   - Verify: `pnpm --version`

3. **Java JDK 17+**
   - Download: https://adoptium.net/
   - Verify: `java --version`
   - Set `JAVA_HOME` environment variable

4. **Android SDK**
   - Option A: Install Android Studio (recommended)
     - Download: https://developer.android.com/studio
     - Install Android SDK through Android Studio
   - Option B: Install command-line tools only
     - Download: https://developer.android.com/studio#command-tools
   - Set `ANDROID_HOME` or `ANDROID_SDK_ROOT` environment variable

5. **Capacitor CLI**
   - Installed automatically via pnpm

### Environment Variables

Add to your shell profile (`~/.bashrc`, `~/.zshrc`, etc.):

