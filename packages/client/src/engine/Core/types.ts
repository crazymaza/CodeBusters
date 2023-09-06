export enum EngineEvent {
  START = '@ENGINE_EVENT/start',
  PAUSE = '@ENGINE_EVENT/pause',
  STOP = '@ENGINE_EVENT/stop',
  CHANGE_PROCESS = '@ENGINE_EVENT/change-process',
  ANIMATE = '@ENGINE_EVENT/animate',
  DESTROY = '@ENGINE_EVENT/destroy',
  INTERSECTION = '@ENGINE_EVENT/intersection',
  PRESS_KEY = '@ENGINE_EVENT/press-key',
}

export enum EngineProcess {
  PLAY = 'play',
  PAUSE = 'pause',
  STOP = 'stop',
  FAILED = 'failed',
}

export type EngineGameParamsType = {
  startSpeed: number
  maxSpeed: number
  diffSpeed: number
}

export type EngineProgressType = {
  intervalId: NodeJS.Timer | null
  sessionId: number
  timestamp: number
}

export type EnginePlayerProgressType = {
  speed: number
  distance: number
  playTime: number
  scores: number
}

export type EngineEventType = typeof EngineEvent[keyof typeof EngineEvent]

export type EngineOptions = {
  gameParams?: Partial<EngineGameParamsType>
  playerProgress?: Partial<EnginePlayerProgressType>
}

export type EngineStartMethodOptions = {
  isResume?: boolean
}
