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

// Le décompte ne démarre pas au ras du bas de l'écran mais une fois le bloc
// entamé, à la même hauteur que le seuil de `v-reveal` (rootMargin de -12%) :
// sans cela le début de la course se jouerait pendant que le bloc est encore
// invisible, et le mouvement paraîtrait tronqué.
const PROGRESS_START = 0.88

/**
 * Suit l'avancée du défilement sur `el` et la passe à `onProgress` : 0 tant que
 * le haut du bloc n'a pas entamé son entrée dans l'écran, 1 dès qu'il est
 * centré.
 *
 * L'écoute n'est branchée que pendant que le bloc approche de l'écran, et
 * chaque mesure est repoussée à la frame suivante : la position n'est donc lue
 * qu'une fois par rafraîchissement, jamais à chaque évènement de défilement.
 * `prefers-reduced-motion` fige la progression sur 1 (l'état final, celui du
 * montage Figma). Retourne la fonction de nettoyage.
 */
export const trackScrollProgress = (el, onProgress) => {
  if (!el) return () => {}

  if (prefersReducedMotion()) {
    onProgress(1)
    return () => {}
  }

  let frame = 0

  const measure = () => {
    frame = 0
    const viewport = window.innerHeight || document.documentElement.clientHeight
    const { top, height } = el.getBoundingClientRect()
    // Course totale : du seuil d'entrée jusqu'au centrage du bloc.
    const from = viewport * PROGRESS_START
    const span = from - (viewport - height) / 2
    const progress = span > 0 ? (from - top) / span : 1
    onProgress(Math.min(1, Math.max(0, progress)))
  }

  const schedule = () => {
    frame ||= requestAnimationFrame(measure)
  }

  let listening = false
  const listen = (on) => {
    if (on === listening) return
    listening = on
    const toggle = on ? window.addEventListener : window.removeEventListener
    toggle.call(window, 'scroll', schedule, { passive: true })
    toggle.call(window, 'resize', schedule)
  }

  measure()

  let observer = null
  if ('IntersectionObserver' in window) {
    // Un écran de marge de part et d'autre : le suivi est déjà en place quand
    // le bloc entre, et s'arrête dès qu'il est franchement sorti.
    observer = new IntersectionObserver(
      ([entry]) => {
        listen(entry.isIntersecting)
        schedule()
      },
      { rootMargin: '100% 0px' },
    )
    observer.observe(el)
  } else {
    listen(true)
  }

  return () => {
    observer?.disconnect()
    listen(false)
    if (frame) cancelAnimationFrame(frame)
  }
}
