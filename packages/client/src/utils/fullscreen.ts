import React from 'react'
const checkKey = (key: string): boolean => {
  return key.toLowerCase() === 'f' || key.toLowerCase() === 'а'
}

export const makeContainerFullscreen = <T extends HTMLElement>(
  key: string,
  container: React.RefObject<T>
) => {
  if (
    checkKey(key) &&
    document.fullscreenEnabled &&
    !document.fullscreenElement
  ) {
    container?.current?.requestFullscreen()
  }
  if (checkKey(key) && document.fullscreenElement) {
    document.exitFullscreen()
  }
}
