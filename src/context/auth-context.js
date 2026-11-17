import { createContext, useContext } from 'react'

export const AuthContext = createContext(null)
export const DEMO_ADMIN_EMAIL = 'admin@bluelounge.demo'
export const DEMO_ADMIN_PASSWORD = 'BlueLoungeDemo2026!'

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
