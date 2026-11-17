import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/auth-context.js'

export default function RequireAdmin() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace state={{ from: location }} />
}
