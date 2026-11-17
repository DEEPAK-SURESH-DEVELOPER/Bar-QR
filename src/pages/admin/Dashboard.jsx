import { ArrowDownRight, ArrowRight, ArrowUpRight, BadgeCheck, CircleOff, ClipboardList, CupSoda, Layers3, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMenu } from '../../context/useMenu.js'
import { formatPrice } from '../../utils/menu.js'
import MenuImage from '../../components/common/MenuImage.jsx'

function shortTime(value) {
  const date = new Date(value)
  const day = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  const time = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
  return `${day} · ${time}`
}

export default function Dashboard() {
  const { categories, items, activity, profile } = useMenu()
  const available = items.filter((item) => item.available).length
  const featured = items.filter((item) => item.featured).length
  const stats = [
    { label: 'Menu items', value: items.length, icon: CupSoda, note: 'Across your menu' },
    { label: 'Categories', value: categories.filter((category) => category.active).length, icon: Layers3, note: 'Active collections' },
    { label: 'Available now', value: available, icon: BadgeCheck, note: `${items.length - available} unavailable` },
    { label: 'Featured', value: featured, icon: Sparkles, note: 'Highlighted for guests' },
  ]
  const top = items.filter((item) => item.featured).slice(0, 3)
  return <>
    <section className="page-intro"><p className="eyebrow">YOUR HOSPITALITY, IN GOOD TASTE</p><h1>Good evening.</h1><p className="muted">A clear view of what your guests can discover at {profile.name}.</p></section>
    <section className="stats-grid" aria-label="Menu overview">{stats.map(({ label, value, icon: Icon, note }) => <article className="stat-card" key={label}><div className="stat-top"><span>{label}</span><Icon size={17} strokeWidth={1.5} /></div><strong>{value}</strong><small>{note}</small></article>)}</section>
    <section className="dashboard-grid">
      <article className="surface-card featured-panel"><div className="section-heading"><div><p className="eyebrow">ON THE MENU</p><h2>Featured tonight</h2></div><Link to="/admin/menu">Manage menu <ArrowRight size={14} /></Link></div>
        {top.length ? <div className="featured-list">{top.map((item) => <div className="featured-row" key={item.id}><div className="mini-thumb"><MenuImage src={item.imageUrl} alt="" fallback={<CupSoda size={18} />} /></div><div className="featured-details"><strong>{item.name}</strong><small>{categories.find((c) => c.id === item.categoryId)?.name || 'Uncategorised'}</small></div><span className="featured-price">{formatPrice(item.price, profile.currency)}</span><span className={item.available ? 'availability available' : 'availability unavailable'}>{item.available ? 'Available' : 'Unavailable'}</span></div>)}</div> : <div className="empty-state">Nothing featured yet. Choose a menu item to highlight it here.</div>}
      </article>
      <article className="surface-card activity-panel"><div className="section-heading"><div><p className="eyebrow">RECENT ACTIVITY</p><h2>Latest updates</h2></div><span className="activity-count">{activity.length} updates</span></div><div className="activity-list">{activity.slice(0, 5).map((entry) => <div className="activity-row" key={entry.id}><span className={`activity-icon ${entry.type}`}><ArrowUpRight size={15} /></span><div><strong>{entry.label}</strong><small>{shortTime(entry.at)}</small></div></div>)}</div></article>
    </section>
    <section className="quick-actions"><div><p className="eyebrow">A FEW SHORTCUTS</p><h2>Keep things current.</h2></div><Link to="/admin/menu" className="action-card"><span className="action-icon"><ClipboardList size={18} /></span><span><b>Update a menu item</b><small>Adjust a price or availability</small></span><ArrowUpRight size={16} /></Link><Link to="/admin/categories" className="action-card"><span className="action-icon"><Layers3 size={18} /></span><span><b>Arrange categories</b><small>Group your menu your way</small></span><ArrowUpRight size={16} /></Link><Link to="/admin/qr" className="action-card"><span className="action-icon"><CircleOff size={18} /></span><span><b>Review your QR</b><small>One link, always current</small></span><ArrowUpRight size={16} /></Link></section>
    <div className="dashboard-footnote"><ArrowDownRight size={14} /> Menu updates save to this browser and appear in the customer preview.</div>
  </>
}
