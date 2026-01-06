import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './hooks/useLanguage'
import { ThemeProvider } from './hooks/useTheme'
import { UserProvider } from './providers/user-provider'
import { Toaster } from 'sonner'
import '@/lib/i18n'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <UserProvider>
          <App />
          <Toaster
            position="top-right"
            theme="dark"
            toastOptions={{
              style: {
                background: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
              },
              success: {
                iconTheme: {
                  primary: 'var(--color-success)',
                  secondary: 'var(--color-text)',
                },
              },
              error: {
                iconTheme: {
                  primary: 'var(--color-error)',
                  secondary: 'var(--color-text)',
                },
              },
            }}
          />
        </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)
