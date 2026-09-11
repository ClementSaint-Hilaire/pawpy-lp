<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import BaseButton from './BaseButton.vue'
import { trackScrollProgress } from '@/utils/motion'

// Deux colonnes de 618px, gouttière de 64px. `reversed` place l'image à gauche.
const props = defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  // Montage du visuel : { fond, content, left, top, width } — cf. features.js.
  visual: { type: Object, required: true },
  imageAlt: { type: String, default: '' },
  items: { type: Array, required: true },
  reversed: { type: Boolean, default: false },
})

// Le contenu rejoint sa place au fil du défilement : on pose ici `--p`, de 0 à
// l'entrée du visuel dans l'écran à 1 une fois la section centrée, et main.css
// en tire le glissement.
const visualEl = ref(null)
let stopTracking = () => {}

onMounted(() => {
  stopTracking = trackScrollProgress(visualEl.value, (progress) => {
    visualEl.value?.style.setProperty('--p', progress)
  })
})

onBeforeUnmount(() => stopTracking())
</script>

<template>
  <!-- 320px = 64 (marge basse du bloc précédent) + 128 (écart) + 128 (retrait haut du texte), à partir de xl. -->
  <section class="shell pt-[100px] md:pt-[180px] xl:pt-[320px]">
    <div class="flex flex-col gap-[32px] lg:flex-row lg:items-center lg:gap-[64px]">
      <!-- L'alternance de `reversed` n'a de sens qu'en deux colonnes : sous lg
           l'ordre du DOM reprend la main (texte puis image). -->
      <div v-reveal class="flex-1" :class="reversed ? 'lg:order-2' : 'lg:order-1'">
        <p class="eyebrow">{{ eyebrow }}</p>

        <h2 class="mt-[16px] whitespace-pre-line text-title">{{ title }}</h2>

        <ul class="mt-[16px] flex flex-col gap-[16px]">
          <li
            v-for="item in items"
            :key="item.label"
            class="flex items-center gap-[8px]"
          >
            <span class="flex h-[24px] w-[24px] shrink-0 items-center justify-center overflow-clip">
              <img :src="item.icon" alt="" class="h-full w-full object-contain" />
            </span>
            <span class="font-sans text-base text-ink-60">{{ item.label }}</span>
          </li>
        </ul>

        <div
          class="mt-[32px] flex flex-col items-stretch gap-[12px] sm:flex-row sm:items-center sm:gap-[24px] xl:mt-[64px]"
        >
          <BaseButton href="mailto:contact@pawpy.fr?subject=demande%20de%20beta%20test">Rejoindre la beta</BaseButton>
          <BaseButton variant="outline" href="#newsletter">Suivre le projet</BaseButton>
        </div>
      </div>

      <div
        v-reveal="{ delay: 150, from: 'scale' }"
        class="flex-1"
        :class="reversed ? 'lg:order-1' : 'lg:order-2'"
      >
        <!-- Le carré du fond fait office de cadre : le téléphone le déborde en
             haut ou en bas selon la section, `overflow-hidden` le rogne. -->
        <div ref="visualEl" class="relative aspect-square w-full overflow-hidden">
          <img
            :src="visual.fond"
            alt=""
            class="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />

          <div class="feature-visual-shift absolute inset-0">
            <!-- `max-w-none` : le contenu de la section Balade est plus large
                 que le carré, le plafond de 100% du reset le rétrécirait. -->
            <img
              :src="visual.content"
              :alt="imageAlt"
              class="absolute max-w-none"
              :style="{ left: visual.left, top: visual.top, width: visual.width }"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
