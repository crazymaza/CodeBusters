import { useState, useEffect } from 'react'
import { CBEngine } from '@/engine'

export default function useEngine(
  canvasRef: React.RefObject<HTMLCanvasElement>
) {
  const [engine, setEngine] = useState<CBEngine | null>(null)

  useEffect(() => {
    const isDefineCanvasAndContext =
      canvasRef.current instanceof HTMLCanvasElement

    if (isDefineCanvasAndContext) {
      const ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D
    }
  }, [canvasRef])

  return engine
}
