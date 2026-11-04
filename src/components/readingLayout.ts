// Screen-space layout for the reading canvas; shelf and held poses are separate.
export function readingLayout(viewportWidth: number, viewportHeight: number) {
  const singlePage = viewportWidth < 720
  const availableHeight = Math.max(0, viewportHeight - 112)
  const width = Math.min(viewportWidth * (singlePage ? .88 : .86), availableHeight * (singlePage ? .82 : 1.9))
  const height = Math.min(availableHeight, width / (singlePage ? .72 : 1.8))
  const x = viewportWidth / 2
  const y = (viewportHeight - 40) / 2
  return { x, y, width, height, pageWidth: width / (singlePage ? 1 : 2),
    left: x - width / 2, top: y - height / 2,
    controlsTop: y + height / 2 + 24, singlePage }
}
