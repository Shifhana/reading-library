import { createPortal } from 'react-dom'
import type { TimeName } from './atmosphere'
import type { useEnvironment } from './useEnvironment'
import './environment.css'
type Environment = ReturnType<typeof useEnvironment>

// Only the exterior is composited. Never paint or replace the plaster/floor.
export function EnvironmentLayers({ environment: { atmosphere: a }, image }: { environment: Environment; image: string }) {
  return <g aria-hidden="true" pointerEvents="none">
    <defs>
      <clipPath id="environment-exterior"><path transform="scale(1.025995575 0.974712644)" d="M0,0 H148 L320,90 V454 H268 L241,571 L0,692 Z M1323,0 H1808 V325 L1357,289 L1364,90 H1237 Z" /></clipPath>
    </defs>
    <image href={image} width="1855" height="848" preserveAspectRatio="none" clipPath="url(#environment-exterior)" className="environment-fade" style={{ filter: `brightness(${a.exterior}) saturate(${a.time === 'night' ? .3 : .92})` }} />
  </g>
}
export function EnvironmentDisplay({ environment: e }: { environment: Environment }) {
  return <>
    <foreignObject x="640" y="164" width="520" height="150"><div className="environment-clock" data-night={e.atmosphere.time === 'night' || undefined}><time aria-label={'Local time ' + e.clock}>{e.clock}</time><small>Local time</small></div></foreignObject>
    {e.debug && createPortal(<aside className="environment-debug" aria-label="Environment preview"><details open><summary>Environment preview · development only</summary><label><input type="checkbox" checked={e.preview} onChange={event => e.setPreview(event.target.checked)} /> Simulate time</label><label>Time<select disabled={!e.preview} value={e.time} onChange={event => e.setTime(event.target.value as TimeName)}><option value="morning">Morning</option><option value="afternoon">Afternoon</option><option value="evening">Evening</option><option value="night">Night</option></select></label></details></aside>, document.body)}
  </>
}


