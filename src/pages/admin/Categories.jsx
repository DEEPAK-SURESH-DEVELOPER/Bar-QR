import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, Check, Eye, EyeOff, ImagePlus, Pencil, Plus, Trash2 } from 'lucide-react'
import Modal from '../../components/common/Modal.jsx'
import ImageField from '../../components/common/ImageField.jsx'
import { useMenu } from '../../context/useMenu.js'

const blank = { name: '', description: '', imageUrl: '', active: true }

function CategoryEditor({ initial, onClose, onSave }) {
  const [form, setForm] = useState(initial || blank)
  const [error, setError] = useState('')
  const change = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const submit = (event) => { event.preventDefault(); const result = onSave(form); if (result) setError(result) }
  return <Modal title={initial ? 'Edit category' : 'New category'} onClose={onClose}>
    <form className="form-stack" onSubmit={submit}>
      <label className="field"><span>Category name</span><input autoFocus required maxLength={40} value={form.name} onChange={(e) => change('name', e.target.value)} placeholder="e.g. Aperitifs" /></label>
      <label className="field"><span>Description <small>OPTIONAL</small></span><textarea rows="3" maxLength={160} value={form.description} onChange={(e) => change('description', e.target.value)} placeholder="A short introduction for guests" /></label>
      <ImageField label="Category image" value={form.imageUrl} onChange={(value) => change('imageUrl', value)} />
      <label className="toggle-row"><span><b>Visible to guests</b><small>Inactive categories are hidden from the public menu.</small></span><input type="checkbox" checked={form.active} onChange={(e) => change('active', e.target.checked)} /></label>
      {error && <p className="field-error" role="alert">{error}</p>}
      <div className="form-actions"><button type="button" className="button quiet" onClick={onClose}>Cancel</button><button className="button primary" type="submit"><Check size={15} /> Save category</button></div>
    </form>
  </Modal>
}

export default function Categories() {
  const { categories, items, addCategory, editCategory, removeCategory, reorderCategories } = useMenu()
  const [editing, setEditing] = useState(null)
  const [creating, setCreating] = useState(false)
  const ordered = useMemo(() => [...categories].sort((a, b) => a.order - b.order), [categories])
  const save = (form) => {
    const name = form.name.trim()
    if (!name) return 'Enter a category name.'
    if (categories.some((category) => category.name.toLowerCase() === name.toLowerCase() && category.id !== editing?.id)) return 'A category with that name already exists.'
    if (editing) editCategory(editing.id, { ...form, name })
    else addCategory({ ...form, name })
    setEditing(null); setCreating(false); return ''
  }
  const move = (index, delta) => { const next = [...ordered]; const target = index + delta; if (target < 0 || target >= next.length) return; [next[index], next[target]] = [next[target], next[index]]; reorderCategories(next) }
  const deleteCategory = (category) => {
    const count = items.filter((item) => item.categoryId === category.id).length
    const fallback = categories.find((entry) => entry.id !== category.id)?.id || ''
    const detail = count ? ` ${count} item${count === 1 ? '' : 's'} will be moved to ${fallback ? categories.find((entry) => entry.id === fallback)?.name : 'Uncategorised'}.` : ''
    if (window.confirm(`Delete “${category.name}”?${detail}`)) removeCategory(category.id, fallback)
  }
  return <>
    <section className="page-intro page-intro-row"><div><p className="eyebrow">YOUR MENU, THOUGHTFULLY ARRANGED</p><h1>Categories</h1><p className="muted">Create a natural rhythm for guests as they browse.</p></div><button className="button primary" onClick={() => setCreating(true)}><Plus size={16} /> Add category</button></section>
    <div className="toolbar-note"><span>{categories.length} categories</span><span>Use the arrows to set display order</span></div>
    <section className="category-admin-list">{ordered.map((category, index) => <article className={`category-admin-card${category.active ? '' : ' dimmed'}`} key={category.id}><div className="category-admin-image">{category.imageUrl ? <img src={category.imageUrl} alt="" /> : <ImagePlus size={20} />}</div><div className="category-admin-info"><div className="inline-title"><h2>{category.name}</h2><span className={category.active ? 'status-pill live' : 'status-pill'}>{category.active ? 'Visible' : 'Hidden'}</span></div><p>{category.description || 'No description added yet.'}</p><small>{items.filter((item) => item.categoryId === category.id).length} menu items · Position {index + 1}</small></div><div className="category-order"><button className="icon-button" onClick={() => move(index, -1)} disabled={index === 0} aria-label={`Move ${category.name} up`}><ArrowUp size={16} /></button><button className="icon-button" onClick={() => move(index, 1)} disabled={index === ordered.length - 1} aria-label={`Move ${category.name} down`}><ArrowDown size={16} /></button></div><div className="row-actions"><button className="icon-button" onClick={() => editCategory(category.id, { active: !category.active })} aria-label={category.active ? 'Hide category' : 'Show category'}>{category.active ? <EyeOff size={16} /> : <Eye size={16} />}</button><button className="icon-button" onClick={() => setEditing(category)} aria-label={`Edit ${category.name}`}><Pencil size={16} /></button><button className="icon-button danger" onClick={() => deleteCategory(category)} aria-label={`Delete ${category.name}`}><Trash2 size={16} /></button></div></article>)}</section>
    {ordered.length === 0 && <div className="empty-state large"><ImagePlus size={22} /><h2>Your menu begins with a category.</h2><p>Create one to give guests a place to start exploring.</p></div>}
    {(creating || editing) && <CategoryEditor initial={editing} onClose={() => { setCreating(false); setEditing(null) }} onSave={save} />}
  </>
}
