import { useCallback, useMemo, useState } from 'react'
import { AuthContext, DEMO_ADMIN_EMAIL, DEMO_ADMIN_PASSWORD } from './auth-context.js'

const SESSION_KEY = 'barmenu:admin-session:v1'

function hasSession() {
  try { return sessionStorage.getItem(SESSION_KEY) === 'active' }
  catch { return false }
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(hasSession)
  const login = useCallback((email, password) => {
    const valid = email.trim().toLowerCase() === DEMO_ADMIN_EMAIL && password === DEMO_ADMIN_PASSWORD
    if (!valid) return false
    try { sessionStorage.setItem(SESSION_KEY, 'active') } catch { /* Keep the current tab usable if storage is blocked. */ }
    setIsAuthenticated(true)
    return true
  }, [])
  const logout = useCallback(() => {
    try { sessionStorage.removeItem(SESSION_KEY) } catch { /* Ignore unavailable browser storage. */ }
    setIsAuthenticated(false)
  }, [])
  const value = useMemo(() => ({ isAuthenticated, login, logout }), [isAuthenticated, login, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
