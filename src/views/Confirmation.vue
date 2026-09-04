<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const { email = '', token = '' } = useRoute().query
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  if (!token) {
    error.value = 'Lien de confirmation invalide'
    loading.value = false
    return
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/confirm?token=${token}`)
    if (!response.ok) {
      error.value = (await response.text()) || 'Échec de la confirmation'
    }
  } catch (err) {
    console.error('Confirmation error:', err)
    error.value = 'Erreur réseau'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <!-- Vue servie seule (ni header ni footer) : la marge haute remplace la
       hauteur de l'en-tête. -->
  <div class="shell mt-[96px] pb-[64px] text-center xl:mt-[176px]">
    <p v-if="loading" class="font-sans text-base text-ink-60">Confirmation en cours...</p>

    <p v-else-if="error" class="font-sans text-base text-danger">{{ error }}</p>

    <div v-else class="mx-auto max-w-[682px]">
      <h1 class="text-title [word-break:break-word]">
        Merci pour votre soutien ! Vous recevrez toutes nos informations sur votre mail : {{ email }} !
      </h1>
      <p class="mt-[16px] font-sans text-label text-ink-60">
        Vous pouvez maintenant fermer cette page
      </p>
    </div>
  </div>
</template>
