import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Armchair, ClipboardList, LayoutDashboard, QrCode, Shapes, ExternalLink, LogOut } from 'lucide-react'
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
  const current = links.find((link) => link.end ? location.pathname === link.to : location.pathname.startsWith(link.to))
  return <div className="admin-shell">
    <aside className="sidebar">
      <NavLink to="/admin" className="brand-lockup"><span className="brand-mark">B</span><span><b>BAR MENU</b><small>HOSPITALITY STUDIO</small></span></NavLink>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="admin-nav" aria-label="Admin navigation">
        {links.map(({ to, label, icon: Icon, end }) => <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}><Icon size={17} strokeWidth={1.6} />{label}</NavLink>)}
      </nav>
      <div className="sidebar-bottom">
        <NavLink to={`/menu/${profile.slug}`} target="_blank" className="preview-link">Preview customer menu <ExternalLink size={14} /></NavLink>
        <div className="workspace-note"><span className="status-dot" />Local preview<small>Menu data saves in this browser</small></div>
      </div>
    </aside>
    <div className="admin-main">
      <header className="topbar"><div className="breadcrumb">BLUE LOUNGE <span>/</span> {current?.label?.toUpperCase() || 'WORKSPACE'}</div><div className="topbar-right"><span className="live-chip"><i />Live preview</span><div className="avatar" aria-hidden="true">{(profile.name || 'B').slice(0, 2).toUpperCase()}</div><button className="logout-button" type="button" onClick={() => { logout(); navigate('/admin/login', { replace: true }) }}><LogOut size={15} /><span>Sign out</span></button></div></header>
      <div className="admin-content"><Outlet /></div>
    </div>
  </div>
}
