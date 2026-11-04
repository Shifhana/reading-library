import { createPortal } from 'react-dom'
import type { TimeName } from './atmosphere'
import type { useEnvironment } from './useEnvironment'
import './environment.css'
import { SpatialSunlight } from './SpatialSunlight'
import rightExterior from '../assets/reading-garden-soft-right-trees-v2.png'
type Environment = ReturnType<typeof useEnvironment>

export function EnvironmentLayers({ environment: { atmosphere: a }, image }: { environment: Environment; image: string }) {
  const night = a.time === 'night'
  return <g aria-hidden="true" pointerEvents="none">
    <defs>
      {/* Follow the actual glazing sill, not a detour around the shelf. */}
      <clipPath id="environment-exterior"><path d="M0 0 H158 L325 86 V510 L0 660Z M1353 0 H2019 V333 L1382 282 L1388 83 H1260Z" /></clipPath>
      <clipPath id="environment-left-exterior"><path d="M0 0H158L325 86V510L0 660Z" /></clipPath>
      <clipPath id="environment-right-exterior"><path d="M1353 0 H2019 V333 L1382 282 L1388 83 H1260Z" /></clipPath>
      <clipPath id="night-glass-panes"><path d="M8 10H35V625L8 646Z M55 10H155V551L55 612Z M181 24L267 68V535L181 582Z M281 77L314 94V505L281 525Z" /></clipPath>
      <clipPath id="night-jaali"><path d="M1382 282L2019 333V720L1345 417L1382 378Z" /></clipPath>
      <clipPath id="sun-wall"><path d="M328 88 H1399 L1392 282 V383 H1354 V446 H328Z" /></clipPath>
      <clipPath id="sun-floor"><path d="M328 437 H1355 L2019 720 V848 H0 V660 L328 510Z" /></clipPath>
      <clipPath id="interior-fill"><path d="M328 86 H1388 V282 L2019 333 V848 H0 V660 L328 510Z" /></clipPath>
      <mask id="sun-receivers" maskUnits="userSpaceOnUse" x="0" y="0" width="2019" height="848">
        <rect width="2019" height="848" fill="white" />
        <use href="#rendered-shelf-silhouettes" fill="black" />
      </mask>
      {/* Remove only the pale daytime sky from the existing photographs.
          Original branches, tree layers and metalwork keep their exact edges. */}
      <filter id="night-sky-key" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -.2126 -.7152 -.0722 0 1" />
        <feComponentTransfer><feFuncA type="table" tableValues="0 0 .55 .94 1 1 1 1 1 1 1" /></feComponentTransfer>
        <feComposite in2="SourceAlpha" operator="in" />
      </filter>
      <filter id="night-landscape-tone" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feColorMatrix type="saturate" values=".12" />
        <feComponentTransfer>
          <feFuncR type="linear" slope=".14" intercept=".006" />
          <feFuncG type="linear" slope=".16" intercept=".008" />
          <feFuncB type="linear" slope=".19" intercept=".016" />
        </feComponentTransfer>
      </filter>
      <mask id="night-right-structure" maskUnits="userSpaceOnUse" x="0" y="0" width="2019" height="848" style={{ maskType: 'alpha' }}>
        <image href={rightExterior} width="2019" height="848" preserveAspectRatio="none" filter="url(#night-sky-key)" />
      </mask>
      {/* Sharper near branches and painted rods, softer luminous distant leaves.
          The luminance mask follows the photograph, so no foliage is relocated. */}
      <filter id="exterior-material-depth" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feGaussianBlur in="SourceGraphic" stdDeviation=".65" result="leaf-softness" />
        <feComposite in="SourceGraphic" in2="leaf-softness" operator="arithmetic" k2="1.12" k3="-.12" result="near-detail" />
        <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  .2126 .7152 .0722 0 -.28" />
        <feComponentTransfer><feFuncA type="linear" slope=".65" /></feComponentTransfer>
        <feComposite in="leaf-softness" operator="in" result="distant-leaves" />
        <feMerge><feMergeNode in="near-detail" /><feMergeNode in="distant-leaves" /></feMerge>
      </filter>
      <linearGradient id="day-glass-response" gradientUnits="userSpaceOnUse" x1="0" y1="180" x2="330" y2="320">
        <stop stopColor="#e8dfca" stopOpacity=".045" /><stop offset=".15" stopColor="#e8dfca" stopOpacity=".008" />
        <stop offset=".7" stopColor="#b6c6be" stopOpacity=".012" /><stop offset="1" stopColor="#e6d6bc" stopOpacity=".065" />
      </linearGradient>
      <radialGradient id="day-glass-room-reflection" cx="75%" cy="76%" r="68%">
        <stop stopColor="#e9dfcb" stopOpacity=".055" /><stop offset="1" stopColor="#e9dfcb" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="night-sky" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="660">
        <stop stopColor="#08111f" /><stop offset=".46" stopColor="#1d2b3d" /><stop offset="1" stopColor="#303b47" />
      </linearGradient>
      <linearGradient id="night-frame-bounce" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="340">
        <stop stopColor="#e7d8bf" stopOpacity=".02" /><stop offset="1" stopColor="#e7d8bf" stopOpacity=".04" />
      </linearGradient>
      <radialGradient id="night-fill" cx="28%" cy="48%" r="75%">
        <stop stopColor="#eee2cf" stopOpacity=".06" /><stop offset=".6" stopColor="#eee2cf" stopOpacity=".025" /><stop offset="1" stopColor="#eee2cf" stopOpacity="0" />
      </radialGradient>
      {/* Broad reflected light from concealed architectural sources. The wall
          and floor receive separate washes, with no visible bulb or beam. */}
      <radialGradient id="night-wall-wash" gradientUnits="userSpaceOnUse" cx="865" cy="125" r="590" gradientTransform="translate(0 43.75) scale(1 .65)">
        <stop stopColor="#f2d5b0" stopOpacity=".28" />
        <stop offset=".55" stopColor="#eed9bb" stopOpacity=".12" />
        <stop offset="1" stopColor="#eed9bb" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="night-floor-bounce" cx="55%" cy="45%" r="65%">
        <stop stopColor="#eedbc3" stopOpacity=".08" />
        <stop offset="1" stopColor="#eedbc3" stopOpacity="0" />
      </radialGradient>
      {/* A warm-white 2700K visual approximation after interior white balance;
          broad matte reflections, never mirror-like or exposed light strips. */}
      <radialGradient id="night-reflection">
        <stop stopColor="#eed9b9" stopOpacity=".12" />
        <stop offset=".45" stopColor="#eee0c7" stopOpacity=".05" />
        <stop offset="1" stopColor="#eee0c7" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="night-moon-fill">
        <stop stopColor="#b8c7dd" stopOpacity=".09" /><stop offset="1" stopColor="#b8c7dd" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="night-jaali-bounce">
        <stop stopColor="#e5c9a5" stopOpacity=".12" /><stop offset="1" stopColor="#e5c9a5" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="night-cover-response" x2="100%" y2="35%">
        <stop stopColor="#101822" stopOpacity=".14" /><stop offset=".04" stopColor="#f0dfc1" stopOpacity=".14" />
        <stop offset=".16" stopColor="#f0dfc1" stopOpacity=".025" /><stop offset=".7" stopColor="#bdcbdc" stopOpacity=".035" />
        <stop offset="1" stopColor="#151a22" stopOpacity=".1" />
      </linearGradient>
    </defs>
    <g clipPath="url(#environment-exterior)" mask="url(#sun-receivers)" className="environment-fade" style={{ filter: `brightness(${a.exterior}) saturate(${night ? .3 : .92})` }}>
      <image href={image} width="2019" height="848" preserveAspectRatio="none" filter="url(#exterior-material-depth)" />
    </g>
    {/* Distant, open tree crowns remain behind the sharper interior creepers. */}
    <g clipPath="url(#environment-right-exterior)" className="environment-fade" style={{ filter: `brightness(${a.exterior}) saturate(${night ? .3 : .92})` }}>
      <image href={rightExterior} width="2019" height="848" preserveAspectRatio="none" filter="url(#exterior-material-depth)" />
    </g>
    <g data-night-exterior="true" className="environment-fade" opacity={night ? 1 : 0} mask="url(#sun-receivers)">
      <rect width="2019" height="848" clipPath="url(#environment-exterior)" fill="url(#night-sky)" />
      <image href={image} width="2019" height="848" preserveAspectRatio="none" clipPath="url(#environment-left-exterior)" filter="url(#night-landscape-tone)" />
      <g clipPath="url(#environment-right-exterior)" mask="url(#night-right-structure)">
        <image href={rightExterior} width="2019" height="848" preserveAspectRatio="none" filter="url(#night-landscape-tone)" />
        <rect width="2019" height="340" fill="url(#night-frame-bounce)" />
      </g>
    </g>
    <SpatialSunlight time={a.time} />
    <g clipPath="url(#night-glass-panes)" mask="url(#sun-receivers)" className="environment-fade" opacity={night ? 0 : a.exposure}>
      <rect width="330" height="660" fill="url(#day-glass-response)" />
      <rect width="330" height="660" fill="url(#day-glass-room-reflection)" />
    </g>
    {a.time === 'night' && <g clipPath="url(#interior-fill)" style={{ mixBlendMode: 'screen' }}><rect width="2019" height="848" fill="url(#night-fill)" /></g>}
    {a.time === 'night' && <g style={{ mixBlendMode: 'screen' }} mask="url(#sun-receivers)">
      <rect width="2019" height="848" clipPath="url(#sun-wall)" fill="url(#night-wall-wash)" />
      <rect x="0" y="437" width="2019" height="411" clipPath="url(#sun-floor)" fill="url(#night-floor-bounce)" />
      <g clipPath="url(#sun-floor)">
        <ellipse cx="820" cy="645" rx="670" ry="175" fill="url(#night-reflection)" />
        <ellipse cx="230" cy="620" rx="690" ry="180" fill="url(#night-moon-fill)" />
      </g>
      <ellipse cx="350" cy="280" rx="220" ry="240" clipPath="url(#sun-wall)" fill="url(#night-moon-fill)" opacity=".45" />
      <ellipse cx="1740" cy="405" rx="470" ry="190" clipPath="url(#night-jaali)" fill="url(#night-jaali-bounce)" />
      <g clipPath="url(#night-glass-panes)" opacity=".7">
        <ellipse cx="205" cy="250" rx="130" ry="245" fill="url(#night-reflection)" transform="rotate(-16 205 250)" />
        <ellipse cx="95" cy="320" rx="65" ry="220" fill="url(#night-reflection)" opacity=".45" />
        <ellipse cx="210" cy="235" rx="145" ry="280" fill="url(#night-moon-fill)" opacity=".5" />
      </g>
    </g>}
  </g>
}
export function EnvironmentDisplay({ environment: e, showClock = true }: { environment: Environment; showClock?: boolean }) {
  return <>
    {showClock && <foreignObject x="640" y="164" width="520" height="150"><div className="environment-clock" data-night={e.atmosphere.time === 'night' || undefined}><time aria-label={'Local time ' + e.clock}>{e.clock}</time><small>Local time</small></div></foreignObject>}
    {e.debug && createPortal(<aside className="environment-debug" aria-label="Environment preview"><details open><summary>Environment preview · development only</summary><label><input type="checkbox" checked={e.preview} onChange={event => e.setPreview(event.target.checked)} /> Simulate time</label><label>Time<select disabled={!e.preview} value={e.time} onChange={event => e.setTime(event.target.value as TimeName)}><option value="morning">Morning</option><option value="afternoon">Afternoon</option><option value="evening">Evening</option><option value="night">Night</option></select></label></details></aside>, document.body)}
  </>
}
