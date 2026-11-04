type Point = readonly [number, number]

// Keep the outer cover's own shape while the readable page block expands.
// At the edge-on midpoint it can meet the existing open-page geometry cleanly.
export function coverFaceCorners(q: readonly Point[], aspectRatio: number): Point[] {
  const width = Math.hypot(q[3][0] - q[0][0], q[3][1] - q[0][1]) * aspectRatio
  const extend = (start: Point, end: Point): Point => {
    const length = Math.hypot(end[0] - start[0], end[1] - start[1])
    return [start[0] + (end[0] - start[0]) * width / length, start[1] + (end[1] - start[1]) * width / length]
  }
  return [q[0], extend(q[0], q[1]), extend(q[3], q[2]), q[3]]
}

// Map the artwork rectangle onto the existing four cover corners. A projective
// transform keeps the art attached to the cover as it turns around the spine.
export function coverMatrix(q: readonly Point[], width = 600, height = 840): number[] | null {
  const [p0, p1, p2, p3] = q
  const dx1 = p1[0] - p2[0], dx2 = p3[0] - p2[0]
  const dy1 = p1[1] - p2[1], dy2 = p3[1] - p2[1]
  const determinant = dx1 * dy2 - dx2 * dy1
  if (Math.abs(determinant) < .001) return null // Cover is edge-on.
  const dx3 = p0[0] - p1[0] + p2[0] - p3[0]
  const dy3 = p0[1] - p1[1] + p2[1] - p3[1]
  const g = (dx3 * dy2 - dx2 * dy3) / determinant
  const h = (dx1 * dy3 - dx3 * dy1) / determinant
  return [
    (p1[0] - p0[0] + g * p1[0]) / width, (p1[1] - p0[1] + g * p1[1]) / width, 0, g / width,
    (p3[0] - p0[0] + h * p3[0]) / height, (p3[1] - p0[1] + h * p3[1]) / height, 0, h / height,
    0, 0, 1, 0, p0[0], p0[1], 0, 1,
  ]
}
