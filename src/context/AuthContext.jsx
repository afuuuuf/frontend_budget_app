import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { tokenStorage } from '@/libs/tokenStorage'
import { queryClient } from '@/libs/queryClient'
import { AUTH_LOGOUT_EVENT } from '@/constants/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => tokenStorage.get())

  const login = useCallback((accessToken) => {
    tokenStorage.set(accessToken)
    setToken(accessToken)
  }, [])

  const logout = useCallback(() => {
    tokenStorage.clear()
    queryClient.clear()
    setToken(null)
  }, [])

  // The axios 401 handler announces an expired session through this event.
  useEffect(() => {
    window.addEventListener(AUTH_LOGOUT_EVENT, logout)
    return () => window.removeEventListener(AUTH_LOGOUT_EVENT, logout)
  }, [logout])

  const value = useMemo(
    () => ({ token, isAuthenticated: Boolean(token), login, logout }),
    [token, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
