import { prefersReducedMotion } from '@/utils/motion'

/**
 * v-reveal — apparition progressive des blocs.
 *
 * Au chargement, les blocs déjà visibles s'affichent immédiatement, décalés
 * entre eux par le retard passé en valeur ; au scroll, un IntersectionObserver
 * révèle chaque bloc quand il approche du bas de l'écran, puis cesse de
 * l'observer (l'animation ne se rejoue pas si on remonte).
 *
 * Usage :
 *   v-reveal                                  → glissement vers le haut
 *   v-reveal="160"                            → idem, 160 ms de retard
 *   v-reveal.left / .right / .scale / .fade   → autre point de départ
 *   v-reveal.highlight                        → surlignage rose déplié
 *   v-reveal="{ delay: 120, from: 'right' }"  → variante dynamique (v-for, props)
 *
 * `prefers-reduced-motion` coupe tout : aucune classe n'est posée, donc le
 * contenu reste visible tel quel.
 */

const VARIANTS = ['up', 'left', 'right', 'scale', 'fade', 'highlight']

// Doit rester aligné sur la durée de transition de `.reveal` (main.css).
const DURATION = 700

// Un seul observateur pour toute la page, partagé par tous les éléments.
let observer = null

const show = (el) => {
  el.classList.add('reveal-visible')

  // Une fois l'apparition jouée, on efface toute trace (classes, retard,
  // will-change) : sans quoi un lien animé garderait les 700 ms du reveal
  // au survol.
  window.clearTimeout(el._revealTimer)
  el._revealTimer = window.setTimeout(() => {
    el.classList.remove('reveal', 'reveal-visible', el._revealVariant)
    el.style.transitionDelay = ''
    el.style.removeProperty('--reveal-delay')
    el.style.willChange = ''
  }, (el._revealDelay || 0) + DURATION + 50)
}

const getObserver = () => {
  observer ??= new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        show(entry.target)
        observer.unobserve(entry.target)
      })
    },
    {
      // Marge négative en bas : le bloc démarre son apparition une fois
      // franchement entré dans l'écran, pas dès son premier pixel.
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.05,
    },
  )

  return observer
}

const parse = (binding) => {
  const raw = typeof binding.value === 'number' ? { delay: binding.value } : binding.value || {}
  const modifier = VARIANTS.find((variant) => binding.modifiers[variant])

  return {
    delay: Number(raw.delay) || 0,
    from: VARIANTS.includes(raw.from) ? raw.from : modifier || 'up',
  }
}

export const reveal = {
  mounted(el, binding) {
    if (prefersReducedMotion()) return

    const { delay, from } = parse(binding)

    el._revealVariant = `reveal-${from}`
    el._revealDelay = delay
    el.classList.add('reveal', el._revealVariant)

    if (delay) {
      el.style.transitionDelay = `${delay}ms`
      // `transition-delay` ne descend pas jusqu'aux pseudo-éléments, à la
      // différence d'une propriété personnalisée : la variante `highlight`,
      // qui anime ::before, lit celle-ci.
      el.style.setProperty('--reveal-delay', `${delay}ms`)
    }

    if (!('IntersectionObserver' in window)) {
      show(el)
      return
    }

    getObserver().observe(el)
  },

  unmounted(el) {
    window.clearTimeout(el._revealTimer)
    observer?.unobserve(el)
  },
}
