export function getAngularTolerance(xp: number): number {
  if (xp <= 10000) {
    return 10;
  } else if (xp <= 50000) {
    return 15;
  } else {
    return 20;
  }
}
