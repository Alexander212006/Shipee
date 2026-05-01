import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/App.css'
import { Providers } from './app/providers.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers />
  </StrictMode>,
)
