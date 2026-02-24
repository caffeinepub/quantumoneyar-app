#!/bin/bash

# Quantumoney AR - Installation Testing Script
# Tests native packages on real devices

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

print_success() { echo -e "${GREEN}✓ $1${NC}"; }
print_error() { echo -e "${RED}✗ $1${NC}"; }
print_info() { echo -e "${BLUE}ℹ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠ $1${NC}"; }
print_step() { echo -e "${CYAN}▶ $1${NC}"; }
print_header() { echo -e "${CYAN}═══ $1 ═══${NC}"; }

echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   Quantumoney AR - Installation Test                   ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Display menu
print_header "Test Options"
echo ""
echo "  1) Test Android AAB (requires bundletool)"
echo "  2) Test Android Debug APK"
echo "  3) Test iOS IPA (macOS only)"
echo "  4) Run Full Test Suite"
echo "  5) Exit"
echo ""
read -p "Select option (1-5): " choice

case $choice in
    1)
        print_header "Testing Android AAB"
        
        # Check for bundletool
        if [ ! -f "bundletool.jar" ]; then
            print_warning "bundletool.jar not found"
            print_info "Download from: https://github.com/google/bundletool/releases"
            read -p "Enter path to bundletool.jar: " bundletool_path
            if [ ! -f "$bundletool_path" ]; then
                print_error "File not found"
                exit 1
            fi
        else
            bundletool_path="bundletool.jar"
        fi
        
        # Check for AAB
        AAB_PATH="android/app/build/outputs/bundle/release/app-release.aab"
        if [ ! -f "$AAB_PATH" ]; then
            print_error "AAB not found at $AAB_PATH"
            print_info "Run ./android-build.sh release first"
            exit 1
        fi
        
        print_step "Generating universal APK from AAB..."
        java -jar "$bundletool_path" build-apks \
            --bundle="$AAB_PATH" \
            --output=quantumoney.apks \
            --mode=universal
        
        print_success "APKs generated"
        
        print_step "Extracting universal APK..."
        unzip -o quantumoney.apks -d apks
        
        print_success "APK extracted"
        
        # Check for connected device
        print_step "Checking for connected devices..."
        if ! adb devices | grep -q "device$"; then
            print_error "No Android device connected"
            print_info "Connect device via USB and enable USB debugging"
            exit 1
        fi
        
        print_success "Device connected"
        
        print_step "Installing app on device..."
        adb install -r apks/universal.apk
        
        print_success "App installed successfully!"
        
        echo ""
        print_info "Testing Checklist:"
        echo "  1. Launch Quantumoney AR from device"
        echo "  2. Verify splash screen displays"
        echo "  3. Login with Internet Identity"
        echo "  4. Check data restoration (XP, QMY balances)"
        echo "  5. Test AR camera mode"
        echo "  6. Test GPS location"
        echo "  7. Collect QMY coins"
        echo "  8. Verify data syncs with backend"
        echo "  9. Test offline mode"
        echo "  10. Close and reopen app (verify persistence)"
        ;;
        
    2)
        print_header "Testing Android Debug APK"
        
        APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"
        
        if [ ! -f "$APK_PATH" ]; then
            print_warning "Debug APK not found, building..."
            ./android-build.sh debug
        fi
        
        # Check for connected device
        print_step "Checking for connected devices..."
        if ! adb devices | grep -q "device$"; then
            print_error "No Android device connected"
            print_info "Connect device via USB and enable USB debugging"
            exit 1
        fi
        
        print_success "Device connected"
        
        print_step "Installing debug APK..."
        adb install -r "$APK_PATH"
        
        print_success "App installed successfully!"
        
        echo ""
        print_info "Testing Checklist:"
        echo "  1. Launch Quantumoney AR from device"
        echo "  2. Verify splash screen displays"
        echo "  3. Login with Internet Identity"
        echo "  4. Check data restoration (XP, QMY balances)"
        echo "  5. Test AR camera mode"
        echo "  6. Test GPS location"
        echo "  7. Collect QMY coins"
        echo "  8. Verify data syncs with backend"
        ;;
        
    3)
        if [[ "$OSTYPE" != "darwin"* ]]; then
            print_error "iOS testing requires macOS"
            exit 1
        fi
        
        print_header "Testing iOS IPA"
        
        print_step "Opening Xcode..."
        npx cap open ios
        
        echo ""
        print_info "Manual Testing Steps:"
        echo "  1. Connect iPhone via USB"
        echo "  2. Trust computer on iPhone"
        echo "  3. Select your iPhone as target in Xcode"
        echo "  4. Click Run (▶️) button"
        echo "  5. Wait for app to install and launch"
        echo ""
        print_info "Testing Checklist:"
        echo "  1. Verify splash screen displays"
        echo "  2. Check camera permission prompt (Portuguese)"
        echo "  3. Check location permission prompt (Portuguese)"
        echo "  4. Login with Internet Identity"
        echo "  5. Check data restoration (XP, QMY balances)"
        echo "  6. Test AR camera mode"
        echo "  7. Test GPS location"
        echo "  8. Collect QMY coins"
        echo "  9. Verify data syncs with backend"
        echo "  10. Test safe area handling (notch/Dynamic Island)"
        ;;
        
    4)
        print_header "Running Full Test Suite"
        
        print_step "Test 1: Build Verification"
        if [ -f "android/app/build/outputs/bundle/release/app-release.aab" ]; then
            print_success "Android AAB exists"
        else
            print_warning "Android AAB not found"
        fi
        
        if [[ "$OSTYPE" == "darwin"* ]]; then
            if [ -f "ios/App/build/QuantumoneyAR.ipa" ]; then
                print_success "iOS IPA exists"
            else
                print_warning "iOS IPA not found"
            fi
        fi
        
        echo ""
        print_step "Test 2: Configuration Verification"
        
        if [ -f "capacitor.config.json" ]; then
            print_success "Capacitor config exists"
            
            # Check server URL
            if grep -q "quantumoneyar.app" capacitor.config.json; then
                print_success "Server URL configured correctly"
            else
                print_error "Server URL not configured"
            fi
        else
            print_error "Capacitor config not found"
        fi
        
        echo ""
        print_step "Test 3: Permissions Verification"
        
        if [ -f "android/app/src/main/AndroidManifest.xml" ]; then
            print_success "AndroidManifest.xml exists"
            
            if grep -q "android.permission.CAMERA" android/app/src/main/AndroidManifest.xml; then
                print_success "Camera permission declared"
            else
                print_warning "Camera permission not found"
            fi
            
            if grep -q "android.permission.ACCESS_FINE_LOCATION" android/app/src/main/AndroidManifest.xml; then
                print_success "Location permission declared"
            else
                print_warning "Location permission not found"
            fi
        fi
        
        if [[ "$OSTYPE" == "darwin"* ]] && [ -f "ios/App/App/Info.plist" ]; then
            print_success "Info.plist exists"
            
            if grep -q "NSCameraUsageDescription" ios/App/App/Info.plist; then
                print_success "Camera usage description declared"
            else
                print_warning "Camera usage description not found"
            fi
            
            if grep -q "NSLocationWhenInUseUsageDescription" ios/App/App/Info.plist; then
                print_success "Location usage description declared"
            else
                print_warning "Location usage description not found"
            fi
        fi
        
        echo ""
        print_step "Test 4: Documentation Verification"
        
        docs=(
            "NATIVE_MOBILE_PACKAGING_GUIDE.md"
            "TECHNICAL_VERIFICATION_REPORT.md"
            "DEPLOYMENT_STATUS.md"
            "CAPACITOR_NATIVE_BUILD_GUIDE.md"
        )
        
        for doc in "${docs[@]}"; do
            if [ -f "$doc" ]; then
                print_success "$doc exists"
            else
                print_warning "$doc not found"
            fi
        done
        
        echo ""
        print_success "Full test suite complete!"
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
print_success "Testing complete!"
print_info "Canisters: ippxc-5iaaa-aaaae-qgwqq-cai + x5shd-hqaaa-aaaap-qrdgq-cai"
