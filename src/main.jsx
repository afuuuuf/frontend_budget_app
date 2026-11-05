import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { queryClient } from '@/libs/queryClient'
import { AuthProvider } from '@/context/AuthContext'
import App from '@/App'
import '@/styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
        <Toaster
          position="top-center"
          toastOptions={{
            style: { background: '#FFFFFF', color: '#182C29', border: '1px solid #DCE5DF' },
            success: { iconTheme: { primary: '#12665B', secondary: '#FFFFFF' } },
            error: { iconTheme: { primary: '#B44737', secondary: '#FFFFFF' } },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
