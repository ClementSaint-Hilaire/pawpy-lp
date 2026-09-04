/** @type {import('tailwindcss').Config} */

// Design tokens issus du Figma Pawpy (node 4313:10166), via `get_variable_defs`.
// Les noms de gauche reprennent ceux des variables Figma pour garder la traçabilité.
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // typography/light-*
        ink: {
          DEFAULT: '#000000', // typography/light-primary
          soft: '#252826',    // couleur de la navigation
          60: '#0000008c',    // typography/light-secondary — noir 55 %
          40: '#77777780',    // typography/light-tertiary
        },
        // background/light-*
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f5f5f5',
        },
        accent: '#ffccfb',  // brand/accent-500 — surlignage
        stroke: '#77777780', // stroke/primary

        // Hors Figma : la maquette ne décrit aucun état d'erreur, mais les vues
        // de confirmation et de désinscription en ont besoin (échec d'appel au
        // backend, lien invalide). Un seul rouge, ici, plutôt que le `red-600`
        // de la palette Tailwind dispersé dans les gabarits.
        danger: '#b3261e',
      },

      fontFamily: {
        // font/familly/Primary — police payante, fichiers fournis séparément.
        // Playfair Display sert de repli tant que les .woff2 ne sont pas déposés.
        display: ['Coconat', '"Playfair Display"', 'Georgia', 'serif'],
        // font/familly/Secondary
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Typeramp Body / Subbody
        body: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },

      // Typeramp Figma. Les letterSpacing du Figma (-1, -2) sont des pourcentages.
      //
      // Les quatre gros calibres sont fluides : la borne haute est la valeur du
      // Figma, la borne basse ce qui reste lisible à 320px. Régler l'échelle ici
      // évite d'écrire des paires responsive sur chaque titre de chaque section.
      //
      // Les coefficients `vw` sont choisis pour que la borne haute soit atteinte
      // *avant* le point de bascule desktop (xl, 1280px) : lead à 1125px, title
      // à 1000px, display à 1040px, numeral à 1253px. Un coefficient plus faible
      // laisserait le texte encore en train de grandir sur un écran de bureau,
      // et les blocs calés au pixel sur la maquette n'auraient plus leur taille.
      fontSize: {
        caption: ['11px', { lineHeight: '1.1' }],                              // font/size/xs
        label: ['14px', { lineHeight: '20px' }],                               // Subbody
        base: ['16px', { lineHeight: '22px' }],                                // Body
        lead: ['clamp(16px, 1.6vw, 18px)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],  // font/size/m
        title: ['clamp(24px, 3.4vw, 34px)', { lineHeight: '1.2', letterSpacing: '-0.02em' }], // font/size/2xl
        display: ['clamp(32px, 5.2vw, 54px)', { lineHeight: '1.2', letterSpacing: '-0.02em' }], // font/size/4xl
        numeral: ['clamp(40px, 7.5vw, 94px)', { lineHeight: '1.2', letterSpacing: '-0.02em' }], // chiffres des stats
      },

      maxWidth: {
        // Gabarit du Figma : page 1500px, contenu 1300px, gouttières de 100px.
        //
        // La borne porte sur l'extérieur du gabarit, gouttières comprises
        // (`box-sizing: border-box` fait entrer le padding dans `max-width`) :
        // 1400 = 1300 de contenu + 2 × 50 de gouttière. C'est ce qui rend le
        // contenu large d'exactement 1300px dès 1400px de viewport, comme dans
        // la maquette. Voir `.shell` dans main.css.
        shell: '1400px',
      },

      boxShadow: {
        // token « shadow » : 5 couches #A6A6A6
        float: [
          '0 12px 26px 0 #A6A6A61A',
          '0 48px 48px 0 #A6A6A617',
          '0 108px 65px 0 #A6A6A60D',
          '0 193px 77px 0 #A6A6A603',
          '0 301px 84px 0 #A6A6A600',
        ].join(', '),
      },
    },
  },
  plugins: [],
}
