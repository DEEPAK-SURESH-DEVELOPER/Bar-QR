import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Armchair, ClipboardList, LayoutDashboard, Menu, QrCode, Shapes, ExternalLink, LogOut } from 'lucide-react'
import { useMenu } from '../context/useMenu.js'
import { useAuth } from '../context/auth-context.js'

const links = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/qr', label: 'Your QR code', icon: QrCode },
  { to: '/admin/categories', label: 'Categories', icon: Shapes },
  { to: '/admin/menu', label: 'Menu items', icon: ClipboardList },
  { to: '/admin/profile', label: 'Bar profile', icon: Armchair },
]

export default function AdminLayout() {
  const { profile } = useMenu()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 760px)').matches)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const current = links.find((link) => link.end ? location.pathname === link.to : location.pathname.startsWith(link.to))

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 760px)')
    const updateViewport = (event) => {
      setIsMobile(event.matches)
      setIsMobileSidebarOpen(false)
    }
    mediaQuery.addEventListener('change', updateViewport)
    setIsMobile(mediaQuery.matches)
    return () => mediaQuery.removeEventListener('change', updateViewport)
  }, [])

  useEffect(() => {
    if (!isMobile || !isMobileSidebarOpen) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsMobileSidebarOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [isMobile, isMobileSidebarOpen])

  const toggleSidebar = () => {
    if (isMobile) setIsMobileSidebarOpen((open) => !open)
    else setIsSidebarCollapsed((collapsed) => !collapsed)
  }
  const closeMobileSidebar = () => {
    if (isMobile) setIsMobileSidebarOpen(false)
  }

  return <div className="admin-shell">
    {isMobileSidebarOpen ? <button type="button" className="sidebar-backdrop" aria-label="Close navigation menu" onClick={closeMobileSidebar} /> : null}
    <aside id="admin-sidebar" className={`sidebar${isSidebarCollapsed ? ' sidebar-collapsed' : ''}${isMobileSidebarOpen ? ' mobile-open' : ''}`} aria-label="Admin sidebar">
      <NavLink to="/admin" className="brand-lockup" onClick={closeMobileSidebar}><span className="brand-mark">B</span><span><b>BAR MENU</b><small>HOSPITALITY STUDIO</small></span></NavLink>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="admin-nav" aria-label="Admin navigation">
        {links.map(({ to, label, icon: Icon, end }) => <NavLink key={to} to={to} end={end} title={isSidebarCollapsed && !isMobile ? label : undefined} onClick={closeMobileSidebar} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}><Icon size={17} strokeWidth={1.6} /><span>{label}</span></NavLink>)}
      </nav>
      <div className="sidebar-bottom">
        <NavLink to={`/menu/${profile.slug}`} target="_blank" className="preview-link" onClick={closeMobileSidebar}>Preview customer menu <ExternalLink size={14} /></NavLink>
        <div className="workspace-note"><span className="status-dot" />Local preview<small>Menu data saves in this browser</small></div>
      </div>
    </aside>
    <div className="admin-main">
      <header className="topbar"><button type="button" className="sidebar-toggle icon-button" aria-label="Toggle admin navigation" aria-controls="admin-sidebar" aria-expanded={isMobile ? isMobileSidebarOpen : !isSidebarCollapsed} onClick={toggleSidebar}><Menu size={18} strokeWidth={1.7} /></button><div className="breadcrumb">BLUE LOUNGE <span>/</span> {current?.label?.toUpperCase() || 'WORKSPACE'}</div><div className="topbar-right"><span className="live-chip"><i />Live preview</span><div className="avatar" aria-hidden="true">{(profile.name || 'B').slice(0, 2).toUpperCase()}</div><button className="logout-button" type="button" onClick={() => { logout(); navigate('/admin/login', { replace: true }) }}><LogOut size={15} /><span>Sign out</span></button></div></header>
      <div className="admin-content"><Outlet /></div>
    </div>
  </div>
}
