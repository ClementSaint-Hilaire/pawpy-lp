<script setup>
import SheetOverlay from '@/components/SheetOverlay.vue'
import { useRouteSheet } from '@/composables/useRouteSheet'
import { team } from '@/data/team'

const { open, close } = useRouteSheet('/auto-mode-setup')
</script>

<template>
  <SheetOverlay
    :open="open"
    labelledby="team-title"
    close-label="Fermer la présentation de l’équipe"
    @close="close"
  >
    <div class="flex w-full flex-col items-center gap-[32px] px-6 text-center [word-break:break-word] md:px-[34px]">
      <p
        id="team-title"
        class="font-sans text-[14px] leading-[1.2] tracking-[-0.01em] text-ink-60"
      >
        L’équipe derrière Pawpy
      </p>

      <!-- 648px = 3 portraits de 200px et 2 gouttières de 24px : la quatrième
           carte passe à la ligne d'elle-même, et `justify-center` recentre la
           seconde ligne comme dans la maquette. -->
      <ul class="flex w-full max-w-[648px] flex-wrap items-start justify-center gap-[16px] sm:gap-[24px]">
        <li
          v-for="member in team"
          :key="member.name"
          class="portrait-card flex w-[140px] shrink-0 flex-col items-center gap-[8px] sm:w-[200px]"
        >
          <!-- `portrait-tilt` (main.css) incline la photo au survol de la
               carte : seule l'image tourne, le nom reste d'aplomb. -->
          <a
            :href="member.link"
            :aria-label="`${member.name} — ouvrir le profil dans un nouvel onglet`"
            target="_blank"
            rel="noopener noreferrer"
            class="block w-full"
          >
            <img
              :src="member.photo"
              :alt="member.name"
              class="portrait-tilt h-[168px] w-full object-cover sm:h-[240px]"
              loading="lazy"
              decoding="async"
            />
          </a>

          <div
            class="flex w-full flex-col font-sans text-[14px] leading-[1.2] tracking-[-0.01em]"
            style="font-feature-settings: 'case' 1"
          >
            <p class="text-ink">{{ member.name }}</p>
            <p class="text-ink-60">{{ member.role }}</p>
          </div>
        </li>
      </ul>
    </div>
  </SheetOverlay>
</template>
