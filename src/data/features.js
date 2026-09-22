// Chaque visuel de section est monté en deux calques : un fond carré immobile
// et le contenu (l'écran de l'app) qui vient s'y poser au fil du défilement.
// Les .png d'origine restent dans le dossier comme référence (montage final
// « feature-x.png », sources non compressées) mais ne sont plus chargés : la
// page sert les .webp, quatre fois plus légers à rendu équivalent.
import featureConfianceFond from '@/assets/figma/feature-confiance-fond.webp'
import featureConfianceContent from '@/assets/figma/feature-confiance-content.webp'
import featureBaladeFond from '@/assets/figma/feature-balade-fond.webp'
import featureBaladeContent from '@/assets/figma/feature-balade-content.webp'
import featurePaiementFond from '@/assets/figma/feature-paiement-fond.webp'
import featurePaiementContent from '@/assets/figma/feature-paiement-content.webp'
import featureStatsFond from '@/assets/figma/feature-stats-fond.webp'
import featureStatsContent from '@/assets/figma/feature-stats-content.webp'

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

// Les fonds du Figma font 1236×1236 px : c'est le repère dans lequel sont
// relevées les coordonnées ci-dessous, celles où le contenu doit finir sa
// course (elles reconstituent alors exactement les « feature-x.png »). On les
// convertit en pourcentages du côté du carré pour qu'elles suivent la largeur
// réelle de la colonne, quelle que soit la taille de l'écran.
const FOND_SIZE = 1236
const pct = (value) => `${((value / FOND_SIZE) * 100).toFixed(4)}%`

// Le contenu déborde volontairement du carré (le téléphone est rogné en haut
// ou en bas selon la section) : c'est le fond qui découpe, pas l'image.
// `width` / `height` sont les dimensions naturelles du calque de contenu :
// posées en attributs sur l'image, elles donnent au navigateur son rapport
// hauteur/largeur avant le téléchargement.
const place = (fond, content, x, y, width, height) => ({
  fond,
  content,
  left: pct(x),
  top: pct(y),
  cssWidth: pct(width),
  width,
  height,
})

// Les quatre sections « texte + image » : seul le côté de l'image alterne.
export const features = [
  {
    id: 'confiance',
    eyebrow: 'Confiance',
    title: 'Une entrée filtrée avec promeneurs certifiés.',
    visual: place(featureConfianceFond, featureConfianceContent, 148, -636, 1258, 2332),
    imageAlt:
      'Pawpy, application de mise en relation de luxe entre promeneurs certifiés et propriétaires de chiens — écran Pawpy d’import ou de passage de la certification ACACED',
    reversed: false,
    items: [
      { icon: iconCertification, label: 'Entrée sur certification' },
      { icon: iconFormation, label: 'Formations incluses' },
      { icon: iconMessage, label: 'Messagerie privée chiffrée' },
      { icon: iconInterlocuteur, label: 'Choix complet de votre interlocuteur' },
      { icon: iconPaiement, label: 'Paiements intégrés & sécurisés' },
    ],
  },
  {
    id: 'balade',
    eyebrow: 'Balade',
    title: 'Une promenade d’exception, sans concessions.',
    visual: place(featureBaladeFond, featureBaladeContent, 72, 44, 1493, 2748),
    imageAlt:
      'Pawpy, application de mise en relation de luxe entre promeneurs certifiés et propriétaires de chiens — notification Pawpy et tracé GPS d’une promenade en cours',
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
    visual: place(featurePaiementFond, featurePaiementContent, 188, 100, 1178, 2168),
    imageAlt:
      'Pawpy, application de mise en relation de luxe entre promeneurs certifiés et propriétaires de chiens — écran Pawpy de paiement et de réservation d’une promenade',
    reversed: false,
    items: [
      { icon: iconPaiementSecurise, label: 'Paiement 100% sécurisé' },
      { icon: iconApp, label: 'Réservez directement dans Pawpy' },
      { icon: iconHistorique, label: 'Historique de vos transactions' },
      { icon: iconTransfere, label: 'Transfert d’argent' },
    ],
  },
  {
    id: 'stats',
    eyebrow: 'Stats & suivis',
    title: 'La promenade canine devient une science mesurable.',
    visual: place(featureStatsFond, featureStatsContent, 188, 80, 1178, 2168),
    imageAlt:
      'Pawpy, application de mise en relation de luxe entre promeneurs certifiés et propriétaires de chiens — écran Pawpy de statistiques et de suivi des promenades',
    reversed: true,
    items: [
      { icon: iconHeure, label: 'Tracé GPS & chronomètre' },
      { icon: iconStats, label: 'Statistiques de promenades' },
      { icon: iconRapports, label: 'Rapports mensuels des performances' },
      { icon: iconCanin, label: 'Accompagnement canin complet' },
    ],
  },
]
