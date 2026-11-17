import { useState } from 'react'
import styles from './CustomerWelcomeHero.module.css'
import { isSafeImageSource } from '../../utils/menu.js'

function isModifiedClick(event) {
  return (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  )
}

export default function CustomerWelcomeHero({ menuUrl, onNavigate, brandName = 'Blue Lounge', coverImage = '', description = 'Thoughtfully poured. Made to be remembered.' }) {
  const [loadedCover, setLoadedCover] = useState('')
  const showCover = Boolean(coverImage) && isSafeImageSource(coverImage)
  const showOrb = !showCover || loadedCover !== coverImage

  const handleClick = (event) => {
    // Let the browser handle new-tab / new-window / download style activations.
    if (event.defaultPrevented || isModifiedClick(event)) return
    event.preventDefault()
    onNavigate(menuUrl)
  }

  return (
    <section className={styles.hero} aria-labelledby="welcome-heading">
      {showCover && <img className={styles.cover} src={coverImage} alt="" aria-hidden="true" onLoad={() => setLoadedCover(coverImage)} />}
      {showOrb && <span className={styles.orb} aria-hidden="true" />}

      <div className={styles.content}>
        <p className={styles.brand}>{brandName}</p>
        <h1 id="welcome-heading" className={styles.title}>
          <span className={styles.line}>An evening,</span>{' '}
          <span className={styles.line}>well spent.</span>
        </h1>
        <p className={styles.tagline}>{description}</p>
        <a className={styles.cta} href={menuUrl} onClick={handleClick}>
          View the menu
        </a>
      </div>
    </section>
  )
}
