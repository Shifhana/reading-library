import type { Book } from '../data/books'
import { bookCoverDesigns, coverPalettes, coverTitle, type CoverMotif } from './bookCoverDesigns'
import './BookCover.css'

// Original vector marks: one small visual idea for each title, on a common grid.
const motifPaths: Record<CoverMotif, string> = {
  thought: 'M60 180 C60 50 240 30 240 130 C240 220 120 225 120 135 C120 50 350 30 350 155 M350 155 L325 130 M350 155 L375 130',
  bridge: 'M40 205 V115 Q40 35 120 35 H165 V205 M245 205 V35 H290 Q370 35 370 115 V205 M120 125 H290',
  path: 'M30 200 H130 Q175 200 175 155 V85 Q175 40 220 40 H380 M355 15 L380 40 L355 65',
  iterate: 'M80 160 C-10 25 255 -15 325 90 C430 245 165 270 80 160 Z M125 155 C75 60 245 40 285 105 C350 210 175 225 125 155 Z',
  dialogue: 'M40 35 H285 V140 H135 L80 195 V140 H40 Z M160 160 V200 H305 L355 235 V200 H380 V95 H310',
  sprint: 'M35 195 H90 V160 H150 V125 H210 V90 H270 V55 H330 V20 H385 M35 220 H385',
  seed: 'M205 230 V110 M205 170 C100 180 50 130 55 65 C160 55 210 100 205 170 M205 120 C305 130 365 75 355 20 C255 20 200 55 205 120',
  modules: 'M40 30 H130 V120 H40 Z M170 30 H260 V120 H170 Z M300 30 H390 V120 H300 Z M40 160 H130 V250 H40 Z M170 160 H260 V250 H170 Z M300 160 H345 V205 H300 Z',
  interaction: 'M40 60 H150 Q210 60 210 120 V180 Q210 230 275 230 H370 M40 230 H100 Q155 230 155 175 V120 Q155 60 230 60 H370 M345 35 L370 60 L345 85',
  faces: 'M100 240 V180 H55 L80 135 V100 Q80 25 150 25 Q220 25 220 100 V240 M300 240 V180 H345 L320 135 V100 Q320 25 250 25 Q180 25 180 100 V240',
  principles: 'M35 220 H385 M80 220 V70 M165 220 V35 M250 220 V110 M335 220 V70 M40 70 H375',
  pocket: 'M65 35 H345 V200 Q345 250 295 250 H115 Q65 250 65 200 Z M65 105 L205 185 L345 105 M145 35 V5 H265 V35',
  dual: 'M35 70 H110 L140 25 L175 120 L205 70 H380 M35 200 C100 95 170 280 235 185 S335 120 380 200',
  spark: 'M210 25 V75 M210 185 V240 M95 130 H40 M325 130 H380 M130 55 L95 20 M290 205 L325 240 M290 55 L325 20 M130 205 L95 240 M210 80 Q260 80 260 130 Q260 180 210 180 Q160 180 160 130 Q160 80 210 80 Z',
  rise: 'M50 235 V180 M125 235 V135 M200 235 V90 M275 235 V45 M350 235 V5 M35 250 H385',
  emotion: 'M215 130 A90 90 0 1 1 35 130 A90 90 0 1 1 215 130 M300 130 A90 90 0 1 1 120 130 A90 90 0 1 1 300 130 M385 130 A90 90 0 1 1 205 130 A90 90 0 1 1 385 130',
  discovery: 'M35 130 C35 5 160 5 210 130 C260 255 385 255 385 130 C385 5 260 5 210 130 C160 255 35 255 35 130 Z M35 130 H85 M335 130 H385',
  practice: 'M50 40 H150 V140 H50 Z M160 90 H260 V190 H160 Z M270 140 H370 V240 H270 Z',
  framework: 'M65 45 H145 V100 H65 Z M275 45 H355 V100 H275 Z M165 190 H245 V245 H165 Z M145 72 H275 M105 100 V145 H205 V190 M315 100 V145 H205',
  flow: 'M35 200 C135 200 50 30 155 30 S260 230 365 150 M35 230 C165 230 80 60 155 60 S260 260 385 180',
  horizon: 'M35 155 Q125 75 215 150 T385 155 M35 195 H385',
}

export function BookCover({ book }: { book: Pick<Book, 'slug' | 'title' | 'author'> }) {
  const design = bookCoverDesigns[book.slug] ?? { palette: 'parchment', motif: 'horizon' }
  const palette = coverPalettes[design.palette]
  const text = coverTitle(book.title, design.subtitleAt)
  const titleSize = text.title.length > 34 ? 63 : text.title.length > 22 ? 74 : 86
  return <div className="editorial-cover" data-cover-slug={book.slug} aria-hidden="true"
    style={{ backgroundColor: palette.paper, color: palette.ink }}>
    <div className="editorial-cover-label">Reading Garden <span>／</span></div>
    <div className="editorial-cover-heading">
      <div className="editorial-cover-title" style={{ fontSize: titleSize }}>{text.title}</div>
      {text.subtitle && <div className="editorial-cover-subtitle">{text.subtitle}</div>}
    </div>
    <svg className="editorial-cover-motif" viewBox="0 0 420 270" fill="none" aria-hidden="true">
      <path d={motifPaths[design.motif]} stroke={palette.accent} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d={motifPaths[design.motif]} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity=".6" />
    </svg>
    <div className="editorial-cover-author">{book.author || design.temporaryAuthor || 'Author to be confirmed'}</div>
    <div className="editorial-cover-footer"><span>A personal collection</span><span>Reading Garden</span></div>
  </div>
}
