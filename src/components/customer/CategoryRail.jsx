import styles from './CategoryRail.module.css'

/**
 * Data-driven customer category chooser.
 * @param {{categories: Array<{id: string, name: string}>, activeCategoryId: string|null, onSelect: (id: string) => void}} props
 */
export default function CategoryRail({ categories, activeCategoryId, onSelect }) {
  if (!categories || categories.length === 0) return null

  return (
    <div className={styles.rail} role="group" aria-label="Menu categories">
      {categories.map((category) => {
        const isActive = activeCategoryId === category.id
        return (
          <button
            key={category.id}
            type="button"
            className={isActive ? styles.active : styles.category}
            aria-pressed={isActive}
            onClick={() => onSelect(category.id)}
          >
            {category.name}
          </button>
        )
      })}
    </div>
  )
}
