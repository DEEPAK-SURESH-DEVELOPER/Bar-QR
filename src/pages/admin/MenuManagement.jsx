import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, Check, ChevronDown, Pencil, Plus, Search, Trash2, X } from 'lucide-react'
import Modal from '../../components/common/Modal.jsx'
import ImageField from '../../components/common/ImageField.jsx'
import CustomerProductCard from '../../components/customer/CustomerProductCard.jsx'
import { useMenu } from '../../context/useMenu.js'
import { formatPrice } from '../../utils/menu.js'
import MenuImage from '../../components/common/MenuImage.jsx'

const blank = { name: '', description: '', categoryId: '', imageUrl: '', price: '', originalPrice: '', available: true, featured: false, tags: '' }

function ItemEditor({ initial, categories, currency, onClose, onSave }) {
  const [form, setForm] = useState(initial ? { ...initial, price: String(initial.price), originalPrice: String(initial.originalPrice || ''), tags: (initial.tags || []).join(', ') } : { ...blank, categoryId: categories[0]?.id || '' })
  const [error, setError] = useState('')
  const change = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const submit = (event) => { event.preventDefault(); const result = onSave({ ...form, price: Number(form.price), originalPrice: form.originalPrice ? Number(form.originalPrice) : '', tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean) }); if (result) setError(result) }
  return <Modal title={initial ? 'Edit menu item' : 'Add a menu item'} onClose={onClose} size="wide">
    <form className="form-stack" onSubmit={submit}>
      <div className="form-grid two"><label className="field"><span>Item name</span><input required maxLength={60} value={form.name} onChange={(e) => change('name', e.target.value)} placeholder="e.g. Citrus Martini" /></label><label className="field"><span>Category</span><select required value={form.categoryId} onChange={(e) => change('categoryId', e.target.value)}><option value="" disabled>Choose a category</option>{categories.map((category) => <option value={category.id} key={category.id}>{category.name}</option>)}</select></label></div>
      <label className="field"><span>Description</span><textarea required rows="3" maxLength={240} value={form.description} onChange={(e) => change('description', e.target.value)} placeholder="Tell guests what makes it special" /></label>
      <div className="form-grid two"><label className="field"><span>Price · {currency}</span><input required type="number" min="0.01" max="100000" step="0.01" value={form.price} onChange={(e) => change('price', e.target.value)} placeholder="0.00" /></label><label className="field"><span>Original price <small>OPTIONAL</small></span><input type="number" min="0.01" max="100000" step="0.01" value={form.originalPrice} onChange={(e) => change('originalPrice', e.target.value)} placeholder="No comparison price" /></label></div>
      <ImageField label="Product image" value={form.imageUrl} onChange={(value) => change('imageUrl', value)} />
      <label className="field"><span>Tags <small>COMMA SEPARATED</small></span><input maxLength={120} value={form.tags} onChange={(e) => change('tags', e.target.value)} placeholder="House favourite, Citrus" /></label>
      <div className="form-grid two"><label className="toggle-row"><span><b>Available</b><small>Show this item as available to guests.</small></span><input type="checkbox" checked={form.available} onChange={(e) => change('available', e.target.checked)} /></label><label className="toggle-row"><span><b>Featured item</b><small>Highlight it on the menu homepage.</small></span><input type="checkbox" checked={form.featured} onChange={(e) => change('featured', e.target.checked)} /></label></div>
      {error && <p className="field-error" role="alert">{error}</p>}
      <div className="form-actions"><button type="button" className="button quiet" onClick={onClose}>Cancel</button><button type="submit" className="button primary"><Check size={15} /> Save item</button></div>
    </form>
  </Modal>
}

function QuickPrice({ item, currency, onSave }) {
  const [value, setValue] = useState(String(item.price))
  const [editing, setEditing] = useState(false)
  const save = () => { const amount = Number(value); if (Number.isFinite(amount) && amount > 0) onSave(item.id, { price: amount }); else setValue(String(item.price)); setEditing(false) }
  return editing ? <input className="quick-price-input" aria-label={`New price for ${item.name}`} type="number" min="0.01" step="0.01" value={value} autoFocus onChange={(e) => setValue(e.target.value)} onBlur={save} onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); if (e.key === 'Escape') { setValue(String(item.price)); setEditing(false) } }} /> : <button type="button" className="price-edit" onClick={() => setEditing(true)} title="Edit price">{formatPrice(item.price, currency)} <Pencil size={12} /></button>
}

