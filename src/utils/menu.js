export function makeSlug(value) {
  return String(value || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function formatPrice(value, currency = 'GBP') {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency, maximumFractionDigits: 2 }).format(Number(value || 0))
}

export function publicMenuUrl(baseUrl, slug) {
  const base = String(baseUrl || '').trim().replace(/\/+$/, '')
  return `${base}/menu/${encodeURIComponent(slug)}`
}

export function isSafeImageSource(value) {
  const source = String(value || '').trim()
  return !source || /^https:\/\//i.test(source) || /^data:image\/(png|jpeg|webp|gif);base64,/i.test(source)
}

export function isSafeHttpsUrl(value) {
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password }
  catch { return false }
}

export function domainIsConfigured(baseUrl) {
  try {
    const url = new URL(baseUrl)
    return url.protocol === 'https:' && url.hostname !== 'yourdomain.com' && !url.hostname.endsWith('.example') && !url.hostname.includes('localhost')
  } catch { return false }
}
