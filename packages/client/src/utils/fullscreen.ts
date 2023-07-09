import React from 'react'
import { CarObject, TrackObject } from '@/engine/Objects'
import sportCarImage from 'images/sport_car.png'
const checkKey = (key: string): boolean => {
  return key.toLowerCase() === 'f' || key.toLowerCase() === 'а'
}

export const makeContainerFullscreen = <T extends HTMLElement>(
  key: string,
  container: React.RefObject<T> | HTMLElement
) => {
  if (
    checkKey(key) &&
    document.fullscreenEnabled &&
    !document.fullscreenElement
  ) {
    if (container instanceof HTMLElement) {
      container.requestFullscreen()
      return
    }
    container?.current?.requestFullscreen()
  }
  if (checkKey(key) && document.fullscreenElement) {
    document.exitFullscreen()
  }
}
