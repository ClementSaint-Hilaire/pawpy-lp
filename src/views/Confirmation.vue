<script setup>
import {onMounted, ref} from "vue";

const params = new URLSearchParams(window.location.search);
const email = params.get('email') || '';
const token = params.get('token') || '';
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  if (!token) {
    error.value = 'Invalid confirmation link';
    loading.value = false;
    return;
  }

  try {
    // Call backend with token for validation
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/confirm?token=${token}`);

    if (!response.ok) {
      const text = await response.text();
      error.value = text || 'Confirmation failed';
    }
  } catch (err) {
    error.value = 'Network error';
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <!-- Cette vue est servie seule (pas de header ni de footer) : la marge haute
       remplace la hauteur de l'en-tête. -->
  <div class="shell mt-[96px] pb-[64px] text-center xl:mt-[176px]">
    <p v-if="loading" class="font-sans text-base text-ink-60">
      Confirmation en cours...
    </p>

    <p v-else-if="error" class="font-sans text-base text-danger">
      {{ error }}
    </p>

    <div v-else class="mx-auto max-w-[682px]">
      <h1 class="text-title [word-break:break-word]">
        Merci pour votre soutien ! Vous recevrez toutes nos informations sur votre mail : {{ email }} !
      </h1>
      <p class="mt-[16px] font-sans text-label text-ink-60">
        Vous pouvez maintenant fermer cette page
      </p>
    </div>
  </div>
</template>