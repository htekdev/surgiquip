/** Preserve old bookmarks without publishing withdrawn dealer claims. */
export const retiredPartnerRedirects = {
  '/products/hsi': { status: 301, destination: '/products' },
  '/products/knight': { status: 301, destination: '/products' },
};

/** Exclude only the two retired URLs, including their trailing-slash variants. */
export function includeCurrentPage(page) {
  const path = new URL(page).pathname.replace(/\/+$/, '');
  return !Object.hasOwn(retiredPartnerRedirects, path);
}

/** Prepend narrowly scoped alias redirects to the adapter's real deployment output. */
export function containRetiredAliases(config) {
  if (config.version !== 3 || !Array.isArray(config.routes)) {
    throw new TypeError('Expected Vercel Build Output API v3 routes');
  }
  return {
    ...config,
    routes: [
      { src: '^/products/(?:hsi|knight)(?:/.*)?$', status: 301, headers: { Location: '/products' } },
      ...config.routes,
    ],
  };
}
