import { useState } from 'react'
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { ArrowLeft, Search } from 'lucide-react'
import CategoryRail from '../../components/customer/CategoryRail.jsx'
import CustomerProductCard from '../../components/customer/CustomerProductCard.jsx'
import CustomerProductDetails from '../../components/customer/CustomerProductDetails.jsx'
import { useMenu } from '../../context/useMenu.js'
import { formatPrice } from '../../utils/menu.js'

export default function CategoryPage() {
  const { categoryId } = useParams()
  const { categories, items, profile } = useMenu()
  const { base, categories: visibleCategories } = useOutletContext()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const category = categories.find((entry) => entry.id === categoryId && entry.active)
  if (!category) return <section className="customer-page-heading"><p className="eyebrow">A CHANGE OF PLANS</p><h1>This collection is taking a moment.</h1><Link className="text-link" to={`${base}/items`}><ArrowLeft size={15} /> Browse the full menu</Link></section>
  const product = (item) => ({ ...item, shortDescription: item.description, priceLabel: formatPrice(item.price, profile.currency), originalPriceLabel: item.originalPrice ? formatPrice(item.originalPrice, profile.currency) : '', imageAlt: item.name })
  const collection = items.filter((item) => item.categoryId === category.id).sort((a, b) => a.order - b.order)
  return <section className="customer-menu-page"><div className="customer-page-heading compact"><p className="eyebrow">THE COLLECTION · {String(category.order + 1).padStart(2, '0')}</p><h1>{category.name}</h1><p>{category.description}</p></div><div className="category-selector category-selector-page"><Link className="all-categories" to={`${base}/items`}>All</Link><CategoryRail categories={visibleCategories} activeCategoryId={category.id} onSelect={(id) => navigate(`${base}/category/${id}`)} /></div><div className="customer-product-grid">{collection.map((item) => <CustomerProductCard key={item.id} product={product(item)} onSelect={setSelected} />)}</div>{collection.length === 0 && <div className="empty-state large"><Search size={20} /><h2>We’re refreshing this collection.</h2><p>Please explore again soon.</p></div>}<CustomerProductDetails product={selected} category={category.name} currency={profile.currency} onClose={() => setSelected(null)} /></section>
}
