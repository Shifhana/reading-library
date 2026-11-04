import { useEffect, useMemo, useState } from 'react'
import type { TimeName } from './atmosphere'
import { receiver, solarDirections, solarVisibility } from './solarGeometry'
import foliageUrl from '../assets/foliage-shadow-v2.png'

const cache = new Map<string, string>()
let foliage: ImageData | undefined
let foliageLoad: Promise<void> | undefined
function loadFoliage() {
  return foliageLoad ??= new Promise<void>(resolve => {
    const image = new Image()
    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 768; canvas.height = 512
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(image, 0, 0, 768, 512)
      foliage = ctx.getImageData(0, 0, 768, 512)
      resolve()
    }
    image.onerror = () => resolve()
    image.src = foliageUrl
  })
}
function illumination(time: TimeName, surface: 'wall' | 'floor' | 'ledge', ready: boolean, shadow: boolean) {
  const key = `${time}-${surface}-${ready}-${shadow}`
  if (cache.has(key)) return cache.get(key)
  const sun = solarDirections[time]
  if (!sun) return undefined
  const canvas = document.createElement('canvas')
  canvas.width = 1010; canvas.height = 424
  const ctx = canvas.getContext('2d')!
  const pixels = ctx.createImageData(canvas.width, canvas.height)
  const color = shadow ? [72, 66, 57] : time === 'evening' ? [255, 198, 113] : time === 'morning' ? [255, 232, 191] : [255, 246, 225]
  for (let py = 0; py < canvas.height; py++) for (let px = 0; px < canvas.width; px++) {
    const p = receiver(px * 2019 / 1010, py * 2, surface)
    if (!p) continue
    let light = 0
    // A finite solar disc produces distance-dependent penumbra naturally.
    for (const offset of [-.009, -.0045, 0, .0045, .009]) {
      const ray: [number, number, number] = [sun[0], sun[1] + offset, sun[2] + offset * .6]
      let visibility = solarVisibility(p, ray)
      if (time === 'morning' && foliage && visibility) {
        // The foliage lives outside the east glazing. Sample the same world
        // plane for every receiver instead of separately warping wall/floor PNGs.
        const t = (-.6 - p[0]) / ray[0]
        const u = (p[2] + t * ray[2]) / 10
        const v = (5 - p[1] - t * ray[1]) / 5
        if (u >= 0 && u < 1 && v >= 0 && v < 1) {
          const alpha = foliage.data[(Math.floor(v * 512) * 768 + Math.floor(u * 768)) * 4 + 3] / 255
          visibility *= 1 - alpha * .88
        }
      }
      light += visibility / 5
    }
    const index = (py * canvas.width + px) * 4
    pixels.data[index] = color[0]; pixels.data[index + 1] = color[1]; pixels.data[index + 2] = color[2]
    pixels.data[index + 3] = shadow ? (1 - light) * (time === 'evening' ? 19 : 18) : light * (time === 'evening' ? 47 : time === 'afternoon' ? 53 : 42)
  }
  ctx.putImageData(pixels, 0, 0)
  const url = canvas.toDataURL()
  cache.set(key, url)
  return url
}

export function SpatialSunlight({ time }: { time: TimeName }) {
  const [ready, setReady] = useState(!!foliage)
  useEffect(() => { let active = true; void loadFoliage().then(() => { if (active) setReady(true) }); return () => { active = false } }, [])
  const images = useMemo(() => (['wall', 'floor', 'ledge'] as const).flatMap(surface => [false, true].map(shadow => ({ surface, shadow, url: illumination(time, surface, ready, shadow) }))), [time, ready])
  if (time === 'night') return null
  return <g mask="url(#sun-receivers)">
    <defs><filter id="solar-sampling-softness"><feGaussianBlur stdDeviation={time === 'evening' ? 1.4 : .65} /></filter><clipPath id="sun-ledge"><path d="M1345 417 L1382 378 L2019 636 V678Z" /></clipPath></defs>
    {images.map(({ surface, shadow, url }) => <image filter="url(#solar-sampling-softness)" style={{ mixBlendMode: shadow ? 'multiply' : 'screen' }} key={`${surface}-${shadow}`} href={url} width="2019" height="848" preserveAspectRatio="none" clipPath={`url(#sun-${surface})`} />)}
  </g>
}
