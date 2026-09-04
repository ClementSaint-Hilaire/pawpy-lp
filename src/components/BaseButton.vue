<script setup>
import { externalAttrs } from '@/utils/links'

/**
 * Bouton du Figma : rectangle à angles droits, Sora 14px. Deux tailles, celles
 * de la maquette — 54px de haut dans le hero, 50px ailleurs.
 */
defineProps({
  variant: {
    type: String,
    default: 'solid',
    validator: (v) => ['solid', 'outline'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['md', 'lg'].includes(v),
  },
  href: {
    type: String,
    default: null,
  },
})
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    v-bind="externalAttrs(href)"
    class="inline-flex items-center justify-center whitespace-nowrap font-body text-label transition-colors"
    :class="[
      size === 'lg' ? 'px-[43px] py-[16px]' : 'px-[14px] py-[14px]',
      variant === 'solid'
        ? 'bg-ink text-surface hover:bg-ink-soft'
        : 'border border-stroke bg-surface text-ink hover:bg-surface-muted',
    ]"
  >
    <slot />
  </component>
</template>
