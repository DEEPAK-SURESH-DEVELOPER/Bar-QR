import { useState } from 'react'
import { Check, Globe2, MapPin, Phone, Save } from 'lucide-react'
import ImageField from '../../components/common/ImageField.jsx'
import { useMenu } from '../../context/useMenu.js'
import { makeSlug } from '../../utils/menu.js'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function BarProfile() {
  const { profile, setProfile } = useMenu()
  const [form, setForm] = useState(profile)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const change = (key, value) => { setForm((current) => ({ ...current, [key]: value })); setSaved(false) }
  const changeHours = (day, value) => { setForm((current) => ({ ...current, openingHours: { ...current.openingHours, [day]: value } })); setSaved(false) }
  const changeSocial = (network, value) => { setForm((current) => ({ ...current, socials: { ...current.socials, [network]: value } })); setSaved(false) }
  const save = (event) => {
    event.preventDefault()
    if (!form.name.trim()) { setError('Enter your bar name.'); return }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError('Enter a valid email address.'); return }
    if (form.phone && !/^[+\d\s().-]{7,24}$/.test(form.phone)) { setError('Enter a valid phone number.'); return }
    for (const [network, url] of Object.entries(form.socials || {})) if (url && (!/^https:\/\//i.test(url) || !URL.canParse(url))) { setError(`Enter a secure https:// link for ${network}.`); return }
    setProfile({ ...form, name: form.name.trim(), slug: profile.slug || makeSlug(form.name) })
    setError(''); setSaved(true)
  }
  return <>
    <section className="page-intro"><p className="eyebrow">THE DETAILS BEHIND YOUR PLACE</p><h1>Bar profile</h1><p className="muted">Share the details that help guests feel at home.</p></section>
    <form className="profile-form surface-card" onSubmit={save}>
      <div className="profile-section"><div className="profile-section-title"><span className="section-icon"><Globe2 size={17} /></span><div><h2>Brand and story</h2><p>Your name and introduction appear across the guest menu.</p></div></div><div className="form-grid two"><label className="field"><span>Bar name</span><input required maxLength={70} value={form.name} onChange={(e) => change('name', e.target.value)} /></label><label className="field"><span>Menu address <small>PERMANENT</small></span><input value={`/menu/${profile.slug}`} readOnly /><small className="field-hint">This identifier stays fixed so your QR link remains stable.</small></label></div><label className="field"><span>Short description</span><textarea rows="3" maxLength={360} value={form.description} onChange={(e) => change('description', e.target.value)} placeholder="A few words that capture your place" /></label><ImageField label="Bar logo" value={form.logo} onChange={(value) => change('logo', value)} /><ImageField label="Cover image" value={form.coverImage} onChange={(value) => change('coverImage', value)} /></div>
      <div className="profile-section"><div className="profile-section-title"><span className="section-icon"><MapPin size={17} /></span><div><h2>Find us</h2><p>Contact and location details for your guests.</p></div></div><div className="form-grid two"><label className="field"><span>Address</span><input maxLength={160} value={form.address} onChange={(e) => change('address', e.target.value)} /></label><label className="field"><span>Phone number</span><input type="tel" maxLength={30} value={form.phone} onChange={(e) => change('phone', e.target.value)} /></label><label className="field"><span>Email</span><input type="email" maxLength={120} value={form.email} onChange={(e) => change('email', e.target.value)} /></label><label className="field"><span>Menu currency</span><select value={form.currency} onChange={(e) => change('currency', e.target.value)}><option value="GBP">GBP · Pound sterling</option><option value="USD">USD · US dollar</option><option value="EUR">EUR · Euro</option><option value="INR">INR · Indian rupee</option><option value="AUD">AUD · Australian dollar</option><option value="CAD">CAD · Canadian dollar</option></select></label></div></div>
      <div className="profile-section"><div className="profile-section-title"><span className="section-icon"><Phone size={17} /></span><div><h2>Opening hours</h2><p>Leave a day blank if the bar is closed.</p></div></div><div className="hours-grid">{days.map((day) => <label className="field hours-row" key={day}><span>{day}</span><input maxLength={50} value={form.openingHours?.[day] || ''} onChange={(e) => changeHours(day, e.target.value)} placeholder="Closed" /></label>)}</div><div className="form-grid two social-fields"><label className="field"><span>Instagram URL</span><input type="url" placeholder="https://instagram.com/yourbar" value={form.socials?.instagram || ''} onChange={(e) => changeSocial('instagram', e.target.value)} /></label><label className="field"><span>Facebook URL</span><input type="url" placeholder="https://facebook.com/yourbar" value={form.socials?.facebook || ''} onChange={(e) => changeSocial('facebook', e.target.value)} /></label><label className="field"><span>Website</span><input type="url" placeholder="https://yourbar.com" value={form.socials?.website || ''} onChange={(e) => changeSocial('website', e.target.value)} /></label></div></div>
      {error && <p className="field-error" role="alert">{error}</p>}<div className="profile-save"><span className="muted">Changes save locally in this browser.</span><button className="button primary" type="submit">{saved ? <Check size={16} /> : <Save size={16} />}{saved ? 'Saved' : 'Save profile'}</button></div>
    </form>
  </>
}
