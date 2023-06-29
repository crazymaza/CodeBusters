import { useState } from 'react'
import { useEngine } from '@/pages/Play/hooks'

export default function useSession(
  canvasElement: React.RefObject<HTMLCanvasElement>
) {
  const engine = useEngine(canvasElement)

  console.log('engine', engine)

  return null
}
