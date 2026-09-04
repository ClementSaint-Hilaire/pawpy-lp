<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import MobileNav from './MobileNav.vue'
import logo from '@/assets/figma/logo-pawpy.svg'

// `to` désigne une vraie page (l'équipe, le manifeste), `href` une ancre dans
// l'accueil : le gabarit ci-dessous choisit la balise en conséquence, et lie
// l'un ou l'autre par un `v-bind` conditionnel — `:href="undefined"` posé à
// côté de `:to` remonterait jusqu'à la racine du RouterLink et effacerait l'URL
// qu'il calcule, laissant un <a> sans href (ni clic milieu, ni nouvel onglet).
//
// Les deux liaisons s'excluent (`v-bind` conditionnel) : un `:href` posé de
// l'extérieur, même valant `undefined`, écraserait celui que RouterLink calcule
// — le lien perdrait son URL (clic milieu, « ouvrir dans un onglet »…).
//
// La même liste alimente la barre desktop et la feuille mobile (MobileNav.vue).
const links = [
  { label: 'Features', href: '#features' },
  { label: 'Équipe', to: '/auto-mode-setup' },
  { label: 'Manifest', to: '/manifest' },
  { label: 'FAQ', href: '#faq' },
]

// Sous xl, les liens vivent dans une feuille dont le header détient l'état.
const menuOpen = ref(false)
</script>

<template>
  <header class="sticky top-0 z-50 w-full bg-surface">
    <div
      class="flex h-[64px] items-center gap-[10px] px-6 md:h-[80px] md:px-10 xl:h-[102px] xl:px-[98px]"
    >
      <a v-reveal.fade href="#" class="h-[24px] w-[110px] shrink-0">
        <img :src="logo" alt="Pawpy" class="h-full w-full object-contain object-left" />
      </a>

      <nav class="hidden flex-1 items-center justify-end gap-[32px] xl:flex">
        <component
          :is="link.to ? RouterLink : 'a'"
          v-for="(link, index) in links"
          v-reveal="{ delay: 80 + index * 60, from: 'fade' }"
          :key="link.label"
          v-bind="link.to ? { to: link.to } : { href: link.href }"
          class="whitespace-nowrap font-sans text-base leading-[1.2] tracking-[-0.01em] text-ink-soft transition-opacity hover:opacity-60"
        >
          {{ link.label }}
        </component>

        <a
          v-reveal="{ delay: 320, from: 'fade' }"
          href="#newsletter"
          class="flex items-center justify-center bg-ink px-[14px] py-[10px] font-body text-label text-surface transition-colors hover:bg-ink-soft"
        >
          S’inscrire
        </a>
      </nav>

      <!-- Bouton d'ouverture du menu, dessiné en CSS (pas d'icône à charger).
           Les trois traits gardent la couleur du texte, comme les liens. -->
      <button
        v-reveal.fade
        type="button"
        class="ml-auto flex h-[24px] w-[24px] shrink-0 flex-col items-end justify-center gap-[5px] xl:hidden"
        :aria-expanded="menuOpen"
        aria-controls="mobile-nav"
        aria-label="Ouvrir le menu"
        @click="menuOpen = true"
      >
        <span class="block h-px w-full bg-ink-soft" />
        <span class="block h-px w-[16px] bg-ink-soft" />
        <span class="block h-px w-full bg-ink-soft" />
      </button>
    </div>

    <MobileNav :open="menuOpen" :links="links" @close="menuOpen = false" />
  </header>
</template>
