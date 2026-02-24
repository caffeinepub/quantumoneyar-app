#!/bin/bash

# Quantumoney AR - Android Build Script
# Generates Android App Bundle (AAB) for Google Play Store submission

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Quantumoney AR - Android Build Script${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    echo "Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}Error: pnpm is not installed${NC}"
    echo "Install with: npm install -g pnpm"
    exit 1
fi

if ! command -v java &> /dev/null; then
    echo -e "${RED}Error: Java JDK is not installed${NC}"
    echo "Please install JDK 17+ from https://adoptium.net/"
    exit 1
fi

# Check for Android SDK
if [ -z "$ANDROID_HOME" ] && [ -z "$ANDROID_SDK_ROOT" ]; then
    echo -e "${RED}Error: Android SDK not found${NC}"
    echo "Please set ANDROID_HOME or ANDROID_SDK_ROOT environment variable"
    echo "Install Android Studio or Android SDK command-line tools"
    exit 1
fi

echo -e "${GREEN}✓ All prerequisites met${NC}"
echo ""

# Build type selection
BUILD_TYPE="${1:-release}"

if [ "$BUILD_TYPE" != "release" ] && [ "$BUILD_TYPE" != "debug" ]; then
    echo -e "${RED}Error: Invalid build type '$BUILD_TYPE'${NC}"
    echo "Usage: $0 [release|debug]"
    exit 1
fi

echo -e "${BLUE}Build Type: ${BUILD_TYPE}${NC}"
echo ""

# Step 1: Install dependencies
echo -e "${YELLOW}Step 1: Installing dependencies...${NC}"
pnpm install
echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# Step 2: Build web app
echo -e "${YELLOW}Step 2: Building web application...${NC}"
pnpm run build:skip-bindings
echo -e "${GREEN}✓ Web app built${NC}"
echo ""

# Step 3: Sync with Capacitor
echo -e "${YELLOW}Step 3: Syncing with Capacitor...${NC}"
if [ ! -d "android" ]; then
    echo "Initializing Capacitor Android platform..."
    npx cap add android
fi
npx cap sync android
echo -e "${GREEN}✓ Capacitor sync complete${NC}"
echo ""

# Step 4: Build Android package
echo -e "${YELLOW}Step 4: Building Android package...${NC}"

cd android

if [ "$BUILD_TYPE" = "release" ]; then
    echo -e "${BLUE}Building release AAB (Android App Bundle)...${NC}"
    echo ""
    echo -e "${YELLOW}IMPORTANT: Signing Configuration Required${NC}"
    echo "Before building for release, ensure you have configured signing in:"
    echo "  android/app/build.gradle"
    echo ""
    echo "Required signing configuration:"
    echo "  - Keystore file path"
    echo "  - Keystore password"
    echo "  - Key alias"
    echo "  - Key password"
    echo ""
    echo "See ANDROID_BUILD_GUIDE.md for detailed instructions on keystore generation."
    echo ""
    read -p "Press Enter to continue with release build, or Ctrl+C to cancel..."
    echo ""
    
    ./gradlew bundleRelease
    
    AAB_PATH="app/build/outputs/bundle/release/app-release.aab"
    
    if [ -f "$AAB_PATH" ]; then
        echo ""
        echo -e "${GREEN}========================================${NC}"
        echo -e "${GREEN}✓ Release AAB built successfully!${NC}"
        echo -e "${GREEN}========================================${NC}"
        echo ""
        echo -e "${BLUE}Output location:${NC}"
        echo "  $(pwd)/$AAB_PATH"
        echo ""
        echo -e "${BLUE}File size:${NC}"
        ls -lh "$AAB_PATH" | awk '{print "  " $5}'
        echo ""
        echo -e "${YELLOW}Next steps:${NC}"
        echo "  1. Test the AAB on a real device (see ANDROID_BUILD_GUIDE.md)"
        echo "  2. Upload to Google Play Console"
        echo "  3. Complete store listing and submit for review"
        echo ""
        echo -e "${BLUE}Google Play Console:${NC} https://play.google.com/console"
        echo ""
    else
        echo -e "${RED}Error: AAB file not found at $AAB_PATH${NC}"
        exit 1
    fi
else
    echo -e "${BLUE}Building debug APK...${NC}"
    ./gradlew assembleDebug
    
    APK_PATH="app/build/outputs/apk/debug/app-debug.apk"
    
    if [ -f "$APK_PATH" ]; then
        echo ""
        echo -e "${GREEN}========================================${NC}"
        echo -e "${GREEN}✓ Debug APK built successfully!${NC}"
        echo -e "${GREEN}========================================${NC}"
        echo ""
        echo -e "${BLUE}Output location:${NC}"
        echo "  $(pwd)/$APK_PATH"
        echo ""
        echo -e "${BLUE}File size:${NC}"
        ls -lh "$APK_PATH" | awk '{print "  " $5}'
        echo ""
        echo -e "${YELLOW}Install on device:${NC}"
        echo "  adb install $APK_PATH"
        echo ""
    else
        echo -e "${RED}Error: APK file not found at $APK_PATH${NC}"
        exit 1
    fi
fi

cd ..

echo -e "${GREEN}Build complete!${NC}"
