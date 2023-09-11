import { isFunction } from '@/helpers'

export type EventCallback = (...args: any[]) => void

export type Listener<TEventType extends string> = {
  [key in TEventType]?: EventCallback[]
}

export default class EventBus<TEvent extends string> {
  private listeners: Listener<TEvent> = {}

  public isFoundEvent<TCurrentEvent>(event: TCurrentEvent) {
    return Array.isArray(this.listeners[event])
  }

  public on(event: TEvent, callback?: EventCallback) {
    if (isFunction(callback)) {
      this.listeners[event] = [
        ...(this.listeners[event] || []),
        callback,
      ] as EventCallback[]
    }
  }

  public off(event: TEvent, callback?: EventCallback) {
    if (!isFunction(callback)) {
      throw new Event(`Not found callback for event: ${event}`)
    }

    if (this.isFoundEvent(event)) {
      this.listeners[event] = this.listeners[event]?.filter(
        listener => listener !== callback
      )
    } else {
      throw new Event(`Not found event: ${event}`)
    }
  }

  public emit(event: TEvent, ...args: any[]) {
    if (this.isFoundEvent(event)) {
      this.listeners[event]?.forEach(listener => listener(...args))
    } else {
      throw new Event(`Not found event: ${event}`)
    }
  }
}
