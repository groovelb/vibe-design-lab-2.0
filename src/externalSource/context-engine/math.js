/**
 * 3D Sphere math utilities
 * - Golden spiral point generation
 * - Y-axis rotation + perspective projection
 * - Z-sorting
 */

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;

/**
 * Generate uniformly distributed points on a sphere using golden spiral
 */
export function generateSpherePoints(count = 120, relevantRatio = 0.25) {
  const points = [];
  for (let i = 0; i < count; i++) {
    const phi = 2 * Math.PI * i / GOLDEN_RATIO;
    const theta = Math.acos(1 - 2 * (i + 0.5) / count);
    points.push({
      x: Math.sin(theta) * Math.cos(phi),
      y: Math.sin(theta) * Math.sin(phi),
      z: Math.cos(theta),
      isRelevant: Math.random() < relevantRatio,
      id: i,
    });
  }
  return points;
}

/**
 * Project a 3D point to 2D screen coordinates with Y-axis rotation
 */
export function projectPoint(point, angle, cx = 450, cy = 250, radius = 140, perspectiveStrength = 0.3) {
  // Y-axis rotation
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  const rx = point.x * cosA - point.z * sinA;
  const rz = point.x * sinA + point.z * cosA;

  // Perspective projection
  const depth = 1 / (1 - perspectiveStrength * rz);

  return {
    sx: cx + radius * rx * depth,
    sy: cy + radius * point.y * depth,
    rz,
    depth,
    size: 2 + 3 * depth,
    opacity: 0.1 + 0.7 * depth,
  };
}

/**
 * Sort points by z-depth (back to front) for correct rendering order
 */
export function zSort(projectedPoints) {
  return [...projectedPoints].sort((a, b) => a.rz - b.rz);
}
