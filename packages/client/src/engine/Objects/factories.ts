import { canvas } from '@/utils'
import { loadImage } from '@/helpers'
import {
  TrackObject,
  CarObject,
  CentralLinesObject,
  BordersSideObject,
  BackgroundObject,
} from '@/engine/Objects'

import carImages from 'sprites/sprites.png'
import backgroundImage from 'sprites/background.png'

export const createTrack = (canvasElement: HTMLCanvasElement) => {
  const trackCanvasLayer = canvas(canvasElement)

  const trackObject = new TrackObject('track', trackCanvasLayer)

  trackObject.draw()

  return trackObject
}

export const createCar = (
  canvasElement: HTMLCanvasElement,
  trackWidth: number
) => {
  const carCanvasLayer = canvas(canvasElement)

  const carObject = new CarObject('car', carCanvasLayer)

  const carSpecs = carObject.getSpecs()

  const xAxis = trackWidth / 2 - carSpecs.width / 2

  carCanvasLayer.element.width = trackWidth
  carCanvasLayer.element.height = carSpecs.layerHeight

  const carImage = new Image()

  carImage.src = carImages

  carImage.onload = () => {
    carObject.draw({
      image: carImage,
      x: xAxis,
      y: carSpecs.layerHeight - carSpecs.height,
    })
  }

  return carObject
}

export const createCentralLines = (
  canvasElement: HTMLCanvasElement,
  trackWidth: number,
  trackHeight: number
) => {
  const centralLinesCanvasLayer = canvas(canvasElement)

  const centralLinesObject = new CentralLinesObject(
    'central-lines',
    centralLinesCanvasLayer
  )

  loadImage(carImages).then(() => {
    centralLinesObject.draw({
      width: trackWidth,
      height: trackHeight,
    })
  })

  return centralLinesObject
}

export const createBorders = (
  canvasElement: HTMLCanvasElement,
  trackWidth: number,
  trackHeight: number
) => {
  const bordersCanvasLayer = canvas(canvasElement)

  const bordersSideObject = new BordersSideObject('borders', bordersCanvasLayer)

  loadImage(carImages).then(() => {
    bordersSideObject.draw({
      width: trackWidth,
      height: trackHeight,
    })
  })

  return bordersSideObject
}

export const createBackground = (
  canvasElement: HTMLCanvasElement,
  trackHeight: number
) => {
  const backgroundCanvasLayer = canvas(canvasElement)

  const backgroundObject = new BackgroundObject(
    'background',
    backgroundCanvasLayer
  )

  const bgImage = new Image()

  bgImage.src = backgroundImage

  bgImage.onload = () => {
    backgroundObject.draw({
      x: 0,
      y: -500,
      image: bgImage,
      width: 800,
      height: 800,
    })
  }

  return backgroundObject
}
