export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Déclenche `onEnter` la première fois que `el` entre dans l'écran, puis cesse
 * d'observer. Sans IntersectionObserver (très vieux navigateur), on déclenche
 * tout de suite. Retourne la fonction de nettoyage.
 */
export const observeOnce = (el, onEnter, options) => {
  if (!('IntersectionObserver' in window)) {
    onEnter()
    return () => {}
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      observer.unobserve(entry.target)
      onEnter()
    })
  }, options)

  observer.observe(el)
  return () => observer.disconnect()
}
