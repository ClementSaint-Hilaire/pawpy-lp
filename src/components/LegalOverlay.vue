<script setup>
import { RouterLink } from 'vue-router'
import SheetOverlay from '@/components/SheetOverlay.vue'
import { useRouteSheet } from '@/composables/useRouteSheet'
import { externalAttrs } from '@/utils/links'

const publisher = [
  { label: 'Nom commercial', value: 'Pawpy' },
  { label: 'Éditeur', value: 'Carla Coelho' },
  { label: 'Statut juridique', value: 'Association' },
  { label: 'Adresse', value: '40 rue du Chemin Vert, 75011 Paris' },
  { label: 'Adresse électronique', value: 'contact@pawpy.fr', href: 'mailto:contact@pawpy.fr' },
  { label: 'Directeur de la publication', value: 'Carla Coelho' },
]

const host = [
  { label: 'Hébergeur', value: 'Hyperion Cloud SAS' },
  { label: 'Siège social', value: '59 rue de Ponthieu, bureau 326, 75008 Paris, France' },
  { label: 'RCS', value: 'Rouen 937 663 078' },
  { label: 'Téléphone', value: '+33 6 67 52 61 81', href: 'tel:+33667526181' },
  { label: 'Adresse électronique', value: 'contact@hyperion.cloud', href: 'mailto:contact@hyperion.cloud' },
  { label: 'Site internet', value: 'https://hyperion.cloud', href: 'https://hyperion.cloud' },
]

const contact = [
  { label: 'Adresse électronique', value: 'contact@pawpy.fr', href: 'mailto:contact@pawpy.fr' },
  { label: 'Site internet', value: 'https://pawpy.fr', href: 'https://pawpy.fr' },
]

// Classes partagées par les dix sections : le texte suit la typographie
// courante (Sora 14px), les intitulés celle des titres.
const heading = 'text-[20px] leading-[1.2] tracking-[-0.02em] text-ink'
const link = 'text-ink underline underline-offset-2 transition-colors hover:text-ink-60'

const { open, close } = useRouteSheet('/mentions-legales')
</script>

