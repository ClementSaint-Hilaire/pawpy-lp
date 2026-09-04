<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import ctaPaw from '@/assets/figma/cta-paw.png'

const BEEHIIV_FORM_ID = '60d4e27f-2807-4a30-a595-d78cb414a312'
const BEEHIIV_LOADER_SRC = 'https://subscribe-forms.beehiiv.com/v3/loader.js'

const embedHost = ref(null)

/**
 * Le loader beehiiv v3 scanne les `script[data-beehiiv-form]` à son exécution
 * et insère l'iframe du formulaire juste après la balise trouvée. On plante
 * donc d'abord le marqueur dans le conteneur, puis le loader : dans une SPA le
 * document est déjà « complete », l'init part immédiatement et l'iframe atterrit
 * au bon endroit du bloc.
 */
onMounted(() => {
  const host = embedHost.value
  if (!host) return

  const marker = document.createElement('script')
  marker.dataset.beehiivForm = BEEHIIV_FORM_ID
  host.appendChild(marker)

  const loader = document.createElement('script')
  loader.src = BEEHIIV_LOADER_SRC
  loader.async = true
  host.appendChild(loader)
})

// Le conteneur (marqueur, loader et iframe) est retiré avec le composant :
// un remount réinjecte une paire propre.
onBeforeUnmount(() => {
  if (embedHost.value) embedHost.value.replaceChildren()
})
</script>

<template>
  <!-- 158px : le bloc gris porte lui-même 94px de marge haute (voir py ci-dessous). -->
  <section id="newsletter" class="shell pt-[80px] md:pt-[120px] xl:pt-[158px]">
    <div
      v-reveal.fade
      class="relative flex items-center overflow-hidden bg-surface-muted px-6 py-[40px] md:px-[48px] md:py-[64px] xl:min-h-[418px] xl:px-[128px] xl:py-[94px]"
    >
      <div v-reveal="120" class="relative z-10 max-w-[490px]">
        <h2 class="text-title">Offrez la première classe à votre chien.</h2>

        <p class="mt-[16px] font-sans text-label text-ink-60">
          Pawpy se déploie progressivement pour garantir à chaque membre une
          expérience attentive et de qualité. Si vous souhaitez faire partie des
          premiers à nous rejoindre, vous pouvez vous inscrire à la newsletter.
        </p>

        <!-- Formulaire hébergé par beehiiv (iframe inline, fond transparent,
             layout « slim » : champ + bouton sur une ligne, 400px de large).
             min-h : réserve la hauteur du champ pour éviter le saut de mise en
             page au moment où l'iframe se déplie. -->
        <div
          ref="embedHost"
          class="mt-[32px] min-h-[45px] w-full max-w-[400px]"
        />
      </div>

      <!-- Illustration au trait. L'export reprend déjà le recadrage du Figma
           (374×418, l'image d'origine débordant du bloc) : à poser tel quel.
           Sa position est celle du bloc de 1300px ; sous xl elle tomberait
           entièrement hors cadre (le parent la rognerait sans rien laisser
           voir), donc on la retire explicitement. -->
      <img
        v-reveal="{ delay: 280, from: 'right' }"
        :src="ctaPaw"
        alt=""
        class="pointer-events-none hidden xl:absolute xl:left-[823px] xl:top-0 xl:block xl:w-[374px] xl:max-w-none"
      />
    </div>
  </section>
</template>
