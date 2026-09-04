<script setup>
import { watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import SheetOverlay from '@/components/SheetOverlay.vue'

/**
 * Menu de navigation sous xl — feuille qui descend du haut de l'écran.
 *
 * Toute la mécanique (voile, animation, verrou de défilement, Échap, piège à
 * focus, bouton de fermeture) vient de SheetOverlay.vue, comme pour le
 * manifeste et l'équipe : rien n'est réimplémenté ici.
 *
 * Contrairement à ces deux feuilles, celle-ci n'est pas pilotée par l'URL —
 * c'est le header qui détient son état, d'où la paire `open` / `close`.
 */

const props = defineProps({
  open: { type: Boolean, default: false },
  /** Les mêmes entrées que la navigation desktop, fournies par le header. */
  links: { type: Array, required: true },
})

const emit = defineEmits(['close'])

const route = useRoute()

/*
 * « Équipe » et « Manifest » ouvrent leur propre feuille (TeamOverlay,
 * ManifestOverlay). Le verrou de défilement de SheetOverlay écrit directement
 * dans `document.body.style` sans compteur : deux feuilles ouvertes en même
 * temps et la première fermée rendraient le défilement au fond alors que la
 * seconde est encore là. On ferme donc ce menu *avant* de laisser partir la
 * navigation — le clic est synchrone, le routeur asynchrone, l'ordre est donc
 * garanti.
 *
 * Le `watch` ci-dessous n'est qu'un filet : retour arrière du navigateur, lien
 * suivi au clavier, ou toute navigation qui ne passerait pas par le @click.
 */
watch(() => route.fullPath, () => {
  if (props.open) emit('close')
})
</script>

<template>
  <SheetOverlay
    :open="open"
    labelledby="mobile-nav-title"
    close-label="Fermer le menu"
    @close="emit('close')"
  >
    <nav
      id="mobile-nav"
      class="flex w-full flex-col items-center gap-[32px] px-6 text-center"
      aria-label="Navigation principale"
    >
      <p
        id="mobile-nav-title"
        class="font-sans text-[14px] leading-[1.2] tracking-[-0.01em] text-ink-60"
      >
        Navigation
      </p>

      <ul class="flex w-full flex-col items-center gap-[20px]">
        <li v-for="link in links" :key="link.label" class="w-full">
          <!-- Même sélection de balise que le header : `to` désigne une vraie
               page, `href` une ancre de l'accueil. Les deux liaisons s'excluent
               (`v-bind` conditionnel) — un `:href` posé de l'extérieur, même
               valant `undefined`, écraserait celui que RouterLink calcule et le
               lien perdrait son URL (clic milieu, « ouvrir dans un onglet »…). -->
          <component
            :is="link.to ? RouterLink : 'a'"
            v-bind="link.to ? { to: link.to } : { href: link.href }"
            class="block font-display text-title uppercase text-ink transition-opacity hover:opacity-60"
            @click="emit('close')"
          >
            {{ link.label }}
          </component>
        </li>
      </ul>

      <a
        href="#newsletter"
        class="flex w-full items-center justify-center bg-ink px-[24px] py-[14px] font-body text-label text-surface transition-colors hover:bg-ink-soft"
        @click="emit('close')"
      >
        S’inscrire
      </a>
    </nav>
  </SheetOverlay>
</template>
