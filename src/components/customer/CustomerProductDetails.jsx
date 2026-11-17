import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { formatPrice, isSafeImageSource } from '../../utils/menu.js'

export default function CustomerProductDetails({ product, category, currency, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    const dialog = ref.current
    if (product && dialog && !dialog.open) dialog.showModal()
    return () => { if (dialog?.open) dialog.close() }
  }, [product])
  if (!product) return null
  return <dialog ref={ref} className="product-dialog" onClose={onClose} onClick={(event) => { if (event.target === ref.current) ref.current.close() }}>
    <button className="product-dialog-close" aria-label="Close product details" onClick={() => ref.current?.close()}><X size={18} /></button>
    <div className="product-dialog-image">{isSafeImageSource(product.imageUrl) && product.imageUrl ? <img src={product.imageUrl} alt={product.name} /> : <span>{product.name.slice(0, 1)}</span>}</div>
    <div className="product-dialog-copy"><p className="eyebrow">{category || 'FROM OUR MENU'}</p><h2>{product.name}</h2><p className="product-dialog-description">{product.description}</p><div className="product-dialog-meta"><strong>{formatPrice(product.price, currency)}</strong>{product.originalPrice && <del>{formatPrice(product.originalPrice, currency)}</del>}<span className={product.available ? 'availability available' : 'availability unavailable'}>{product.available ? 'Available' : 'Currently unavailable'}</span></div>{product.tags?.length > 0 && <div className="tag-list">{product.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}</div>
  </dialog>
}
