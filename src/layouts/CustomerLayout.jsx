import { Link, NavLink, Outlet, useParams } from 'react-router-dom'
import { ArrowLeft, Camera } from 'lucide-react'
import { useMenu } from '../context/useMenu.js'
import { isSafeHttpsUrl, isSafeImageSource } from '../utils/menu.js'

export default function CustomerLayout() {
  const { slug } = useParams()
  const { profile, categories } = useMenu()
  const base = `/menu/${slug}`
  if (slug !== profile.slug) return <main className="customer-shell"><section className="not-found"><span className="brand-mark">B</span><p className="eyebrow">MENU UNAVAILABLE</p><h1>This menu has moved.</h1><p className="muted">Please scan the current QR code or ask the bar team for help.</p><Link className="text-link" to={`/menu/${profile.slug}`}><ArrowLeft size={15} /> Visit {profile.name}</Link></section></main>
  return <main className="customer-shell">
    <header className="customer-header"><Link to={base} className="customer-brand">{isSafeImageSource(profile.logo) && profile.logo ? <img className="customer-logo" src={profile.logo} alt="" /> : <span className="brand-mark">B</span>}<span>{profile.name}</span></Link><nav aria-label="Customer navigation"><NavLink to={`${base}/items`}>Menu</NavLink><NavLink to={`${base}/about`}>Our story</NavLink><NavLink to={`${base}/contact`}>Visit us</NavLink></nav></header>
    <Outlet context={{ base, categories: categories.filter((category) => category.active) }} />
    <footer className="customer-footer"><Link to={base} className="footer-brand">{profile.name.toUpperCase()}</Link><span>PLEASE ENJOY RESPONSIBLY</span>{isSafeHttpsUrl(profile.socials?.instagram) && <a href={profile.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Camera size={15} /></a>}</footer>
  </main>
}
