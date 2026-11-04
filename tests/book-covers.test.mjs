import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { books } from '../src/data/books.ts'
import { coverFaceCorners, coverMatrix } from '../src/components/coverProjection.ts'
import { coverDimensions } from '../src/components/coverDimensions.ts'
import { bookCoverDesigns, coverPalettes, coverTitle } from '../src/components/bookCoverDesigns.ts'

test('every book has intentional cover art direction and title splitting preserves metadata', () => {
  assert.deepEqual(Object.keys(bookCoverDesigns).sort(), books.map(book => book.slug).sort())
  for (const book of books) {
    const design = bookCoverDesigns[book.slug]
    assert.ok(coverPalettes[design.palette])
    const text = coverTitle(book.title, design.subtitleAt)
    const normalize = value => value.replace(/[, :]+/g, ' ').trim()
    assert.equal(normalize(`${text.title} ${text.subtitle}`), normalize(book.title))
  }
  assert.deepEqual(coverTitle('An edited title', ': unavailable'), { title: 'An edited title', subtitle: '' })
})

test('every library book has a separate existing slug-named artwork asset', async () => {
  const manifest = JSON.parse(await readFile(new URL('../src/assets/book-covers/published-covers.json', import.meta.url), 'utf8'))
  assert.equal(manifest.length, books.length)
  assert.equal(new Set(books.map(book => book.coverImage)).size, books.length)
  for (const book of books) {
    const source = manifest.find(cover => cover.slug === book.slug)
    assert.ok(source?.source.startsWith('https://'))
    assert.ok(book.coverImage.endsWith(`/book-covers/${source.file}`))
    const asset = await readFile(new URL(book.coverImage))
    assert.ok(asset.length > 1000)
    if (source.format === 'svg') {
      const viewBox = asset.toString().match(/viewBox="0 0 (\d+) (\d+)"/)
      assert.ok(viewBox)
      assert.deepEqual(coverDimensions[book.slug], viewBox.slice(1).map(Number))
    }
    else {
      assert.equal(asset.readUInt16BE(0), 0xffd8, `${book.slug}: valid JPEG`)
      // Read the JPEG frame itself so layout dimensions cannot silently go stale.
      let offset = 2, measured
      while (offset < asset.length) {
        const marker = asset[offset + 1]
        if ([0xc0, 0xc1, 0xc2].includes(marker)) {
          measured = [asset.readUInt16BE(offset + 7), asset.readUInt16BE(offset + 5)]
          break
        }
        offset += 2 + asset.readUInt16BE(offset + 2)
      }
      assert.deepEqual(coverDimensions[book.slug], measured, `${book.slug}: intrinsic dimensions`)
      assert.ok(Math.max(source.width, source.height) >= 400, `${book.slug}: held-cover resolution`)
      assert.ok(source.width <= 800 && source.height <= 1000)
      assert.ok(asset.length < 300_000, `${book.slug}: bounded asset size`)
    }
  }
})

test('the moving front cover retains its own aspect while the reading page block changes size', () => {
  for (const aspect of [.641, .85, .996]) {
    for (const pageWidth of [160, 260, 400]) {
      const q = [[20,30],[20+pageWidth,35],[20+pageWidth,430],[20,430]]
      const face = coverFaceCorners(q, aspect)
      const height = Math.hypot(face[3][0]-face[0][0], face[3][1]-face[0][1])
      const width = Math.hypot(face[1][0]-face[0][0], face[1][1]-face[0][1])
      assert.ok(Math.abs(width / height - aspect) < 1e-10)
      assert.deepEqual(face[0], q[0], 'cover stays attached to the spine')
      assert.deepEqual(face[3], q[3])
    }
  }
})

test('cover projection preserves an artwork canvas matched to the physical book proportions', () => {
  for (const [width, height] of [[300, 400], [400, 400], [260, 400]]) {
    const canvasWidth = 600, canvasHeight = canvasWidth * height / width
    const m = coverMatrix([[10,20],[10+width,20],[10+width,20+height],[10,20+height]], canvasWidth, canvasHeight)
    assert.ok(m)
    assert.ok(Math.abs(m[0] - m[5]) < 1e-10, 'equal x/y scale before perspective is applied')
  }
})

test('cover projection follows all four corners during shelf, held and spine rotation poses', () => {
  const poses = [
    [[10,20],[80,20],[79,120],[9,120]],
    [[400,230],[650,241],[650,592],[400,600]],
    [[500,200],[530,190],[530,610],[500,600]],
  ]
  for (const quad of poses) {
    const m = coverMatrix(quad)
    assert.ok(m.every(Number.isFinite))
    for (const [i,[x,y]] of [[0,0],[600,0],[600,840],[0,840]].entries()) {
      const denominator = m[3]*x + m[7]*y + m[15]
      const actual = [(m[0]*x+m[4]*y+m[12])/denominator, (m[1]*x+m[5]*y+m[13])/denominator]
      assert.ok(Math.abs(actual[0]-quad[i][0]) < .00001)
      assert.ok(Math.abs(actual[1]-quad[i][1]) < .00001)
    }
  }
  assert.equal(coverMatrix([[0,0],[0,0],[0,100],[0,100]]), null)
})
