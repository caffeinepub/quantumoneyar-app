#!/bin/bash

# Quantumoney AR - iOS IPA Build Script
# Generates IPA for Apple App Store submission (macOS only)

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

BUILD_TYPE="${1:-release}"

echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   Quantumoney AR - iOS IPA Build                       ║${NC}"
echo -e "${CYAN}║   Build Type: ${BUILD_TYPE^^}                                    ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    print_error "iOS builds require macOS"
    exit 1
fi

# Check prerequisites
print_header "Checking Prerequisites"

if ! command -v node &> /dev/null; then
    print_error "Node.js not found. Install Node.js 18+ first."
    exit 1
fi
print_success "Node.js: $(node --version)"

if ! command -v pnpm &> /dev/null; then
    print_error "pnpm not found. Install with: npm install -g pnpm"
    exit 1
fi
print_success "pnpm: $(pnpm --version)"

if ! command -v xcodebuild &> /dev/null; then
    print_error "Xcode not found. Install from App Store."
    exit 1
fi
print_success "Xcode: $(xcodebuild -version | head -n 1)"

if ! command -v pod &> /dev/null; then
    print_error "CocoaPods not found. Install with: sudo gem install cocoapods"
    exit 1
fi
print_success "CocoaPods: $(pod --version)"

if [ ! -d "ios" ]; then
    print_error "iOS platform not found. Run ./capacitor-init.sh first."
    exit 1
fi
print_success "iOS platform exists"

echo ""
print_header "Building Web Application"

print_step "Installing dependencies..."
pnpm install
print_success "Dependencies installed"

print_step "Building React app..."
pnpm build
print_success "Web build complete"

echo ""
print_header "Syncing Capacitor"

print_step "Copying web assets to iOS..."
npx cap copy ios
print_success "Assets copied"

print_step "Syncing iOS platform..."
npx cap sync ios
print_success "Platform synced"

echo ""
print_header "Installing CocoaPods"

cd ios/App
print_step "Running pod install..."
pod install
print_success "Pods installed"
cd ../..

echo ""
print_header "Building iOS ${BUILD_TYPE^^}"

if [ "$BUILD_TYPE" == "release" ]; then
    print_warning "Release IPA requires:"
    echo "  1. Valid Apple Developer account"
    echo "  2. Distribution certificate installed"
    echo "  3. Provisioning profile configured"
    echo "  4. Code signing configured in Xcode"
    echo ""
    print_info "Opening Xcode for manual archive and distribution..."
    echo ""
    print_step "Next steps in Xcode:"
    echo "  1. Select 'Any iOS Device' as target"
    echo "  2. Product → Archive"
    echo "  3. Window → Organizer"
    echo "  4. Select archive → Distribute App"
    echo "  5. Choose 'App Store Connect' or 'Ad Hoc'"
    echo "  6. Follow distribution wizard"
    echo ""
    
    open ios/App/App.xcworkspace
    
    print_info "Xcode opened. Complete the archive process manually."
    print_info "IPA will be exported to a location you choose in Xcode."
else
    print_step "Building debug app..."
    
    cd ios/App
    xcodebuild -workspace App.xcworkspace \
               -scheme App \
               -configuration Debug \
               -destination 'generic/platform=iOS' \
               -archivePath build/App.xcarchive \
               archive
    
    print_success "Debug archive created"
    print_info "Archive location: ios/App/build/App.xcarchive"
    print_info "Install via Xcode or use for TestFlight testing"
    cd ../..
fi

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   ✅ iOS Build Process Complete                        ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
print_success "Canisters: ippxc-5iaaa-aaaae-qgwqq-cai + x5shd-hqaaa-aaaap-qrdgq-cai"
