<script setup>
import BaseButton from './BaseButton.vue'

/**
 * Section « texte + image » du Figma (deux colonnes de 618px, gouttière de 64px).
 * Les quatre occurrences de la page partagent ce composant ; `reversed` place
 * l'image à gauche.
 */
defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  imageAlt: { type: String, default: '' },
  items: { type: Array, required: true },
  reversed: { type: Boolean, default: false },
})
</script>

<template>
  <!-- 320px = 64 (marge basse du bloc précédent) + 128 (écart) + 128 (retrait haut du texte), à partir de xl. -->
  <section class="shell pt-[100px] md:pt-[180px] xl:pt-[320px]">
    <div class="flex flex-col gap-[32px] lg:flex-row lg:items-center lg:gap-[64px]">
      <!-- Colonne texte. L'alternance gauche/droite de `reversed` n'a de sens
           qu'en deux colonnes : en dessous de lg l'ordre du DOM reprend la main,
           et les quatre blocs présentent le texte puis l'image. -->
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

      <!-- Colonne image (618×618 dans la maquette) -->
      <div
        v-reveal="{ delay: 150, from: 'scale' }"
        class="flex-1"
        :class="reversed ? 'lg:order-1' : 'lg:order-2'"
      >
        <img
          :src="image"
          :alt="imageAlt"
          class="aspect-square w-full object-cover"
        />
      </div>
    </div>
  </section>
</template>
