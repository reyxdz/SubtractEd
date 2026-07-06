import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { UserGuideProvider } from './hooks/useUserGuide.tsx'
import { registerServiceWorker } from './utils/registerSW.ts'

// Register PWA service worker for offline support
registerServiceWorker()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <UserGuideProvider>
        <App />
      </UserGuideProvider>
    </HashRouter>
  </StrictMode>,
)
