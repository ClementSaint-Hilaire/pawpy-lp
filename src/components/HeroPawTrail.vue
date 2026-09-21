<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { prefersReducedMotion } from '@/utils/motion'

/**
 * Traînée de pattes — hero uniquement.
 *
 * Au passage de la souris, des empreintes se déposent l'une après l'autre
 * derrière le curseur puis s'effacent, comme la démarche d'un chien. Elles sont
 * posées alternativement de part et d'autre du trajet et orientées dans le sens
 * du déplacement.
 *
 * L'écoute est branchée sur l'élément parent (la <section> du hero) plutôt que
 * sur `document` : les `pointermove` de tous ses enfants y remontent, la portée
 * de l'effet est donc exactement la zone hero, sans test de position à chaque
 * frame. Le calque, lui, est en `pointer-events: none` — il ne recevrait rien.
 *
 * Deux nœuds par empreinte : la position et la rotation vivent en ligne sur le
 * conteneur, le fondu et le grossissement dans le keyframe posé sur l'enfant.
 * Sur un seul élément, le `transform` de l'animation écraserait la rotation.
 * (Même découpage que TheCursor.vue, pour la même raison.)
 */

// Distance parcourue entre deux empreintes : c'est la longueur de la foulée.
const STEP = 88
// Écart latéral d'une patte au trajet, de part et d'autre. Sans lui la traînée
// serait une file rectiligne, pas une démarche.
const SPREAD = 13
// Durée de vie d'une empreinte : doit rester égale à celle de `hero-paw-step`
// dans main.css, sinon le nœud est retiré avant la fin du fondu.
const LIFE = 1400
// Plafond d'empreintes simultanées. À 88px de pas et 1,4s de vie, un balayage
// très rapide n'en produit guère plus d'une dizaine — c'est une sécurité.
const MAX = 14
// Au-delà, le pointeur n'a pas parcouru la distance : il a sauté (entrée dans
// la zone, retour d'un autre onglet). On ne dépose rien, la direction déduite
// d'un tel bond serait arbitraire.
const JUMP = 400

const media = '(hover: hover) and (pointer: fine)'

const root = ref(null)
const prints = ref([])

let host = null
let query = null
let bound = false
let seq = 0
let lastX = 0
let lastY = 0
// Première position connue du pointeur : tant qu'on ne l'a pas, aucune
// direction n'est mesurable.
let primed = false
// Côté de la prochaine empreinte, alterné à chaque dépose.
let side = 1
const timers = new Set()

const drop = (event) => {
  const dx = event.clientX - lastX
  const dy = event.clientY - lastY
  const dist = Math.hypot(dx, dy)

  if (!primed || dist > JUMP) {
    lastX = event.clientX
    lastY = event.clientY
    primed = true
    return
  }

  if (dist < STEP) return

  lastX = event.clientX
  lastY = event.clientY

  // Orientation = direction du déplacement. Le +90 vient du dessin : le SVG a
  // ses coussinets en haut, la patte pointe donc vers le haut au repos.
  const rot = (Math.atan2(dy, dx) * 180) / Math.PI + 90
  // Perpendiculaire normalisée au trajet, pour écarter la patte du centre.
  const offX = (-dy / dist) * SPREAD * side
  const offY = (dx / dist) * SPREAD * side
  side = -side

  // Lu à la dépose seulement (quelques fois par seconde), pas à chaque
  // `pointermove` : le calque défile avec la page, son `rect` bouge.
  const rect = root.value.getBoundingClientRect()
  const id = (seq += 1)

  prints.value.push({
    id,
    x: event.clientX - rect.left + offX,
    y: event.clientY - rect.top + offY,
    rot,
  })

  if (prints.value.length > MAX) prints.value.shift()

  const timer = window.setTimeout(() => {
    timers.delete(timer)
    prints.value = prints.value.filter((print) => print.id !== id)
  }, LIFE)

  timers.add(timer)
}

const onPointerMove = (event) => {
  // Au doigt il n'y a pas de trajet à suivre : le contact saute d'un point à
  // l'autre et la traînée n'aurait aucun sens.
  if (event.pointerType === 'touch') return
  drop(event)
}

const clear = () => {
  timers.forEach((timer) => window.clearTimeout(timer))
  timers.clear()
  prints.value = []
  primed = false
}

const apply = () => {
  // Une souris doit être présente, et l'effet n'a rien d'essentiel : il saute
  // entièrement si l'utilisateur limite les animations.
  const on = query.matches && !prefersReducedMotion()

  if (on === bound) return

  if (on) {
    host.addEventListener('pointermove', onPointerMove, { passive: true })
  } else {
    host.removeEventListener('pointermove', onPointerMove)
    clear()
  }

  bound = on
}

onMounted(() => {
  host = root.value?.parentElement
  if (!host) return

  query = window.matchMedia(media)
  query.addEventListener('change', apply)
  apply()
})

onBeforeUnmount(() => {
  query?.removeEventListener('change', apply)
  host?.removeEventListener('pointermove', onPointerMove)
  clear()
})
</script>

<template>
  <!-- Le calque est toujours rendu, même inactif : c'est lui qui donne accès à
       la <section> parente au montage, et il sert de repère aux coordonnées. -->
  <div ref="root" class="hero-paw-trail" aria-hidden="true">
    <div
      v-for="print in prints"
      :key="print.id"
      class="hero-paw-print"
      :style="{
        transform: `translate3d(${print.x}px, ${print.y}px, 0) translate(-50%, -50%) rotate(${print.rot}deg)`,
      }"
    >
      <i class="hero-paw-mark"></i>
    </div>
  </div>
</template>
