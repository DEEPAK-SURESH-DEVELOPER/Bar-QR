import { useCallback, useEffect, useMemo, useState } from 'react'
import { additionalSeedItems, seedData } from '../data/seed.js'
import { MenuContext } from './menu-context.js'

const STORAGE_KEY = 'barmenu:blue-lounge:v1'
const SEED_VERSION = 2
const clone = (value) => JSON.parse(JSON.stringify(value))
const createId = () => globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`

function loadInitial() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return { ...clone(seedData), seedVersion: SEED_VERSION }
    const parsed = JSON.parse(saved)
    if (!parsed || !Array.isArray(parsed.items) || !Array.isArray(parsed.categories) || !parsed.profile) return { ...clone(seedData), seedVersion: SEED_VERSION }
    const items = parsed.seedVersion >= SEED_VERSION
      ? parsed.items
      : [...parsed.items, ...additionalSeedItems.filter((item) => !parsed.items.some((savedItem) => savedItem.id === item.id))]
    return { ...clone(seedData), ...parsed, seedVersion: SEED_VERSION, items, profile: { ...clone(seedData.profile), ...parsed.profile }, qr: { ...clone(seedData.qr), ...parsed.qr }, activity: Array.isArray(parsed.activity) ? parsed.activity : [] }
  } catch { return clone(seedData) }
}

export function MenuProvider({ children }) {
  const [data, setData] = useState(loadInitial)
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) }
    catch (error) { console.warn('Menu changes could not be saved in this browser.', error) }
  }, [data])

  const record = useCallback((label, type = 'menu') => ({ id: createId(), label, type, at: new Date().toISOString() }), [])
  const update = useCallback((label, type, updater) => { const entry = record(label, type); setData((current) => ({ ...updater(current), activity: [entry, ...current.activity].slice(0, 8) })) }, [record])
  const setProfile = useCallback((values) => update('Bar profile updated', 'profile', (d) => ({ ...d, profile: { ...d.profile, ...values } })), [update])
  const setQr = useCallback((values) => update('Public QR settings updated', 'qr', (d) => ({ ...d, qr: { ...d.qr, ...values } })), [update])
  const addCategory = useCallback((category) => { const added = { ...category, id: createId() }; update(`Added ${category.name} category`, 'category', (d) => ({ ...d, categories: [...d.categories, { ...added, order: d.categories.length }] })) }, [update])
  const editCategory = useCallback((id, values) => update(`Updated ${values.name || 'category'}`, 'category', (d) => ({ ...d, categories: d.categories.map((category) => category.id === id ? { ...category, ...values } : category) })), [update])
  const removeCategory = useCallback((id, fallbackId = '') => { const updatedAt = new Date().toISOString(); update('Removed a category', 'category', (d) => ({ ...d, categories: d.categories.filter((category) => category.id !== id).map((category, index) => ({ ...category, order: index })), items: d.items.map((item) => item.categoryId === id ? { ...item, categoryId: fallbackId, updatedAt } : item) })) }, [update])
  const reorderCategories = useCallback((categories) => update('Category order changed', 'category', (d) => ({ ...d, categories: categories.map((category, order) => ({ ...category, order })) })), [update])
  const addItem = useCallback((item) => { const added = { ...item, id: createId(), updatedAt: new Date().toISOString() }; update(`Added ${item.name}`, 'menu', (d) => ({ ...d, items: [...d.items, { ...added, order: d.items.length }] })) }, [update])
  const editItem = useCallback((id, values) => { const updatedAt = new Date().toISOString(); update(`Updated ${values.name || 'menu item'}`, 'menu', (d) => ({ ...d, items: d.items.map((item) => item.id === id ? { ...item, ...values, updatedAt } : item) })) }, [update])
  const removeItem = useCallback((id) => update('Removed a menu item', 'menu', (d) => ({ ...d, items: d.items.filter((item) => item.id !== id).map((item, order) => ({ ...item, order })) })), [update])
  const reorderItems = useCallback((items) => update('Menu item order changed', 'menu', (d) => ({ ...d, items: items.map((item, order) => ({ ...item, order })) })), [update])
  const value = useMemo(() => ({ ...data, setProfile, setQr, addCategory, editCategory, removeCategory, reorderCategories, addItem, editItem, removeItem, reorderItems }), [data, setProfile, setQr, addCategory, editCategory, removeCategory, reorderCategories, addItem, editItem, removeItem, reorderItems])
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}
