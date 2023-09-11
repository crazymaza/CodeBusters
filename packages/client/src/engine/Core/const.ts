export const FPS = 60

export const SECOND = 1000

export const INITIAL_GAME_PARAMS = {
  startSpeed: 5,
  maxSpeed: 35,
  diffSpeed: 1, // на сколько увеличивать скорость в секунду
  fuelInterval: 10 * SECOND, // в секундах - интервал подачи бензина
  fuelCapacity: 15, // сколько добавлять в секундах к оставшемуся времени при заправке
  sensitivity: 10, // отзывчивость управления
  sensitivityMax: 10, // максимальная отзывчивость управления
  sensitivityRatio: 1.5, // во сколько уменьшить отзывчивость при максимальной скорости
  enemyDelta: 0.3, // коэфициент скорости препятствия
  enemyInterval: 5 * SECOND, // в секундах - интервал показа машины препятствия
}

export const INITIAL_ENGINE_PROGRESS = {
  intervalId: null,
  sessionId: 0,
  timestamp: 0,
  frame: 0,
}

export const INITIAL_PLAYER_PROGRESS = {
  speed: 0,
  distance: 0,
  playTime: 0, // В секундах
  timeLeft: 40, // В секундах - остаток бензина
  scores: 0,
}
