// ---------------------------------------------------------------------------
// products.ts — Flat product catalog data
//
// Every product Surgiquip sells or services, organized by category.
// Used by /products to render a visual, filterable grid.
// ---------------------------------------------------------------------------

export interface Product {
  /** URL-safe slug — used as the card's key and for filtering */
  slug: string;
  /** Display name */
  name: string;
  /** Short subtitle shown below the name */
  tagline: string;
  /** Product image path (public/) */
  image: string;
  /** Alt text for accessibility */
  alt: string;
  /** Product type/category for filtering */
  category: ProductCategory;
  /** Brand name for attribution */
  brand: string;
  /** Optional badge (e.g. "Flagship", "Featured") */
  badge?: string;
  /** Link to detail page or anchor */
  href: string;
  /** Key spec highlights (2-3 items) shown on the card */
  specs?: string[];
}

export type ProductCategory =
  | 'Surgical Tables'
  | 'Surgical Lights'
  | 'Equipment Booms'
  | 'OR Integration'
  | 'OR Furniture'
  | 'Patient Care';

export const productCategories: ProductCategory[] = [
  'Surgical Tables',
  'Surgical Lights',
  'Equipment Booms',
  'OR Integration',
  'OR Furniture',
  'Patient Care',
];

export const brands = ['Skytron', 'HSI'] as const;

/** Service-only brands (we service but don't sell) */
export const serviceBrands = ['Steris', 'Stryker', 'Berchtold', 'Maquet', 'Trumpf'] as const;

