<script setup>
import { ref } from 'vue'
import faqImage from '@/assets/figma/faq-image.png'
import iconPlus from '@/assets/figma/icons/plus.svg'
import iconMinus from '@/assets/figma/icons/minus.svg'

// Questions reprises du Figma ; les réponses viennent du site actuel (celles
// de la maquette sont masquées et remplies d'un texte anglais sans rapport).
const items = [
  {
    question: 'Qu’est-ce que Pawpy ?',
    answer:
      'Anomi est une application qui met en relation les propriétaires de chiens avec des promeneurs certifiés et qualifiés, spécialisés dans le bien-être animal. Notre priorité est de garantir des sorties sécurisées, adaptées aus spécificités de chaque chien.',
  },
  {
    question: 'Quelles infos fournir sur mon chien ?',
    answer:
      'Pawpy vous demande quelques informations essentielles sur votre compagnon : son âge, ses habitudes, ou encore ses besoins spécifiques. Plus vous êtes précis, plus l’expérience sera personnalisée et agréable pour votre chien.',
  },
  {
    question: 'Puis‑je rencontrer le promeneur avant ?',
    answer:
      'Avant de confier votre animal, vous avez la possibilité de rencontrer le promeneur, donnez vous rendez-vous et laisser la magie opérer.',
  },
  {
    question: 'Comment sont fixés les prix ?',
    answer:
      'Ce sont les propriétaires eux-mêmes qui fixent le tarif qu’ils jugent juste pour la promenade de leur chien. Ils choisissent le montant en fonction de la durée souhaitée, des besoins spécifiques de leur chien. Le prix apparaît toujours clairement avant validation, sans frais cachés ni surprise. Le promeneur à également la possibilité de fixer son tarif à titre indicatif directement sur son profil.',
  },
  {
    question: 'Puis‑je refuser une promenade ?',
    answer:
      'Vous pouvez refuser une promenade à tout moment tant qu’elle n’est pas confirmée, ou choisir un autre promeneur si vous préférez. Vous gardez le contrôle tout en offrant à votre chien le meilleur accompagnement possible pour une promenade personnalisée.',
  },
]

// La maquette montre le premier item ouvert et un seul à la fois.
const openIndex = ref(0)
const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <!-- Seul bloc en colonne de 1000px, pas le gabarit `.shell` de 1300px. Les
       gouttières le suivent sous xl ; au-delà elles sont inutiles et entreraient
       dans le `max-w`, rognant la largeur de la maquette. -->
  <section
    id="faq"
    class="mx-auto w-full max-w-[1000px] px-6 pt-[96px] md:px-10 md:pt-[160px] xl:px-0 xl:pt-[286px]"
  >
    <div class="flex flex-col gap-[8px] lg:flex-row lg:items-start lg:justify-between lg:gap-[32px]">
      <h2 v-reveal class="max-w-[500px] text-title">
        Vous avez une question ?<br class="hidden lg:inline" />
        Nous avons la réponse !
      </h2>
      <!-- Les 49px alignent le lien sur la seconde ligne du titre — seulement
           utile quand les deux sont sur la même rangée. -->
      <a
        v-reveal="120"
        href="#newsletter"
        class="font-sans text-label text-ink-40 hover:text-ink lg:mt-[49px]"
      >
        Poser une question
      </a>
    </div>

    <div class="mt-[40px] flex flex-col gap-[24px] lg:mt-[64px] lg:flex-row lg:items-start lg:gap-[32px]">
      <img
        v-reveal="{ from: 'scale' }"
        :src="faqImage"
        alt=""
        class="h-[240px] w-full object-cover md:h-[320px] lg:h-[443px] lg:w-[400px] lg:shrink-0" />

      <dl class="flex-1">
        <div
          v-for="(item, index) in items"
          :key="item.question"
          v-reveal="120 + index * 90"
          :class="index > 0 ? 'border-t border-dashed border-stroke' : ''"
        >
          <dt>
            <button
              type="button"
              class="flex w-full items-center justify-between gap-[16px] py-[16px] text-left"
              :aria-expanded="openIndex === index"
              @click="toggle(index)"
            >
              <span class="font-sans text-base text-ink">{{ item.question }}</span>
              <span class="flex h-[24px] w-[24px] shrink-0 items-center justify-center overflow-clip">
                <img
                  :src="openIndex === index ? iconMinus : iconPlus"
                  :alt="openIndex === index ? 'Replier' : 'Déplier'"
                  class="h-full w-full object-contain"
                />
              </span>
            </button>
          </dt>

          <!-- `max-h` est une borne haute pour la transition, pas une hauteur
               cible : elle doit dépasser la plus longue réponse reflowée en
               colonne étroite, sans quoi le texte est rogné. -->
          <dd
            class="overflow-hidden transition-all duration-300 ease-in-out"
            :class="openIndex === index ? 'max-h-[700px] pb-[16px] opacity-100' : 'max-h-0 opacity-0'"
          >
            <p class="font-sans text-label text-ink-60">{{ item.answer }}</p>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>
