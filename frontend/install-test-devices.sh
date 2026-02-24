#!/bin/bash

# Quantumoney AR - Device Installation & Testing Script
# Installs and tests native packages on real Android and iOS devices

set -e

# Colors
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
print_header() { echo -e "${MAGENTA}═══ $1 ═══${NC}"; }

echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   Quantumoney AR - Device Testing                      ║${NC}"
echo -e "${CYAN}║   Install & Test on Real Devices                       ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Main menu
show_menu() {
    echo ""
    print_header "Device Testing Menu"
    echo "1) Install Android AAB"
    echo "2) Install Android Debug APK"
    echo "3) Install iOS IPA (via Xcode)"
    echo "4) Run Full Test Suite"
    echo "5) Verify Data Persistence"
    echo "6) Exit"
    echo ""
    read -p "Select option (1-6): " choice
    
    case $choice in
        1) install_android_aab ;;
        2) install_android_apk ;;
        3) install_ios_ipa ;;
        4) run_full_tests ;;
        5) verify_persistence ;;
        6) exit 0 ;;
        *) print_error "Invalid option"; show_menu ;;
    esac
}

# Install Android AAB
install_android_aab() {
    print_header "Installing Android AAB"
    
    AAB_PATH="android/app/build/outputs/bundle/release/app-release.aab"
    
    if [ ! -f "$AAB_PATH" ]; then
        print_error "AAB not found at $AAB_PATH"
        print_info "Run ./android-build.sh release first"
        show_menu
        return
    fi
    
    print_step "Checking for connected Android devices..."
    if ! command -v adb &> /dev/null; then
        print_error "ADB not found. Install Android SDK Platform Tools."
        show_menu
        return
    fi
    
    DEVICES=$(adb devices | grep -v "List" | grep "device$" | wc -l)
    if [ "$DEVICES" -eq 0 ]; then
        print_error "No Android devices connected"
        print_info "Connect device via USB and enable USB debugging"
        show_menu
        return
    fi
    
    print_success "Found $DEVICES connected device(s)"
    
    print_step "Installing AAB via bundletool..."
    
    # Check for bundletool
    if ! command -v bundletool &> /dev/null; then
        print_warning "bundletool not found. Installing..."
        if [[ "$OSTYPE" == "darwin"* ]]; then
            brew install bundletool
        else
            print_error "Install bundletool manually from:"
            echo "  https://github.com/google/bundletool/releases"
            show_menu
            return
        fi
    fi
    
    # Generate APKs from AAB
    print_step "Generating APKs from AAB..."
    bundletool build-apks \
        --bundle="$AAB_PATH" \
        --output=quantumoney.apks \
        --mode=universal \
        --overwrite
    
    print_success "APKs generated"
    
    # Install
    print_step "Installing on device..."
    bundletool install-apks --apks=quantumoney.apks
    
    print_success "Installation complete!"
    print_info "Launch app on device to test"
    
    # Cleanup
    rm -f quantumoney.apks
    
    show_menu
}

# Install Android Debug APK
install_android_apk() {
    print_header "Installing Android Debug APK"
    
    APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"
    
    if [ ! -f "$APK_PATH" ]; then
        print_error "Debug APK not found at $APK_PATH"
        print_info "Run ./android-build.sh debug first"
        show_menu
        return
    fi
    
    print_step "Checking for connected Android devices..."
    if ! command -v adb &> /dev/null; then
        print_error "ADB not found. Install Android SDK Platform Tools."
        show_menu
        return
    fi
    
    DEVICES=$(adb devices | grep -v "List" | grep "device$" | wc -l)
    if [ "$DEVICES" -eq 0 ]; then
        print_error "No Android devices connected"
        print_info "Connect device via USB and enable USB debugging"
        show_menu
        return
    fi
    
    print_success "Found $DEVICES connected device(s)"
    
    print_step "Installing APK..."
    adb install -r "$APK_PATH"
    
    print_success "Installation complete!"
    print_info "Launch app on device to test"
    
    show_menu
}

# Install iOS IPA
install_ios_ipa() {
    print_header "Installing iOS IPA"
    
    if [[ "$OSTYPE" != "darwin"* ]]; then
        print_error "iOS installation requires macOS"
        show_menu
        return
    fi
    
    print_info "iOS IPA installation methods:"
    echo ""
    echo "1. Via Xcode (Recommended):"
    echo "   - Open Xcode"
    echo "   - Window → Devices and Simulators"
    echo "   - Select your device"
    echo "   - Drag IPA file to device"
    echo ""
    echo "2. Via TestFlight:"
    echo "   - Upload IPA to App Store Connect"
    echo "   - Add internal testers"
    echo "   - Install via TestFlight app"
    echo ""
    
    read -p "Open Xcode Devices window? (y/N): " confirm
    if [[ $confirm == [yY] ]]; then
        open -a Xcode
        print_info "Opening Xcode..."
        print_info "Go to: Window → Devices and Simulators"
    fi
    
    show_menu
}

