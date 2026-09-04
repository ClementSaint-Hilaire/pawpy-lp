<script setup>
import FooterDog from './FooterDog.vue'
import { externalAttrs } from '@/utils/links'

const links = [
  { label: 'Demander une démo', href: 'mailto:contact@pawpy.fr' },
  { label: 'Newsletter', href: '#newsletter' },
  { label: 'Formulaire', href: 'https://clementsainthilaire.notion.site/2c3299f1bb4d804db2acdeaaddd997c1?pvs=105' },
  { label: 'Devenir bêta testeur', href: 'mailto:contact@pawpy.fr?subject=demande%20de%20beta%20test' },
]

// Le chien s'intercale entre le 2e et le 3e lien : les deux derniers attendent
// donc un cran de plus.
const revealDelay = (index) => index * 80 + (index > 1 ? 80 : 0)
</script>

<template>
  <footer class="w-full pt-[100px] md:pt-[160px] xl:pt-[256px]">
    <div class="shell">
      <!--
        À partir de xl, les quatre liens et l'illustration se répartissent sur
        une seule ligne : un simple justify-between reproduit les positions de
        la maquette. En dessous, la rangée ferait ~900px de large : elle passe
        en colonne, l'illustration remontant en tête (`order-first`) pour que
        les quatre liens se suivent dans l'ordre du DOM.
      -->
      <div
        class="flex flex-col items-center gap-[20px] xl:h-[398px] xl:flex-row xl:justify-between xl:gap-0"
      >
        <template v-for="(link, index) in links" :key="link.label">
          <a
            v-reveal="revealDelay(index)"
            :href="link.href"
            v-bind="externalAttrs(link.href)"
            class="whitespace-nowrap font-sans text-base text-ink-60 transition-colors hover:text-ink"
          >
            {{ link.label }}
          </a>

          <!-- Le chien se dessine trait par trait à l'entrée dans l'écran. -->
          <FooterDog v-if="index === 1" class="order-first xl:order-none" />
        </template>
      </div>

      <p
        v-reveal="400"
        class="mt-[24px] text-center font-display text-[18px] font-semibold xl:mt-[4px] xl:text-[22px]"
      >
        Offrez la première classe à votre chien.
      </p>
    </div>

    <!--
      Bandeau de crédits. La marge basse est plus généreuse qu'il n'y paraît
      nécessaire : `v-reveal` observe avec un `rootMargin` de -12 %, si bien
      qu'un bloc collé au bas du document ne franchirait jamais la ligne de
      déclenchement et resterait à `opacity: 0`.
    -->
    <div
      v-reveal.fade
      class="mx-auto flex max-w-[1400px] flex-col items-center gap-[8px] px-6 pb-[64px] pt-[64px] sm:flex-row sm:justify-between md:px-10 xl:px-[50px] xl:pb-[32px] xl:pt-[128px]"
    >
      <p class="font-sans text-caption text-ink-40">© 2026 Pawpy. Tous droits réservés</p>
      <a href="#" class="font-sans text-caption text-ink-40 transition-colors hover:text-ink">Légal</a>
    </div>
  </footer>
</template>