<template>
  <SheetOverlay
    :open="open"
    labelledby="legal-title"
    close-label="Fermer les mentions légales"
    @close="close"
  >
    <div class="flex w-full flex-col items-center gap-[32px] px-6 [word-break:break-word] md:px-[34px]">
      <div class="flex flex-col items-center gap-[8px] text-center">
        <p
          id="legal-title"
          class="font-sans text-[14px] leading-[1.2] tracking-[-0.01em] text-ink-60"
        >
          Mentions légales
        </p>
        <p class="font-sans text-caption text-ink-40">Dernière mise à jour : 12 octobre 2026</p>
      </div>

      <div class="flex w-full max-w-[682px] flex-col gap-[32px] font-body text-label text-ink-60">
        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">1. Édition du site</h2>
          <p>
            Le site internet <a href="https://pawpy.fr" :class="link">https://pawpy.fr</a> est
            consacré à Pawpy, un projet de plateforme numérique spécialisée dans la mise en
            relation entre propriétaires de chiens et promeneurs certifiés, proposant un service
            de promenade sécurisé, transparent et personnalisé.
          </p>
          <p>Le site est édité par :</p>
          <dl class="flex flex-col gap-[4px]">
            <div v-for="row in publisher" :key="row.label">
              <dt class="inline text-ink">{{ row.label }}&nbsp;:</dt>
              {{ ' ' }}
              <dd class="inline">
                <a v-if="row.href" :href="row.href" :class="link">{{ row.value }}</a>
                <template v-else>{{ row.value }}</template>
              </dd>
            </div>
          </dl>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">2. Hébergement</h2>
          <p>
            Sous réserve de confirmation de l’hébergement effectif de pawpy.fr, les coordonnées
            du prestataire envisagé sont les suivantes.
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
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">3. Objet du site</h2>
          <p>
            Le site pawpy.fr a pour vocation de présenter le projet Pawpy, ses engagements, son
            fonctionnement et les services envisagés dans le domaine de la promenade canine.
          </p>
          <p>
            Il constitue également un support d’information, de communication et de préparation
            au lancement de la plateforme.
          </p>
          <p>
            Les informations relatives aux fonctionnalités, aux certifications, aux garanties
            d’assurance et aux modalités de prestation décrivent le service envisagé. Elles sont
            susceptibles d’évoluer avant son lancement commercial.
          </p>
          <p>
            Elles ne constituent pas, à ce stade, une offre contractuelle de prestation, une
            attestation d’assurance ou une garantie de disponibilité du service.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">4. Propriété intellectuelle</h2>
          <p>
            L’ensemble des éléments originaux composant le site pawpy.fr, notamment les textes,
            créations graphiques, logos, illustrations, photographies, interfaces, éléments de
            design et développements spécifiques, est protégé par les dispositions applicables du
            Code de la propriété intellectuelle.
          </p>
          <p>
            Ces éléments appartiennent à leurs titulaires respectifs et sont utilisés par Pawpy
            dans le cadre des droits détenus ou des autorisations accordées.
          </p>
          <p>
            Toute reproduction, représentation, adaptation, distribution ou exploitation non
            autorisée de ces contenus, en dehors des exceptions prévues par la législation
            applicable, est interdite sans l’accord préalable des titulaires des droits concernés.
          </p>
          <p>
            La dénomination Pawpy et les signes distinctifs associés ne peuvent être utilisés
            d’une manière susceptible de créer une confusion quant à l’origine ou à l’affiliation
            d’un service.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">5. Responsabilité</h2>
          <p>
            Nous veillons à fournir sur pawpy.fr des informations claires, exactes et
            régulièrement actualisées.
          </p>
          <p>
            Toutefois, les informations présentées peuvent être modifiées afin de refléter
            l’évolution du projet, de son développement technique et de son offre commerciale.
          </p>
          <p>
            Nous nous efforçons d’assurer l’accessibilité et le bon fonctionnement du site, sans
            pouvoir garantir une disponibilité permanente, notamment lors des opérations de
            maintenance ou en cas d’incident technique indépendant de notre volonté.
          </p>
          <p>La responsabilité de l’éditeur demeure soumise aux dispositions légales applicables.</p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">6. Protection des données personnelles</h2>
          <p>
            Dans le cadre de l’utilisation du site, certaines données à caractère personnel
            peuvent être collectées, notamment à l’occasion d’une demande de contact ou d’une
            inscription à une liste d’attente ou à une newsletter.
          </p>
          <p>
            Selon le formulaire utilisé, ces données peuvent comprendre une adresse électronique,
            un nom ou un prénom, ainsi que les informations volontairement communiquées.
          </p>
          <p>
            Ces données sont traitées exclusivement pour les finalités présentées aux personnes
            concernées lors de leur collecte, notamment la gestion des demandes, la préparation du
            lancement de Pawpy et, lorsqu’un consentement valable a été recueilli, l’envoi de
            communications relatives au projet.
          </p>
          <p>
            Conformément au Règlement général sur la protection des données (RGPD) et à la loi
            Informatique et Libertés, les personnes concernées disposent, dans les conditions
            prévues par la réglementation, de droits d’accès, de rectification, d’effacement,
            d’opposition, de limitation du traitement et de portabilité de leurs données.
          </p>
          <p>
            Lorsque le traitement repose sur le consentement, celui-ci peut être retiré à tout
            moment, sans remettre en cause la licéité du traitement effectué antérieurement.
          </p>
          <p>
            Pour exercer leurs droits, les personnes concernées peuvent contacter l’éditeur à
            l’adresse suivante : <a href="mailto:contact@pawpy.fr" :class="link">contact@pawpy.fr</a>.
          </p>
          <p>
            Elles peuvent également introduire une réclamation auprès de la Commission nationale
            de l’informatique et des libertés (CNIL), accessible à l’adresse
            <a href="https://www.cnil.fr" v-bind="externalAttrs('https://www.cnil.fr')" :class="link">https://www.cnil.fr</a>.
          </p>
          <p>
            Les modalités détaillées des traitements, leurs bases légales, les destinataires des
            données, les durées de conservation et les éventuels transferts sont présentés dans
            notre <RouterLink to="/politique-de-confidentialite" :class="link">Politique de confidentialité</RouterLink>.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">7. Cookies et traceurs</h2>
          <p>
            Le site pawpy.fr peut recourir à des cookies et autres traceurs nécessaires à son
            fonctionnement, à sa sécurité et, selon les outils effectivement déployés, à la mesure
            de son audience.
          </p>
          <p>
            Les traceurs non strictement nécessaires sont soumis au consentement préalable des
            visiteurs lorsqu’aucune exemption réglementaire ne s’applique.
          </p>
          <p>
            Lorsqu’un consentement est requis, les visiteurs disposent de la possibilité de
            l’accepter, de le refuser et de modifier leur choix à tout moment, sans conséquence
            sur leur accès aux fonctionnalités essentielles du site.
          </p>
          <p>
            Les informations détaillées concernant les traceurs effectivement utilisés, leurs
            finalités et leurs durées de conservation figurent dans la
            <span class="text-ink">Politique de cookies</span>.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">8. Liens hypertextes</h2>
          <p>
            Le site pawpy.fr peut contenir des liens renvoyant vers des sites internet ou services
            exploités par des tiers.
          </p>
          <p>
            Ces ressources externes disposent de leurs propres conditions d’utilisation et
            politiques de confidentialité. Nous ne maîtrisons ni leur contenu ni leurs éventuelles
            modifications.
          </p>
          <p>
            L’existence d’un lien hypertexte ne constitue pas nécessairement une approbation ou un
            partenariat avec le service concerné.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">9. Droit applicable</h2>
          <p>Les présentes mentions légales sont soumises au droit français.</p>
          <p>
            Tout différend relatif à l’utilisation du site sera traité conformément aux
            dispositions légales applicables, sans préjudice des règles impératives de compétence
            juridictionnelle et de protection des consommateurs.
          </p>
        </section>

        <section class="flex flex-col gap-[12px]">
          <h2 :class="heading">10. Contact</h2>
          <p>
            Pour toute question relative au site, à son contenu ou au projet Pawpy, nous pouvons
            être contactés à l’adresse suivante :
          </p>
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
        </section>

        <p class="text-center font-sans text-caption text-ink-40">
          © 2026 Pawpy. Tous droits réservés, dans la limite des droits détenus sur les contenus
          concernés.
        </p>
      </div>
    </div>
  </SheetOverlay>
</template>