// ---------------------------------------------------------------------------
// Product catalog — all items in a flat array
// ---------------------------------------------------------------------------
export const products: Product[] = [
  // ── Skytron Surgical Tables ─────────────────────────────────────────────
  {
    slug: 'skytron-6700b',
    name: 'Skytron 6700B',
    tagline: 'High-capacity multi-specialty surgical table',
    image: '/images/products/surgical-table.webp',
    alt: 'Skytron 6700B surgical table — flagship multi-specialty platform',
    category: 'Surgical Tables',
    brand: 'Skytron',
    badge: 'Flagship',
    href: '/products/skytron#tables',
    specs: ['1,000 lb capacity', 'Carbon fiber radiolucent top', '12 surgeon presets'],
  },
  {
    slug: 'skytron-6701',
    name: 'Skytron 6701',
    tagline: 'Imaging-optimized column table for C-arm workflows',
    image: '/images/products/surgical-table.webp',
    alt: 'Skytron 6701 imaging-optimized surgical table',
    category: 'Surgical Tables',
    brand: 'Skytron',
    href: '/products/skytron#tables',
    specs: ['360° C-arm clearance', 'Full carbon fiber top', 'Flush floor column'],
  },
  {
    slug: 'skytron-3600',
    name: 'Skytron 3600 Series',
    tagline: 'Versatile platform for high-volume ORs',
    image: '/images/products/surgical-table.webp',
    alt: 'Skytron 3600 Series multi-specialty surgical table',
    category: 'Surgical Tables',
    brand: 'Skytron',
    href: '/products/skytron#tables',
    specs: ['600 lb capacity', '5-section modular', 'Cost-effective for ASCs'],
  },

  // ── Skytron Surgical Lights ─────────────────────────────────────────────
  {
    slug: 'skytron-aurora-led',
    name: 'Skytron Aurora LED',
    tagline: 'CRI 97+ LED with optional integrated camera',
    image: '/images/products/surgical-light.webp',
    alt: 'Skytron Aurora LED surgical light — CRI 97+ operating room illumination',
    category: 'Surgical Lights',
    brand: 'Skytron',
    badge: 'Featured',
    href: '/products/skytron#lights',
    specs: ['CRI 97+ / R9 95+', '3,500–5,000 K adjustable', 'No IR heat'],
  },
  {
    slug: 'skytron-stellar-led',
    name: 'Skytron Stellar LED',
    tagline: 'Reliable LED performance for general surgery',
    image: '/images/products/surgical-light.webp',
    alt: 'Skytron Stellar LED surgical light',
    category: 'Surgical Lights',
    brand: 'Skytron',
    href: '/products/skytron#lights',
    specs: ['Adjustable color temp', 'Multi-point LED array', 'Long-life — no bulb changes'],
  },
  {
    slug: 'skytron-ar24',
    name: 'Skytron AR24 Birthing Light',
    tagline: 'Purpose-built for LDRP and birthing suites',
    image: '/images/products/surgical-light.webp',
    alt: 'Skytron AR24 birthing light for LDRP suites',
    category: 'Surgical Lights',
    brand: 'Skytron',
    href: '/products/skytron#lights',
    specs: ['LDRP optimized', 'Bedside dimming', 'Patient-comfort design'],
  },
  {
    slug: 'skytron-mini-argos',
    name: 'Skytron Mini Argos',
    tagline: 'Portable exam and procedure light',
    image: '/images/products/surgical-light.webp',
    alt: 'Skytron Mini Argos portable exam light',
    category: 'Surgical Lights',
    brand: 'Skytron',
    href: '/products/skytron#lights',
    specs: ['Portable / wall-mount', 'Focused LED spot', 'Exam & procedure rooms'],
  },

  // ── Skytron Equipment Booms ─────────────────────────────────────────────
  {
    slug: 'skytron-center-mount-boom',
    name: 'Skytron Center Mount Boom',
    tagline: 'Ceiling-mounted OR equipment management system',
    image: '/images/products/equipment-boom.webp',
    alt: 'Skytron Center Mount Boom — ceiling-mounted OR equipment management',
    category: 'Equipment Booms',
    brand: 'Skytron',
    badge: 'Featured',
    href: '/products/skytron#booms',
    specs: ['Gas + electrical + data + AV', 'NFPA 99 Category 1', 'Custom arm configs'],
  },

  // ── Skytron OR Integration ──────────────────────────────────────────────
  {
    slug: 'skytron-skyvision',
    name: 'Skytron SkyVision',
    tagline: '4K AV integration and unified room control',
    image: '/images/products/or-integration.webp',
    alt: 'SkyVision OR integration — 4K AV switching and room control',
    category: 'OR Integration',
    brand: 'Skytron',
    badge: 'Featured',
    href: '/products/skytron#or-integration',
    specs: ['4K AV switching', 'Boom-mounted display routing', 'Endoscope compatible'],
  },

  // ── HSI Products ────────────────────────────────────────────────────────
  {
    slug: 'hsi-boom-systems',
    name: 'HSI Surgical Boom Systems',
    tagline: 'Ceiling-mounted equipment arms with integrated utilities',
    image: '/images/products/hsi-hero.webp',
    alt: 'HSI Hospital Systems ceiling-mounted boom arms',
    category: 'Equipment Booms',
    brand: 'HSI',
    href: '/products/hsi',
    specs: ['Integrated power + gas + data', 'Clear floor space', 'Surgical suite efficiency'],
  },
  {
    slug: 'hsi-or-furniture',
    name: 'HSI OR Furniture',
    tagline: 'Hospital-grade OR cabinetry and storage systems',
    image: '/images/products/hsi-hero.webp',
    alt: 'HSI Hospital Systems operating room furniture and cabinetry',
    category: 'OR Furniture',
    brand: 'HSI',
    href: '/products/hsi',
    specs: ['Hospital-grade durability', 'Easy to clean', 'Custom layouts'],
  },
  {
    slug: 'hsi-patient-care',
    name: 'HSI Patient Care Equipment',
    tagline: 'Stretchers, transfer systems, and positioning products',
    image: '/images/products/hsi-hero.webp',
    alt: 'HSI Hospital Systems patient care and transfer equipment',
    category: 'Patient Care',
    brand: 'HSI',
    href: '/products/hsi',
    specs: ['Stretchers & transfers', 'Caregiver ergonomics', 'Patient safety design'],
  },
];
