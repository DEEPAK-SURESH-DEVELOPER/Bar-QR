import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return <main className="not-found"><img className="brand-mark brand-mark-image" src="/blue-lounge-logo.svg" alt="" /><p className="eyebrow">BLUE LOUNGE</p><h1>This page is not on the menu.</h1><p className="muted">Choose a workspace to continue.</p><div className="quick-links"><Link to="/admin">Open admin workspace ↗</Link><Link to="/menu/blue-lounge">View customer menu ↗</Link></div><Link className="text-link" to="/"><ArrowLeft size={15} /> Back to the start</Link></main>
}
