export type PlayerControlKeyCodeMap = {
  accelerator: string
  left: string
  right: string
  break: string
  startOrPause: string
}

export type PlayerOptions = {
  controls: PlayerControlKeyCodeMap
}
