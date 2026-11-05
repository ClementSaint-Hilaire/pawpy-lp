<script setup>
import SheetOverlay from '@/components/SheetOverlay.vue'
import { useRouteSheet } from '@/composables/useRouteSheet'
import { externalAttrs } from '@/utils/links'

const address = '40 rue du Chemin Vert, 75011 Paris, France'
const email = { value: 'contact@pawpy.fr', href: 'mailto:contact@pawpy.fr' }
const website = { value: 'https://pawpy.fr', href: 'https://pawpy.fr' }

const controller = [
  { label: 'Nom commercial', value: 'Pawpy' },
  { label: 'Éditrice et représentante du projet', value: 'Carla Coelho' },
  { label: 'Statut juridique déclaré', value: 'Association' },
  { label: 'Adresse', value: address },
  { label: 'Adresse électronique', ...email },
  { label: 'Directrice de la publication', value: 'Carla Coelho' },
  { label: 'Site internet', ...website },
]

const host = [
  { label: 'Hébergeur', value: 'Hyperion Cloud SAS' },
  { label: 'Siège social', value: '59 rue de Ponthieu, bureau 326, 75008 Paris, France' },
  { label: 'RCS', value: 'Rouen 937 663 078' },
  { label: 'Téléphone', value: '+33 6 67 52 61 81', href: 'tel:+33667526181' },
  { label: 'Adresse électronique', value: 'contact@hyperion.cloud', href: 'mailto:contact@hyperion.cloud' },
  { label: 'Site internet', value: 'https://hyperion.cloud', href: 'https://hyperion.cloud' },
]

const rightsContact = [
  { label: 'Adresse postale', value: address },
  { label: 'Adresse électronique', ...email },
]

const contact = [
  { label: 'Éditrice et représentante du projet', value: 'Carla Coelho' },
  { label: 'Statut juridique déclaré', value: 'Association' },
  { label: 'Adresse postale', value: address },
  { label: 'Adresse électronique', ...email },
  { label: 'Site internet', ...website },
]

// Mêmes classes que les mentions légales, plus un cran d'intitulé pour les
// sous-parties (4.1, 4.2…) : le blanc au-dessus les détache du paragraphe
// précédent.
const heading = 'text-[20px] leading-[1.2] tracking-[-0.02em] text-ink'
const subheading = 'pt-[8px] text-[16px] leading-[1.2] tracking-[-0.01em] text-ink'
const link = 'text-ink underline underline-offset-2 transition-colors hover:text-ink-60'

const { open, close } = useRouteSheet('/politique-de-confidentialite')
</script>

