<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import quoteAvatar from '@/assets/figma/quote-avatar.png'

// Durée d'affichage d'un témoignage, en ms. Le basculement `.quote-slide`
// (main.css) prend ~580 ms — effacement puis apparition, jamais les deux en
// même temps — et se termine donc largement avant le suivant.
const INTERVAL = 5000

// TODO : noms d'attente pour les auteurs 2 à 4, et une seule photo exportée du
// Figma — les trois autres la reprennent en attendant leurs portraits.
const testimonials = [
  {
    quote:
      "Je culpabilisais de laisser Nino seul toute la journée sans savoir à qui le confier. Avec Pawpy, j'ai trouvé un promeneur certifié, échangé avec lui avant la balade, et je suis sa sortie en direct sur la carte GPS. Aujourd'hui je pars travailler l'esprit tranquille.",
    author: 'Steve Travail',
    avatar: quoteAvatar,
  },
  {
    quote:
      "Saga tire comme un camion et je n'osais plus la confier à personne. Sur Pawpy, mon promeneur est certifié ACACED et formé aux chiens difficiles. On s'est rencontrés avant, j'ai vu son sérieux, et je reçois une notif à chaque sortie. Enfin quelqu'un à qui je fais vraiment confiance.",
    author: 'Marie Dupont',
    avatar: quoteAvatar,
  },
  {
    quote:
      "Je voyage souvent et l'idée de laisser Milo m'angoissait à chaque déplacement. Avec Pawpy, je suis chaque balade en direct sur la carte, je reçois le tracé GPS et le rapport à la fin. Où que je sois, je sais qu'il a sa sortie d'une heure. Je pars enfin l'esprit léger.",
    author: 'Julien Mercier',
    avatar: quoteAvatar,
  },
  {
    quote:
      "Avant, je payais en liquide sans jamais savoir ce que j'allais avoir. Sur Pawpy, le prix est clair avant de valider, tout se règle dans l'appli et je garde l'historique. J'ai choisi mon promeneur, fixé mon budget, et Câline a sa promenade. Simple, carré, sans mauvaise surprise.",
    author: 'Sofia Renard',
    avatar: quoteAvatar,
  },
]

const current = ref(0)
let timer = null

const stop = () => {
  window.clearInterval(timer)
  timer = null
}

const start = () => {
  stop()
  timer = window.setInterval(() => {
    current.value = (current.value + 1) % testimonials.length
  }, INTERVAL)
}

// Un clic sur une pastille affiche le témoignage voulu et relance le compte à
// rebours : on ne veut pas d'un basculement automatique juste après le clic.
const select = (index) => {
  current.value = index
  start()
}

const label = computed(() => testimonials[current.value].author)

onMounted(start)
onBeforeUnmount(stop)
</script>

<template>
  <!-- 192px = 128 (écart entre blocs) + 64 (marge haute du bloc), à partir de xl. -->
  <section id="temoignages" class="shell pt-[80px] md:pt-[128px] xl:pt-[192px]">
    <div class="flex flex-col items-center text-center">
      <div v-reveal class="flex items-center gap-[8px]" role="tablist" aria-label="Témoignages">
        <button
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.author"
          type="button"
          role="tab"
          :aria-selected="index === current"
          :aria-label="`Témoignage ${index + 1} : ${testimonial.author}`"
          class="h-[8px] w-[8px] rounded-full transition-colors duration-300"
          :class="index === current ? 'bg-ink' : 'bg-ink-40'"
          @click="select(index)"
        />
      </div>

      <!-- Les quatre témoignages sont empilés dans la même cellule de grille :
           la hauteur reste celle du plus long, le fondu ne décale donc jamais
           la mise en page. Seul l'actif est visible et lu. -->
      <div
        v-reveal="150"
        class="mt-[32px] grid w-full"
        role="tabpanel"
        aria-live="polite"
        :aria-label="label"
      >
        <figure
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.author"
          class="quote-slide col-start-1 row-start-1 flex flex-col items-center"
          :class="{ 'quote-slide-active': index === current }"
          :aria-hidden="index !== current"
        >
          <blockquote class="max-w-[800px] font-display text-title font-normal">
            {{ testimonial.quote }}
          </blockquote>

          <figcaption class="mt-[32px] flex items-center gap-[8px]">
            <img :src="testimonial.avatar" alt="" class="h-[64px] w-[44px] shrink-0 object-cover" />
            <span class="font-sans text-label text-ink-60">—{{ testimonial.author }}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
