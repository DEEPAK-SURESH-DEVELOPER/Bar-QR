import { Clock3, Camera, MapPin, Globe2 } from 'lucide-react'
import { useMenu } from '../../context/useMenu.js'
import { isSafeHttpsUrl } from '../../utils/menu.js'

export default function Contact() {
  const { profile } = useMenu()
  const hours = Object.entries(profile.openingHours || {})
  const mapUrl = profile.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profile.address)}` : ''
  return <section className="customer-info-page contact-page"><div className="customer-page-heading"><p className="eyebrow">WE’LL KEEP A PLACE FOR YOU</p><h1>Come by.</h1><p>Drop in, settle in, and let the evening unfold.</p></div><div className="contact-grid"><article className="contact-card"><MapPin size={20} /><p className="eyebrow">FIND US</p>{profile.address && <a href={mapUrl} target="_blank" rel="noreferrer">{profile.address}<span>Open directions ↗</span></a>}{profile.phone && <a href={`tel:${profile.phone}`}>{profile.phone}</a>}{profile.email && <a href={`mailto:${profile.email}`}>{profile.email}</a>}</article><article className="contact-card hours-card"><Clock3 size={20} /><p className="eyebrow">OPENING HOURS</p>{hours.map(([day, time]) => time && <div className="customer-hours-row" key={day}><span>{day}</span><span>{time}</span></div>)}</article></div><div className="contact-socials">{isSafeHttpsUrl(profile.socials?.instagram) && <a href={profile.socials.instagram} target="_blank" rel="noreferrer"><Camera size={16} /> Instagram</a>}{isSafeHttpsUrl(profile.socials?.facebook) && <a href={profile.socials.facebook} target="_blank" rel="noreferrer"><Globe2 size={16} /> Facebook</a>}{isSafeHttpsUrl(profile.socials?.website) && <a href={profile.socials.website} target="_blank" rel="noreferrer"><Globe2 size={16} /> Website</a>}</div></section>
}
