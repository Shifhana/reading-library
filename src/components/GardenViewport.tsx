import { useEffect, useState } from 'react'
import { RoomShell } from './RoomShell'
import { MobileReadingGarden } from './MobileReadingGarden'

const phoneQuery = '(max-width: 599.98px)'

export function GardenViewport() {
  const [phone, setPhone] = useState(() => window.matchMedia(phoneQuery).matches)
  useEffect(() => {
    const media = window.matchMedia(phoneQuery)
    const update = () => setPhone(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  // Mount only one ambience owner, including when resizing across the boundary.
  return phone ? <MobileReadingGarden /> : <RoomShell />
}
