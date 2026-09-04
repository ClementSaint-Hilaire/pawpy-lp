import featureConfiance from '@/assets/figma/feature-confiance.png'
import featureBalade from '@/assets/figma/feature-balade.png'
import featurePaiement from '@/assets/figma/feature-paiement.png'
import featureStats from '@/assets/figma/feature-stats.png'

import iconCertification from '@/assets/figma/icons/certification.svg'
import iconFormation from '@/assets/figma/icons/formation.svg'
import iconMessage from '@/assets/figma/icons/message.svg'
import iconInterlocuteur from '@/assets/figma/icons/interlocuteur.svg'
import iconPaiement from '@/assets/figma/icons/paiement.svg'
import iconGps from '@/assets/figma/icons/gps.svg'
import iconHeure from '@/assets/figma/icons/heure.svg'
import iconNotification from '@/assets/figma/icons/notification.svg'
import iconMap from '@/assets/figma/icons/map.svg'
import iconPaiementSecurise from '@/assets/figma/icons/paiement-securise.svg'
import iconApp from '@/assets/figma/icons/app.svg'
import iconHistorique from '@/assets/figma/icons/historique.svg'
import iconTransfere from '@/assets/figma/icons/transfere.svg'
import iconStats from '@/assets/figma/icons/stats.svg'
import iconRapports from '@/assets/figma/icons/rapports.svg'
import iconCanin from '@/assets/figma/icons/canin.svg'

// Les quatre sections « texte + image » : seul le côté de l'image alterne.
export const features = [
  {
    id: 'confiance',
    eyebrow: 'Confiance',
    title: 'Une entrée filtrée avec promeneurs certifiés.',
    image: featureConfiance,
    imageAlt: 'Écran Pawpy d’import ou de passage de la certification ACACED',
    reversed: false,
    items: [
      { icon: iconCertification, label: 'Entrée sur certification' },
      { icon: iconFormation, label: 'Formation incluses' },
      { icon: iconMessage, label: 'Messagerie privée encrypté' },
      { icon: iconInterlocuteur, label: 'Choix complet de votre interlocuteur' },
      { icon: iconPaiement, label: 'Paiement intégrés & sécurisés' },
    ],
  },
  {
    id: 'balade',
    eyebrow: 'Balade',
    title: 'Une promenade d’exception, sans concessions.',
    image: featureBalade,
    imageAlt: 'Notification Pawpy et tracé GPS d’une promenade en cours',
    reversed: true,
    items: [
      { icon: iconGps, label: 'Tracking GPS en temps réel' },
      { icon: iconHeure, label: 'Promenade d’une heure minimum' },
      { icon: iconNotification, label: 'Notifications automatiques' },
      { icon: iconMap, label: 'Cartographie des zones de balade' },
    ],
  },
  {
    id: 'paiement',
    eyebrow: 'Paiement',
    title: 'Votre tranquillité commence\navant même la balade.',
    image: featurePaiement,
    imageAlt: 'Écran Pawpy de paiement et de réservation d’une promenade',
    reversed: false,
    items: [
      { icon: iconPaiementSecurise, label: 'Paiement 100% sécurisé' },
      { icon: iconApp, label: 'Réservez directement dans Pawpy' },
      { icon: iconHistorique, label: 'Historique de vos transactions' },
      { icon: iconTransfere, label: 'Transfère d’argent' },
    ],
  },
  {
    id: 'stats',
    eyebrow: 'Stats & suivis',
    title: 'La promenade canine devient une science mesurable.',
    image: featureStats,
    imageAlt: 'Écran Pawpy de statistiques et de suivi des promenades',
    reversed: true,
    items: [
      { icon: iconHeure, label: 'Tracé GPS & chronomètre' },
      { icon: iconStats, label: 'Statistiques de promenades' },
      { icon: iconRapports, label: 'Rapports mensuels des performances' },
      { icon: iconCanin, label: 'Accompagnement canin complet' },
    ],
  },
]
