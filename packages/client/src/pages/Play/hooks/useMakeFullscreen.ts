import { useEffect } from 'react'
import { fullscreen as makeFullscreen } from '@/utils'

const useMakeFullscreen = () => {
  useEffect(() => {
    const fullScreen = (event: KeyboardEvent) =>
      makeFullscreen(event.key, document.body)
    document.body.addEventListener('keyup', fullScreen)
    return () => document.body.removeEventListener('keyup', fullScreen)
  }, [])
}

export default useMakeFullscreen
