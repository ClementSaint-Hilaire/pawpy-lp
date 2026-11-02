<script setup>
import SheetOverlay from '@/components/SheetOverlay.vue'
import { useRouteSheet } from '@/composables/useRouteSheet'
import { externalAttrs } from '@/utils/links'

// Les valeurs entre crochets restent à fournir : elles sont affichées telles
// quelles plutôt que remplacées par une information supposée.
const address = '40 rue du Chemin Vert, 75011 Paris'
const email = { value: 'contact@pawpy.fr', href: 'mailto:contact@pawpy.fr' }

const controller = [
  { label: 'Nom commercial', value: 'Pawpy' },
  { label: 'Responsable du traitement', value: '[Identité complète de la personne physique ou dénomination sociale de l’entité éditrice]' },
  { label: 'Adresse', value: address },
  { label: 'Adresse électronique', ...email },
  { label: 'Site internet', value: 'https://pawpy.fr', href: 'https://pawpy.fr' },
]

const processors = [
  { label: 'Prestataire d’hébergement', value: 'Hyperion Cloud' },
  { label: 'Prestataire de mesure d’audience', value: 'Google Analytics' },
]

const rightsContact = [
  { label: 'Adresse électronique', ...email },
  { label: 'Adresse postale', value: address },
]

// Mêmes classes que les mentions légales, plus un cran d'intitulé pour les
// sous-parties (3.1, 3.2…) : le blanc au-dessus les détache du paragraphe
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
        <p class="font-sans text-caption text-ink-40">Dernière mise à jour : 12 octobre 2026</p>
      </div>

      <div class="flex w-full max-w-[682px] flex-col gap-[32px] font-body text-label text-ink-60">
        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">1. Introduction</h2>
          <p>
            Chez Pawpy, nous accordons une importance particulière à la protection de la vie
            privée et des données personnelles.
          </p>
          <p>
            La confiance et la transparence constituent des engagements fondamentaux de notre
            projet. Ces principes s’appliquent également à la manière dont nous collectons,
            utilisons, conservons et protégeons les informations personnelles des visiteurs de
            notre site.
          </p>
          <p>
            La présente politique de confidentialité explique les traitements de données effectués
            dans le cadre de l’utilisation du site
            <a href="https://pawpy.fr" :class="link">https://pawpy.fr</a>, conformément au
            Règlement (UE) 2016/679 du 27 avril 2016, dit Règlement général sur la protection des
            données (RGPD), ainsi qu’à la loi française Informatique et Libertés.
          </p>
          <p>
            Elle s’applique exclusivement au site internet pawpy.fr dans sa phase actuelle de
            présentation et de pré-lancement. Les traitements liés à la future application Pawpy
            feront l’objet d’une information spécifique avant sa mise à disposition.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">2. Responsable du traitement</h2>
          <p>
            Le responsable du traitement est la personne physique ou morale qui détermine les
            finalités et les moyens de traitement des données personnelles collectées sur
            pawpy.fr.
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
            Pour toute question relative à la protection des données ou à l’exercice des droits,
            nous pouvons être contactés à l’adresse indiquée ci-dessus.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">3. Données personnelles collectées</h2>
          <p>
            Nous appliquons un principe de minimisation des données. Seules les informations
            nécessaires aux finalités décrites dans la présente politique doivent être collectées.
          </p>

          <h3 :class="subheading">3.1. Données communiquées volontairement</h3>
          <p>
            Lors d’une inscription à notre liste d’attente ou à notre newsletter, nous pouvons
            collecter l’adresse électronique du visiteur, ainsi que, si le formulaire le prévoit,
            son prénom et son profil déclaré, notamment propriétaire de chien ou promeneur.
          </p>
          <p>
            Lorsqu’un visiteur nous contacte, nous traitons également les informations figurant
            dans son message et les coordonnées nécessaires pour lui répondre.
          </p>
          <p>
            Les champs obligatoires sont identifiés comme tels au moment de la collecte. Les autres
            informations sont facultatives.
          </p>

          <h3 :class="subheading">3.2. Données techniques et de navigation</h3>
          <p>
            Lors de la consultation du site, certaines informations techniques peuvent être
            traitées pour assurer son fonctionnement et sa sécurité.
          </p>
          <p>
            Ces informations peuvent comprendre l’adresse IP, la date et l’heure des requêtes, les
            pages consultées, le type de navigateur, le système d’exploitation et les données
            techniques relatives aux éventuelles erreurs.
          </p>
          <p>
            Selon les outils effectivement activés sur le site et les préférences exprimées par les
            visiteurs, certaines données peuvent également servir à mesurer la fréquentation et à
            améliorer l’expérience de navigation.
          </p>

          <h3 :class="subheading">3.3. Données relatives au consentement</h3>
          <p>
            Lorsque nous nous appuyons sur le consentement, nous conservons les éléments
            nécessaires à sa traçabilité.
          </p>
          <p>
            Ces informations peuvent notamment inclure la date du consentement, sa finalité, la
            version du formulaire d’information présenté et la date d’un éventuel retrait.
          </p>
          <p>
            Ces éléments servent exclusivement à respecter et à démontrer nos obligations en
            matière de protection des données.
          </p>

          <h3 :class="subheading">3.4. Données non collectées dans le cadre de la landing page</h3>
          <p>
            La landing page n’a pas vocation à collecter de données bancaires, de documents
            d’identité, de données de santé ou de données de géolocalisation GPS précises liées aux
            promenades.
          </p>
          <p>
            Ces éventuels traitements relèveront de fonctionnalités distinctes de la future
            application Pawpy et nécessiteront une information spécifique.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">4. Finalités et bases légales des traitements</h2>
          <p>
            Chaque traitement de données personnelles repose sur une finalité déterminée et sur une
            base légale définie par l’article 6 du RGPD.
          </p>

          <h3 :class="subheading">4.1. Gestion de la liste d’attente</h3>
          <p>
            Lorsqu’un visiteur choisit de rejoindre la liste d’attente de Pawpy, nous utilisons les
            informations communiquées pour enregistrer son inscription, confirmer sa prise en
            compte et lui transmettre les informations directement liées au lancement auquel il a
            demandé à être associé.
          </p>
          <p>
            <span class="text-ink">Base légale&nbsp;:</span> consentement de la personne
            concernée, conformément à l’article 6, paragraphe 1, point a), du RGPD.
          </p>
          <p>L’inscription reste volontaire et le consentement peut être retiré à tout moment.</p>
          <p>
            L’inscription à la liste d’attente n’entraîne pas automatiquement l’inscription à des
            communications promotionnelles indépendantes de cette finalité.
          </p>

          <h3 :class="subheading">4.2. Newsletter et communications promotionnelles</h3>
          <p>
            Lorsque le visiteur accepte expressément de recevoir notre newsletter, nous pouvons
            utiliser son adresse électronique pour lui adresser des actualités concernant Pawpy,
            des informations sur nos services, nos engagements et les évolutions du projet.
          </p>
          <p>
            <span class="text-ink">Base légale&nbsp;:</span> consentement explicite, libre,
            spécifique, éclairé et univoque.
          </p>
          <p>
            Ce consentement est recueilli par une action positive dédiée, indépendamment des autres
            finalités lorsque celles-ci sont proposées séparément.
          </p>
          <p>
            Aucune inscription à la newsletter ne doit résulter d’une case pré-cochée ou d’un
            consentement présumé.
          </p>
          <p>
            Chaque communication promotionnelle comporte un moyen simple et gratuit de se
            désinscrire.
          </p>

          <h3 :class="subheading">4.3. Gestion des demandes de contact</h3>
          <p>
            Lorsque nous recevons une demande de renseignement, nous utilisons les données
            communiquées pour comprendre la demande, y répondre et assurer les éventuels échanges
            nécessaires à son traitement.
          </p>
          <p>
            <span class="text-ink">Base légale&nbsp;:</span> notre intérêt légitime à répondre aux
            sollicitations, conformément à l’article 6, paragraphe 1, point f), du RGPD, ou,
            lorsque la demande concerne des démarches précontractuelles, l’article 6, paragraphe 1,
            point b).
          </p>

          <h3 :class="subheading">4.4. Fonctionnement et sécurité du site</h3>
          <p>
            Certaines données techniques sont traitées afin d’assurer le fonctionnement du site, de
            détecter les dysfonctionnements, de prévenir les accès non autorisés et de protéger
            l’infrastructure contre les usages malveillants.
          </p>
          <p>
            <span class="text-ink">Base légale&nbsp;:</span> notre intérêt légitime à garantir la
            sécurité et l’intégrité de nos services numériques.
          </p>

          <h3 :class="subheading">4.5. Mesure d’audience et amélioration du site</h3>
          <p>
            Lorsque des outils de mesure d’audience sont utilisés, leur objectif est de comprendre
            la fréquentation du site, d’évaluer la performance des contenus et d’identifier les
            améliorations possibles.
          </p>
          <p>
            Lorsque les outils ou traceurs employés ne répondent pas aux conditions d’exemption
            prévues par la réglementation, leur activation est subordonnée au consentement
            préalable du visiteur.
          </p>
          <p>
            Les outils pouvant bénéficier d’une exemption ne sont employés sans consentement que
            lorsque l’ensemble des conditions légales et techniques requises est respecté.
          </p>
          <p>
            <span class="text-ink">Base légale du traitement&nbsp;:</span> [Consentement ou intérêt
            légitime, selon l’outil réellement déployé, sa configuration et les conditions
            applicables].
          </p>
          <p>
            Les informations relatives aux outils effectivement utilisés figurent dans la section
            consacrée aux cookies et traceurs.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">5. Caractère obligatoire ou facultatif des données</h2>
          <p>
            La communication des données personnelles est volontaire, sauf lorsque certaines
            informations sont techniquement nécessaires à une fonctionnalité demandée.
          </p>
          <p>
            Une adresse électronique valide est nécessaire pour rejoindre une liste d’attente ou
            recevoir une newsletter. Sans cette information, nous ne pouvons pas assurer l’envoi
            des communications correspondantes.
          </p>
          <p>
            Les autres informations éventuellement demandées, lorsqu’elles ne sont pas
            indispensables, demeurent facultatives.
          </p>
          <p>
            Le refus de consentir à la newsletter ou aux traceurs non essentiels ne doit pas
            empêcher la consultation du site ni l’utilisation de ses fonctionnalités essentielles.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">6. Durées de conservation</h2>
          <p>
            Nous conservons les données personnelles uniquement pendant la durée nécessaire à
            l’accomplissement des finalités pour lesquelles elles ont été collectées, sous réserve
            des obligations légales et des nécessités de conservation de preuves.
          </p>

          <h3 :class="subheading">6.1. Liste d’attente</h3>
          <p>
            Les données d’inscription sont conservées jusqu’au lancement du service et, si une
            communication ultérieure reste prévue dans le cadre du consentement initial, pendant
            une durée maximale de 1 an.
          </p>
          <p>
            En cas de retrait du consentement ou de demande d’effacement recevable, les
            coordonnées concernées sont supprimées de la liste active dans les meilleurs délais.
          </p>

          <h3 :class="subheading">6.2. Newsletter</h3>
          <p>
            Les coordonnées utilisées à des fins de prospection sont conservées tant que la
            personne souhaite recevoir les communications et, en tout état de cause, dans la limite
            d’une durée de trois ans à compter de leur collecte ou du dernier contact actif émanant
            de la personne concernée, conformément au référentiel de la CNIL.
          </p>
          <p>
            À l’expiration de cette durée, les coordonnées sont supprimées ou un nouveau
            consentement est demandé lorsque celui-ci est nécessaire.
          </p>
          <p>
            La désinscription entraîne l’arrêt des communications concernées sans attendre
            l’expiration de cette période.
          </p>

          <h3 :class="subheading">6.3. Demandes de contact</h3>
          <p>
            Les informations liées aux demandes de contact sont conservées pendant la durée
            nécessaire à leur traitement, puis pendant 1 an.
          </p>

          <h3 :class="subheading">6.4. Données techniques et journaux de sécurité</h3>
          <p>
            Les journaux techniques sont conservés pendant 1 an, selon les besoins de sécurité, de
            diagnostic et les obligations applicables.
          </p>

          <h3 :class="subheading">6.5. Preuves de consentement et d’exercice des droits</h3>
          <p>
            Les éléments nécessaires à la démonstration du consentement, de son retrait ou du
            traitement d’une demande d’exercice des droits peuvent être conservés pendant une
            durée proportionnée aux obligations de conformité et aux délais de prescription
            applicables.
          </p>
          <p>
            Ces informations sont conservées séparément des listes de communication actives et ne
            sont pas réutilisées à des fins promotionnelles.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">7. Destinataires des données</h2>
          <p>
            Les données personnelles collectées sur pawpy.fr sont accessibles uniquement aux
            personnes et prestataires autorisés, dans la limite de ce qui est nécessaire à leurs
            missions.
          </p>
          <p>
            Elles peuvent être traitées par les membres habilités de l’équipe Pawpy, les
            prestataires d’hébergement, les fournisseurs de solutions de formulaires et de
            messagerie électronique, ainsi que les prestataires techniques chargés de la sécurité
            ou de la mesure d’audience, lorsqu’ils sont effectivement utilisés.
          </p>
          <dl class="flex flex-col gap-[4px]">
            <div v-for="row in processors" :key="row.label">
              <dt class="inline text-ink">{{ row.label }}&nbsp;:</dt>
              {{ ' ' }}
              <dd class="inline">{{ row.value }}</dd>
            </div>
          </dl>
          <p>
            Ces prestataires interviennent dans les conditions prévues par les accords et
            réglementations applicables, notamment en matière de confidentialité et de sécurité.
          </p>
          <p>Nous ne vendons pas les données personnelles collectées sur le site à des tiers.</p>
          <p>
            Les données ne sont communiquées à des autorités compétentes que lorsqu’une obligation
            légale ou une demande juridiquement fondée le justifie.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">8. Hébergement et transferts internationaux</h2>
          <p>
            Nous privilégions, lorsque cela est possible, des solutions d’hébergement et de
            traitement offrant des garanties adaptées au niveau de protection exigé par le RGPD.
          </p>
          <p>
            <span class="text-ink">Localisation principale de l’hébergement&nbsp;:</span> Paris,
            France
          </p>
          <p>
            Lorsque des données personnelles sont transférées en dehors de l’Espace économique
            européen, ces transferts doivent reposer sur un mécanisme légal approprié, notamment
            une décision d’adéquation de la Commission européenne ou des garanties appropriées
            telles que les clauses contractuelles types, accompagnées, si nécessaire, de mesures
            complémentaires.
          </p>
          <p>
            Les personnes concernées peuvent demander des informations sur les garanties
            applicables à leurs données en contactant le responsable du traitement.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">9. Cookies et autres traceurs</h2>
          <p>
            Un cookie est un petit fichier ou identifiant susceptible d’être enregistré ou consulté
            sur le terminal d’un visiteur lors de sa navigation.
          </p>
          <p>
            Le site peut utiliser des traceurs strictement nécessaires à son fonctionnement et,
            lorsque ces fonctionnalités sont effectivement déployées, des traceurs de mesure
            d’audience ou de communication.
          </p>

          <h3 :class="subheading">9.1. Traceurs strictement nécessaires</h3>
          <p>
            Ces traceurs permettent notamment d’assurer la sécurité, le fonctionnement technique et
            la mémorisation de certains choix indispensables à l’utilisation du site.
          </p>
          <p>
            Lorsqu’ils respectent les conditions réglementaires d’exemption, ils ne nécessitent pas
            de consentement préalable.
          </p>

          <h3 :class="subheading">9.2. Traceurs de mesure d’audience</h3>
          <p>
            Des outils statistiques peuvent être utilisés pour comprendre la fréquentation du site
            et améliorer ses performances.
          </p>
          <p>
            Le dépôt ou la lecture de traceurs de mesure d’audience soumis au consentement
            n’intervient qu’après l’accord du visiteur.
          </p>

          <h3 :class="subheading">9.3. Traceurs publicitaires</h3>
          <p>
            Si des dispositifs publicitaires ou de mesure des campagnes sont mis en place, leur
            utilisation sera détaillée et soumise au consentement préalable lorsque celui-ci est
            requis.
          </p>
          <p>
            Aucun traceur publicitaire soumis à consentement ne doit être activé avant l’expression
            de cet accord.
          </p>

          <h3 :class="subheading">9.4. Gestion des préférences</h3>
          <p>
            Lorsqu’un consentement est requis, les visiteurs peuvent accepter ou refuser les
            traceurs concernés avec un niveau de simplicité équivalent.
          </p>
          <p>
            Leur choix peut ensuite être modifié ou retiré à tout moment au moyen du dispositif de
            gestion des préférences accessible sur le site.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">10. Sécurité des données</h2>
          <p>
            Nous nous engageons à mettre en œuvre des mesures techniques et organisationnelles
            adaptées aux risques présentés par les traitements.
          </p>
          <p>
            Ces mesures visent à prévenir la destruction, la perte, l’altération, la divulgation
            non autorisée ou l’accès illégitime aux données personnelles.
          </p>
          <p>
            Elles concernent notamment la sécurisation des communications, le contrôle des accès,
            la protection des environnements techniques, la limitation des habilitations et la
            gestion des incidents.
          </p>
          <p>
            L’efficacité des mesures de protection doit faire l’objet d’une vérification régulière
            et d’adaptations en fonction des évolutions techniques et des risques identifiés.
          </p>
          <p>
            En cas de violation de données personnelles, nous appliquerons les obligations de
            documentation, de notification à l’autorité compétente et, lorsque cela est requis,
            d’information des personnes concernées.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">11. Droits des personnes concernées</h2>
          <p>
            Conformément aux articles 12 à 22 du RGPD, les personnes concernées peuvent exercer les
            droits prévus par la réglementation, dans les conditions applicables à chaque
            traitement.
          </p>

          <h3 :class="subheading">11.1. Droit d’accès</h3>
          <p>
            Toute personne peut demander à savoir si nous traitons des données personnelles la
            concernant et obtenir les informations ainsi qu’une copie de ses données dans les
            conditions prévues par la réglementation.
          </p>

          <h3 :class="subheading">11.2. Droit de rectification</h3>
          <p>
            Toute personne peut demander la correction de données inexactes ou la mise à jour
            d’informations incomplètes.
          </p>

          <h3 :class="subheading">11.3. Droit à l’effacement</h3>
          <p>
            Toute personne peut demander la suppression des données la concernant lorsque les
            conditions prévues à l’article 17 du RGPD sont réunies.
          </p>
          <p>
            Ce droit peut notamment être exercé lorsque les données ne sont plus nécessaires,
            lorsque le consentement est retiré et qu’aucune autre base légale ne justifie le
            traitement, ou lorsque le traitement est illicite.
          </p>
          <p>
            Certaines informations peuvent néanmoins devoir être conservées lorsque la loi
            l’autorise ou l’impose.
          </p>

          <h3 :class="subheading">11.4. Droit d’opposition</h3>
          <p>
            Toute personne peut s’opposer, pour des raisons tenant à sa situation particulière, aux
            traitements fondés sur l’intérêt légitime, sous réserve des conditions légales
            applicables.
          </p>
          <p>
            Le droit d’opposition à la prospection commerciale peut être exercé à tout moment, sans
            justification.
          </p>

          <h3 :class="subheading">11.5. Droit à la limitation</h3>
          <p>
            Toute personne peut demander la limitation temporaire de certains traitements,
            notamment lorsqu’elle conteste l’exactitude de ses données ou dans les autres
            situations prévues par le RGPD.
          </p>

          <h3 :class="subheading">11.6. Droit à la portabilité</h3>
          <p>
            Lorsque les conditions légales sont réunies, toute personne peut demander à recevoir
            les données personnelles qu’elle a fournies dans un format structuré, couramment
            utilisé et lisible par machine, ou demander leur transmission à un autre responsable du
            traitement lorsque cela est techniquement possible.
          </p>

          <h3 :class="subheading">11.7. Retrait du consentement</h3>
          <p>
            Lorsque nous traitons des données sur la base du consentement, celui-ci peut être
            retiré à tout moment, gratuitement et sans justification.
          </p>
          <p>
            Le retrait du consentement prend effet pour les traitements concernés à compter de sa
            prise en compte et ne remet pas en cause la licéité des traitements antérieurs.
          </p>
          <p>
            Pour les communications électroniques, un lien de désinscription permet de mettre fin
            aux envois concernés.
          </p>

          <h3 :class="subheading">11.8. Directives relatives au décès</h3>
          <p>
            Conformément au droit français, les personnes concernées peuvent définir des directives
            relatives à la conservation, à l’effacement et à la communication de leurs données
            personnelles après leur décès, dans les conditions prévues par la législation
            applicable.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">12. Modalités d’exercice des droits</h2>
          <p>Les demandes relatives aux données personnelles peuvent être adressées à :</p>
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
          <p>
            Nous répondons aux demandes dans les meilleurs délais et, en principe, dans un délai
            maximal d’un mois à compter de leur réception.
          </p>
          <p>
            Ce délai peut être prolongé de deux mois supplémentaires lorsque la complexité ou le
            nombre des demandes le justifie. Dans ce cas, la personne concernée en est informée
            dans le premier mois.
          </p>
          <p>L’exercice des droits est en principe gratuit.</p>
          <p>
            Nous ne demandons pas systématiquement de pièce d’identité. Des informations
            supplémentaires peuvent uniquement être sollicitées lorsqu’un doute raisonnable existe
            quant à l’identité du demandeur, dans le respect du principe de proportionnalité.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">13. Décisions automatisées et profilage</h2>
          <p>
            Dans le cadre de la landing page de pré-lancement, nous n’avons pas vocation à prendre
            des décisions produisant des effets juridiques ou affectant significativement une
            personne sur la seule base d’un traitement automatisé.
          </p>
          <p>
            Les éventuelles fonctionnalités futures de recommandation, de mise en relation ou de
            personnalisation de l’application feront l’objet d’une information adaptée à leur
            fonctionnement réel et à leur qualification juridique.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">14. Sites et services tiers</h2>
          <p>
            Le site pawpy.fr peut contenir des liens vers des plateformes externes, notamment des
            réseaux sociaux ou des sites partenaires.
          </p>
          <p>
            Lorsque les visiteurs quittent notre site pour consulter ces services, leurs données
            personnelles peuvent être traitées conformément aux politiques de confidentialité de
            leurs éditeurs respectifs.
          </p>
          <p>
            Nous invitons les visiteurs à consulter ces politiques afin de comprendre les
            conditions applicables.
          </p>
          <p>
            L’intégration éventuelle de contenus tiers directement sur pawpy.fr, lorsqu’elle
            implique une collecte de données ou le dépôt de traceurs, doit respecter les
            obligations d’information et de consentement applicables.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">15. Réclamation auprès de la CNIL</h2>
          <p>
            Toute personne estimant que ses données personnelles ne sont pas traitées conformément
            à la réglementation peut nous contacter afin de nous faire part de ses préoccupations.
          </p>
          <p>
            Elle dispose également du droit d’introduire une réclamation auprès de l’autorité
            française compétente :
          </p>
          <div class="flex flex-col gap-[4px]">
            <p class="text-ink">Commission nationale de l’informatique et des libertés (CNIL)</p>
            <p>3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07</p>
            <p>
              <span class="text-ink">Site internet&nbsp;:</span> <a href="https://www.cnil.fr" v-bind="externalAttrs('https://www.cnil.fr')" :class="link">https://www.cnil.fr</a>
            </p>
          </div>
          <p>
            Ce droit peut être exercé indépendamment de toute démarche préalable auprès de Pawpy.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">16. Modification de la politique</h2>
          <p>
            La présente politique est susceptible d’évoluer afin de tenir compte des modifications
            du site, de ses fonctionnalités, des traitements mis en œuvre ou du cadre
            réglementaire.
          </p>
          <p>Toute nouvelle version est publiée sur cette page avec sa date de mise à jour.</p>
          <p>
            En cas de modification substantielle affectant les finalités des traitements ou les
            conditions dans lesquelles les données sont utilisées, nous mettrons en œuvre les
            mesures d’information nécessaires et recueillerons un nouveau consentement lorsque
            celui-ci est requis.
          </p>
        </section>
      </div>
    </div>
  </SheetOverlay>
</template>
