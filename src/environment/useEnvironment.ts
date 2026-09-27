import { useEffect, useState } from 'react'
import { atmosphereAt, previewHours, type TimeName } from './atmosphere'
export function useEnvironment() {
  const debug = import.meta.env.DEV && new URLSearchParams(window.location.search).get('environment') === 'preview'
  const [preview, setPreview] = useState(debug)
  const [time, setTime] = useState<TimeName>('morning')
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const tick = () => setNow(new Date())
    const timer = window.setInterval(tick, 60000)
    document.addEventListener('visibilitychange', tick)
    return () => { window.clearInterval(timer); document.removeEventListener('visibilitychange', tick) }
  }, [])
  const hour = preview ? previewHours[time] : now.getHours() + now.getMinutes() / 60
  const date = preview ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour) : now
  const clock = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
  return { atmosphere: atmosphereAt(hour), clock, debug, preview, setPreview, time, setTime }
}
