<script setup>
import TheHeader from '@/components/TheHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import QuoteSection from '@/components/QuoteSection.vue'
import StatsSection from '@/components/StatsSection.vue'
import FeatureSection from '@/components/FeatureSection.vue'
import NewsletterCta from '@/components/NewsletterCta.vue'
import FaqSection from '@/components/FaqSection.vue'
import TheFooter from '@/components/TheFooter.vue'
import { features } from '@/data/features'
</script>

<template>
  <TheHeader />

  <main>
    <HeroSection />
    <QuoteSection />
    <StatsSection />

    <!-- Cible de l'ancre « Features » : les sections étant générées en boucle,
         l'id vit sur le conteneur plutôt que dans le composant. -->
    <div id="features">
      <FeatureSection
        v-for="feature in features"
        :key="feature.id"
        :eyebrow="feature.eyebrow"
        :title="feature.title"
        :visual="feature.visual"
        :image-alt="feature.imageAlt"
        :items="feature.items"
        :reversed="feature.reversed"
      />
    </div>

    <NewsletterCta />
    <FaqSection />
  </main>

  <TheFooter />
</template>
