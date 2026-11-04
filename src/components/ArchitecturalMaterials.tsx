// Surface-only refinements of the existing photograph. All coordinates share
// the room plate; no displacement, new geometry, or additional light sources.
export function ArchitecturalMaterials({ image, filter }: { image: string; filter: string }) {
  return <g aria-hidden="true" pointerEvents="none" className="environment-fade" style={{ filter }}>
    <defs>
      <clipPath id="material-plaster">
        <path d="M328 88H1388V282L1382 378L1345 417V437H328Z M145 0H1353L1258 86H328Z" />
      </clipPath>
      <clipPath id="material-clay">
        <path d="M1382 282L2019 333V720L1345 417L1382 378Z" />
      </clipPath>
      <filter id="plaster-surface" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        {/* Recover the photographed lime texture without covering it with noise. */}
        <feGaussianBlur stdDeviation="1.3" result="soft" />
        <feComposite in="SourceGraphic" in2="soft" operator="arithmetic" k2="1.16" k3="-.16" />
      </filter>
      <filter id="clay-surface" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feGaussianBlur stdDeviation=".8" result="soft" />
        <feComposite in="SourceGraphic" in2="soft" operator="arithmetic" k2="1.18" k3="-.18" />
        <feColorMatrix type="saturate" values=".93" />
        {/* A restrained toe deepens the existing aperture recesses. */}
        <feComponentTransfer>
          <feFuncR type="gamma" amplitude="1.01" exponent="1.035" />
          <feFuncG type="gamma" amplitude="1.01" exponent="1.035" />
          <feFuncB type="gamma" amplitude="1.01" exponent="1.035" />
        </feComponentTransfer>
      </filter>
    </defs>
    <g clipPath="url(#material-plaster)">
      <image href={image} width="2019" height="848" preserveAspectRatio="none" filter="url(#plaster-surface)" />
    </g>
    <g clipPath="url(#material-clay)">
      <image href={image} width="2019" height="848" preserveAspectRatio="none" filter="url(#clay-surface)" />
    </g>
  </g>
}
