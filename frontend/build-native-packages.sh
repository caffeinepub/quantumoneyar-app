#!/bin/bash

# Quantumoney AR - Complete Native Package Generation
# One-command build for both Android AAB and iOS IPA

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m'

print_success() { echo -e "${GREEN}✓ $1${NC}"; }
print_error() { echo -e "${RED}✗ $1${NC}"; }
print_info() { echo -e "${BLUE}ℹ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠ $1${NC}"; }
print_step() { echo -e "${CYAN}▶ $1${NC}"; }
print_header() { echo -e "${MAGENTA}╔════════════════════════════════════════════════════════╗${NC}"; echo -e "${MAGENTA}║ $1${NC}"; echo -e "${MAGENTA}╚════════════════════════════════════════════════════════╝${NC}"; }

clear

print_header "   Quantumoney AR - Complete Native Package Builder      "
echo ""
echo -e "${CYAN}Build 200 - Capacitor 6+ Store-Ready Packaging${NC}"
echo -e "${CYAN}Canisters: ippxc-5iaaa-aaaae-qgwqq-cai + x5shd-hqaaa-aaaap-qrdgq-cai${NC}"
echo ""

# Check if first-time setup needed
if [ ! -d "android" ] && [ ! -d "ios" ]; then
    print_warning "Capacitor platforms not initialized"
    print_info "Running first-time setup..."
    echo ""
    
    if [ -f "./capacitor-init.sh" ]; then
        chmod +x ./capacitor-init.sh
        ./capacitor-init.sh
    else
        print_error "capacitor-init.sh not found"
        exit 1
    fi
    
    echo ""
    print_success "First-time setup complete"
    echo ""
fi

# Build selection menu
echo -e "${CYAN}Select build type:${NC}"
echo "  1) Android AAB (Release - Google Play Store)"
echo "  2) Android APK (Debug - Local Testing)"
echo "  3) iOS IPA (Release - App Store) [macOS only]"
echo "  4) iOS Debug (Local Testing) [macOS only]"
echo "  5) Both Android AAB + iOS IPA (Release)"
echo "  6) Both Android APK + iOS Debug (Debug)"
echo "  7) Exit"
echo ""
read -p "Enter choice [1-7]: " choice

case $choice in
    1)
        print_header "Building Android AAB (Release)"
        if [ -f "./android-build.sh" ]; then
            chmod +x ./android-build.sh
            ./android-build.sh release
        else
            print_error "android-build.sh not found"
            exit 1
        fi
        ;;
    2)
        print_header "Building Android APK (Debug)"
        if [ -f "./android-build.sh" ]; then
            chmod +x ./android-build.sh
            ./android-build.sh debug
        else
            print_error "android-build.sh not found"
            exit 1
        fi
        ;;
    3)
        if [[ "$OSTYPE" != "darwin"* ]]; then
            print_error "iOS builds require macOS"
            exit 1
        fi
        print_header "Building iOS IPA (Release)"
        if [ -f "./ios-build.sh" ]; then
            chmod +x ./ios-build.sh
            ./ios-build.sh release
        else
            print_error "ios-build.sh not found"
            exit 1
        fi
        ;;
    4)
        if [[ "$OSTYPE" != "darwin"* ]]; then
            print_error "iOS builds require macOS"
            exit 1
        fi
        print_header "Building iOS Debug"
        if [ -f "./ios-build.sh" ]; then
            chmod +x ./ios-build.sh
            ./ios-build.sh debug
        else
            print_error "ios-build.sh not found"
            exit 1
        fi
        ;;
    5)
        print_header "Building Both Platforms (Release)"
        
        # Android AAB
        print_step "Step 1/2: Building Android AAB..."
        if [ -f "./android-build.sh" ]; then
            chmod +x ./android-build.sh
            ./android-build.sh release
        else
            print_error "android-build.sh not found"
            exit 1
        fi
        
        echo ""
        
        # iOS IPA
        if [[ "$OSTYPE" == "darwin"* ]]; then
            print_step "Step 2/2: Building iOS IPA..."
            if [ -f "./ios-build.sh" ]; then
                chmod +x ./ios-build.sh
                ./ios-build.sh release
            else
                print_error "ios-build.sh not found"
                exit 1
            fi
        else
            print_warning "Skipping iOS build (requires macOS)"
        fi
        ;;
    6)
        print_header "Building Both Platforms (Debug)"
        
        # Android APK
        print_step "Step 1/2: Building Android APK..."
        if [ -f "./android-build.sh" ]; then
            chmod +x ./android-build.sh
            ./android-build.sh debug
        else
            print_error "android-build.sh not found"
            exit 1
        fi
        
        echo ""
        
        # iOS Debug
        if [[ "$OSTYPE" == "darwin"* ]]; then
            print_step "Step 2/2: Building iOS Debug..."
            if [ -f "./ios-build.sh" ]; then
                chmod +x ./ios-build.sh
                ./ios-build.sh debug
            else
                print_error "ios-build.sh not found"
                exit 1
            fi
        else
            print_warning "Skipping iOS build (requires macOS)"
        fi
        ;;
    7)
        print_info "Exiting..."
        exit 0
        ;;
    *)
        print_error "Invalid choice"
        exit 1
        ;;
esac

echo ""
print_header "   ✅ Build Process Complete                              "
echo ""
print_info "📦 Build Outputs:"
echo "  • Android: android/app/build/outputs/"
echo "  • iOS: ios/App/build/ or Xcode export location"
echo ""
print_info "📖 Documentation:"
echo "  • NATIVE_BUILD_EXECUTION_REPORT.md - Complete build report"
echo "  • DEPLOYMENT_STATUS.md - Technical deployment guide"
echo "  • QUICK_START_NATIVE.md - Quick reference"
echo ""
print_success "Ready for device testing and store submission!"
