import { useState } from 'react'
import styles from './CustomerProductCard.module.css'
import { isSafeImageSource } from '../../utils/menu.js'

function getInitial(name) {
  const first = Array.from(String(name ?? '').trim())[0]
  return first ? first.toUpperCase() : ''
}

export default function CustomerProductCard({ product, onSelect }) {
  const {
    name,
    shortDescription,
    priceLabel,
    originalPriceLabel,
    imageUrl,
    imageAlt,
    available,
    featured,
  } = product

  // A changed imageUrl gets a fresh attempt after a previous image failed.
  const [failedUrl, setFailedUrl] = useState(null)
  const safeImageUrl = isSafeImageSource(imageUrl) ? imageUrl : ''
  const showImage = Boolean(safeImageUrl) && failedUrl !== safeImageUrl
  const isUnavailable = available === false
  const className = [styles.card, isUnavailable ? styles.unavailable : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={className}
        onClick={() => onSelect?.(product)}
      >
        <span className={styles.media}>
          {showImage ? (
            <img
              className={styles.image}
              src={safeImageUrl}
              alt={imageAlt || ''}
              loading="lazy"
              decoding="async"
              onError={() => setFailedUrl(safeImageUrl)}
            />
          ) : (
            <span className={styles.placeholder} aria-hidden="true">
              {getInitial(name)}
            </span>
          )}
          {featured ? <span className={styles.featured}>Featured</span> : null}
        </span>

        <span className={styles.body}>
          <span className={styles.name}>{name}</span>
          {shortDescription ? (
            <span className={styles.description}>{shortDescription}</span>
          ) : null}
          <span className={styles.footer}>
            <span className={styles['price-group']}>{originalPriceLabel && <s className={styles.originalPrice}>{originalPriceLabel}</s>}<span className={styles.price}>{priceLabel}</span></span>
            {isUnavailable ? (
              <span className={styles.status}>Currently unavailable</span>
            ) : null}
          </span>
        </span>
      </button>
    </div>
  )
}
