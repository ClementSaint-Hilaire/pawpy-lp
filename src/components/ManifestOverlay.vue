<script setup>
import SheetOverlay from '@/components/SheetOverlay.vue'
import { useRouteSheet } from '@/composables/useRouteSheet'

// Le blanc entre deux paragraphes reprend la ligne vide de la maquette.
const paragraphs = [
  'On ne confie pas un enfant au premier inconnu ? Alors pourquoi le ferait-on pour son chien',
  'Chez Pawpy, trouver quelqu’un de disponible ne nous suffit pas. Nous construisons, à chaque étape, une confiance qui se mérite, parce que votre chien ne mérite rien de moins qu’une certitude absolue.',
  'Nos promeneurs ne sont pas recrutés. Ils sont sélectionnés. Ente formation approfondie, évaluation terrain. Une Exigence avant même le premier regard échangé avec votre chien.',
  'Vous voyez tout. En direct. Chaque pas, chaque instant, où que vous soyez. La distance entre lui et vous n’existe plus.',
  'Une protection intégrale, sur chaque sortie. Si quelque chose arrive, vous n’êtes pas seule à y faire face, c’est déjà prévu et déjà géré.',
  'Pawpy n’est pas une solution de dépannage. C’est un niveau d’exigence que vous ne trouverez nulle part ailleurs. Partez tranquille votre chien reçoit la même attention que si vous étiez là.',
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
