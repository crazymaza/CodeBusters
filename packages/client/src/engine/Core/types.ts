export enum EngineEvent {
  START = '@ENGINE_EVENT/start',
  PAUSE = '@ENGINE_EVENT/pause',
  STOP = '@ENGINE_EVENT/stop',
  END = '@ENGINE_EVENT/end',
  CHANGE_PROCESS = '@ENGINE_EVENT/change-process',
  ANIMATE = '@ENGINE_EVENT/animate',
  DESTROY = '@ENGINE_EVENT/destroy',
  INTERSECTION = '@ENGINE_EVENT/intersection',
  KEY_DOWN = '@ENGINE_EVENT/key-down',
  KEY_UP = '@ENGINE_EVENT/key-up',
  KEY_PRESS = '@ENGINE_EVENT/key-press',
}

export enum EngineProcess {
  PLAY = 'play',
  PAUSE = 'pause',
  STOP = 'stop',
  END = 'end',
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
  frame: number
}

export type EnginePlayerProgressType = {
  speed: number
  distance: number
  playTime: number
  timeLeft: number
  scores: number
}

export type EngineEventType = typeof EngineEvent[keyof typeof EngineEvent]

export type EngineOptions = {
  gameParams?: Partial<EngineGameParamsType>
  playerProgress?: Partial<EnginePlayerProgressType>
}

export type EngineAnimateParams = {
  playerProgress: EnginePlayerProgressType
  engineProgress: EngineProgressType
  gameParams: EngineGameParamsType
}

export type EngineStartMethodOptions = {
  isResume?: boolean
}

export enum EngineIntersection {
  BORDERS = 'intersection-borders',
}
