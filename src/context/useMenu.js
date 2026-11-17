import { useContext } from 'react'
import { MenuContext } from './menu-context.js'

export function useMenu() {
  const value = useContext(MenuContext)
  if (!value) throw new Error('useMenu must be used inside MenuProvider')
  return value
}
