#!/bin/bash

# Quantumoney AR - Interactive Native Build Menu
# Provides user-friendly interface for building Android AAB and iOS IPA

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Clear screen
clear

# Display banner
echo -e "${CYAN}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║                                                                ║${NC}"
echo -e "${CYAN}║          Quantumoney AR - Native Build Workflow                ║${NC}"
echo -e "${CYAN}║          Build 200 - Store-Ready Package Generator             ║${NC}"
echo -e "${CYAN}║                                                                ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════════════╝${NC}"
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

print_header() {
    echo -e "${MAGENTA}═══ $1 ═══${NC}"
}

# Check prerequisites
print_header "Checking Prerequisites"
echo ""

# Check Node.js
if command -v node &> /dev/null; then
    print_success "Node.js: $(node --version)"
else
    print_error "Node.js not found"
    exit 1
fi

# Check pnpm
if command -v pnpm &> /dev/null; then
    print_success "pnpm: $(pnpm --version)"
else
    print_error "pnpm not found"
    exit 1
fi

# Check for Android tools
if command -v java &> /dev/null; then
    print_success "Java: $(java --version 2>&1 | head -n 1)"
    ANDROID_AVAILABLE=true
else
    print_warning "Java not found - Android builds unavailable"
    ANDROID_AVAILABLE=false
fi

# Check for iOS tools (macOS only)
if [[ "$OSTYPE" == "darwin"* ]]; then
    if command -v xcodebuild &> /dev/null; then
        print_success "Xcode: $(xcodebuild -version | head -n 1)"
        IOS_AVAILABLE=true
    else
        print_warning "Xcode not found - iOS builds unavailable"
        IOS_AVAILABLE=false
    fi
else
    print_warning "macOS required for iOS builds"
    IOS_AVAILABLE=false
fi

echo ""

# Display main menu
while true; do
    print_header "Build Options"
    echo ""
    echo "  ${CYAN}1)${NC} Build Android AAB (Release)"
    echo "  ${CYAN}2)${NC} Build Android APK (Debug)"
    echo "  ${CYAN}3)${NC} Build iOS IPA (Release)"
    echo "  ${CYAN}4)${NC} Build iOS (Debug)"
    echo "  ${CYAN}5)${NC} Build Both Platforms (Release)"
    echo "  ${CYAN}6)${NC} Initialize Capacitor Project"
    echo "  ${CYAN}7)${NC} View Build Status"
    echo "  ${CYAN}8)${NC} Open Documentation"
    echo "  ${CYAN}9)${NC} Exit"
    echo ""
    echo -n "Select option [1-9]: "
    read -r choice
    echo ""

    case $choice in
        1)
            if [ "$ANDROID_AVAILABLE" = true ]; then
                print_info "Starting Android AAB build..."
                ./android-build.sh release
            else
                print_error "Android build tools not available"
            fi
            ;;
        2)
            if [ "$ANDROID_AVAILABLE" = true ]; then
                print_info "Starting Android APK build..."
                ./android-build.sh debug
            else
                print_error "Android build tools not available"
            fi
            ;;
        3)
            if [ "$IOS_AVAILABLE" = true ]; then
                print_info "Starting iOS IPA build..."
                ./ios-build.sh release
            else
                print_error "iOS build tools not available (macOS + Xcode required)"
            fi
            ;;
        4)
            if [ "$IOS_AVAILABLE" = true ]; then
                print_info "Starting iOS debug build..."
                ./ios-build.sh debug
            else
                print_error "iOS build tools not available (macOS + Xcode required)"
            fi
            ;;
        5)
            print_info "Building both platforms..."
            if [ "$ANDROID_AVAILABLE" = true ]; then
                ./android-build.sh release
            else
                print_warning "Skipping Android build (tools not available)"
            fi
            if [ "$IOS_AVAILABLE" = true ]; then
                ./ios-build.sh release
            else
                print_warning "Skipping iOS build (tools not available)"
            fi
            ;;
        6)
            print_info "Initializing Capacitor project..."
            echo ""
            print_step "Installing Capacitor dependencies..."
            pnpm add @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
            
            print_step "Initializing Capacitor..."
            npx cap init "Quantumoney AR" "app.quantumoneyar.qmy" --web-dir=dist
            
            if [ "$ANDROID_AVAILABLE" = true ]; then
                print_step "Adding Android platform..."
                npx cap add android
            fi
            
            if [ "$IOS_AVAILABLE" = true ]; then
                print_step "Adding iOS platform..."
                npx cap add ios
            fi
            
            print_success "Capacitor initialization complete"
            ;;
        7)
            print_header "Build Status"
            echo ""
            
            # Check for Android build
            if [ -f "android/app/build/outputs/bundle/release/app-release.aab" ]; then
                AAB_SIZE=$(du -h android/app/build/outputs/bundle/release/app-release.aab | cut -f1)
                AAB_DATE=$(stat -f "%Sm" -t "%Y-%m-%d %H:%M" android/app/build/outputs/bundle/release/app-release.aab 2>/dev/null || stat -c "%y" android/app/build/outputs/bundle/release/app-release.aab 2>/dev/null | cut -d' ' -f1,2)
                print_success "Android AAB: $AAB_SIZE (Built: $AAB_DATE)"
            else
                print_warning "Android AAB: Not built"
            fi
            
            # Check for iOS build
            if [ -d "ios/App" ]; then
                print_info "iOS project initialized (IPA generated via Xcode)"
            else
                print_warning "iOS: Not initialized"
            fi
            
            echo ""
            print_info "For detailed status, see: DEPLOYMENT_STATUS.md"
            ;;
        8)
            print_info "Opening documentation..."
            echo ""
            echo "Available documentation:"
            echo "  • NATIVE_PACKAGING_WORKFLOW.md - Complete workflow guide"
            echo "  • DEPLOYMENT_STATUS.md - Deployment status"
            echo "  • ANDROID_BUILD_GUIDE.md - Android instructions"
            echo "  • IOS_BUILD_GUIDE.md - iOS instructions"
            echo "  • CAPACITOR_SETUP.md - Capacitor setup"
            echo ""
            ;;
        9)
            print_info "Exiting..."
            exit 0
            ;;
        *)
            print_error "Invalid option. Please select 1-9."
            ;;
    esac
    
    echo ""
    echo -n "Press Enter to continue..."
    read -r
    clear
    
    # Redisplay banner
    echo -e "${CYAN}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║                                                                ║${NC}"
    echo -e "${CYAN}║          Quantumoney AR - Native Build Workflow                ║${NC}"
    echo -e "${CYAN}║          Build 200 - Store-Ready Package Generator             ║${NC}"
    echo -e "${CYAN}║                                                                ║${NC}"
    echo -e "${CYAN}╚════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
done
