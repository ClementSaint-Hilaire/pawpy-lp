import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/**
 * Feuille pilotée par l'URL : le routeur sert l'accueil sous `path`, la modale
 * s'ouvre quand on y est et referme en revenant à la racine.
 */
export function useRouteSheet(path) {
  const route = useRoute()
  const router = useRouter()

  const open = computed(() => route.path === path)

  return {
    open,
    close: () => {
      if (open.value) router.push('/')
    },
  }
}
