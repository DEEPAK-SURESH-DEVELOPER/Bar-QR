import { useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import CustomerWelcomeHero from '../../components/customer/CustomerWelcomeHero.jsx'
import CustomerProductCard from '../../components/customer/CustomerProductCard.jsx'
import CustomerProductDetails from '../../components/customer/CustomerProductDetails.jsx'
import { useMenu } from '../../context/useMenu.js'
import { formatPrice } from '../../utils/menu.js'

export default function Welcome() {
  const { profile, categories, items } = useMenu()
  const { base, categories: visibleCategories } = useOutletContext()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const guestItems = items.filter((item) => visibleCategories.some((category) => category.id === item.categoryId))
  const categoryNames = Object.fromEntries(categories.map((category) => [category.id, category.name]))
  return <>
    <CustomerWelcomeHero brandName={profile.name} coverImage={profile.coverImage} description={profile.description} menuUrl={`${base}/items`} onNavigate={navigate} />
    <section className="welcome-discovery"><div className="customer-section-heading"><div><p className="eyebrow">A TASTE OF THE EVENING</p><h2>House favourites</h2></div><Link to={`${base}/items`}>Explore the menu <ArrowRight size={15} /></Link></div><div className="customer-product-grid welcome-grid">{guestItems.filter((item) => item.featured && item.available).slice(0, 3).map((item) => <CustomerProductCard key={item.id} product={{ ...item, shortDescription: item.description, priceLabel: formatPrice(item.price, profile.currency), originalPriceLabel: item.originalPrice ? formatPrice(item.originalPrice, profile.currency) : '', imageAlt: item.name }} onSelect={setSelected} />)}</div><div className="customer-category-links"><p className="eyebrow">FIND YOUR FAVOURITE</p>{visibleCategories.slice(0, 5).map((category) => <Link key={category.id} to={`${base}/category/${category.id}`}>{category.name}<ArrowUpRight size={14} /></Link>)}</div></section>
    <CustomerProductDetails product={selected} category={selected ? categoryNames[selected.categoryId] : ''} currency={profile.currency} onClose={() => setSelected(null)} />
  </>
}
