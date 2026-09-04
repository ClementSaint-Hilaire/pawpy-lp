const isExternal = (href) => Boolean(href) && href.startsWith('http')

/** Un lien externe s'ouvre dans un nouvel onglet, sans fuite de `window.opener`. */
export const externalAttrs = (href) =>
  isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {}
