import React from 'react'

const checkKey = (key: string): boolean => {
  return key.toLowerCase() === 'f' || key.toLowerCase() === 'а'
}

const makeContainerFullscreen = <T extends HTMLElement>(
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

export default makeContainerFullscreen
