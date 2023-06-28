import { PlayerOptions } from './types'

export default class Player {
  constructor(public name: string, private options: PlayerOptions) {
    return this
  }
}
