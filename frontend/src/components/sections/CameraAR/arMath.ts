// AR math utilities for bearing calculation, angle normalization, and screen projection.

export function calculateBearing(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  const θ = Math.atan2(y, x);

  return ((θ * 180) / Math.PI + 360) % 360;
}

// Alias used by new code
export const bearingTo = calculateBearing;

export function normalizeAngleDifference(angle: number): number {
  let normalized = angle % 360;
  if (normalized > 180) {
    normalized -= 360;
  } else if (normalized < -180) {
    normalized += 360;
  }
  return normalized;
}

// Alias used by new code
export function angleDiff(a: number, b: number): number {
  return Math.abs(normalizeAngleDifference(a - b));
}

/**
 * Projects a world bearing to a screen X position (0–100 percent) and Y position (fixed center).
 * Returns { x, y, visible } where x and y are percentages.
 */
export function projectToScreen(
  bearing: number,
  userHeading: number,
  fovDegrees: number = 60
): { x: number; y: number; visible: boolean } {
  const diff = normalizeAngleDifference(bearing - userHeading);
  const halfFov = fovDegrees / 2;

  if (Math.abs(diff) > halfFov) {
    return { x: 0, y: 40, visible: false };
  }

  const normalizedX = diff / halfFov;
  const screenX = 50 + normalizedX * 50; // 0–100 percent

  return { x: screenX, y: 40, visible: true };
}
