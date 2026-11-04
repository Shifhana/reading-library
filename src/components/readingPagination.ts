// Keep every character; prefer a word boundary but also split unbroken text.
export function paginateText(text: string, fits: (text: string) => boolean): string[] {
  if (!text) return ['']
  const pages: string[] = []
  let rest = text
  while (rest) {
    let low = 1, high = rest.length, end = 1
    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      if (fits(rest.slice(0, mid))) { end = mid; low = mid + 1 } else high = mid - 1
    }
    if (end < rest.length) {
      const boundary = Math.max(rest.lastIndexOf(' ', end - 1), rest.lastIndexOf('\n', end - 1))
      if (boundary > end / 2) end = boundary + 1
    }
    pages.push(rest.slice(0, end))
    rest = rest.slice(end)
  }
  return pages
}
