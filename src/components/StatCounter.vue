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
 * Le garde-fou est un *rythme*, pas un total : l'écart ne peut pas dépasser ce
 * que `DRIFT_PER_DAY` autorise depuis la première visite, plus la réserve
 * `SESSION_DRIFT` d'une visite. Un plafond fixe, lui, finissait par être
 * atteint pour de bon — le chiffre se figeait alors définitivement sur ce
 * navigateur, et l'incrémentation ne repartait plus jamais.
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
const SESSION_DRIFT = 15 // réserve d'une visite : borne l'onglet laissé ouvert
const DRIFT_PER_DAY = 25 // croissance plausible d'un jour sur l'autre
const DAY = 86_400_000

const base = Number(props.value)
const pad = props.value.length

const el = ref(null)
const drift = ref(0)
// Date de la première visite : l'origine à partir de laquelle le plafond monte.
let since = Date.now()
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

// Plafond du moment : la réserve d'une visite, plus ce que le temps écoulé
// depuis la première a rendu crédible. Il monte tout seul, donc le compteur ne
// peut jamais se bloquer pour de bon.
const maxDrift = () => Math.floor(SESSION_DRIFT + (DRIFT_PER_DAY * (Date.now() - since)) / DAY)

// Entrée stockée : `{ value, since }`. Un nombre nu est l'ancien format, qui ne
// gardait que l'écart ; on lui reconstitue alors une première visite cohérente
// avec l'écart déjà accumulé, pour que le chiffre ne recule pas au premier
// chargement après cette mise à jour.
const readDrift = () => {
  if (!props.storageKey) return 0

  const entry = readStore()[props.storageKey]
  const stored = typeof entry === 'object' && entry !== null ? entry : { value: entry }
  const saved = Number(stored.value)
  if (!Number.isFinite(saved) || saved <= 0) return 0

  const savedSince = Number(stored.since)
  since = Number.isFinite(savedSince)
    ? Math.min(savedSince, Date.now())
    : Date.now() - (saved / DRIFT_PER_DAY) * DAY

  return Math.min(saved, maxDrift())
}

const writeDrift = () => {
  if (!props.storageKey) return
  try {
    const store = readStore()
    store[props.storageKey] = { value: drift.value, since }
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

// La boucle tourne tant que le composant vit, même une fois la réserve épuisée :
// le plafond remonte avec les heures, et le tour suivant en profite.
const scheduleTick = () => {
  timer = window.setTimeout(() => {
    // Onglet en arrière-plan : on laisse passer le tour plutôt que d'empiler
    // des incréments que personne ne voit.
    if (document.visibilityState === 'visible') {
      const next = Math.min(drift.value + random(...TICK_STEP), maxDrift())

      if (next > drift.value) {
        drift.value = next
        writeDrift()
        animateTo(base + drift.value, TICK_DURATION)

        ticking.value = true
        window.clearTimeout(pulse)
        pulse = window.setTimeout(() => (ticking.value = false), 900)
      }
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
