import { canvas } from '@/utils'
import { loadImage } from '@/helpers'
import {
  TrackObject,
  CarObject,
  CentralLinesObject,
  BordersSideObject,
  FuelObject,
  EnemyObject,
  BackgroundObject,
  MessageObject,
} from '@/engine/Objects'

import carImages from 'sprites/sprites.png'
import canisterImage from 'sprites/canister.png'
import truckImage from 'sprites/truck.png'
import backgroundLeftImage from 'sprites/background-left.png'
import backgroundRightImage from 'sprites/background-right.png'
import messageFont from 'fonts/PressStart2P-Regular.ttf'

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

export const createEnemy = (
  canvasElement: HTMLCanvasElement,
  trackWidth: number,
  trackHeight: number
) => {
  const enemyCanvasLayer = canvas(canvasElement)

  const enemyObject = new EnemyObject('enemy', enemyCanvasLayer)

  // const carSpecs = enemyObject.getSpecs()

  enemyCanvasLayer.element.width = trackWidth
  enemyCanvasLayer.element.height = trackHeight

  const enemyImage = new Image()

  enemyImage.src = truckImage

  enemyImage.onload = () => {
    enemyObject.draw({
      image: enemyImage,
      x: 0,
      y: 0,
    })

    enemyObject.clear()
  }

  return enemyObject
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

export const createFuel = (
  canvasElement: HTMLCanvasElement,
  trackWidth: number,
  trackHeight: number
) => {
  const fuelCanvasLayer = canvas(canvasElement)

  const fuelObject = new FuelObject('fuel', fuelCanvasLayer)

  const fuelImage = new Image()

  fuelImage.src = canisterImage

  fuelImage.onload = () => {
    fuelObject.draw({
      image: fuelImage,
      trackWidth,
      trackHeight,
    })

    fuelObject.clear()
  }

  return fuelObject
}

export const createBackground = (
  canvasElement: HTMLCanvasElement,
  trackWidth: number,
  trackHeight: number
) => {
  const backgroundCanvasLayer = canvas(canvasElement)

  const backgroundObject = new BackgroundObject(
    'background',
    backgroundCanvasLayer
  )

  const bgLeftImage = new Image()
  const bgRightImage = new Image()

  bgLeftImage.src = backgroundLeftImage
  bgRightImage.src = backgroundRightImage

  bgLeftImage.onload = () => {
    backgroundObject.draw({
      imageLeft: bgLeftImage,
      imageRight: bgRightImage,
      trackWidth,
      trackHeight,
    })
  }

  return backgroundObject
}

export const createMessage = (canvasElement: HTMLCanvasElement) => {
  const messageCanvasLayer = canvas(canvasElement)

  const pressStartFont = new FontFace('PressStart', messageFont)

  pressStartFont.load()

  const messageObject = new MessageObject('message', messageCanvasLayer)

  messageObject.draw()
  messageObject.clear()

  return messageObject
}
