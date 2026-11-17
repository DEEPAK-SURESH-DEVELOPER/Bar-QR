import { useRef, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Check, Clipboard, Download, ExternalLink, Info, Printer, QrCode, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMenu } from '../../context/useMenu.js'
import { domainIsConfigured, isSafeImageSource, publicMenuUrl } from '../../utils/menu.js'

export default function QRManagement() {
  const { profile, qr, setQr } = useMenu()
  const [base, setBase] = useState(qr.baseUrl)
  const [copied, setCopied] = useState(false)
  const [message, setMessage] = useState('')
  const svgRef = useRef(null)
  const url = publicMenuUrl(base, profile.slug)
  const configured = domainIsConfigured(base)
  const saveDomain = (event) => {
    event.preventDefault()
    try {
      const parsed = new URL(base)
      if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.pathname !== '/' || parsed.search || parsed.hash) throw new Error()
      setQr({ baseUrl: parsed.origin })
      setBase(parsed.origin)
      setMessage('Public domain saved. Your menu address stays the same.')
    } catch { setMessage('Enter a valid https:// public domain only, without a path or credentials.') }
  }
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1800) }
    catch { setMessage('Clipboard access is unavailable. Select and copy the public URL above.') }
  }
  const downloadSvg = () => {
    const source = svgRef.current?.querySelector('svg')
    if (!source) return
    const svg = source.cloneNode(true)
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    svg.setAttribute('width', '1200'); svg.setAttribute('height', '1200')
    const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    background.setAttribute('width', '100%'); background.setAttribute('height', '100%'); background.setAttribute('fill', '#ffffff')
    svg.insertBefore(background, svg.firstChild)
    const blob = new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml;charset=utf-8' })
    const href = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = href; anchor.download = `${profile.slug}-menu-qr.svg`; anchor.click(); window.setTimeout(() => URL.revokeObjectURL(href), 500)
  }
  const downloadPng = async () => {
    const source = svgRef.current?.querySelector('svg')
    if (!source) return
    const svg = source.cloneNode(true)
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg'); svg.setAttribute('width', '1200'); svg.setAttribute('height', '1200')
    const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect'); background.setAttribute('width', '100%'); background.setAttribute('height', '100%'); background.setAttribute('fill', '#ffffff'); svg.insertBefore(background, svg.firstChild)
    const blob = new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml;charset=utf-8' }); const objectUrl = URL.createObjectURL(blob)
    try { const image = new Image(); image.src = objectUrl; await image.decode(); const canvas = document.createElement('canvas'); canvas.width = 1200; canvas.height = 1200; canvas.getContext('2d').drawImage(image, 0, 0, 1200, 1200); const anchor = document.createElement('a'); anchor.href = canvas.toDataURL('image/png'); anchor.download = `${profile.slug}-menu-qr.png`; anchor.click() }
    catch { setMessage('Could not export PNG. Please try the SVG download instead.') }
    finally { window.setTimeout(() => URL.revokeObjectURL(objectUrl), 500) }
  }
  return <>
    <section className="page-intro"><p className="eyebrow">ONE PERMANENT LINK FOR EVERY TABLE</p><h1>Your menu QR</h1><p className="muted">The code always points to the same public menu. Changes to your menu appear there automatically.</p></section>
    <section className="qr-layout">
      <article className="surface-card qr-preview-card"><div className="section-heading"><div><p className="eyebrow">{profile.name.toUpperCase()} · PUBLIC MENU</p><h2>Scan to explore</h2></div><QrCode size={19} /></div><div className="qr-print-area"><div className="qr-art" ref={svgRef}><QRCodeSVG value={url} size={224} level="H" marginSize={4} bgColor="#ffffff" fgColor="#171815" title={`${profile.name} digital menu QR code`} /></div><div className="qr-print-brand">{isSafeImageSource(profile.logo) && profile.logo && <img src={profile.logo} alt="" />}<span>{profile.name}</span><small>SCAN FOR THE MENU</small></div></div><div className="qr-url-row"><div><small>PERMANENT PUBLIC URL</small><code>{url}</code></div><button type="button" className="icon-button" onClick={copy} aria-label="Copy public menu URL">{copied ? <Check size={17} /> : <Clipboard size={17} />}</button></div><p className="qr-state"><i className={configured ? 'configured' : ''} />{configured ? 'Public domain configured' : 'Setup preview · domain not configured'}</p><div className="qr-downloads"><button className="button primary" onClick={downloadPng}><Download size={15} /> Download PNG</button><button className="button secondary" onClick={downloadSvg}>SVG</button><button className="button secondary" onClick={() => window.print()}><Printer size={15} /> Print</button></div><Link className="text-link" to={`/menu/${profile.slug}`} target="_blank"><ExternalLink size={15} /> Preview the guest menu</Link></article>
      <aside className="qr-side-column"><article className="surface-card domain-card"><div className="section-heading"><div><p className="eyebrow">PUBLIC ADDRESS</p><h2>Set your domain</h2></div><ShieldCheck size={18} /></div><p>Keep this domain pointed to your BarMenu deployment. Your bar’s permanent menu slug is <code>/menu/{profile.slug}</code>.</p><form onSubmit={saveDomain} className="form-stack"><label className="field"><span>Public base URL</span><input type="url" value={base} onChange={(e) => setBase(e.target.value)} placeholder="https://yourdomain.com" required /></label><button className="button primary" type="submit">Save public domain</button></form>{message && <p className="field-hint" role="status">{message}</p>}{!configured && <div className="notice"><Info size={16} /><span>Your QR is using a placeholder domain. Configure your real HTTPS domain before printing it for guests.</span></div>}</article>
        <article className="surface-card print-tips"><p className="eyebrow">A SMALL NOTE FOR THE TABLE</p><h2>Make it easy to scan.</h2><ul><li>Print the PNG at 300 DPI or use the SVG for a crisp, scalable finish.</li><li>Give the code a clear border and keep it out of glare.</li><li>Test the printed code with a phone before setting it out.</li></ul><p className="muted">Downloads and regeneration keep the same menu address and bar identity.</p></article></aside>
    </section>
  </>
}
