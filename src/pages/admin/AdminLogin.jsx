import { useState } from 'react'
import { ArrowLeft, LockKeyhole } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { DEMO_ADMIN_EMAIL, DEMO_ADMIN_PASSWORD, useAuth } from '../../context/auth-context.js'
import { useMenu } from '../../context/useMenu.js'

export default function AdminLogin() {
  const { login } = useAuth()
  const { profile } = useMenu()
  const location = useLocation()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showDemo, setShowDemo] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    if (!login(email, password)) {
      setError('Those details did not match the local demo account.')
      return
    }
    navigate(location.state?.from?.pathname || '/admin', { replace: true })
  }

  function fillDemoAccount() {
    setEmail(DEMO_ADMIN_EMAIL)
    setPassword(DEMO_ADMIN_PASSWORD)
    setShowDemo(true)
    setError('')
  }

  return <main className="login-page">
    <section className="login-card" aria-labelledby="login-title">
      <Link to={`/menu/${profile.slug}`} className="login-back"><ArrowLeft size={16} /> View the public menu</Link>
      <div className="login-mark"><img className="brand-mark brand-mark-image" src="/blue-lounge-logo.svg" alt="" /><span>BAR MENU <small>HOSPITALITY STUDIO</small></span></div>
      <p className="eyebrow">PRIVATE WORKSPACE</p>
      <h1 id="login-title">Welcome back.</h1>
      <p className="muted">Sign in to manage {profile.name}’s menu, profile and QR code.</p>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="field"><span>Email address</span><input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
        <label className="field"><span>Password</span><input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label>
        {error ? <p className="login-error" role="alert">{error}</p> : null}
        <button className="button primary login-submit" type="submit"><LockKeyhole size={16} /> Sign in</button>
      </form>
      <div className="login-demo">
        <div><strong>Local demo access</strong><span>Use the demo account to open this browser-only admin.</span></div>
        <button className="button secondary" type="button" onClick={fillDemoAccount}>Fill demo details</button>
        {showDemo ? <p><b>{DEMO_ADMIN_EMAIL}</b><br /><code>{DEMO_ADMIN_PASSWORD}</code></p> : null}
      </div>
      <p className="login-notice">Demo access is stored only for this browser tab. Connect server-side authentication before deploying with real business data.</p>
    </section>
  </main>
}
