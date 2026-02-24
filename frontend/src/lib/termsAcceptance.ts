/**
 * Centralized Terms acceptance utility using localStorage key 'qmy_terms_v1'
 * Single source of truth for Terms/legal acceptance state
 */

const TERMS_KEY = 'qmy_terms_v1';
const TERMS_ACCEPTED_VALUE = 'accepted';

// Legacy keys to migrate from
const LEGACY_KEYS = [
  'quantumoney-legal-accepted',
  'quantumoney-terms-accepted',
];

/**
 * Check if Terms have been accepted
 */
export function hasAcceptedTerms(): boolean {
  return localStorage.getItem(TERMS_KEY) === TERMS_ACCEPTED_VALUE;
}

/**
 * Mark Terms as accepted
 */
export function acceptTerms(): void {
  localStorage.setItem(TERMS_KEY, TERMS_ACCEPTED_VALUE);
  // Clean up legacy keys
  LEGACY_KEYS.forEach(key => localStorage.removeItem(key));
}

/**
 * Clear Terms acceptance (for testing/reset)
 */
export function clearTermsAcceptance(): void {
  localStorage.removeItem(TERMS_KEY);
  LEGACY_KEYS.forEach(key => localStorage.removeItem(key));
}

/**
 * Migrate from legacy keys if they exist
 */
export function migrateLegacyTermsAcceptance(): void {
  // If already using new key, no migration needed
  if (hasAcceptedTerms()) {
    return;
  }

  // Check if any legacy key indicates acceptance
  const hasLegacyAcceptance = LEGACY_KEYS.some(key => {
    const value = localStorage.getItem(key);
    return value === 'true' || value === 'accepted';
  });

  if (hasLegacyAcceptance) {
    acceptTerms();
  }
}
