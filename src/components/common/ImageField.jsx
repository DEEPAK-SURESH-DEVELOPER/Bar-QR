import { useState } from 'react'
import { ImagePlus, X } from 'lucide-react'
import { isSafeImageSource } from '../../utils/menu.js'

const MAX_IMAGE_BYTES = 900 * 1024
const TYPES = ['image/jpeg', 'image/png', 'image/webp']

export default function ImageField({ label, value, onChange }) {
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const upload = (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (!TYPES.includes(file.type)) { setError('Choose a JPG, PNG or WebP image.'); return }
    if (file.size > MAX_IMAGE_BYTES) { setError('Image must be smaller than 900 KB.'); return }
    setError('')
    setBusy(true)
    const reader = new FileReader()
    reader.onload = () => { if (typeof reader.result === 'string') onChange(reader.result); setBusy(false) }
    reader.onerror = () => { setError('Could not read that image. Please try again.'); setBusy(false) }
    reader.readAsDataURL(file)
  }
  const safeValue = isSafeImageSource(value) ? value : ''
  return <div className="field image-field"><label>{label}</label><div className="image-field-row">{safeValue && <div className="image-preview"><img src={safeValue} alt="Selected preview" /><button type="button" className="preview-remove" onClick={() => onChange('')} aria-label="Remove image"><X size={14} /></button></div>}<label className="upload-button"><ImagePlus size={16} />{busy ? 'Reading image…' : safeValue ? 'Replace image' : 'Upload image'}<input type="file" accept="image/png,image/jpeg,image/webp" onChange={upload} hidden /></label><span className="field-hint">JPG, PNG or WebP · max 900 KB</span></div>{error && <span className="field-error" role="alert">{error}</span>}</div>
}