# Run full test suite
run_full_tests() {
    print_header "Full Test Suite"
    
    echo ""
    print_info "Testing Checklist - Complete on Device"
    echo ""
    
    # Authentication
    print_step "Authentication & Profile"
    echo "  [ ] Login with Internet Identity"
    echo "  [ ] User profile creation/editing"
    echo "  [ ] Language selection (PT/EN) persists"
    echo "  [ ] Logout clears data properly"
    echo ""
    
    # Camera & AR
    print_step "Camera & AR"
    echo "  [ ] Camera permission prompt appears"
    echo "  [ ] Camera feed displays (no black screen)"
    echo "  [ ] AR overlay elements visible"
    echo "  [ ] Coin collection works (+1 QMY, +10 XP)"
    echo "  [ ] Bloquear/Resgatar buttons functional"
    echo ""
    
    # GPS & Location
    print_step "GPS & Location"
    echo "  [ ] Location permission prompt appears"
    echo "  [ ] GPS tracking works on map"
    echo "  [ ] Nearby coins/monsters display"
    echo "  [ ] Distance calculations accurate"
    echo ""
    
    # Wallet & Balances
    print_step "Wallet & Balances"
    echo "  [ ] QMY balance displays correctly"
    echo "  [ ] Locked QMY shows properly"
    echo "  [ ] Vesting schedule visible"
    echo "  [ ] Send/Receive functions work"
    echo "  [ ] Transaction history loads"
    echo ""
    
    # DAO & Governance
    print_step "DAO & Governance"
    echo "  [ ] Proposals list loads"
    echo "  [ ] Voting power calculated (1 QMY = 1 vote)"
    echo "  [ ] Vote submission works"
    echo "  [ ] Proposal creation (if balance ≥ 100K QMY)"
    echo ""
    
    # Data Persistence
    print_step "Data Persistence"
    echo "  [ ] Close app → Reopen: Data persists"
    echo "  [ ] Logout → Login: Data restored"
    echo "  [ ] Offline mode: Cached data available"
    echo "  [ ] Online sync: Updates from canisters"
    echo ""
    
    # UI & Navigation
    print_step "UI & Navigation"
    echo "  [ ] Header displays correctly"
    echo "  [ ] Bottom navigation works"
    echo "  [ ] Side drawer opens/closes"
    echo "  [ ] All pages load without errors"
    echo "  [ ] Responsive layout on different screens"
    echo "  [ ] Safe area handling (notch/status bar)"
    echo ""
    
    # Performance
    print_step "Performance"
    echo "  [ ] App launches in < 3 seconds"
    echo "  [ ] Navigation is smooth"
    echo "  [ ] No crashes or freezes"
    echo "  [ ] Camera runs for 30+ minutes"
    echo "  [ ] Memory usage stable"
    echo ""
    
    print_info "Complete all tests and document results"
    
    show_menu
}

# Verify data persistence
verify_persistence() {
    print_header "Data Persistence Verification"
    
    echo ""
    print_info "Follow these steps to verify data persistence:"
    echo ""
    
    print_step "Step 1: Record Current State (Web App)"
    echo "  1. Open https://quantumoneyar.app in browser"
    echo "  2. Login with Internet Identity"
    echo "  3. Note your current data:"
    echo ""
    echo "     XP: _______"
    echo "     Level: _______"
    echo "     Available QMY: _______"
    echo "     Locked QMY: _______"
    echo "     Total QMY: _______"
    echo ""
    
    print_step "Step 2: Install Native App"
    echo "  1. Install AAB/IPA on device (use options 1-3)"
    echo "  2. Launch native app"
    echo ""
    
    print_step "Step 3: Login & Verify"
    echo "  1. Login with same Internet Identity"
    echo "  2. Wait for data sync (5-10 seconds)"
    echo "  3. Verify all values match:"
    echo ""
    echo "     [ ] XP matches"
    echo "     [ ] Level matches"
    echo "     [ ] Available QMY matches"
    echo "     [ ] Locked QMY matches"
    echo "     [ ] Total QMY matches"
    echo "     [ ] Transaction history present"
    echo "     [ ] Vesting schedule intact"
    echo ""
    
    print_step "Step 4: Test Offline"
    echo "  1. Enable airplane mode on device"
    echo "  2. Navigate app (should work with cached data)"
    echo "  3. Disable airplane mode"
    echo "  4. Verify sync resumes automatically"
    echo ""
    
    print_step "Step 5: Cross-Device Sync"
    echo "  1. Make change on web app (collect coin, etc.)"
    echo "  2. Refresh native app"
    echo "  3. Verify change appears"
    echo "  4. Make change on native app"
    echo "  5. Refresh web app"
    echo "  6. Verify change appears"
    echo ""
    
    print_success "If all checks pass, data persistence is working correctly!"
    
    show_menu
}

# Start
show_menu

