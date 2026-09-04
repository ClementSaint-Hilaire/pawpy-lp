<script setup>
import SheetOverlay from '@/components/SheetOverlay.vue'
import { useRouteSheet } from '@/composables/useRouteSheet'

// Le blanc entre deux paragraphes reprend la ligne vide de la maquette.
const paragraphs = [
  'La confiance ne devrait jamais être un luxe.',
  'Aimer son chien, c’est vouloir le meilleur pour lui, même lorsque le quotidien ne nous laisse pas toujours le temps d’être présent.',
  'Pawpy transforme la promenade en une expérience de confiance. Des promeneurs certifiés, une assurance intégrée, un suivi en temps réel et une attention pensée pour chaque chien. Rien n’est laissé au hasard.',
  'Nous ne proposons pas simplement une promenade. Nous créons un nouveau standard de sérénité, où chaque propriétaire peut déléguer sans culpabiliser et chaque chien bénéficie de l’attention qu’il mérite.',
  'Pawpy, c’est l’art de la promenade canine.',
]

const { open, close } = useRouteSheet('/manifest')
</script>

<template>
  <SheetOverlay
    :open="open"
    labelledby="manifest-title"
    close-label="Fermer le manifest"
    @close="close"
  >
    <div class="flex w-full flex-col items-center gap-[32px] px-6 text-center [word-break:break-word] md:px-[34px]">
      <p
        id="manifest-title"
        class="font-sans text-[14px] leading-[1.2] tracking-[-0.01em] text-ink-60"
      >
        Notre manifest
      </p>

      <!-- 29px / 1,2 : l'écart entre paragraphes vaut une ligne vide (et suit
           donc la taille du texte quand celle-ci se réduit). -->
      <div
        class="flex w-full max-w-[682px] flex-col gap-[24px] font-display text-[22px] font-normal leading-[1.2] tracking-[-0.02em] text-ink md:gap-[35px] md:text-[29px]"
        style="font-feature-settings: 'case' 1"
      >
        <p v-for="paragraph in paragraphs" :key="paragraph">{{ paragraph }}</p>
      </div>
    </div>
  </SheetOverlay>
</template>
