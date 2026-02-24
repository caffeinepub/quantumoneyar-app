#!/bin/bash

# Quantumoney AR - Complete Native Build Script
# Generates both Android AAB and iOS IPA (macOS only for iOS)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   Quantumoney AR - Native Build System                ║${NC}"
echo -e "${CYAN}║   Build 200 - Android AAB + iOS IPA                    ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_step() {
    echo -e "${CYAN}▶ $1${NC}"
}

print_header() {
    echo -e "${MAGENTA}═══ $1 ═══${NC}"
}

# Display menu
print_header "Build Options"
echo ""
echo "  1) Build Android AAB (Google Play Store)"
echo "  2) Build iOS IPA (Apple App Store - macOS only)"
echo "  3) Build Both (Android + iOS)"
echo "  4) Initialize Capacitor Project"
echo "  5) Exit"
echo ""
read -p "Select option (1-5): " choice

case $choice in
    1)
        print_info "Building Android AAB..."
        ./android-build.sh release
        ;;
    2)
        if [[ "$OSTYPE" == "darwin"* ]]; then
            print_info "Building iOS IPA..."
            ./ios-build.sh release
        else
            print_error "iOS builds require macOS"
            exit 1
        fi
        ;;
    3)
        print_info "Building both platforms..."
        ./android-build.sh release
        if [[ "$OSTYPE" == "darwin"* ]]; then
            ./ios-build.sh release
        else
            print_warning "Skipping iOS build (requires macOS)"
        fi
        ;;
    4)
        print_header "Initializing Capacitor Project"
        
        # Install Capacitor dependencies
        print_step "Installing Capacitor dependencies..."
        pnpm add -D @capacitor/cli @capacitor/core
        pnpm add @capacitor/android @capacitor/ios @capacitor/camera @capacitor/geolocation @capacitor/storage @capacitor/status-bar @capacitor/splash-screen @capacitor/app @capacitor/preferences
        
        print_success "Capacitor dependencies installed"
        
        # Initialize Capacitor
        print_step "Initializing Capacitor..."
        npx cap init "Quantumoney AR" "app.quantumoneyar.qmy" --web-dir=dist
        
        print_success "Capacitor initialized"
        
        # Add platforms
        print_step "Adding Android platform..."
        npx cap add android
        print_success "Android platform added"
        
        if [[ "$OSTYPE" == "darwin"* ]]; then
            print_step "Adding iOS platform..."
            npx cap add ios
            print_success "iOS platform added"
        else
            print_warning "Skipping iOS platform (requires macOS)"
        fi
        
        print_success "✅ Capacitor project initialized successfully!"
        echo ""
        print_info "Next steps:"
        echo "  1. Build web app: pnpm build"
        echo "  2. Sync assets: npx cap sync"
        echo "  3. Build native packages: ./build-native.sh"
        ;;
    5)
        print_info "Exiting..."
        exit 0
        ;;
    *)
        print_error "Invalid option"
        exit 1
        ;;
esac

echo ""
print_success "Build process completed!"
print_info "Canisters: ippxc-5iaaa-aaaae-qgwqq-cai + x5shd-hqaaa-aaaap-qrdgq-cai"
