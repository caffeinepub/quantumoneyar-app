#!/bin/bash

# Quantumoney AR - Native Mobile Build Script
# Generates Android AAB and iOS IPA for store submission

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   Quantumoney AR - Native Mobile Package Builder      ║${NC}"
echo -e "${CYAN}║   Build 200 - Capacitor 6+ Store-Ready Packaging      ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if platform argument is provided
PLATFORM=${1:-all}
BUILD_TYPE=${2:-debug}

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

# Display build configuration
echo -e "${BLUE}Build Configuration:${NC}"
echo -e "  Platform: ${YELLOW}$PLATFORM${NC}"
echo -e "  Build Type: ${YELLOW}$BUILD_TYPE${NC}"
echo ""

# Step 1: Build web application
print_step "Step 1: Building web application..."
if pnpm build; then
    print_success "Web build completed successfully"
    print_info "Output: frontend/dist/"
else
    print_error "Web build failed"
    exit 1
fi
echo ""

# Step 2: Initialize Capacitor platforms (if not already done)
if [ "$PLATFORM" = "android" ] || [ "$PLATFORM" = "all" ]; then
    if [ ! -d "android" ]; then
        print_step "Step 2a: Initializing Capacitor for Android..."
        npx cap add android
        print_success "Android platform added"
    else
        print_info "Android platform already initialized"
    fi
fi

if [ "$PLATFORM" = "ios" ] || [ "$PLATFORM" = "all" ]; then
    if [ ! -d "ios" ]; then
        print_step "Step 2b: Initializing Capacitor for iOS..."
        npx cap add ios
        print_success "iOS platform added"
    else
        print_info "iOS platform already initialized"
    fi
fi
echo ""

# Step 3: Sync assets to native projects
print_step "Step 3: Syncing assets to native projects..."

if [ "$PLATFORM" = "android" ] || [ "$PLATFORM" = "all" ]; then
    print_info "Syncing Android assets..."
    npx cap sync android
    print_success "Android sync completed"
fi

if [ "$PLATFORM" = "ios" ] || [ "$PLATFORM" = "all" ]; then
    print_info "Syncing iOS assets..."
    npx cap sync ios
    print_success "iOS sync completed"
fi
echo ""

# Step 4: Build Android package
if [ "$PLATFORM" = "android" ] || [ "$PLATFORM" = "all" ]; then
    print_step "Step 4: Building Android package..."
    
    if [ -d "android" ]; then
        cd android
        
        if [ "$BUILD_TYPE" = "release" ]; then
            # Build release AAB
            print_info "Building release AAB (Android App Bundle)..."
            print_warning "Ensure keystore is configured in build.gradle"
            
            if ./gradlew bundleRelease; then
                print_success "Release AAB built successfully"
                print_info "Location: android/app/build/outputs/bundle/release/app-release.aab"
                
                # Display file size
                AAB_SIZE=$(du -h app/build/outputs/bundle/release/app-release.aab | cut -f1)
                print_info "File size: $AAB_SIZE"
                
                echo ""
                print_success "✅ Android AAB ready for Google Play Store submission"
            else
                print_error "Release AAB build failed"
                print_warning "Check keystore configuration in build.gradle"
            fi
        else
            # Build debug APK
            print_info "Building debug APK..."
            
            if ./gradlew assembleDebug; then
                print_success "Debug APK built successfully"
                print_info "Location: android/app/build/outputs/apk/debug/app-debug.apk"
                
                # Display file size
                APK_SIZE=$(du -h app/build/outputs/apk/debug/app-debug.apk | cut -f1)
                print_info "File size: $APK_SIZE"
                
                echo ""
                print_info "Install command: adb install app/build/outputs/apk/debug/app-debug.apk"
            else
                print_error "Debug APK build failed"
            fi
        fi
        
        cd ..
    else
        print_warning "Android directory not found. Run 'npx cap add android' first."
    fi
    echo ""
fi

# Step 5: Build iOS package
if [ "$PLATFORM" = "ios" ] || [ "$PLATFORM" = "all" ]; then
    print_step "Step 5: Building iOS package..."
    
    if [ -d "ios" ]; then
        if [ "$BUILD_TYPE" = "release" ]; then
            print_info "Opening iOS project in Xcode for release build..."
            print_warning "Manual steps required in Xcode:"
            echo "  1. Select 'Any iOS Device (arm64)' as target"
            echo "  2. Product → Archive"
            echo "  3. In Organizer, select archive"
            echo "  4. Click 'Distribute App'"
            echo "  5. Choose 'App Store' or 'TestFlight'"
            echo "  6. Follow prompts to upload IPA"
            echo ""
            print_info "Opening Xcode..."
            npx cap open ios
            
            print_success "✅ iOS project opened in Xcode"
            print_info "Complete the archive and distribution process in Xcode"
        else
            print_info "Opening iOS project in Xcode for debug build..."
            print_info "Build and run on simulator or connected device"
            npx cap open ios
            
            print_success "iOS project opened in Xcode"
        fi
    else
        print_warning "iOS directory not found. Run 'npx cap add ios' first."
    fi
    echo ""
fi

# Final summary
echo ""
echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║                  Build Summary                         ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

if [ "$BUILD_TYPE" = "release" ]; then
    print_success "Release builds completed!"
    echo ""
    print_info "📦 Build Outputs:"
    
    if [ "$PLATFORM" = "android" ] || [ "$PLATFORM" = "all" ]; then
        echo "  • Android AAB: android/app/build/outputs/bundle/release/app-release.aab"
    fi
    
    if [ "$PLATFORM" = "ios" ] || [ "$PLATFORM" = "all" ]; then
        echo "  • iOS IPA: Generated via Xcode Archive → Distribute"
    fi
    
    echo ""
    print_info "🏪 Next Steps:"
    echo "  1. Test packages on physical devices"
    echo "  2. Submit Android AAB to Google Play Console"
    echo "  3. Submit iOS IPA via App Store Connect"
    echo "  4. Monitor review status"
else
    print_success "Debug builds completed!"
    echo ""
    print_info "📦 Build Outputs:"
    
    if [ "$PLATFORM" = "android" ] || [ "$PLATFORM" = "all" ]; then
        echo "  • Android APK: android/app/build/outputs/apk/debug/app-debug.apk"
    fi
    
    if [ "$PLATFORM" = "ios" ] || [ "$PLATFORM" = "all" ]; then
        echo "  • iOS: Build in Xcode for testing"
    fi
    
    echo ""
    print_info "🧪 Next Steps:"
    echo "  1. Install and test on physical devices"
    echo "  2. Verify all features work correctly"
    echo "  3. Run through testing checklist"
    echo "  4. Build release versions when ready"
fi

echo ""
print_info "📖 Documentation:"
echo "  • DEPLOYMENT_STATUS.md - Complete packaging guide"
echo "  • BUILD_INSTRUCTIONS.md - Quick reference"
echo "  • MOBILE_BUILD_GUIDE.md - Detailed instructions"
echo ""

print_success "Build process completed successfully!"
