<script setup>
import BaseButton from './BaseButton.vue'
import avatar1 from '@/assets/figma/avatar-1.png'
import avatar2 from '@/assets/figma/avatar-2.png'
import avatar3 from '@/assets/figma/avatar-3.png'
import heroPhone from '@/assets/figma/hero-phone.png'
import heroDog from '@/assets/figma/hero-dog.png'
import badgeP1 from '@/assets/figma/icons/badge-p1.png'
import badgeP2 from '@/assets/figma/icons/badge-p2.png'
import badgeP3 from '@/assets/figma/icons/badge-p3.png'
import badgeAcaced from '@/assets/figma/icons/badge-acaced.png'

const avatars = [avatar1, avatar2, avatar3]

// Quatre éléments distincts plutôt que la vignette figée du Figma : c'est le
// seul moyen de les faire apparaître l'une après l'autre.
const badges = [
  { label: 'Pawpy\u00a0 P1', icon: badgeP1 },
  { label: 'Pawpy\u00a0 P2', icon: badgeP2 },
  { label: 'Pawpy\u00a0 P3', icon: badgeP3 },
  { label: 'Acaced', icon: badgeAcaced },
]
</script>

<template>
  <!-- pt : le contenu du hero commence à y=128 dans la maquette, sous l'en-tête de 102px. -->
  <section id="probleme" class="shell pt-[26px]">
    <div class="flex flex-col items-center text-center">
      <div v-reveal class="flex items-center gap-[8px]">
        <div class="flex">
          <img
            v-for="(avatar, index) in avatars"
            :key="index"
            :src="avatar"
            alt=""
            class="avatar-bob h-[32px] w-[32px] shrink-0 rounded-full object-cover"
            :class="[index > 0 ? '-ml-[12px]' : '', `avatar-bob-${index + 1}`]"
          />
        </div>
        <span class="font-sans text-label text-ink-60">Communautée certifiée</span>
      </div>

      <!-- Pas de largeur maximale au-delà de xl : la police de repli, plus large
           que Coconat, ajouterait une troisième ligne. En dessous, le <br> est
           neutralisé et le titre se coupe là où la largeur l'impose. -->
      <h1 v-reveal="100" class="mt-[24px] text-display font-normal uppercase xl:mt-[32px]">
        Votre chic à du chien.<br class="hidden xl:inline" />
        Et si votre chien avait du chic&nbsp;?
      </h1>

      <p v-reveal="200" class="mt-[12px] max-w-[682px] text-base text-ink-60">
        Pawpy réunit promeneur certifiés et propriétaires de chiens en région parisienne.
        Confiance, transparence, sécurité, tout est pensé pour le bien être de votre chiens.
      </p>

      <!-- Deux boutons `lg` ne tiennent pas côte à côte sur un téléphone : ils
           s'empilent en pleine largeur, puis reprennent la grille à partir de sm. -->
      <div
        v-reveal="300"
        class="mt-[40px] grid w-full grid-cols-1 items-center gap-[12px] sm:w-auto sm:grid-cols-2 sm:gap-[24px] xl:mt-[76px]"
      >
        <BaseButton size="lg" href="mailto:contact@pawpy.fr?subject=demande%20de%20beta%20test">Rejoindre la beta</BaseButton>
        <BaseButton
          size="lg"
          variant="outline"
          href="https://clementsainthilaire.notion.site/2c3299f1bb4d804db2acdeaaddd997c1?pvs=105"
        >
          Répondre au formulaire
        </BaseButton>
      </div>
    </div>

    <!--
      Scène de 1300×800 (coordonnées de la maquette, valables à partir de xl).
      L'ordre du DOM porte la mise en scène : chien et badges sont écrits avant
      le mockup, donc empilés dessous. Ils démarrent cachés derrière lui
      (`--reveal-shift`, classes `hero-shift-*` de main.css) et en ressortent.

      Sous xl la scène repasse en flux vertical : le mockup remonte en tête
      (`order`), les pastilles se rangent dessous et le chien est masqué. Les
      mêmes nœuds servent aux deux mises en page — dupliquer le bloc laisserait
      la copie cachée en `display: none`, où l'IntersectionObserver de
      `v-reveal` ne se déclenche jamais : elle resterait à `opacity: 0`.
    -->
    <div
      class="mt-[40px] flex flex-col items-center gap-[24px] xl:relative xl:mx-auto xl:mt-[64px] xl:block xl:h-[800px] xl:w-[1300px] xl:max-w-full"
    >
      <img
        v-reveal="{ delay: 560, from: 'left' }"
        :src="heroDog"
        alt=""
        class="hero-shift-dog pointer-events-none hidden xl:absolute xl:left-[813px] xl:top-[116px] xl:block xl:w-[290px] xl:max-w-none"
      />

      <!-- Position de la maquette corrigée du débord que la rotation ajoute
           autour de chaque pastille. -->
      <ul
        class="order-2 flex flex-wrap items-center justify-center gap-[8px] xl:absolute xl:left-[237px] xl:top-[482px] xl:order-none xl:block xl:space-y-[12px]"
      >
        <li
          v-for="(badge, index) in badges"
          :key="badge.label"
          v-reveal="{ delay: 700 + index * 110, from: 'right' }"
          class="hero-shift-badge"
        >
          <!-- La rotation vit sur un enfant : la directive remet `transform` à
               `none` en fin d'apparition et l'effacerait sinon. -->
          <div
            class="inline-flex rotate-[-8deg] items-center gap-[8px] rounded-full bg-surface-muted p-[8px] sm:p-[12px]"
          >
            <img :src="badge.icon" alt="" class="h-[20px] w-[20px] shrink-0" />
            <span class="whitespace-nowrap font-display text-lead uppercase tracking-[-0.36px]">
              {{ badge.label }}
            </span>
          </div>
        </li>
      </ul>

      <img
        v-reveal="{ delay: 400, from: 'scale' }"
        :src="heroPhone"
        alt="L’application Pawpy : promenade en cours, profil du promeneur et formations"
        class="phone-shadow order-1 w-[240px] sm:w-[300px] xl:absolute xl:left-[453px] xl:top-0 xl:order-none xl:w-[389px] xl:max-w-none"
      />
    </div>
  </section>
</template>
