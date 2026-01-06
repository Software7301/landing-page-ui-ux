import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './hooks/useLanguage'
import { ThemeProvider } from './hooks/useTheme'
import { Toaster } from 'sonner'
import '@/lib/i18n'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <App />
        <Toaster
          position="top-right"
          theme="dark"
          toastOptions={{
            style: {
              background: '#141C2C',
              border: '1px solid rgba(109, 40, 217, 0.15)',
              color: '#E5E7EB',
            },
            success: {
              iconTheme: {
                primary: '#4ADE80',
                secondary: '#E5E7EB',
              },
            },
            error: {
              iconTheme: {
                primary: '#F87171',
                secondary: '#E5E7EB',
              },
            },
          }}
        />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)
