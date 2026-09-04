<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import closeIcon from '@/assets/figma/icons/close.svg'

/**
 * Feuille tirée du haut de l'écran — mécanique commune au manifeste, à l'équipe
 * et au menu mobile. Le parent fournit le contenu et reçoit `close` ; tout le
 * reste (voile, verrou de défilement, Échap, piège à focus, bouton de
 * fermeture) vit ici.
 *
 * Le composant se téléporte dans <body> : le header est collant avec son propre
 * contexte d'empilement, une modale rendue à l'intérieur passerait dessous.
 */

const props = defineProps({
  open: { type: Boolean, default: false },
  /** id de l'intitulé de la feuille, pour `aria-labelledby`. */
  labelledby: { type: String, required: true },
  /** Intitulé du bouton de fermeture, lu par les lecteurs d'écran. */
  closeLabel: { type: String, required: true },
})

const emit = defineEmits(['close'])

const sheet = ref(null)
const closeButton = ref(null)

// Élément qui avait le focus avant l'ouverture : on le lui rend à la fermeture.
let previouslyFocused = null

const close = () => emit('close')

// Masquer le débordement fait disparaître la barre de défilement : on compense
// sa largeur, sinon la page (et le header collant) sautent latéralement.
const lockScroll = () => {
  const scrollbar = window.innerWidth - document.documentElement.clientWidth
  document.body.style.overflow = 'hidden'
  if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`
}

const unlockScroll = () => {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

const onKeydown = (event) => {
  if (event.key === 'Escape') {
    close()
    return
  }

  if (event.key !== 'Tab' || !sheet.value) return

  // Piège à focus : la tabulation tourne en boucle dans la feuille.
  const focusable = sheet.value.querySelectorAll(
    'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
  )
  if (!focusable.length) return

  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(() => props.open, async (isOpen) => {
  if (isOpen) {
    previouslyFocused = document.activeElement
    lockScroll()
    window.addEventListener('keydown', onKeydown)
    await nextTick()
    // `preventScroll` : sans lui, donner le focus au bouton — placé en bas de la
    // feuille — la ferait défiler jusqu'à lui dès l'ouverture, cachant le titre
    // sur les écrans où le contenu dépasse la hauteur disponible.
    closeButton.value?.focus({ preventScroll: true })
    return
  }

  unlockScroll()
  window.removeEventListener('keydown', onKeydown)
  previouslyFocused?.focus?.({ preventScroll: true })
  previouslyFocused = null
}, { immediate: true })

onBeforeUnmount(() => {
  unlockScroll()
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <!-- Voile : assombrit la page et ferme au clic. -->
    <Transition name="sheet-veil">
      <div
        v-if="open"
        class="fixed inset-0 z-[90] bg-black/40"
        @click="close"
      />
    </Transition>

    <Transition name="sheet">
      <div
        v-if="open"
        class="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center"
      >
        <div
          ref="sheet"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="labelledby"
          class="pointer-events-auto flex max-h-[100dvh] w-full max-w-[750px] flex-col items-center gap-[32px] overflow-y-auto rounded-b-[9px] bg-surface pb-[32px] pt-[64px] shadow-float"
        >
          <slot />

          <button
            ref="closeButton"
            type="button"
            class="size-[32px] shrink-0 transition-opacity hover:opacity-60"
            :aria-label="closeLabel"
            @click="close"
          >
            <img :src="closeIcon" alt="" class="block size-full" />
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
