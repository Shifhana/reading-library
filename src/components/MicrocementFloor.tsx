import floorPlate from '../assets/reading-garden-microcement-v24.png'

// Each inlay reuses the stone plate at the same coordinates, retaining its
// grain and shading. Only the stone colour changes under the room lighting.
export function MicrocementFloor({ filter }: { filter: string }) {
  return <g aria-hidden="true" pointerEvents="none">
    <defs>
      <clipPath id="microcement-floor-boundary">
        <path d="M328 437 L1345 427 L2019 720 V848 H0 V669 L328 482Z" />
      </clipPath>
      <filter id="stone-mineral-finish" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feGaussianBlur stdDeviation="1.1" result="soft-mineral" />
        <feComposite in="SourceGraphic" in2="soft-mineral" operator="arithmetic" k2="1.14" k3="-.14" />
      </filter>
      <image id="microcement-stone-plate" href={floorPlate} width="2019" height="848" preserveAspectRatio="none" filter="url(#stone-mineral-finish)" />
      <clipPath id="floor-clay-inlay">
        <path d="M220 848 C337 747 495 676 650 662 C785 647 880 685 1025 708 C1175 734 1330 715 1500 703 C1680 690 1810 746 1885 848Z" />
      </clipPath>
      <clipPath id="floor-terracotta-band">
        <path d="M220 848 C337 747 495 676 650 662 C785 647 880 685 1025 708 C888 686 790 674 673 691 C528 713 400 782 337 848Z" />
      </clipPath>
      <filter id="floor-pale-clay" colorInterpolationFilters="sRGB">
        <feComponentTransfer>
          <feFuncR type="linear" slope=".991" />
          <feFuncG type="linear" slope=".965" />
          <feFuncB type="linear" slope=".948" />
        </feComponentTransfer>
      </filter>
      <filter id="floor-muted-terracotta" colorInterpolationFilters="sRGB">
        <feComponentTransfer>
          <feFuncR type="linear" slope=".967" />
          <feFuncG type="linear" slope=".929" />
          <feFuncB type="linear" slope=".904" />
        </feComponentTransfer>
      </filter>
    </defs>
    <g clipPath="url(#microcement-floor-boundary)">
      <use href="#microcement-stone-plate" className="environment-fade" style={{ filter }} />
      <g className="environment-fade" style={{ filter }}>
        <g clipPath="url(#floor-clay-inlay)">
          <use href="#microcement-stone-plate" filter="url(#floor-pale-clay)" />
        </g>
        <g clipPath="url(#floor-terracotta-band)">
          <use href="#microcement-stone-plate" filter="url(#floor-muted-terracotta)" />
        </g>
      </g>
    </g>
  </g>
}
