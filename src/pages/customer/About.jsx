import { useMenu } from '../../context/useMenu.js'
import { isSafeImageSource } from '../../utils/menu.js'

export default function About() {
  const { profile } = useMenu()
  return <section className="customer-info-page"><div className="customer-page-heading"><p className="eyebrow">A LITTLE ABOUT US</p><h1>Good nights<br />have a way of staying.</h1></div>{isSafeImageSource(profile.coverImage) && profile.coverImage && <div className="about-cover"><img src={profile.coverImage} alt={`${profile.name} bar interior`} /></div>}<div className="about-copy"><p className="eyebrow">{profile.name.toUpperCase()}</p><p>{profile.description}</p></div></section>
}
