import photoCarla from '@/assets/figma/team/carla-coelho.webp'
import photoClement from '@/assets/figma/team/clement-saint-hilaire.webp'
import photoElea from '@/assets/figma/team/elea-dagron.webp'
import photoVincent from '@/assets/figma/team/vincent-blasini.webp'
import photoAnthony from '@/assets/figma/team/anthony-brosse.webp'

// L'ordre est celui de la maquette : les cinq portraits se répartissent en
// trois puis deux, la seconde ligne étant centrée par le retour à la ligne de
// la grille. `link` : portfolio ou profil LinkedIn du membre ; `width` /
// `height` sont les dimensions naturelles de la photo.
export const team = [
  {
    name: 'Carla Coelho',
    role: 'Co-fondateur & experte UX',
    photo: photoCarla,
    width: 450,
    height: 600,
    link: 'https://www.linkedin.com/in/carla-coelho-17a770213/',
  },
  {
    name: 'Clément Saint-Hilaire',
    role: 'Co-fondateur & expert UI',
    photo: photoClement,
    width: 400,
    height: 600,
    link: 'https://sainthilaire.pro',
  },
  {
    name: 'Élea Dagron',
    role: 'Experte marketing',
    photo: photoElea,
    width: 600,
    height: 600,
    link: 'https://www.linkedin.com/in/elea-dagron/',
  },
  {
    name: 'Vincent Blasini',
    role: 'Graphiste',
    photo: photoVincent,
    width: 480,
    height: 600,
    link: 'https://vincent-blasini.framer.ai/',
  },
  {
    name: 'Anthony Brosse',
    role: 'Développeur',
    photo: photoAnthony,
    width: 413,
    height: 600,
    link: 'https://www.linkedin.com/in/anthony-brosse/',
  },
]
