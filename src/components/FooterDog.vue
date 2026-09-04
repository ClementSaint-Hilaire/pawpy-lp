<script setup>
/**
 * Illustration du footer, dessinée au fur et à mesure.
 *
 * Le SVG exporté de Figma est fait de 246 chemins *pleins* (aucun `stroke`) :
 * un `stroke-dashoffset` classique n'aurait rien à animer. On rétablit donc un
 * contour à la volée — de la couleur du remplissage — puis le contour se trace,
 * le remplissage arrive et le contour s'efface : l'état final est exactement
 * l'illustration d'origine. Les chemins démarrent l'un après l'autre dans
 * l'ordre du document (= l'empilement Figma), le tout en 1s.
 *
 * L'état vierge est posé au montage — avant la première peinture, donc sans
 * clignotement — et seul le départ attend l'entrée dans l'écran.
 */
import { onMounted, onBeforeUnmount, ref } from 'vue'
import footerDogSvg from '@/assets/figma/footer-dog.svg?raw'
import { observeOnce, prefersReducedMotion } from '@/utils/motion'

// Durée d'un trait (tracé + encrage) et fenêtre de décalage entre le premier
// et le dernier : 460 + 540 = 1000 ms pour l'ensemble du dessin. Alignés sur
// les animations `dog-trace` / `dog-ink` de main.css.
const DURATION = 460
const STAGGER = 540

// Retard avant le premier trait, calé sur les apparitions voisines du footer.
const DELAY = 160

const root = ref(null)
let paths = []
let stopObserving = null
let timer = 0

const run = () => {
  root.value.classList.add('dog-draw-run')

  // Dessin joué : on retire classes et contours ajoutés, le SVG retrouve son
  // état natif sans style résiduel.
  timer = window.setTimeout(() => {
    root.value?.classList.remove('dog-draw', 'dog-draw-run')
    paths.forEach((path) => {
      path.removeAttribute('stroke')
      path.removeAttribute('pathLength')
      path.style.removeProperty('--dog-delay')
    })
  }, DELAY + STAGGER + DURATION + 50)
}

onMounted(() => {
  if (prefersReducedMotion()) return

  paths = Array.from(root.value.querySelectorAll('path'))
  const last = Math.max(paths.length - 1, 1)

  paths.forEach((path, index) => {
    path.setAttribute('stroke', path.getAttribute('fill') || 'currentColor')
    // `pathLength="1"` normalise chaque tracé : un seul `stroke-dasharray: 1`
    // (main.css) vaut alors pour les 246 chemins.
    path.setAttribute('pathLength', '1')
    path.style.setProperty('--dog-delay', `${Math.round(DELAY + (index / last) * STAGGER)}ms`)
  })

  root.value.classList.add('dog-draw')
  stopObserving = observeOnce(root.value, run, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 })
})

onBeforeUnmount(() => {
  window.clearTimeout(timer)
  stopObserving?.()
})
</script>

<template>
  <!-- v-html sans risque : le SVG est un fichier local, inliné à la compilation.
       `.footer-dog` (main.css) neutralise ses attributs width/height pour qu'il
       remplisse la boîte responsive. -->
  <div
    ref="root"
    aria-hidden="true"
    class="footer-dog h-[240px] w-[164px] shrink-0 md:h-[320px] md:w-[219px] xl:h-[398px] xl:w-[272px]"
    v-html="footerDogSvg"
  />
</template>
