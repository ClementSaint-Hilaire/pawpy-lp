import photoCarla from '@/assets/figma/team/carla-coelho.jpg'
import photoClement from '@/assets/figma/team/clement-saint-hilaire.jpg'
import photoElea from '@/assets/figma/team/elea-dagron.jpg'
import photoVincent from '@/assets/figma/team/vincent-blasini.jpg'
import photoAnthony from '@/assets/figma/team/anthony-brosse.jpg'

// L'ordre est celui de la maquette : les cinq portraits se répartissent en
// trois puis deux, la seconde ligne étant centrée par le retour à la ligne de
// la grille. `link` : portfolio ou profil LinkedIn du membre.
export const team = [
  {
    name: 'Carla Coelho',
    role: 'Co-fondateur & experte UX',
    photo: photoCarla,
    link: 'https://www.linkedin.com/in/carla-coelho-17a770213/',
  },
  {
    name: 'Clément Saint-Hilaire',
    role: 'Co-fondateur & expert UI',
    photo: photoClement,
    link: 'https://sainthilaire.pro',
  },
  {
    name: 'Élea Dagron',
    role: 'Experte marketing',
    photo: photoElea,
    link: 'https://www.linkedin.com/in/elea-dagron/',
  },
  {
    name: 'Vincent Blasini',
    role: 'Graphiste',
    photo: photoVincent,
    link: 'https://vincent-blasini.framer.ai/',
  },
  {
    name: 'Anthony Brosse',
    role: 'Développeur',
    photo: photoAnthony,
    link: 'https://www.linkedin.com/in/anthony-brosse/',
  },
]