export default function MenuManagement() {
  const { items, categories, profile, addItem, editItem, removeItem, reorderItems } = useMenu()
  const [query, setQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [availabilityFilter, setAvailabilityFilter] = useState('all')
  const [editing, setEditing] = useState(null)
  const [creating, setCreating] = useState(false)
  const filtered = useMemo(() => [...items].sort((a, b) => a.order - b.order).filter((item) => {
    const matchesQuery = `${item.name} ${item.description} ${(item.tags || []).join(' ')}`.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (categoryFilter === 'all' || item.categoryId === categoryFilter) && (availabilityFilter === 'all' || String(item.available) === availabilityFilter)
  }), [items, query, categoryFilter, availabilityFilter])
  const save = (form) => {
    if (!form.name.trim()) return 'Enter an item name.'
    if (!form.categoryId || !categories.some((category) => category.id === form.categoryId)) return 'Choose a valid category.'
    if (!Number.isFinite(form.price) || form.price <= 0) return 'Enter a price greater than zero.'
    if (form.originalPrice && (!Number.isFinite(form.originalPrice) || form.originalPrice <= 0)) return 'Enter a valid original price.'
    if (form.originalPrice && form.originalPrice < form.price) return 'Original price should be greater than the current price.'
    const values = { ...form, name: form.name.trim(), description: form.description.trim() }
    if (editing) editItem(editing.id, values); else addItem(values)
    setEditing(null); setCreating(false); return ''
  }
  const deleteItem = (item) => { if (window.confirm(`Remove “${item.name}” from the menu?`)) removeItem(item.id) }
  const moveItem = (item, delta) => { const ordered = [...items].sort((a, b) => a.order - b.order); const index = ordered.findIndex((entry) => entry.id === item.id); const target = index + delta; if (target < 0 || target >= ordered.length) return; [ordered[index], ordered[target]] = [ordered[target], ordered[index]]; reorderItems(ordered) }
  return <>
    <section className="page-intro page-intro-row"><div><p className="eyebrow">THE DETAILS THAT MAKE THE NIGHT</p><h1>Menu items</h1><p className="muted">Keep descriptions, availability and prices up to date.</p></div><button className="button primary" onClick={() => { if (!categories.length) { window.alert('Create a category before adding menu items.'); return } setCreating(true) }}><Plus size={16} /> Add item</button></section>
    <section className="menu-workspace"><div className="menu-toolbar"><label className="search-field"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search items or tags" aria-label="Search menu items" />{query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search"><X size={14} /></button>}</label><label className="select-wrap"><span className="sr-only">Filter by category</span><select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}><option value="all">All categories</option>{categories.map((category) => <option value={category.id} key={category.id}>{category.name}</option>)}</select><ChevronDown size={14} /></label><label className="select-wrap"><span className="sr-only">Filter by availability</span><select value={availabilityFilter} onChange={(e) => setAvailabilityFilter(e.target.value)}><option value="all">Any availability</option><option value="true">Available</option><option value="false">Unavailable</option></select><ChevronDown size={14} /></label><span className="result-count">{filtered.length} of {items.length}</span></div>
      {filtered.length ? <div className="menu-table-wrap"><table className="menu-table"><thead><tr><th>ITEM</th><th>CATEGORY</th><th>PRICE <small>· SELECT TO QUICK EDIT</small></th><th>AVAILABILITY</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{filtered.map((item) => <tr key={item.id}><td><div className="table-product"><div className="table-thumb"><MenuImage src={item.imageUrl} alt="" fallback={item.name.slice(0, 1)} /></div><div><b>{item.name}</b><small>{item.featured ? 'Featured · ' : ''}{item.description}</small></div></div></td><td>{categories.find((category) => category.id === item.categoryId)?.name || <em>Uncategorised</em>}</td><td><QuickPrice item={item} currency={profile.currency} onSave={editItem} /></td><td><button type="button" className={`availability-toggle ${item.available ? 'on' : ''}`} onClick={() => editItem(item.id, { available: !item.available })}><i />{item.available ? 'Available' : 'Unavailable'}</button></td><td><div className="row-actions"><button className="icon-button" onClick={() => moveItem(item, -1)} disabled={item.order <= 0} aria-label={`Move ${item.name} up`}><ArrowUp size={14} /></button><button className="icon-button" onClick={() => moveItem(item, 1)} disabled={item.order >= items.length - 1} aria-label={`Move ${item.name} down`}><ArrowDown size={14} /></button><button className="icon-button" onClick={() => setEditing(item)} aria-label={`Edit ${item.name}`}><Pencil size={15} /></button><button className="icon-button danger" onClick={() => deleteItem(item)} aria-label={`Delete ${item.name}`}><Trash2 size={15} /></button></div></td></tr>)}</tbody></table></div> : <div className="empty-state"><Search size={20} /><h2>No items match those filters.</h2><p>Try another search, or add your first menu item.</p></div>}
    </section>
    <section className="customer-card-preview"><div><p className="eyebrow">GUEST VIEW</p><h2>A glimpse of the menu</h2></div>{items[0] && <div className="preview-product"><CustomerProductCard product={{ ...items[0], shortDescription: items[0].description, priceLabel: formatPrice(items[0].price, profile.currency), imageAlt: items[0].name }} onSelect={() => {}} /></div>}</section>
    {(creating || editing) && <ItemEditor initial={editing} categories={categories} currency={profile.currency} onClose={() => { setCreating(false); setEditing(null) }} onSave={save} />}
  </>
}
