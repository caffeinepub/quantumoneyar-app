#!/bin/bash

# Quantumoney AR - Capacitor 6+ Initialization Script
# Initializes Capacitor project for native Android and iOS builds

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   Quantumoney AR - Capacitor 6+ Initialization        ║${NC}"
echo -e "${CYAN}║   Package ID: app.quantumoneyar.qmy                    ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

print_success() { echo -e "${GREEN}✓ $1${NC}"; }
print_error() { echo -e "${RED}✗ $1${NC}"; }
print_info() { echo -e "${BLUE}ℹ $1${NC}"; }
print_step() { echo -e "${CYAN}▶ $1${NC}"; }

# Check if Capacitor is already initialized
if [ -d "android" ] || [ -d "ios" ]; then
    print_info "Capacitor platforms already exist"
    read -p "Reinitialize? This will remove existing platforms (y/N): " confirm
    if [[ $confirm == [yY] ]]; then
        print_step "Removing existing platforms..."
        rm -rf android ios
        print_success "Platforms removed"
    else
        print_info "Keeping existing platforms"
        exit 0
    fi
fi

# Step 1: Install Capacitor dependencies
print_step "Installing Capacitor 6+ dependencies..."
pnpm add -D @capacitor/cli@latest @capacitor/core@latest

pnpm add @capacitor/android@latest \
         @capacitor/ios@latest \
         @capacitor/camera@latest \
         @capacitor/geolocation@latest \
         @capacitor/storage@latest \
         @capacitor/status-bar@latest \
         @capacitor/splash-screen@latest \
         @capacitor/app@latest \
         @capacitor/preferences@latest

print_success "Capacitor dependencies installed"

# Step 2: Build web app
print_step "Building web application..."
pnpm build
print_success "Web build complete"

# Step 3: Initialize Capacitor
print_step "Initializing Capacitor project..."
npx cap init "Quantumoney AR" "app.quantumoneyar.qmy" --web-dir=dist
print_success "Capacitor initialized"

# Step 4: Add Android platform
print_step "Adding Android platform..."
npx cap add android
print_success "Android platform added"

# Step 5: Add iOS platform (macOS only)
if [[ "$OSTYPE" == "darwin"* ]]; then
    print_step "Adding iOS platform..."
    npx cap add ios
    print_success "iOS platform added"
else
    print_info "Skipping iOS platform (requires macOS)"
fi

# Step 6: Copy assets
print_step "Copying web assets to native platforms..."
npx cap copy
print_success "Assets copied"

# Step 7: Sync platforms
print_step "Syncing native platforms..."
npx cap sync
print_success "Platforms synced"

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   ✅ Capacitor 6+ Initialization Complete             ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

print_info "Next Steps:"
echo "  1. Configure Android signing: Edit android/app/build.gradle"
echo "  2. Configure iOS signing: Open ios/App/App.xcworkspace in Xcode"
echo "  3. Build Android AAB: ./android-build.sh release"
echo "  4. Build iOS IPA: ./ios-build.sh release (macOS only)"
echo ""
print_info "Build Scripts Available:"
echo "  - ./capacitor-init.sh (this script)"
echo "  - ./android-build.sh [debug|release]"
echo "  - ./ios-build.sh [debug|release]"
echo "  - ./build-native.sh (interactive menu)"
echo ""
print_success "Canisters: ippxc-5iaaa-aaaae-qgwqq-cai + x5shd-hqaaa-aaaap-qrdgq-cai"
