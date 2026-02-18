import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[ErrorBoundary] Uncaught error:', error, errorInfo);
  }

  private handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-wedding-beige p-6">
          <div className="max-w-md text-center">
            <h2 className="font-display text-3xl text-wedding-charcoal mb-4">
              Algo salió mal
            </h2>
            <p className="font-sans text-wedding-charcoal/70 mb-6">
              Ha ocurrido un error inesperado. Por favor, intenta recargar la página.
            </p>
            <button
              onClick={this.handleReload}
              className="px-6 py-3 bg-wedding-olive text-white font-sans text-sm tracking-widest uppercase rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:opacity-90"
            >
              Recargar Página
            </button>
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-wedding-charcoal/50">
                  Detalles del error (solo desarrollo)
                </summary>
                <pre className="mt-2 p-3 bg-red-50 rounded text-xs text-red-800 overflow-auto max-h-40">
                  {this.state.error.message}
                  {'\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
