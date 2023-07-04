import { v4 as uuid } from 'uuid'

export type SessionState = {
  id: string | null
  level: number | null
  objects: Record<string, any>
}

export default class Session {
  private history: SessionState[] = []
  private state: SessionState | null = null

  private setState(state: SessionState) {
    this.state = state
  }

  public start(level: SessionState['level'], objects: SessionState['objects']) {
    this.setState({
      id: uuid(),
      level,
      objects,
    })

    if (this.state) {
      this.history.push(this.state)
    }
  }

  public getState() {
    return this.state
  }

  public getHistory() {
    return this.history
  }
}
