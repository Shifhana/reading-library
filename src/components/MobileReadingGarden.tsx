import { WindChime } from './WindChime'
import { botanicalProfiles } from './readingBreezeLayout'
import { useEnvironment } from '../environment/useEnvironment'
import caneTexture from '../assets/reading-breeze/fine-lattice-v2.png'
import './MobileReadingGarden.css'

export function MobileReadingGarden() {
  const { atmosphere } = useEnvironment()
  return <section className="mobile-garden" aria-labelledby="mobile-garden-title">
    <svg className="mobile-garden-chimes" viewBox="1224 -30 165 190" aria-hidden="true" focusable="false">
      <g fill="none" stroke="#626555" strokeWidth="1.8" opacity=".55">
        <path d="M1258 86L1356 0Q1367 -9 1389 -9" />
        <path d="M1266 91L1364 5Q1375 -4 1395 -4" />
      </g>
      {/* Reuse contact-driven sound, independent sway and gesture unlocking.
          The existing component also handles reduced motion and hidden tabs. */}
      <WindChime atmosphere={atmosphere} />
    </svg>
    <div className="mobile-garden-copy">
      <h1 id="mobile-garden-title">This library doesn’t quite fit in your pocket.</h1>
      <p>Open it on a larger screen for the full experience.</p>
    </div>
    <svg className="mobile-garden-weave" viewBox="0 0 240 210" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="mobile-cane" width="96" height="96" patternUnits="userSpaceOnUse" patternTransform="scale(.72)">
          <image href={caneTexture} width="96" height="96" />
        </pattern>
      </defs>
      <g fill="url(#mobile-cane)" strokeWidth="1.1">
        <path d={botanicalProfiles.pebble} transform="translate(144 165) rotate(26) scale(.95 .96)"
          stroke="#a79983" opacity=".65" />
        <path d={botanicalProfiles.cove} transform="translate(107 168) rotate(-24) scale(1.75 1.42)"
          stroke="#878975" />
      </g>
    </svg>
  </section>
}
