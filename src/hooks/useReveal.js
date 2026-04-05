import { useEffect } from 'react'

const REVEAL_SELECTORS = '.reveal, .reveal-left, .reveal-right, .reveal-scale'

export function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll(REVEAL_SELECTORS).forEach((el) => observer.observe(el))

    const mutation = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType !== 1) continue
          if (node.matches && node.matches(REVEAL_SELECTORS)) {
            observer.observe(node)
          }
          if (node.querySelectorAll) {
            node.querySelectorAll(REVEAL_SELECTORS).forEach((el) => observer.observe(el))
          }
        }
      }
    })

    mutation.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutation.disconnect()
    }
  }, [])
}
