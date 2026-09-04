<script setup>
import { onMounted, ref } from 'vue';

const params = new URLSearchParams(window.location.search);
const email = params.get('email') || '';
const loading = ref(true);
const success = ref(false);
const error = ref('');

onMounted(async () => {
  if (!email) {
    error.value = 'Lien de désinscription invalide';
    loading.value = false;
    return;
  }

  try {
    const response = await fetch(
        `${import.meta.env.VITE_APP_URL}/unsubscribe?email=${encodeURIComponent(email)}`,
        { method: 'POST' }
    );

    if (response.ok) {
      success.value = true;
    } else {
      error.value = 'Échec de la désinscription';
    }
  } catch (err) {
    console.error('Unsubscribe error:', err);
    error.value = 'Erreur réseau';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <!-- Cette vue est servie seule (pas de header ni de footer) : la marge haute
       remplace la hauteur de l'en-tête. -->
  <div class="shell mt-[96px] pb-[64px] text-center xl:mt-[176px]">
    <div v-if="loading">
      <div
        class="mx-auto mb-[16px] h-[48px] w-[48px] animate-spin rounded-full border-b-2 border-ink"
      ></div>
      <p class="font-sans text-base text-ink-60">Désinscription en cours...</p>
    </div>

    <div v-else-if="error">
      <div class="mb-[16px] text-lead text-danger" aria-hidden="true">❌</div>
      <h1 class="text-title text-danger">{{ error }}</h1>
    </div>

    <div v-else-if="success" class="mx-auto max-w-[682px]">
      <h1 class="text-title [word-break:break-word]">
        Nous sommes désolés de vous voir partir &#128546 Nous espérons que vous reviendrez bientôt !
      </h1>
      <p class="mt-[16px] font-sans text-label text-ink-60 [word-break:break-word]">
        Vous ne recevrez plus nos emails sur votre mail : {{ email }}
      </p>
      <p class="mt-[16px] font-sans text-label text-ink-60">
        Vous pouvez maintenant fermer cette page
      </p>
    </div>
  </div>
</template>