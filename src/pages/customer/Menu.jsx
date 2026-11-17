import { useMemo, useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import CategoryRail from '../../components/customer/CategoryRail.jsx'
import CustomerProductCard from '../../components/customer/CustomerProductCard.jsx'
import CustomerProductDetails from '../../components/customer/CustomerProductDetails.jsx'
import { useMenu } from '../../context/useMenu.js'
import { formatPrice } from '../../utils/menu.js'

export default function CustomerMenu() {
  const { profile, items, categories } = useMenu()
  const { base, categories: visibleCategories } = useOutletContext()
  const [selected, setSelected] = useState(null)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const categoryName = Object.fromEntries(categories.map((category) => [category.id, category.name]))
  const sortedItems = useMemo(() => [...items].sort((a, b) => a.order - b.order), [items])
  const filtered = sortedItems.filter((item) => `${item.name} ${item.description} ${(item.tags || []).join(' ')}`.toLowerCase().includes(query.toLowerCase()))
  const guestItems = sortedItems.filter((item) => visibleCategories.some((category) => category.id === item.categoryId))
  const product = (item) => ({ ...item, shortDescription: item.description, priceLabel: formatPrice(item.price, profile.currency), originalPriceLabel: item.originalPrice ? formatPrice(item.originalPrice, profile.currency) : '', imageAlt: item.name })
  return <section className="customer-menu-page"><div className="customer-page-heading"><p className="eyebrow">A MENU TO TAKE YOUR TIME WITH</p><h1>Find your moment.</h1><p>Something considered, whatever the evening calls for.</p></div>
    <div className="customer-browse-bar"><div className="category-selector"><Link className="all-categories active" to={`${base}/items`}>All</Link><CategoryRail categories={visibleCategories} activeCategoryId={null} onSelect={(id) => navigate(`${base}/category/${id}`)} /></div><label className="customer-search"><Search size={15} /><input aria-label="Search the menu" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the menu" />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X size={14} /></button>}</label></div>
    {guestItems.some((item) => item.featured && item.available) && !query && <section className="customer-menu-featured"><div className="customer-section-heading"><div><p className="eyebrow">A LITTLE EXTRA SPECIAL</p><h2>House favourites</h2></div></div><div className="customer-product-grid">{guestItems.filter((item) => item.featured && item.available).map((item) => <CustomerProductCard key={item.id} product={product(item)} onSelect={setSelected} />)}</div></section>}
    {visibleCategories.map((category) => { const group = filtered.filter((item) => item.categoryId === category.id); if (!group.length) return null; return <section className="customer-menu-group" key={category.id}><div className="customer-section-heading"><div><p className="eyebrow">{String(category.order + 1).padStart(2, '0')} · THE COLLECTION</p><h2>{category.name}</h2><p>{category.description}</p></div><Link to={`${base}/category/${category.id}`}>View collection <span>↗</span></Link></div><div className="customer-product-grid">{group.map((item) => <CustomerProductCard key={item.id} product={product(item)} onSelect={setSelected} />)}</div></section>})}
    {filtered.length === 0 && <div className="empty-state large"><Search size={20} /><h2>Nothing found just yet.</h2><p>Try another name or browse the categories above.</p></div>}
    <CustomerProductDetails product={selected} category={selected ? categoryName[selected.categoryId] : ''} currency={profile.currency} onClose={() => setSelected(null)} />
  </section>
}
