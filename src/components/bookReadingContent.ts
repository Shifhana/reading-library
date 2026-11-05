import type { Book } from '../data/books'
import { readNote, type ContentField } from './noteStorage.ts'

export type ReadingSection = { field: ContentField; heading: string; body: string }
export type ReadingFragment = ReadingSection & { start: number; end: number }

// Reading does not migrate/write storage. An intentional empty override stays empty.
export function loadReadingSections(book: Book, storage: Pick<Storage, 'getItem'>): ReadingSection[] {
  const body = (field: ContentField) => {
    const stored = readNote(storage, book.slug, field)
    return stored === undefined ? book[field] ?? '' : stored?.body ?? ''
  }
  const reflection = body('whatIRemember'), notes = body('myNotes')
  return [
    { field: 'summary', heading: 'Summary', body: body('summary') },
    ...(reflection ? [{ field: 'whatIRemember' as const, heading: 'What I remember', body: reflection }] : []),
    ...(notes ? [{ field: 'myNotes' as const, heading: 'My notes', body: notes }] : []),
    { field: 'takeaways', heading: 'What I’m taking away', body: body('takeaways') },
    // Keep a directly writable reflection surface without an extra labelled blank page.
    ...(!reflection ? [{ field: 'whatIRemember' as const, heading: '', body: '' }] : []),
  ]
}

export function paginateSections(sections: ReadingSection[], fits: (page: ReadingFragment[]) => boolean): ReadingFragment[][] {
  const pages: ReadingFragment[][] = [[]]
  for (const section of sections) {
    let start = 0
    do {
      let page = pages[pages.length - 1]
      const fragment = (end: number): ReadingFragment => ({ ...section, heading: start === 0 ? section.heading : '', body: section.body.slice(start, end), start, end })
      // Avoid a heading stranded above a single line at the foot of a page.
      if (page.length && !fits([...page, fragment(Math.min(section.body.length, start + 90))])) {
        page = []; pages.push(page)
      }
      let low = start, high = section.body.length, end = start
      while (low <= high) {
        const mid = Math.floor((low + high) / 2)
        if (fits([...page, fragment(mid)])) { end = mid; low = mid + 1 } else high = mid - 1
      }
      // Guaranteed progress even in an exceptionally short viewport.
      if (end === start && section.body.length > start) end++
      if (end < section.body.length) {
        const boundary = Math.max(section.body.lastIndexOf(' ', end - 1), section.body.lastIndexOf('\n', end - 1))
        if (boundary > start + (end - start) / 2) end = boundary + 1
      }
      page.push(fragment(end))
      start = end
      if (start < section.body.length) pages.push([])
    } while (start < section.body.length)
  }
  return pages
}

export function replaceReadingFragment(body: string, fragment: Pick<ReadingFragment, 'start' | 'end'>, text: string) {
  return body.slice(0, fragment.start) + text + body.slice(fragment.end)
}
