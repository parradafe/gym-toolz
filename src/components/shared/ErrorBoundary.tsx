import { Component, type ErrorInfo, type ReactNode } from 'react'
import { STORAGE_KEY } from '../../store/useGymStore'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  failed: boolean
}

/** Last line of defense: a crash (e.g. from bad saved data) offers a reset instead of a blank screen. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { failed: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack)
  }

  reset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } finally {
      window.location.reload()
    }
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <div role="alert" className="p-6 flex flex-col gap-3 items-start">
        <p className="font-headline-sm text-headline-sm uppercase">Algo salió mal</p>
        <button
          type="button"
          onClick={this.reset}
          className="comic-press px-4 py-2 bg-primary-container text-on-primary-fixed font-label-sm text-label-sm uppercase rounded comic-stroke shadow-comic-md"
        >
          Restablecer datos
        </button>
      </div>
    )
  }
}
