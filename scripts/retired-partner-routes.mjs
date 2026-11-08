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
