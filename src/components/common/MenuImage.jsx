import { useState } from 'react'
import { isSafeImageSource } from '../../utils/menu.js'

export default function MenuImage({ src, alt = '', fallback = 'B' }) {
  const [failedSrc, setFailedSrc] = useState(null)
  if (!src || !isSafeImageSource(src) || failedSrc === src) return <span className="menu-image-fallback" aria-hidden="true">{fallback}</span>
  return <img className="menu-image" src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailedSrc(src)} />
}
