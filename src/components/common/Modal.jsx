import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export default function Modal({ title, onClose, children, size = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const dialog = ref.current
    if (dialog && !dialog.open) dialog.showModal()
    return () => { if (dialog?.open) dialog.close() }
  }, [])
  return <dialog ref={ref} className={`dialog ${size}`} onClose={onClose} onClick={(event) => { if (event.target === ref.current) ref.current.close() }}>
    <div className="dialog-head"><div><p className="eyebrow">BLUE LOUNGE · STUDIO</p><h2>{title}</h2></div><button type="button" className="icon-button" onClick={() => ref.current?.close()} aria-label="Close dialog"><X size={18} /></button></div>
    {children}
  </dialog>
}
