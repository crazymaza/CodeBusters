import { Component, ReactNode } from 'react'

type ErrorBoundaryProps = {
  children?: ReactNode
  errorComponent: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.errorComponent
    }
    return this.props.children
  }
}

export default ErrorBoundary
