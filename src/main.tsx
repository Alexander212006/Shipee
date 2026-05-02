import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './styles/App.css'
import { Providers } from './app/providers.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers />
    <Toaster position="top-right" />
  </StrictMode>,
)
