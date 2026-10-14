<script setup>
import { RouterView } from 'vue-router'
import TheCursor from './components/TheCursor.vue'
import ManifestOverlay from './components/ManifestOverlay.vue'
import TeamOverlay from './components/TeamOverlay.vue'
import LegalOverlay from './components/LegalOverlay.vue'
import PrivacyOverlay from './components/PrivacyOverlay.vue'
</script>

<template>
  <RouterView />

  <!-- Modales de page (/manifest, /auto-mode-setup, /mentions-legales,
       /politique-de-confidentialite) : posées par-dessus l'accueil, hors du
       RouterView — comme le curseur, qui doit survivre aux changements de page.

       La politique suit les mentions légales, qui y renvoient : passer de l'une
       à l'autre referme la première avant d'ouvrir la seconde, si bien que la
       nouvelle feuille rendra le focus au lien du footer, pas à celui de la
       feuille qui disparaît. -->
  <ManifestOverlay />
  <TeamOverlay />
  <LegalOverlay />
  <PrivacyOverlay />
  <TheCursor />
</template>
