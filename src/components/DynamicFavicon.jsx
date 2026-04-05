import { useEffect } from 'react'
import config from '../siteConfig'

export default function DynamicFavicon() {
  useEffect(() => {
    const name = config.business.name || ''
    const words = name.split(/[\s&]+/).filter(w => w.length > 0)
    // For names like "A&E NYC Plumbing", get "A&E"; for "Apex Plumbing", get "AP"
    let initials
    if (name.includes('&')) {
      const parts = name.split('&').map(s => s.trim())
      initials = parts.map(p => p[0]).join('&')
    } else {
      initials = words.slice(0, 2).map(w => w[0]).join('').toUpperCase()
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="12" fill="#0D1117"/>
      <text x="32" y="44" text-anchor="middle" font-family="cursive,serif" font-weight="700" font-size="${initials.length > 2 ? '20' : '28'}" fill="#0EA5E9">${initials}</text>
    </svg>`

    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)

    let link = document.querySelector("link[rel='icon']")
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    link.type = 'image/svg+xml'
    link.href = url

    return () => URL.revokeObjectURL(url)
  }, [])

  return null
}
