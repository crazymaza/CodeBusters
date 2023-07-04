import { TrackObject, CarObject, ObstacleObject } from './Objects'

const levels = [
  {
    objects: [
      {
        instance: TrackObject,
        redraw(ctx: any, deltaTime: number, specs: any) {
          console.log('REDRAW TRACK', ctx, deltaTime, specs)
        },
      },
      {
        instance: CarObject,
        redraw(ctx: any, deltaTime: number, specs: any) {
          console.log('REDRAW CAR', ctx, deltaTime, specs)
        },
      },
      {
        instance: ObstacleObject,
        redraw(ctx: any, deltaTime: number, specs: any) {
          console.log('REDRAW OBSTACLE', ctx, deltaTime, specs)
        },
      },
    ],
  },
]

export default levels
