# Quantumoney AR - Mobile Deployment Guide

## Overview
This guide provides instructions for deploying Quantumoney AR to mobile app stores (Google Play Store and Apple App Store).

## Build Configuration

### Progressive Web App (PWA)
The application is configured as a PWA with:
- **Manifest**: `/public/manifest.json` with complete app metadata
- **Service Worker**: `/public/service-worker.js` for offline caching
- **Icons**: App icon at `/public/assets/generated/app-icon.dim_512x512.png`
- **Splash Screen**: `/public/assets/generated/splash-screen.dim_1080x1920.png`

### Build Process
1. Run the production build:
   ```bash
   npm run build
   ```
2. The output will be in the `dist/` directory

## Android Deployment (Google Play Store)

### Option 1: Trusted Web Activity (TWA) - Recommended
TWA allows you to package your PWA as a native Android app.

#### Prerequisites
- Android Studio installed
- Java Development Kit (JDK) 11 or higher
- Google Play Console account

#### Steps:
1. **Install Bubblewrap CLI**:
   ```bash
   npm install -g @bubblewrap/cli
   ```

2. **Initialize TWA Project**:
   ```bash
   bubblewrap init --manifest https://your-domain.com/manifest.json
   ```

3. **Configure Digital Asset Links**:
   - Create `.well-known/assetlinks.json` on your server
   - Add your app's package name and SHA-256 fingerprint

4. **Build APK**:
   ```bash
   bubblewrap build
   ```

5. **Generate Signed APK**:
   - Create a keystore:
     ```bash
     keytool -genkey -v -keystore quantumoney-release.keystore -alias quantumoney -keyalg RSA -keysize 2048 -validity 10000
     ```
   - Sign the APK using Android Studio or command line

6. **Upload to Google Play Console**:
   - Create a new app listing
   - Upload the signed APK
   - Complete store listing with screenshots and descriptions
   - Submit for review

### Option 2: WebView Wrapper
Use a WebView wrapper like Apache Cordova or Capacitor.

#### Using Capacitor:
