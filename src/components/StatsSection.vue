<script setup>
import BaseButton from './BaseButton.vue'
import StatCounter from './StatCounter.vue'

// `live` : chiffres qui continuent de grimper au fil de la visite (inscriptions
// en cours). Les deux autres décrivent le produit et l'équipe : ils sont figés.
const stats = [
  { value: '102', label: 'Bêta testeurs', live: true, key: 'beta-testeurs' },
  { value: '04', label: 'niveaux de certifications' },
  { value: '205', label: 'abonnés à la newsletter', live: true, key: 'newsletter' },
  { value: '05', label: 'fondateurs passionnés' },
]
</script>

<template>
  <!-- 256px = 64 (marge basse de la citation) + 128 (écart entre blocs) + 64 (marge haute), à partir de xl. -->
  <section id="solution" class="shell pt-[96px] md:pt-[160px] xl:pt-[256px]">
    <div class="flex flex-col items-center text-center">
      <!-- Pastille « Live » (Frame 38097) -->
      <span
        v-reveal
        class="inline-flex items-center gap-[4px] rounded-full bg-surface-muted px-[12px] py-[7px] font-sans text-label text-ink-60"
      >
        <span class="live-dot h-[6px] w-[6px] rounded-full bg-ink" aria-hidden="true"></span>
        Live
      </span>

      <!--
        Le surlignage rose reprend brand/accent-500 (deux rectangles dans la
        maquette). Au scroll, chaque rectangle se déplie de la gauche vers la
        droite, l'un après l'autre, une fois le titre en place.
      -->
      <h2 v-reveal="100" class="mt-[24px] max-w-[538px] text-title">
        Pas juste
        <span v-reveal.highlight="380" class="highlight">bien noté.</span>
        Vraiment
        <span v-reveal.highlight="620" class="highlight">certifié.</span>
      </h2>

      <!--
        Chiffres séparés par des filets verticaux (Frame 38102). La rangée de la
        maquette fait ~1100px et ne se replie pas : sous xl les quatre chiffres
        passent en grille 2×2, et les filets — qui occuperaient des cellules —
        sont retirés.
      -->
      <!-- `xl:gap-0` : les écarts de la grille s'appliqueraient aussi à la
           rangée flex, où l'espacement vient des seuls filets (mx-[32px]). -->
      <dl
        class="mt-[40px] grid grid-cols-2 gap-x-[16px] gap-y-[32px] xl:mt-[56px] xl:flex xl:w-full xl:items-start xl:justify-center xl:gap-0"
      >
        <template v-for="(stat, index) in stats" :key="stat.label">
          <div
            v-if="index > 0"
            v-reveal="{ delay: 200 + index * 120, from: 'fade' }"
            class="mx-[32px] mt-[40px] hidden h-[64px] w-px shrink-0 bg-stroke xl:block"
            aria-hidden="true"
          ></div>
          <div v-reveal="200 + index * 120" class="flex flex-col items-center">
            <dd class="font-display text-numeral font-normal">
              <StatCounter :value="stat.value" :live="stat.live" :storage-key="stat.key" />
            </dd>
            <!-- « abonnés à la newsletter » ne tient pas dans une demi-colonne
                 de téléphone : le libellé ne se refuse au retour à la ligne que
                 dans la rangée desktop. -->
            <dt class="mt-[8px] whitespace-normal font-sans text-base text-ink-60 xl:whitespace-nowrap">
              {{ stat.label }}
            </dt>
          </div>
        </template>
      </dl>

      <div
        v-reveal="200"
        class="mt-[48px] flex w-full flex-col items-stretch gap-[12px] sm:w-auto sm:flex-row sm:items-center sm:gap-[24px] xl:mt-[88px]"
      >
        <BaseButton size="lg" href="mailto:contact@pawpy.fr?subject=demande%20de%20beta%20test">Devenir bêta testeur</BaseButton>
        <BaseButton size="lg" variant="outline" href="#newsletter">
          S’abonner à la newsletter
        </BaseButton>
      </div>
    </div>
  </section>
</template>