<template>
  <SheetOverlay
    :open="open"
    labelledby="privacy-title"
    close-label="Fermer la politique de confidentialité"
    @close="close"
  >
    <div class="flex w-full flex-col items-center gap-[32px] px-6 [word-break:break-word] md:px-[34px]">
      <div class="flex flex-col items-center gap-[8px] text-center">
        <p
          id="privacy-title"
          class="font-sans text-[14px] leading-[1.2] tracking-[-0.01em] text-ink-60"
        >
          Politique de confidentialité
        </p>
        <p class="font-sans text-caption text-ink-40">Dernière mise à jour : 5 novembre 2026</p>
      </div>

      <div class="flex w-full max-w-[682px] flex-col gap-[32px] font-body text-label text-ink-60">
        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">1. Préambule</h2>
          <p>
            Chez Pawpy, la confiance et la transparence constituent des engagements fondamentaux.
            Nous accordons une importance particulière à la protection des données personnelles
            des personnes qui utilisent nos services.
          </p>
          <p>
            La présente politique de confidentialité décrit la manière dont nous collectons,
            utilisons, conservons, partageons et protégeons les données personnelles dans le cadre
            de l’écosystème Pawpy.
          </p>
          <p>
            Pawpy est un projet de plateforme numérique spécialisé dans la mise en relation entre
            propriétaires de chiens et promeneurs certifiés, proposant un service de promenade
            sécurisé, transparent et personnalisé.
          </p>
          <p>
            Notre objectif est de faciliter l’organisation de promenades fiables et adaptées aux
            besoins des chiens, notamment grâce à la vérification des profils, à la réservation en
            ligne, à la messagerie sécurisée et au suivi des promenades.
          </p>
          <p>
            Nous nous engageons à traiter les données personnelles conformément au Règlement (UE)
            2016/679 du 27 avril 2016, dit Règlement général sur la protection des données (RGPD),
            ainsi qu’à la loi française Informatique et Libertés.
          </p>
          <p>
            Nous appliquons les principes de transparence, de minimisation des données, de
            limitation des finalités, de sécurité et de respect des droits des personnes
            concernées.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">2. Responsable du traitement</h2>
          <p>
            Le responsable du traitement détermine les finalités et les moyens des traitements de
            données personnelles effectués dans le cadre des services Pawpy.
          </p>
          <dl class="flex flex-col gap-[4px]">
            <div v-for="row in controller" :key="row.label">
              <dt class="inline text-ink">{{ row.label }}&nbsp;:</dt>
              {{ ' ' }}
              <dd class="inline">
                <a v-if="row.href" :href="row.href" :class="link">{{ row.value }}</a>
                <template v-else>{{ row.value }}</template>
              </dd>
            </div>
          </dl>
          <p>
            Pour toute question concernant la présente politique, le traitement des données
            personnelles ou l’exercice des droits prévus par la réglementation, nous pouvons être
            contactés à l’adresse <a :href="email.href" :class="link">{{ email.value }}</a>.
          </p>
          <p>
            L’identification juridique définitive du responsable du traitement devra reprendre la
            dénomination officielle de l’association lorsqu’elle sera confirmée.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">3. Champ d’application</h2>
          <p>
            La présente politique s’applique à l’ensemble des services numériques exploités sous la
            marque Pawpy.
          </p>
          <p>
            Elle couvre le site internet <a href="https://pawpy.fr" :class="link">https://pawpy.fr</a>,
            notamment ses pages de présentation, ses formulaires de contact, sa liste d’attente et
            ses communications électroniques.
          </p>
          <p>
            Elle couvre également l’application mobile Pawpy sur iOS et Android lorsqu’elle est
            disponible, ainsi que les services associés à son fonctionnement.
          </p>
          <p>
            Ces services comprennent notamment la création et la gestion des comptes,
            l’authentification, la vérification des profils, la certification des promeneurs, les
            annonces, les réservations, la géolocalisation, le suivi des promenades, la messagerie,
            les paiements, les abonnements, les évaluations et l’assistance.
          </p>
          <p>
            La présente politique s’adresse aux visiteurs du site, aux personnes inscrites à nos
            communications, aux propriétaires, aux promeneurs et aux personnes entrant en relation
            avec Pawpy dans le cadre de ses activités.
          </p>
          <p>
            Les fonctionnalités encore en développement ne donnent pas lieu à une collecte de
            données tant qu’elles ne sont pas activées. Leur mise en service pourra nécessiter une
            actualisation de la présente politique.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">4. Données personnelles collectées</h2>
          <p>
            Nous limitons la collecte des données personnelles aux informations nécessaires au
            fonctionnement des services, à leur sécurité et aux finalités présentées dans cette
            politique.
          </p>

          <h3 :class="subheading">4.1. Données collectées sur le site internet</h3>
          <p>
            Lors de l’utilisation du site pawpy.fr, nous pouvons collecter les informations
            transmises volontairement à travers les formulaires disponibles.
          </p>
          <p>
            Pour une inscription à notre liste d’attente ou à notre newsletter, ces données
            comprennent principalement l’adresse électronique et, lorsque le formulaire le prévoit,
            le prénom ainsi que le profil déclaré, notamment propriétaire ou promeneur.
          </p>
          <p>
            Lors d’une prise de contact, nous pouvons traiter les coordonnées fournies, le contenu
            du message et les informations nécessaires à la gestion de la demande.
          </p>
          <p>
            Certaines données techniques peuvent également être traitées lors de la navigation,
            notamment l’adresse IP, les dates et heures de connexion, les pages consultées, le type
            de navigateur, le système d’exploitation et les journaux d’erreurs.
          </p>
          <p>
            Lorsque des outils de mesure d’audience sont activés, certaines informations relatives
            à la navigation peuvent être utilisées dans les conditions décrites à la section
            consacrée aux cookies et traceurs.
          </p>
          <p>
            Nous pouvons également conserver les informations nécessaires à la traçabilité des
            consentements, notamment leur date, leur finalité et leur éventuel retrait.
          </p>

          <h3 :class="subheading">4.2. Données de compte et d’identification</h3>
          <p>
            Lors de la création d’un compte sur l’application Pawpy, nous pouvons collecter le
            prénom, le nom, l’adresse électronique, une photographie de profil, un numéro de
            téléphone lorsqu’il est nécessaire, ainsi qu’un identifiant interne de compte.
          </p>
          <p>
            Nous enregistrons également le rôle choisi dans l’application, propriétaire ou
            promeneur, et les informations nécessaires à l’authentification et à la sécurisation du
            compte.
          </p>
          <p>
            Les informations demandées peuvent varier selon le rôle de la personne et les
            fonctionnalités auxquelles elle souhaite accéder.
          </p>
          <p>
            Les données strictement nécessaires à la création et à la gestion du compte sont
            obligatoires. Les autres informations sont facultatives, sauf lorsqu’elles
            conditionnent l’accès à une fonctionnalité particulière.
          </p>

          <h3 :class="subheading">4.3. Connexion avec un compte Google</h3>
          <p>
            Lorsque la fonctionnalité «&nbsp;Se connecter avec Google&nbsp;» est proposée et
            utilisée, nous recevons, selon les autorisations effectivement demandées et accordées,
            certaines informations associées au compte Google.
          </p>
          <p>
            Dans le cadre des autorisations standard openid, email et profile, ces informations
            peuvent comprendre le nom, l’adresse électronique, la photographie de profil et
            l’identifiant unique du compte Google.
          </p>
          <p>
            Ces informations nous permettent de créer ou d’associer un compte Pawpy, d’authentifier
            son titulaire et de faciliter l’accès à nos services.
          </p>
          <p>Nous ne recevons jamais le mot de passe du compte Google.</p>
          <p>
            L’utilisation des informations obtenues par l’intermédiaire des services Google est
            encadrée par les engagements spécifiques détaillés à la section 5.
          </p>

          <h3 :class="subheading">4.4. Données relatives aux propriétaires et à leurs chiens</h3>
          <p>
            Les propriétaires peuvent renseigner des informations nécessaires à l’organisation et à
            la personnalisation des promenades.
          </p>
          <p>
            Ces informations peuvent comprendre le nom du chien, sa race, son âge, son gabarit, ses
            habitudes, son tempérament, ses besoins particuliers et les consignes communiquées au
            promeneur.
          </p>
          <p>
            Nous pouvons également collecter les informations utiles à la prise en charge du chien,
            notamment les précautions à respecter, les éventuelles difficultés comportementales,
            les coordonnées de contact en cas d’urgence et les indications nécessaires à la
            récupération ou à la restitution de l’animal.
          </p>
          <p>
            Les informations relatives à un chien ne constituent pas, en elles-mêmes, des données
            personnelles au sens du RGPD. Elles peuvent néanmoins être traitées comme telles
            lorsqu’elles sont associées à une personne identifiée ou identifiable.
          </p>
          <p>
            Nous invitons les propriétaires à ne communiquer que les informations nécessaires à la
            sécurité et au bon déroulement de la promenade.
          </p>

          <h3 :class="subheading">4.5. Données relatives aux promeneurs</h3>
          <p>
            Les promeneurs peuvent être amenés à communiquer des informations supplémentaires dans
            le cadre de la vérification de leur identité et de leurs qualifications.
          </p>
          <p>
            Ces informations peuvent comprendre les coordonnées professionnelles, les
            disponibilités, les zones d’intervention, les expériences déclarées, les
            certifications, les attestations de formation et les justificatifs nécessaires à la
            validation du profil.
          </p>
          <p>
            Lorsque la vérification d’identité exige la consultation d’un document officiel, nous
            limitons la collecte, l’accès et la conservation de ce document à ce qui est
            strictement nécessaire.
          </p>
          <p>
            Si un prestataire spécialisé de vérification est utilisé, nous informons les personnes
            concernées de son identité et des traitements effectués.
          </p>
          <p>
            Nous n’utilisons pas de dispositif de reconnaissance biométrique sans avoir
            préalablement défini sa nécessité, sa base légale et les garanties réglementaires
            appropriées.
          </p>
          <p>
            La vérification et la certification des promeneurs constituent des éléments essentiels
            du fonctionnement de Pawpy. Les données correspondantes sont utilisées pour évaluer
            l’éligibilité des profils, assurer leur fiabilité et contribuer à la sécurité des
            prestations.
          </p>

          <h3 :class="subheading">4.6. Annonces, réservations et promenades</h3>
          <p>
            Dans le cadre de l’organisation des promenades, nous traitons les informations
            nécessaires à la publication des annonces, à la mise en relation et à la réalisation
            des prestations.
          </p>
          <p>
            Ces données peuvent comprendre les dates, horaires, lieux de rendez-vous, durées,
            préférences, consignes, statuts des réservations, modifications, annulations et
            historiques des prestations.
          </p>
          <p>
            Nous pouvons également enregistrer les informations liées au déroulement de chaque
            promenade, notamment son heure de début, son heure de fin, sa durée, sa distance et les
            éventuelles preuves de réalisation.
          </p>
          <p>
            Lorsque cette fonctionnalité est activée, des photographies prises avant, pendant ou
            après la promenade peuvent être enregistrées afin de documenter la prestation et
            d’informer le propriétaire.
          </p>

          <h3 :class="subheading">4.7. Données de géolocalisation</h3>
          <p>La géolocalisation constitue une fonctionnalité importante de Pawpy.</p>
          <p>
            Nous pouvons traiter des données de localisation afin de proposer des promenades à
            proximité, de faciliter la mise en relation et d’assurer le suivi des prestations.
          </p>
          <p>
            Dans le cadre du suivi GPS, les données peuvent comprendre la position géographique du
            promeneur, les coordonnées successives du trajet, les horaires associés ainsi que les
            informations nécessaires à sa représentation cartographique.
          </p>
          <p>
            Le traitement de la localisation précise est limité aux fonctionnalités qui en ont
            réellement besoin.
          </p>
          <p>
            Les conditions de collecte, d’accès, de partage et de conservation de ces informations
            sont détaillées à la section 7.
          </p>

          <h3 :class="subheading">4.8. Messagerie et échanges entre utilisateurs</h3>
          <p>
            Pawpy peut proposer une messagerie intégrée permettant aux propriétaires et aux
            promeneurs de communiquer.
          </p>
          <p>
            Dans ce cadre, nous traitons les messages envoyés, les dates et heures des échanges, les
            identifiants des participants et, selon les fonctionnalités disponibles, les
            photographies, documents ou messages vocaux partagés.
          </p>
          <p>
            Ces données servent à faciliter la préparation des promenades, à communiquer les
            consignes, à assurer le suivi des échanges et à résoudre les éventuels incidents.
          </p>
          <p>Les conversations ne sont pas rendues publiques.</p>
          <p>
            L’accès de l’équipe Pawpy aux échanges est limité aux situations justifiées, notamment
            lorsqu’une demande d’assistance, un signalement, une obligation légale ou un incident
            de sécurité nécessite leur consultation.
          </p>

          <h3 :class="subheading">4.9. Paiements, transactions et abonnements</h3>
          <p>
            Lorsque les fonctionnalités de paiement sont disponibles, nous traitons les informations
            nécessaires à la réservation et au règlement des promenades ainsi qu’à la gestion des
            abonnements.
          </p>
          <p>
            Ces données peuvent comprendre le montant des transactions, leur date, leur statut, les
            références de paiement, les factures, les remboursements et les informations de
            facturation nécessaires.
          </p>
          <p>
            Les informations bancaires complètes sont traitées par le prestataire de paiement
            sécurisé retenu.
          </p>
          <p>
            Nous n’avons pas vocation à stocker les numéros complets de cartes bancaires ou leurs
            cryptogrammes de sécurité.
          </p>
          <p>
            Le prestataire de paiement peut traiter certaines données personnelles en qualité de
            sous-traitant ou de responsable de traitement distinct, selon les opérations concernées
            et ses propres obligations réglementaires.
          </p>

          <h3 :class="subheading">4.10. Avis, évaluations et signalements</h3>
          <p>
            À l’issue d’une promenade, les utilisateurs peuvent être invités à partager une
            évaluation ou un commentaire relatif à la prestation.
          </p>
          <p>
            Nous pouvons traiter les notes, avis, dates de publication et références aux
            prestations concernées.
          </p>
          <p>
            Ces informations servent à informer les utilisateurs, à améliorer la qualité du service
            et à faciliter la sélection de profils adaptés.
          </p>
          <p>
            Nous pouvons également collecter les données nécessaires au traitement des
            signalements, des contestations et des comportements contraires aux règles de la
            plateforme.
          </p>

          <h3 :class="subheading">4.11. Assistance, incidents et assurances</h3>
          <p>
            En cas de difficulté, d’accident ou de litige lié à une promenade, nous pouvons
            collecter les informations nécessaires à l’analyse de la situation et à son
            traitement.
          </p>
          <p>
            Ces informations peuvent comprendre les références de réservation, les circonstances
            déclarées, la date et le lieu de l’incident, les photographies, les échanges
            pertinents, les justificatifs transmis et les coordonnées des personnes concernées.
          </p>
          <p>
            Lorsque le traitement d’un sinistre le nécessite, des documents tels qu’une facture
            vétérinaire, un compte rendu vétérinaire concernant l’animal ou un justificatif
            administratif peuvent être demandés.
          </p>
          <p>
            Nous limitons la collecte à ce qui est nécessaire à la gestion de l’incident, à
            l’accompagnement des personnes concernées et, le cas échéant, à l’instruction du
            dossier par l’assureur compétent.
          </p>
          <p>
            Nous évitons la collecte de données médicales concernant des personnes physiques
            lorsque celles-ci ne sont pas nécessaires. Tout traitement de données sensibles
            éventuelles fait l’objet des garanties et bases juridiques spécifiques requises.
          </p>

          <h3 :class="subheading">4.12. Données techniques de l’application</h3>
          <p>
            Afin d’assurer le fonctionnement et la sécurité de l’application, nous pouvons traiter
            certaines informations techniques.
          </p>
          <p>
            Ces données peuvent comprendre le modèle de l’appareil, son système d’exploitation, la
            version de l’application, les identifiants techniques nécessaires à son
            fonctionnement, les jetons de notifications, les journaux de connexion et les rapports
            d’erreurs ou de plantage.
          </p>
          <p>
            Ces informations sont utilisées pour corriger les dysfonctionnements, maintenir la
            disponibilité du service, prévenir les usages frauduleux et améliorer les performances.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">5. Utilisation des données obtenues auprès de Google</h2>
          <p>
            Lorsque les utilisateurs choisissent de se connecter avec leur compte Google, nous
            utilisons les informations transmises uniquement dans le cadre des fonctionnalités
            légitimes et clairement présentées de Pawpy.
          </p>
          <p>
            Les données obtenues servent à authentifier l’utilisateur, à créer ou retrouver son
            compte, à renseigner les éléments de profil nécessaires et à assurer les communications
            indispensables à la gestion du compte.
          </p>
          <p>
            Nous nous engageons à respecter la Google API Services User Data Policy, y compris les
            exigences de Limited Use lorsqu’elles sont applicables aux autorisations utilisées.
          </p>
          <p>
            Nous n’utilisons pas les données obtenues par les API Google pour vendre des
            informations personnelles, constituer des profils publicitaires ou alimenter des
            dispositifs de surveillance.
          </p>
          <p>Ces données ne sont pas utilisées pour entraîner des modèles d’intelligence artificielle.</p>
          <p>Nous ne les transmettons pas à des tiers à des fins commerciales ou publicitaires.</p>
          <p>
            Les transmissions éventuellement nécessaires sont limitées aux prestataires techniques
            participant au fonctionnement du service, aux besoins de sécurité, aux obligations
            légales et aux autres situations expressément autorisées par les règles applicables de
            Google.
          </p>
          <p>
            L’accès humain aux données reçues est limité aux besoins justifiés d’assistance
            sollicitée par l’utilisateur, de sécurité, de conformité ou aux autres cas autorisés
            par les règles de Google.
          </p>
          <p>
            Nous ne demandons pas d’accès aux contenus Gmail, Google Drive, Google Agenda ou aux
            contacts Google dans le cadre de l’authentification standard décrite ici.
          </p>
          <p>
            Toute demande ultérieure d’autorisations supplémentaires fera l’objet d’une information
            spécifique et, lorsque cela est nécessaire, d’une nouvelle autorisation.
          </p>
          <p>
            Les utilisateurs peuvent révoquer l’accès de Pawpy à leur compte Google à tout moment
            depuis les paramètres de sécurité de leur compte :
          </p>
          <p>
            <a href="https://myaccount.google.com/connections" v-bind="externalAttrs('https://myaccount.google.com/connections')" :class="link">https://myaccount.google.com/connections</a>
          </p>
          <p>
            Cette révocation interrompt l’autorisation correspondante, mais ne supprime pas
            automatiquement le compte Pawpy ni les données déjà conservées sur une autre base
            légale.
          </p>
          <p>
            La suppression du compte Pawpy peut être demandée séparément dans les conditions
            décrites à la section 16.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">6. Finalités et bases légales des traitements</h2>
          <p>
            Nous traitons les données personnelles pour des objectifs déterminés, explicites et
            légitimes.
          </p>
          <p>Chaque traitement repose sur l’une des bases légales prévues à l’article 6 du RGPD.</p>

          <h3 :class="subheading">6.1. Création et gestion des comptes</h3>
          <p>
            Nous utilisons les données d’identification et de profil pour permettre la création
            des comptes, leur authentification, leur gestion et leur sécurisation.
          </p>
          <p>
            <span class="text-ink">Base légale&nbsp;:</span> exécution du contrat ou des mesures
            précontractuelles demandées, conformément à l’article 6, paragraphe 1, point b), du
            RGPD.
          </p>

          <h3 :class="subheading">6.2. Mise en relation et réservation</h3>
          <p>
            Nous utilisons les données de profil, les disponibilités, les annonces et les
            informations relatives aux chiens afin de permettre la recherche de promeneurs, la mise
            en relation et l’organisation des promenades.
          </p>
          <p>
            <span class="text-ink">Base légale&nbsp;:</span> exécution du contrat ou de mesures
            précontractuelles.
          </p>

          <h3 :class="subheading">6.3. Vérification et certification des promeneurs</h3>
          <p>
            Nous utilisons les justificatifs et les informations professionnelles nécessaires pour
            examiner les candidatures, contrôler l’éligibilité des profils et contribuer à la
            sécurité du service.
          </p>
          <p>
            <span class="text-ink">Base légale&nbsp;:</span> exécution de mesures précontractuelles
            ou du contrat, intérêt légitime à prévenir les risques et les fraudes et, lorsque des
            vérifications particulières sont imposées par la réglementation, obligation légale
            correspondante.
          </p>

          <h3 :class="subheading">6.4. Géolocalisation et suivi des promenades</h3>
          <p>
            Nous traitons les données de localisation nécessaires à la recherche géographique, au
            déroulement et au suivi des promenades.
          </p>
          <p>
            <span class="text-ink">Base légale&nbsp;:</span> exécution du contrat lorsque la
            géolocalisation est strictement nécessaire à la fonctionnalité demandée.
          </p>
          <p>
            Lorsque la localisation est utilisée pour une finalité facultative distincte, notamment
            publicitaire, elle nécessite une base légale appropriée et, lorsque requis, un
            consentement préalable spécifique.
          </p>

          <h3 :class="subheading">6.5. Messagerie et notifications de service</h3>
          <p>
            Nous traitons les messages et données de notification nécessaires à la communication
            entre les utilisateurs et au suivi des prestations.
          </p>
          <p>
            <span class="text-ink">Base légale&nbsp;:</span> exécution du contrat pour les échanges
            et notifications indispensables au service.
          </p>
          <p>
            Les notifications promotionnelles font l’objet d’un traitement distinct dans les
            conditions réglementaires applicables.
          </p>

          <h3 :class="subheading">6.6. Paiements et facturation</h3>
          <p>
            Nous traitons les informations nécessaires à l’exécution des paiements, aux
            remboursements, à la gestion des abonnements et à la facturation.
          </p>
          <p>
            <span class="text-ink">Bases légales&nbsp;:</span> exécution du contrat et respect des
            obligations légales, notamment comptables et fiscales.
          </p>

          <h3 :class="subheading">6.7. Gestion des incidents et des litiges</h3>
          <p>
            Nous traitons les données nécessaires au traitement des réclamations, des accidents, des
            signalements et des éventuelles demandes d’indemnisation.
          </p>
          <p>
            <span class="text-ink">Bases légales&nbsp;:</span> exécution du contrat, intérêt
            légitime à assurer la sécurité du service et à défendre nos droits, ou obligation
            légale selon la situation.
          </p>

          <h3 :class="subheading">6.8. Liste d’attente et newsletter</h3>
          <p>
            Nous utilisons les coordonnées volontairement communiquées pour enregistrer les
            inscriptions et envoyer les informations correspondant à la finalité acceptée.
          </p>
          <p>
            <span class="text-ink">Base légale&nbsp;:</span> consentement lorsque le traitement
            repose sur une inscription volontaire aux communications proposées.
          </p>
          <p>
            L’inscription à la liste d’attente et l’abonnement à des communications promotionnelles
            distinctes font l’objet de choix séparés lorsque leurs finalités sont différentes.
          </p>

          <h3 :class="subheading">6.9. Sécurité, prévention de la fraude et fonctionnement technique</h3>
          <p>
            Nous pouvons traiter des données techniques, de connexion et d’activité afin de protéger
            les comptes, détecter des comportements abusifs, prévenir la fraude et assurer la
            stabilité de nos services.
          </p>
          <p>
            <span class="text-ink">Base légale&nbsp;:</span> intérêt légitime à assurer la sécurité
            et la continuité de la plateforme, dans le respect des droits et libertés des personnes
            concernées.
          </p>

          <h3 :class="subheading">6.10. Mesure d’audience et amélioration des services</h3>
          <p>
            Nous pouvons analyser les performances techniques, la fréquentation et certains
            parcours afin d’améliorer le fonctionnement du site et de l’application.
          </p>
          <p>
            <span class="text-ink">Base légale&nbsp;:</span> consentement lorsque les outils
            utilisés l’exigent, ou intérêt légitime lorsqu’un traitement répond aux conditions
            réglementaires permettant ce fondement.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">7. Géolocalisation et confidentialité des promenades</h2>
          <p>
            La géolocalisation fait l’objet d’une attention particulière en raison de la précision
            des informations qu’elle peut révéler.
          </p>

          <h3 :class="subheading">7.1. Utilisation de la localisation</h3>
          <p>
            Lorsque la fonctionnalité est activée, Pawpy peut accéder à la localisation de
            l’appareil afin de proposer des résultats à proximité ou de permettre le suivi d’une
            promenade.
          </p>
          <p>
            Pour les fonctionnalités de recherche géographique ne nécessitant pas une position
            précise, nous privilégions un niveau de précision adapté au besoin.
          </p>
          <p>
            Lorsque cela est techniquement possible, une localisation saisie manuellement, telle
            qu’une adresse ou un quartier, peut être utilisée à la place de la position GPS.
          </p>

          <h3 :class="subheading">7.2. Suivi en temps réel</h3>
          <p>
            Lorsqu’une promenade est suivie par GPS, la collecte des positions nécessaires au suivi
            est limitée à la période de réalisation de cette promenade.
          </p>
          <p>
            Le suivi commence lorsque le promeneur active la fonctionnalité de démarrage prévue à
            cet effet et s’interrompt à la fin de la promenade.
          </p>
          <p>
            Si le suivi en arrière-plan est nécessaire pour maintenir la continuité du trajet
            lorsque l’application n’est plus au premier plan, cette fonctionnalité doit être
            explicitement présentée et soumise aux autorisations techniques correspondantes.
          </p>
          <p>
            Nous ne collectons pas la position des promeneurs en permanence en dehors des
            fonctionnalités qui exigent une localisation active.
          </p>

          <h3 :class="subheading">7.3. Partage des données</h3>
          <p>
            Pendant une promenade, la position et le trajet peuvent être rendus accessibles au
            propriétaire concerné afin de lui permettre de suivre le déroulement de la prestation.
          </p>
          <p>
            L’accès est limité aux personnes autorisées et aux besoins de gestion, de sécurité ou
            d’assistance directement liés à la promenade.
          </p>
          <p>Les trajets détaillés ne sont pas accessibles publiquement.</p>
          <p>
            Nous ne vendons pas les données de géolocalisation et ne les transmettons pas à des
            partenaires publicitaires.
          </p>

          <h3 :class="subheading">7.4. Autorisations du téléphone</h3>
          <p>
            L’accès à la localisation est soumis aux mécanismes d’autorisation des systèmes iOS et
            Android.
          </p>
          <p>
            Les utilisateurs peuvent modifier ou retirer ces autorisations depuis les réglages de
            leur appareil.
          </p>
          <p>
            Le refus de localisation précise n’empêche pas nécessairement l’utilisation des autres
            fonctionnalités de Pawpy. En revanche, certaines fonctionnalités, notamment le suivi
            GPS d’une promenade, peuvent ne pas être disponibles sans l’autorisation nécessaire à
            leur fonctionnement.
          </p>
          <p>
            L’autorisation technique délivrée par le système d’exploitation ne constitue pas, à
            elle seule, un consentement valable à d’autres traitements facultatifs.
          </p>

          <h3 :class="subheading">7.5. Conservation de la localisation</h3>
          <p>
            Les données GPS détaillées ne sont conservées que pendant la durée nécessaire au suivi,
            à la vérification des prestations et au traitement des éventuels incidents.
          </p>
          <p>
            <span class="text-ink">Durée de conservation des traces GPS détaillées&nbsp;:</span> à
            déterminer selon la durée réellement appliquée et justifiée.
          </p>
          <p>
            Les informations synthétiques relatives à une promenade, comme sa date, sa durée ou son
            statut, peuvent être conservées séparément selon les durées applicables à l’historique
            des prestations.
          </p>
          <p>
            En cas d’incident, les éléments de localisation strictement nécessaires à l’instruction
            du dossier peuvent faire l’objet d’une conservation distincte pendant la durée
            justifiée par celui-ci.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">8. Confidentialité des profils et des échanges</h2>
          <p>
            Nous distinguons les informations privées des informations destinées à faciliter la
            mise en relation.
          </p>
          <p>
            Les profils peuvent présenter aux autres utilisateurs certaines informations
            nécessaires à l’évaluation d’une demande ou d’une proposition de promenade, notamment
            le prénom, la photographie choisie, le quartier d’intervention, les compétences, les
            certifications affichables et les évaluations.
          </p>
          <p>
            Les coordonnées personnelles, les justificatifs d’identité, les documents de
            certification non destinés à être publiés et les informations de paiement ne sont pas
            rendus publics.
          </p>
          <p>
            Les informations concernant le chien et les consignes de promenade sont accessibles
            uniquement dans la mesure nécessaire à la préparation et à la réalisation de la
            prestation.
          </p>
          <p>
            Les messages échangés entre propriétaires et promeneurs sont accessibles aux
            participants concernés. Les membres habilités de l’équipe Pawpy peuvent y accéder
            uniquement dans des circonstances justifiées et encadrées.
          </p>
          <p>Nous ne rendons pas publiques les conversations privées ni les traces GPS détaillées.</p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">9. Paiements et données financières</h2>
          <p>
            Lorsque les paiements sont activés dans Pawpy, ils sont pris en charge par un
            prestataire spécialisé.
          </p>
          <p>
            Le prestataire retenu peut être Stripe ou un autre fournisseur de services de paiement
            identifié au moment de la mise en production.
          </p>
          <p>
            Nous transmettons uniquement les informations nécessaires au traitement des
            transactions, notamment les identifiants de réservation, les montants et les données
            indispensables à la facturation.
          </p>
          <p>
            Nous conservons les références et les états de paiement nécessaires à l’exécution des
            prestations, au suivi des remboursements, à la résolution des incidents et au respect
            de nos obligations.
          </p>
          <p>
            Nous ne stockons pas les cryptogrammes de sécurité ni les numéros complets de cartes
            bancaires.
          </p>
          <p>
            Les données traitées directement par le prestataire de paiement peuvent également
            relever de sa propre politique de confidentialité, notamment lorsqu’il intervient en
            qualité de responsable de traitement pour ses obligations réglementaires.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">10. Communications électroniques et notifications</h2>
          <p>
            Nous distinguons les communications indispensables à l’utilisation de Pawpy des
            communications promotionnelles facultatives.
          </p>

          <h3 :class="subheading">10.1. Communications nécessaires au service</h3>
          <p>
            Nous pouvons envoyer des communications relatives à la création du compte, à son
            authentification, à la sécurité, aux réservations, aux annulations, aux paiements, aux
            promenades ou aux incidents.
          </p>
          <p>Ces messages sont nécessaires au fonctionnement du service demandé.</p>
          <p>Ils ne sont pas conditionnés à un abonnement à la newsletter.</p>

          <h3 :class="subheading">10.2. Newsletter et communications promotionnelles</h3>
          <p>
            Nous pouvons proposer une newsletter contenant des actualités, des conseils, des
            informations sur les évolutions de Pawpy ou des communications relatives à nos offres.
          </p>
          <p>
            Lorsque le consentement est requis, ces messages ne sont envoyés qu’aux personnes ayant
            expressément accepté de les recevoir.
          </p>
          <p>
            Nous ne considérons pas l’acceptation de nos conditions générales ou la création d’un
            compte comme un consentement automatique à la prospection commerciale.
          </p>
          <p>
            Chaque communication promotionnelle comporte un moyen simple de désinscription ou
            d’opposition.
          </p>

          <h3 :class="subheading">10.3. Notifications mobiles</h3>
          <p>
            L’application peut utiliser des notifications pour informer les utilisateurs des
            événements importants liés à leur compte ou à leurs promenades.
          </p>
          <p>
            Les notifications nécessitant une autorisation du système d’exploitation sont soumises
            à cette autorisation.
          </p>
          <p>
            Les notifications promotionnelles sont distinctes des notifications indispensables au
            fonctionnement du service et respectent les règles applicables à la prospection.
          </p>
          <p>
            Les paramètres du téléphone et, lorsque cette option est disponible, ceux de
            l’application permettent de gérer les préférences de notification.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">11. Cookies, traceurs et mesure d’audience</h2>
          <p>
            Le site internet et l’application peuvent utiliser des cookies, identifiants techniques
            ou technologies similaires.
          </p>
          <p>Ces dispositifs répondent à plusieurs finalités possibles.</p>

          <h3 :class="subheading">11.1. Traceurs nécessaires</h3>
          <p>
            Certains traceurs permettent d’assurer le fonctionnement technique, la sécurité,
            l’authentification ou la mémorisation des préférences indispensables au service
            demandé.
          </p>
          <p>
            Lorsqu’ils répondent aux conditions légales d’exemption, leur utilisation ne nécessite
            pas de consentement préalable.
          </p>

          <h3 :class="subheading">11.2. Mesure d’audience</h3>
          <p>
            Nous pouvons utiliser des outils statistiques pour mesurer la fréquentation du site et
            de l’application, comprendre les difficultés rencontrées et améliorer leur
            fonctionnement.
          </p>
          <p>
            Lorsque ces outils utilisent des traceurs soumis au consentement, ils ne sont activés
            qu’après son recueil.
          </p>
          <p>
            Certains outils strictement limités à la mesure d’audience peuvent être exemptés de
            consentement si l’ensemble des conditions réglementaires est respecté.
          </p>

          <h3 :class="subheading">11.3. Traceurs publicitaires</h3>
          <p>
            Si Pawpy utilise des outils de mesure de campagnes, de personnalisation publicitaire ou
            de suivi entre différents services, les traceurs concernés sont soumis au consentement
            préalable lorsque celui-ci est légalement requis.
          </p>
          <p>
            Ces traceurs ne sont pas activés par défaut dans les cas où un consentement est
            obligatoire.
          </p>

          <h3 :class="subheading">11.4. Gestion des préférences</h3>
          <p>
            Lorsqu’un consentement est nécessaire, les utilisateurs peuvent accepter ou refuser les
            traceurs avec une facilité équivalente.
          </p>
          <p>Ils peuvent ensuite modifier ou retirer leur choix à tout moment.</p>
          <p>
            Les modalités de gestion des préférences sont accessibles depuis le dispositif prévu à
            cet effet sur pawpy.fr, lorsque des traceurs soumis au consentement sont utilisés.
          </p>
          <p>
            Les informations détaillées sur les traceurs effectivement utilisés, leurs
            fournisseurs, leurs finalités et leurs durées de conservation sont disponibles dans la
            politique de cookies ou dans le gestionnaire de préférences du site.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">12. Hébergement, destinataires et sous-traitants</h2>
          <p>
            Les données personnelles sont accessibles uniquement aux personnes autorisées et aux
            prestataires nécessaires au fonctionnement de Pawpy.
          </p>
          <p>
            En interne, leur accès est limité aux membres de l’équipe habilités selon leurs
            responsabilités et les besoins du service.
          </p>
          <p>
            Selon les fonctionnalités effectivement utilisées, les données peuvent également être
            traitées par des prestataires intervenant dans l’hébergement, la gestion des bases de
            données, l’authentification, la messagerie, la cartographie, les paiements, les
            notifications, l’envoi de communications ou l’analyse technique.
          </p>

          <h3 :class="subheading">12.1. Hébergement du site internet</h3>
          <p>
            L’hébergement envisagé pour le site pawpy.fr est assuré par le prestataire suivant,
            sous réserve de confirmation de son utilisation effective.
          </p>
          <dl class="flex flex-col gap-[4px]">
            <div v-for="row in host" :key="row.label">
              <dt class="inline text-ink">{{ row.label }}&nbsp;:</dt>
              {{ ' ' }}
              <dd class="inline">
                <a v-if="row.href" :href="row.href" v-bind="externalAttrs(row.href)" :class="link">{{ row.value }}</a>
                <template v-else>{{ row.value }}</template>
              </dd>
            </div>
          </dl>
          <p>
            Lorsque le site ou certaines de ses fonctionnalités reposent sur d’autres
            infrastructures, les prestataires effectivement concernés seront identifiés dans la
            documentation applicable.
          </p>

          <h3 :class="subheading">12.2. Autres prestataires techniques</h3>
          <p>
            L’écosystème Pawpy peut faire intervenir des services externes pour
            l’authentification, la messagerie, les notifications, les paiements, la cartographie
            et la gestion des communications.
          </p>
          <p>
            Google peut notamment intervenir pour l’authentification des utilisateurs lorsque
            Google Sign-In est utilisé.
          </p>
          <p>
            Les solutions techniques envisagées dans le cadre du développement comprennent
            également des services de messagerie, de paiement et de cartographie. Leurs
            fournisseurs définitifs seront identifiés lors de leur intégration effective.
          </p>
          <p>
            Les prestataires agissant pour notre compte sont sélectionnés au regard des garanties
            appropriées en matière de confidentialité et de sécurité.
          </p>
          <p>
            Lorsque la réglementation l’exige, leurs interventions sont encadrées par des accords
            conformes à l’article 28 du RGPD.
          </p>
          <p>
            Certaines données sont également communiquées aux autres utilisateurs dans les limites
            nécessaires à la mise en relation et à l’exécution des promenades.
          </p>
          <p>
            En cas de sinistre couvert par un dispositif d’assurance effectivement applicable, les
            informations nécessaires à l’instruction du dossier peuvent être communiquées à
            l’assureur ou aux intervenants autorisés.
          </p>
          <p>
            Nous pouvons également transmettre certaines informations aux autorités compétentes
            lorsque la loi l’impose ou lorsqu’une demande juridiquement fondée le nécessite.
          </p>
          <p>Nous ne vendons pas les données personnelles des utilisateurs à des tiers.</p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">13. Hébergement et transferts internationaux</h2>
          <p>
            Nous cherchons à privilégier des solutions techniques offrant des garanties adaptées à
            la protection des données personnelles.
          </p>
          <p>
            L’hébergement envisagé du site internet repose sur Hyperion Cloud SAS, dont le siège
            social est situé en France.
          </p>
          <p>
            La localisation effective des données dépend néanmoins des infrastructures et des
            prestataires réellement utilisés.
          </p>
          <p>
            L’utilisation de certains prestataires internationaux, notamment dans les domaines de
            l’authentification, des paiements, de la cartographie, des notifications ou de
            l’analyse, peut entraîner des transferts de données en dehors de l’Espace économique
            européen.
          </p>
          <p>
            Lorsque de tels transferts ont lieu, nous veillons à ce qu’ils reposent sur un
            mécanisme légal applicable, notamment une décision d’adéquation de la Commission
            européenne ou des garanties appropriées telles que les clauses contractuelles types,
            accompagnées si nécessaire de mesures complémentaires.
          </p>
          <p>
            Nous pouvons communiquer des informations sur les destinataires concernés et les
            garanties encadrant ces transferts sur demande adressée à
            <a :href="email.href" :class="link">{{ email.value }}</a>.
          </p>
          <p>
            Les pays de destination et les garanties effectivement applicables seront précisés à
            partir de la configuration technique définitive des services.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">14. Durées de conservation</h2>
          <p>
            Nous conservons les données personnelles uniquement pendant la durée nécessaire aux
            finalités pour lesquelles elles ont été collectées.
          </p>
          <p>
            Les durées peuvent varier selon la catégorie des données, leur utilisation et les
            obligations légales applicables.
          </p>

          <h3 :class="subheading">14.1. Comptes utilisateurs</h3>
          <p>Les données de compte sont conservées pendant la durée d’activité du compte.</p>
          <p>
            En cas de suppression, les données ne faisant l’objet d’aucune obligation légale ou
            d’aucun motif légitime de conservation sont supprimées dans un délai cible de trente
            jours après la validation de la demande.
          </p>
          <p>
            Ce délai ne s’applique pas aux informations devant être conservées pour respecter une
            obligation légale ou défendre des droits.
          </p>

          <h3 :class="subheading">14.2. Comptes inactifs</h3>
          <p>
            Les comptes n’ayant fait l’objet d’aucune connexion pendant trois ans peuvent être
            soumis à une procédure de suppression pour inactivité.
          </p>
          <p>
            Un message de prévenance est adressé au titulaire avant la suppression, lorsque cela
            est possible.
          </p>
          <p>
            Les données faisant l’objet d’une obligation de conservation distincte sont traitées
            conformément à cette obligation.
          </p>

          <h3 :class="subheading">14.3. Profils et certifications</h3>
          <p>Les informations de profil sont conservées pendant la durée du compte.</p>
          <p>
            Les justificatifs d’identité et de certification sont conservés uniquement pendant la
            durée nécessaire à leur vérification, à leur validité et aux contrôles justifiés par le
            fonctionnement du service.
          </p>
          <p>
            La durée exacte de conservation des justificatifs est déterminée selon la procédure de
            vérification effectivement retenue.
          </p>

          <h3 :class="subheading">14.4. Réservations et promenades</h3>
          <p>
            L’historique des réservations et des promenades est conservé pendant la durée
            nécessaire à la gestion de la relation contractuelle et au suivi des prestations.
          </p>
          <p>
            Les informations nécessaires à la preuve d’une transaction, au traitement d’une
            réclamation ou au respect d’une obligation légale peuvent être conservées plus
            longtemps lorsque cela est justifié.
          </p>

          <h3 :class="subheading">14.5. Géolocalisation</h3>
          <p>
            Les traces GPS détaillées font l’objet d’une conservation limitée, distincte de celle
            des informations synthétiques concernant les promenades.
          </p>
          <p>
            La durée exacte de conservation des traces GPS sera déterminée en fonction des
            nécessités réelles de suivi, de sécurité et de gestion des incidents, avant
            l’activation du dispositif.
          </p>
          <p>
            Les éléments nécessaires au traitement d’un incident peuvent être isolés et conservés
            pendant la durée justifiée par le dossier concerné.
          </p>

          <h3 :class="subheading">14.6. Messages et pièces jointes</h3>
          <p>
            Les messages et documents échangés dans l’application sont conservés pendant la durée
            nécessaire au fonctionnement de la messagerie et à la relation contractuelle.
          </p>
          <p>
            Lorsqu’un compte est supprimé, les données associées sont effacées ou anonymisées, sauf
            si leur conservation est nécessaire à une obligation légale, à la gestion d’un litige
            ou à la protection des droits d’autres personnes.
          </p>
          <p>
            Les modalités de conservation après clôture du compte seront précisées selon le
            fonctionnement réel de la messagerie.
          </p>

          <h3 :class="subheading">14.7. Paiements et documents comptables</h3>
          <p>
            Les documents comptables et pièces justificatives soumis à l’obligation légale
            correspondante sont conservés pendant dix ans.
          </p>
          <p>
            Les autres données de transaction sont conservées selon leur finalité, les obligations
            applicables et les délais nécessaires au traitement des réclamations.
          </p>

          <h3 :class="subheading">14.8. Incidents et réclamations</h3>
          <p>
            Les informations relatives aux incidents, sinistres et litiges sont conservées pendant
            la durée nécessaire à leur traitement, puis, lorsque cela est justifié, pendant les
            délais de prescription applicables.
          </p>
          <p>Les justificatifs dont la conservation n’est plus nécessaire sont supprimés.</p>

          <h3 :class="subheading">14.9. Liste d’attente et newsletter</h3>
          <p>
            Les données utilisées pour les communications promotionnelles sont conservées jusqu’au
            retrait du consentement ou, en principe, pendant une durée maximale de trois ans à
            compter de la collecte ou du dernier contact actif émanant de la personne concernée.
          </p>
          <p>
            Les données exclusivement liées à une liste d’attente sont conservées pendant la durée
            nécessaire à la gestion de cette liste et aux communications auxquelles la personne a
            accepté de participer.
          </p>
          <p>La désinscription entraîne l’arrêt des envois promotionnels concernés.</p>

          <h3 :class="subheading">14.10. Données techniques</h3>
          <p>
            Les journaux techniques sont conservés pendant une durée proportionnée aux besoins de
            sécurité, de maintenance et de prévention des incidents.
          </p>
          <p>
            La durée maximale envisagée pour les journaux techniques est de douze mois, sous
            réserve des besoins particuliers légalement justifiés et de la configuration effective
            des services.
          </p>

          <h3 :class="subheading">14.11. Preuves de consentement</h3>
          <p>
            Les éléments permettant de démontrer le recueil ou le retrait d’un consentement sont
            conservés pendant la durée nécessaire à la justification des traitements et, lorsque
            cela est pertinent, pendant les délais de prescription applicables.
          </p>
          <p>
            Une durée de référence de cinq ans après la fin du traitement concerné peut être
            retenue lorsqu’elle est justifiée et proportionnée.
          </p>
          <p>Ces informations ne sont pas réutilisées pour des communications promotionnelles.</p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">15. Sécurité des données personnelles</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles adaptées à la nature
            des données traitées et aux risques associés.
          </p>
          <p>
            Notre démarche de sécurité repose notamment sur la protection des échanges, le contrôle
            des accès, la limitation des habilitations, la sécurisation des mécanismes
            d’authentification et la surveillance des événements techniques.
          </p>
          <p>
            Les communications sensibles utilisent des protocoles sécurisés, notamment HTTPS et
            TLS.
          </p>
          <p>
            Nous veillons également à protéger les identifiants et jetons d’authentification, à
            sécuriser les environnements de stockage et à organiser les sauvegardes nécessaires à
            la continuité du service.
          </p>
          <p>L’accès aux données est limité aux personnes dont les missions le justifient.</p>
          <p>
            Les données particulièrement sensibles pour la sécurité des utilisateurs, telles que
            les justificatifs d’identité, les conversations privées et les positions géographiques
            précises, font l’objet de mesures de protection adaptées.
          </p>
          <p>
            Nous réévaluons nos dispositifs de sécurité au regard de l’évolution des risques et des
            fonctionnalités.
          </p>
          <p>
            En cas de violation de données personnelles, nous appliquons les obligations prévues
            par les articles 33 et 34 du RGPD, notamment la documentation de l’incident, la
            notification à la CNIL lorsque celle-ci est requise et l’information des personnes
            concernées en cas de risque élevé pour leurs droits et libertés.
          </p>
          <p>
            Aucun système informatique ne permettant de garantir une absence absolue de risque,
            nous poursuivons une démarche continue de prévention et d’amélioration de la sécurité.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">16. Droits des personnes et suppression du compte</h2>
          <p>
            Conformément au RGPD, les personnes concernées disposent de droits sur leurs données
            personnelles, dans les conditions prévues par la réglementation.
          </p>

          <h3 :class="subheading">16.1. Droit d’accès</h3>
          <p>
            Toute personne peut demander si des données personnelles la concernant sont traitées
            par Pawpy et, le cas échéant, obtenir les informations prévues par la réglementation
            ainsi qu’une copie de ces données.
          </p>

          <h3 :class="subheading">16.2. Droit de rectification</h3>
          <p>
            Toute personne peut demander la correction de données inexactes ou la mise à jour
            d’informations incomplètes.
          </p>

          <h3 :class="subheading">16.3. Droit à l’effacement</h3>
          <p>
            Toute personne peut demander la suppression des données personnelles la concernant
            lorsque les conditions prévues par l’article 17 du RGPD sont réunies.
          </p>
          <p>
            Certaines informations peuvent néanmoins être conservées lorsqu’une obligation légale
            ou un autre motif juridiquement valable le justifie.
          </p>

          <h3 :class="subheading">16.4. Droit d’opposition</h3>
          <p>
            Toute personne peut s’opposer aux traitements fondés sur notre intérêt légitime pour des
            raisons tenant à sa situation particulière, dans les conditions prévues par la
            réglementation.
          </p>
          <p>
            L’opposition à la prospection commerciale peut être exercée à tout moment, sans
            justification.
          </p>

          <h3 :class="subheading">16.5. Droit à la limitation</h3>
          <p>
            Toute personne peut demander la limitation du traitement de ses données dans les cas
            prévus par le RGPD.
          </p>

          <h3 :class="subheading">16.6. Droit à la portabilité</h3>
          <p>
            Lorsque les conditions légales sont réunies, toute personne peut demander à recevoir
            les données qu’elle a fournies dans un format structuré, couramment utilisé et lisible
            par machine, ou demander leur transmission à un autre responsable du traitement lorsque
            cela est techniquement possible.
          </p>

          <h3 :class="subheading">16.7. Retrait du consentement</h3>
          <p>
            Lorsque le traitement repose sur le consentement, celui-ci peut être retiré à tout
            moment.
          </p>
          <p>Ce retrait n’affecte pas la licéité des traitements effectués avant son intervention.</p>

          <h3 :class="subheading">16.8. Suppression du compte Pawpy</h3>
          <p>Les utilisateurs peuvent demander la suppression de leur compte et des données associées.</p>
          <p>
            Cette demande peut être adressée à
            <a :href="email.href" :class="link">{{ email.value }}</a>, en précisant l’adresse
            électronique associée au compte.
          </p>
          <p>
            Lorsque la fonctionnalité est disponible, la suppression peut également être demandée
            directement depuis les paramètres du compte dans l’application.
          </p>
          <p>
            La suppression du compte entraîne l’effacement des informations personnelles qui ne
            doivent plus être conservées, y compris les données issues de la connexion Google, les
            informations de profil et les contenus associés lorsque leur conservation n’est pas
            légalement justifiée.
          </p>
          <p>
            Certaines données peuvent être conservées de manière limitée lorsqu’elles sont
            nécessaires au respect d’une obligation légale, à la prévention d’une fraude, au
            traitement d’un litige ou à la défense d’un droit.
          </p>
          <p>
            La demande de suppression ne met pas nécessairement fin aux obligations financières ou
            contractuelles déjà nées, notamment lorsqu’une prestation reste en cours de règlement.
          </p>
          <p>
            Lorsque la suppression est effective, une confirmation peut être transmise à l’adresse
            électronique associée au compte.
          </p>

          <h3 :class="subheading">16.9. Révocation de la connexion Google</h3>
          <p>
            Les utilisateurs peuvent retirer l’autorisation accordée à Pawpy depuis leur compte
            Google.
          </p>
          <p>
            Cette révocation empêche l’utilisation future de l’autorisation concernée, mais doit
            être distinguée de la demande de suppression du compte Pawpy.
          </p>

          <h3 :class="subheading">16.10. Modalités de réponse</h3>
          <p>Les demandes relatives à l’exercice des droits peuvent être adressées à :</p>
          <div class="flex flex-col gap-[4px]">
            <p class="text-ink">Pawpy — Carla Coelho</p>
            <dl class="flex flex-col gap-[4px]">
              <div v-for="row in rightsContact" :key="row.label">
                <dt class="inline text-ink">{{ row.label }}&nbsp;:</dt>
                {{ ' ' }}
                <dd class="inline">
                  <a v-if="row.href" :href="row.href" :class="link">{{ row.value }}</a>
                  <template v-else>{{ row.value }}</template>
                </dd>
              </div>
            </dl>
          </div>
          <p>
            Nous répondons dans les meilleurs délais et, en principe, dans un délai maximal d’un
            mois à compter de la réception de la demande.
          </p>
          <p>
            Ce délai peut être prolongé de deux mois supplémentaires lorsque la complexité ou le
            nombre des demandes le justifie. La personne concernée en est alors informée dans le
            premier mois.
          </p>
          <p>L’exercice des droits est en principe gratuit.</p>
          <p>
            Nous pouvons demander des informations complémentaires lorsque cela est nécessaire pour
            confirmer l’identité du demandeur, sans imposer systématiquement la transmission d’un
            document d’identité.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">17. Recommandations automatisées et décisions algorithmiques</h2>
          <p>
            Pawpy peut utiliser des mécanismes automatisés afin de faciliter la mise en relation
            entre propriétaires et promeneurs.
          </p>
          <p>
            Ces mécanismes peuvent prendre en compte des critères liés à la localisation, aux
            disponibilités, aux caractéristiques des promenades, aux compétences déclarées, aux
            certifications, aux évaluations et, le cas échéant, aux modalités de visibilité prévues
            par les offres proposées.
          </p>
          <p>
            Leur objectif est de présenter des résultats pertinents et de simplifier la recherche de
            profils adaptés.
          </p>
          <p>
            Nous distinguons ces recommandations des décisions entièrement automatisées produisant
            des effets juridiques ou affectant significativement les personnes au sens de l’article
            22 du RGPD.
          </p>
          <p>
            Si Pawpy devait mettre en œuvre un traitement relevant de cet article, une information
            spécifique serait fournie, accompagnée des garanties et droits exigés par la
            réglementation.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">18. Protection des mineurs</h2>
          <p>
            Les services Pawpy sont destinés aux personnes disposant de la capacité nécessaire pour
            créer un compte et contracter dans les conditions prévues par nos conditions générales
            d’utilisation.
          </p>
          <p>
            L’âge minimum d’inscription à l’application sera précisé dans les conditions générales
            d’utilisation définitives.
          </p>
          <p>
            Nous ne cherchons pas à collecter sciemment des données personnelles concernant des
            enfants en dehors des situations autorisées par la réglementation.
          </p>
          <p>
            Si nous constatons qu’un compte a été créé ou que des données ont été collectées en
            méconnaissance des règles applicables, nous prenons les mesures appropriées pour
            régulariser la situation ou supprimer les données concernées.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">19. Liens et services externes</h2>
          <p>
            Le site pawpy.fr et l’application Pawpy peuvent contenir des liens vers des sites
            internet, plateformes sociales ou services exploités par des tiers.
          </p>
          <p>
            Ces services disposent de leurs propres politiques de confidentialité et peuvent
            traiter des données selon leurs règles respectives.
          </p>
          <p>Nous ne maîtrisons ni leur contenu ni leurs éventuelles modifications.</p>
          <p>
            L’existence d’un lien hypertexte ne constitue pas nécessairement une approbation ou un
            partenariat avec le service concerné.
          </p>
          <p>
            Nous invitons les utilisateurs à consulter les politiques de confidentialité des
            services externes lorsqu’ils y accèdent.
          </p>
          <p>
            Lorsque des contenus tiers sont intégrés directement dans nos interfaces, nous veillons
            à respecter les obligations applicables aux données et traceurs associés.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">20. Modifications de la politique de confidentialité</h2>
          <p>
            Nous pouvons modifier la présente politique afin de tenir compte de l’évolution de
            Pawpy, de ses fonctionnalités, de son organisation technique ou des exigences
            réglementaires.
          </p>
          <p>Chaque nouvelle version indique sa date de dernière mise à jour.</p>
          <p>
            Lorsque les changements sont substantiels, nous mettons en œuvre les mesures
            d’information nécessaires par le site, l’application ou les communications
            électroniques appropriées.
          </p>
          <p>
            Si une nouvelle utilisation des données nécessite un consentement, nous procédons à son
            recueil avant de mettre en œuvre le traitement concerné.
          </p>
          <p>
            La version en vigueur reste accessible depuis le site internet
            <a href="https://pawpy.fr" :class="link">https://pawpy.fr</a> et, lorsque l’application
            est disponible, depuis les espaces d’information de celle-ci.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">21. Réclamation auprès de la CNIL</h2>
          <p>
            Toute personne estimant que ses données personnelles ne sont pas traitées conformément
            à la réglementation peut nous contacter afin de nous faire part de sa demande.
          </p>
          <p>
            Elle peut également introduire une réclamation auprès de la Commission nationale de
            l’informatique et des libertés.
          </p>
          <div class="flex flex-col gap-[4px]">
            <p class="text-ink">Commission nationale de l’informatique et des libertés (CNIL)</p>
            <p>3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07</p>
            <p>
              <span class="text-ink">Site internet&nbsp;:</span> <a href="https://www.cnil.fr" v-bind="externalAttrs('https://www.cnil.fr')" :class="link">https://www.cnil.fr</a>
            </p>
          </div>
          <p>
            L’exercice de ce droit ne nécessite pas d’avoir préalablement engagé une démarche
            auprès de Pawpy.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">22. Contact</h2>
          <p>
            Pour toute question relative à cette politique, aux traitements de données personnelles
            ou à l’exercice des droits, nous pouvons être contactés aux coordonnées suivantes.
          </p>
          <div class="flex flex-col gap-[4px]">
            <p class="text-ink">Pawpy</p>
            <dl class="flex flex-col gap-[4px]">
              <div v-for="row in contact" :key="row.label">
                <dt class="inline text-ink">{{ row.label }}&nbsp;:</dt>
                {{ ' ' }}
                <dd class="inline">
                  <a v-if="row.href" :href="row.href" :class="link">{{ row.value }}</a>
                  <template v-else>{{ row.value }}</template>
                </dd>
              </div>
            </dl>
          </div>
          <p>
            Nous accordons une attention particulière à chaque demande relative à la protection des
            données personnelles et nous engageons à y répondre conformément à la réglementation en
            vigueur.
          </p>
        </section>

        <p class="text-center font-sans text-caption text-ink-40">
          © 2026 Pawpy. Tous droits réservés.
        </p>
      </div>
    </div>
  </SheetOverlay>
</template>
