<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import MobileNav from './MobileNav.vue'
import logo from '@/assets/figma/logo-pawpy.svg'

// `to` désigne une vraie page (l'équipe, le manifeste), `href` une ancre dans
// l'accueil. La même liste alimente la barre desktop et MobileNav.vue.
const links = [
  { label: 'Fonctionnalités', href: '#features' },
  { label: 'Équipe', to: '/auto-mode-setup' },
  { label: 'Manifeste', to: '/manifest' },
  { label: 'FAQ', href: '#faq' },
]

// Sous xl, les liens vivent dans une feuille dont le header détient l'état.
const menuOpen = ref(false)

// Sur l'accueil, RouterLink n'a nulle part où aller : on remonte la page, comme
// le faisait l'ancre `#` d'avant.
const route = useRoute()
const onLogoClick = () => {
  if (route.path === '/') window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full bg-surface">
    <div
      class="flex h-[64px] items-center gap-[10px] px-6 md:h-[80px] md:px-10 xl:h-[102px] xl:px-[98px]"
    >
      <!-- Le logo est le retour à l'accueil : un vrai lien de navigation, pas
           une ancre morte — il doit rester cliquable et suivable par un robot. -->
      <RouterLink
        v-reveal.fade
        to="/"
        class="h-[24px] w-[110px] shrink-0"
        aria-label="Pawpy, retour à l’accueil"
        @click="onLogoClick"
      >
        <svg width="110" height="24" viewBox="0 0 110 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M94.65 23.8971C94.65 23.8971 96.33 24.2057 96.33 19.9543V13.8171L90.2957 4.08C88.1357 0.651428 86.1129 0.102858 86.1129 0.102858V5.79605e-09H93.21V0.102858C93.21 0.102858 91.4272 -0.034285 93.69 4.01143L98.6957 12.2057L103.701 3.97714C105.896 0.102858 104.25 0.102858 104.25 0.102858V5.79605e-09H109.736V0.102858C109.736 0.102858 107.679 0.72 105.553 4.08L99.4843 13.8171V19.92C99.4843 24.2057 101.13 23.8971 101.13 23.8971V24H94.65V23.8971Z" fill="black"/>
        <path d="M71.4898 0.00164297C71.7984 0.00202636 72.1051 0.00192556 72.2871 1.68319e-05L75.5439 0.00930905C78.4561 -0.002166 82.133 -0.145486 84.719 1.25807C86.2448 2.07859 87.383 3.49493 87.8762 5.18659C89.5655 10.898 85.0135 15.1999 79.6647 15.1877C79.3336 15.1865 78.4314 15.0815 78.4314 15.0815C78.4314 15.0815 80.3932 14.47 80.8322 14.3241C84.6041 13.0716 86.0495 8.67273 84.7613 5.00585C83.7376 2.09174 80.6465 0.658233 77.7301 1.79736C75.0341 3.02684 75.4433 5.86818 75.4473 8.39647L75.4586 13.1302C75.4656 15.7346 75.4333 18.3464 75.5028 20.9484C75.5479 22.6404 75.996 23.3277 77.5303 23.9033L70.2938 23.9161C71.7567 23.368 72.2782 22.8498 72.4159 21.1773C72.5255 19.8467 72.4894 18.51 72.4892 17.1758L72.4839 10.5664L72.4718 5.48603C72.4681 4.5631 72.4924 3.4595 72.3807 2.55201C72.3 1.89601 72.0184 1.30834 71.4898 0.797406C71.4898 0.797406 71.4891 0.796651 71.4879 0.795199C70.7974 0.166174 70.2978 0.103761 70.2938 0.103277V1.68319e-05H71.4898V0.00164297Z" fill="black"/>
        <path d="M34.7078 3.94286C33.2335 0.308572 31.5192 0.102858 31.5192 0.102858V5.85793e-09H38.2735V0.102858C38.2735 0.102858 36.4906 0.0685723 37.6221 3.05143L44.3078 20.6743L49.3135 7.33714L47.5649 2.88C46.4678 0.171429 44.8221 0.102858 44.8221 0.102858V5.85793e-09H51.6106V0.102858C51.6106 0.102858 49.7935 0.0342853 50.9592 3.05143L57.6106 20.6743L64.2621 2.98286C65.3935 0.0342853 63.6449 0.102858 63.6449 0.102858V5.85793e-09H68.9935V0.102858C68.9935 0.102858 67.1764 0.308572 65.7706 3.97714L57.9192 24H55.8278L50.2392 9.6L44.6164 24H42.5249L34.7078 3.94286Z" fill="black"/>
        <path d="M14.5107 23.8971C14.5107 23.8971 16.3279 23.6571 17.7679 19.9543L25.585 5.85793e-09H27.6764L35.5279 20.0914C36.9679 23.6914 38.6822 23.8971 38.6822 23.8971V24H31.8936V23.8971C31.8936 23.8971 33.6079 23.9657 32.545 20.9486L31.3793 17.8629H20.4422L19.2422 21.0171C18.2136 24 19.8593 23.8971 19.8593 23.8971V24H14.5107V23.8971ZM30.7622 16.0457L25.8936 3.29143L21.0593 16.0457H30.7622Z" fill="black"/>
        <path d="M1.19603 0.00164297C1.5046 0.00202636 1.81126 0.00192556 1.9933 1.68319e-05L5.25011 0.00930905C8.16231 -0.002166 11.8392 -0.145486 14.4252 1.25807C15.951 2.07859 17.0892 3.49493 17.5824 5.18659C19.2717 10.898 14.7197 15.1999 9.37086 15.1877C9.03981 15.1865 8.13755 15.0815 8.13755 15.0815C8.13755 15.0815 10.0994 14.47 10.5384 14.3241C14.3103 13.0716 15.7557 8.67273 14.4675 5.00585C13.4438 2.09174 10.3527 0.658233 7.43633 1.79736C4.74033 3.02684 5.14947 5.86818 5.15347 8.39647L5.16485 13.1302C5.17176 15.7346 5.13953 18.3464 5.20899 20.9484C5.25414 22.6404 5.7022 23.3277 7.23655 23.9033L0 23.9161C1.46286 23.368 1.98438 22.8498 2.12211 21.1773C2.23172 19.8467 2.19558 18.51 2.1954 17.1758L2.19006 10.5664L2.17798 5.48603C2.17435 4.5631 2.19861 3.4595 2.08692 2.55201C2.0062 1.89601 1.72464 1.30834 1.19603 0.797406C1.19603 0.797406 1.1953 0.796651 1.19405 0.795199C0.503588 0.166174 0.00394961 0.103761 0 0.103277V1.68319e-05H1.19603V0.00164297Z" fill="black"/>
        </svg>
      </RouterLink>

      <nav class="hidden flex-1 items-center justify-end gap-[32px] xl:flex">
        <!-- Les deux liaisons s'excluent (`v-bind` conditionnel) : un `:href`
             posé de l'extérieur, même valant `undefined`, écraserait celui que
             RouterLink calcule et le lien perdrait son URL (clic milieu,
             « ouvrir dans un onglet »…). -->
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

      <!-- Bouton d'ouverture du menu, dessiné en CSS (pas d'icône à charger). -->
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
