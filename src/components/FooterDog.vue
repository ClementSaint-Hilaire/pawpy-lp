<script setup>
/**
 * Illustration du footer, dessinée au fur et à mesure.
 *
 * Le SVG exporté de Figma est fait de 246 chemins *pleins* (aucun `stroke`) :
 * un `stroke-dashoffset` classique n'a donc rien à animer. On rétablit un
 * contour à la volée — `stroke` de la même couleur que le remplissage — puis :
 *
 *   1. le contour se trace (`stroke-dashoffset` 1 → 0, cf. `pathLength="1"`
 *      posé ici : la longueur réelle de chaque chemin devient 1, ce qui rend
 *      le `stroke-dasharray: 1` du CSS valable pour les 246 tracés) ;
 *   2. le remplissage arrive et le contour s'efface, si bien que l'état final
 *      est exactement l'illustration d'origine.
 *
 * Les chemins démarrent l'un après l'autre dans l'ordre du document, c'est-à-
 * dire l'ordre d'empilement Figma : le chien apparaît trait par trait. Le tout
 * tient dans 1s (voir DURATION / STAGGER, alignés sur main.css).
 *
 * L'état vierge est posé au montage — avant la première peinture, donc sans
 * clignotement — et seul le départ attend que l'illustration entre dans
 * l'écran. `prefers-reduced-motion` coupe tout : le dessin reste visible tel
 * quel, sans contour ajouté.
 */
import { onMounted, onBeforeUnmount, ref } from 'vue'
import footerDogSvg from '@/assets/figma/footer-dog.svg?raw'

// Durée d'un trait (tracé + encrage) et fenêtre de décalage entre le premier
// et le dernier : 460 + 540 = 1000 ms pour l'ensemble du dessin.
const DURATION = 460
const STAGGER = 540

// Retard avant le premier trait, calé sur les apparitions voisines du footer.
const DELAY = 160

const root = ref(null)
let paths = []
let observer = null
let timer = 0

const run = () => {
  root.value.classList.add('dog-draw-run')

  // Une fois le dessin joué, on retire classes et contours ajoutés : le SVG
  // retrouve son état natif, sans animation ni style résiduel.
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
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  paths = Array.from(root.value.querySelectorAll('path'))
  const last = Math.max(paths.length - 1, 1)

  paths.forEach((path, index) => {
    // Sans contour d'origine, on en fabrique un de la couleur du remplissage.
    path.setAttribute('stroke', path.getAttribute('fill') || 'currentColor')
    path.setAttribute('pathLength', '1')
    path.style.setProperty('--dog-delay', `${Math.round(DELAY + (index / last) * STAGGER)}ms`)
  })

  root.value.classList.add('dog-draw')

  if (!('IntersectionObserver' in window)) {
    run()
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        observer.unobserve(entry.target)
        run()
      })
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
  )

  observer.observe(root.value)
})

onBeforeUnmount(() => {
  window.clearTimeout(timer)
  observer?.disconnect()
})
</script>

<template>
  <!--
    v-html sans risque : le SVG est un fichier local, inliné à la compilation.

    La boîte se réduit par paliers ; `.footer-dog` (main.css) neutralise les
    attributs `width`/`height` du SVG exporté pour qu'il la remplisse. Le
    `stroke-width` du tracé étant exprimé dans les unités du viewBox, le trait
    s'amincit proportionnellement — c'est bien le rendu voulu.
  -->
  <div
    ref="root"
    aria-hidden="true"
    class="footer-dog h-[240px] w-[164px] shrink-0 md:h-[320px] md:w-[219px] xl:h-[398px] xl:w-[272px]"
    v-html="footerDogSvg"
  />
</template>
