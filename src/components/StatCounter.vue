<script setup>
/**
 * Compteur animé des chiffres clés.
 *
 *   • à l'entrée de la section, la valeur grimpe de 0 jusqu'à sa cible ;
 *   • ensuite, si `live`, elle repart de quelques unités à intervalle
 *     aléatoire, pour donner l'impression d'un chiffre vivant ;
 *   • l'écart accumulé est conservé dans le localStorage : au rechargement, le
 *     visiteur retrouve le compteur là où il l'avait laissé.
 *
 * `prefers-reduced-motion` coupe les transitions : les valeurs changent d'un
 * coup, sans décompte ni sursaut.
 */
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { observeOnce, prefersReducedMotion } from '@/utils/motion'

const props = defineProps({
  // Valeur de base telle qu'affichée dans la maquette, zéros de tête compris.
  value: { type: String, required: true },
  // Un chiffre « live » continue de grimper après son apparition.
  live: { type: Boolean, default: false },
  // Identifiant de l'écart conservé — obligatoire pour un chiffre live.
  storageKey: { type: String, default: '' },
})

const STORAGE_KEY = 'pawpy:stats-drift'
const COUNT_UP_DURATION = 1400
const TICK_DURATION = 450
const TICK_DELAY = [9000, 26000] // fourchette entre deux incréments (ms)
const TICK_STEP = [1, 3] // amplitude d'un incrément
const MAX_DRIFT = 150 // garde-fou : pas d'inflation sur un onglet laissé ouvert

const base = Number(props.value)
const pad = props.value.length

const el = ref(null)
const drift = ref(0)
const displayed = ref(0)
const ticking = ref(false)

const label = computed(() => String(displayed.value).padStart(pad, '0'))

const random = (min, max) => min + Math.floor(Math.random() * (max - min + 1))

// Le localStorage peut être indisponible (mode privé, cookies bloqués) :
// toute lecture/écriture échoue en silence, le compteur repart alors de 0.
const readStore = () => {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

const readDrift = () => {
  if (!props.storageKey) return 0
  const saved = Number(readStore()[props.storageKey])
  return Number.isFinite(saved) ? Math.min(Math.max(saved, 0), MAX_DRIFT) : 0
}

const writeDrift = () => {
  if (!props.storageKey) return
  try {
    const store = readStore()
    store[props.storageKey] = drift.value
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch {
    /* stockage indisponible : l'écart vit le temps de la visite */
  }
}

let frame = 0
let timer = 0
let pulse = 0
let stopObserving = null

const animateTo = (to, duration) => {
  const from = displayed.value

  if (prefersReducedMotion() || from === to) {
    displayed.value = to
    return
  }

  const start = performance.now()
  window.cancelAnimationFrame(frame)

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3) // ease-out : freine sur la fin
    displayed.value = Math.round(from + (to - from) * eased)
    if (progress < 1) frame = window.requestAnimationFrame(step)
  }

  frame = window.requestAnimationFrame(step)
}

const scheduleTick = () => {
  if (drift.value >= MAX_DRIFT) return

  timer = window.setTimeout(() => {
    // Onglet en arrière-plan : on laisse passer le tour plutôt que d'empiler
    // des incréments que personne ne voit.
    if (document.visibilityState === 'visible') {
      drift.value = Math.min(drift.value + random(...TICK_STEP), MAX_DRIFT)
      writeDrift()
      animateTo(base + drift.value, TICK_DURATION)

      ticking.value = true
      window.clearTimeout(pulse)
      pulse = window.setTimeout(() => (ticking.value = false), 900)
    }

    scheduleTick()
  }, random(...TICK_DELAY))
}

onMounted(() => {
  if (props.live) drift.value = readDrift()

  stopObserving = observeOnce(
    el.value,
    () => {
      animateTo(base + drift.value, COUNT_UP_DURATION)
      if (props.live) timer = window.setTimeout(scheduleTick, COUNT_UP_DURATION)
    },
    { threshold: 0.4 },
  )
})

onBeforeUnmount(() => {
  window.cancelAnimationFrame(frame)
  window.clearTimeout(timer)
  window.clearTimeout(pulse)
  stopObserving?.()
})
</script>

<template>
  <span
    ref="el"
    class="inline-block tabular-nums"
    :class="{ 'stat-tick': ticking }"
    aria-hidden="true"
  >
    {{ label }}
  </span>
  <!-- Le lecteur d'écran reçoit la valeur, pas le décompte. -->
  <span class="sr-only">{{ label }}</span>
</template>
