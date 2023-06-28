export type PlayerControlKeyCodeMap = {
  accelerator: string
  left: string
  right: string
  break: string
}

export type PlayerOptions = {
  controls: PlayerControlKeyCodeMap
}

export default class Player {
  constructor(public name: string, private options: PlayerOptions) {
    return this
  }
}
