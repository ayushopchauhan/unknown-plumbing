import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import config from './siteConfig'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    console.error('App crash:', error, info)
  }
  render() {
    if (this.state.hasError) {
      const name = config.business?.name || 'Plumber'
      const phone = config.contact?.phone || ''
      const phoneDisplay = config.contact?.phoneDisplay || phone
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d1117', color: 'white', fontFamily: 'system-ui', padding: '2rem', textAlign: 'center' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{name}</h1>
            {phoneDisplay && <p style={{ fontSize: '1.5rem', marginBottom: '1rem' }}><a href={'tel:' + phone} style={{ color: '#38bdf8' }}>{phoneDisplay}</a></p>}
            <p style={{ color: '#94a3b8' }}>Our website is loading. Please call us directly.</p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
