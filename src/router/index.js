import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Confirmation from '../views/Confirmation.vue'
import Unsubscribe from '../views/Unsubscribe.vue'

// Les liens des mails portent l'adresse en query : sans elle, la vue n'a rien
// à afficher, on renvoie à l'accueil.
const requireEmail = (to) => (to.query.email ? true : '/')

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },

    // Le manifeste et l'équipe sont des modales posées sur l'accueil (voir
    // ManifestOverlay.vue et TeamOverlay.vue) : leurs routes servent donc la
    // même page, dont RouterView réutilise l'instance — scroll et apparitions
    // déjà jouées survivent à l'ouverture comme à la fermeture.
    //
    // Des alias de « / » ne conviendraient pas : les chemins partageraient un
    // seul enregistrement de route, Vue Router prendrait la navigation pour un
    // doublon et l'URL ne bougerait pas.
    { path: '/manifest', name: 'manifest', component: Home },
    { path: '/auto-mode-setup', name: 'team', component: Home },

    {
      path: '/confirmation',
      name: 'confirmation',
      component: Confirmation,
      beforeEnter: requireEmail,
    },
    {
      path: '/unsubscribe',
      name: 'unsubscribe',
      component: Unsubscribe,
      beforeEnter: requireEmail,
    },
  ],
})
