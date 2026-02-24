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

export function normalizeAngleDifference(angle: number): number {
  let normalized = angle % 360;
  if (normalized > 180) {
    normalized -= 360;
  } else if (normalized < -180) {
    normalized += 360;
  }
  return normalized;
}

export function projectToScreen(
  bearing: number,
  userHeading: number,
  fovDegrees: number = 60
): { x: number; visible: boolean } {
  const angleDiff = normalizeAngleDifference(bearing - userHeading);
  const halfFov = fovDegrees / 2;

  if (Math.abs(angleDiff) > halfFov) {
    return { x: 0, visible: false };
  }

  const normalizedX = angleDiff / halfFov;
  const screenX = 0.5 + normalizedX * 0.5;

  return { x: screenX, visible: true };
}
