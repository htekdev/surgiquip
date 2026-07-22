// ---------------------------------------------------------------------------
// products.ts — 2-level product catalog data
//
// Level 1: Product categories (visual tiles on /products)
// Level 2: Individual products within each category (/products/[category])
// ---------------------------------------------------------------------------

export interface Category {
  /** URL slug for the category page */
  slug: string;
  /** Display name */
  name: string;
  /** Short description shown on the category tile */
  description: string;
  /** Representative image for this category */
  image: string;
  /** Alt text */
  alt: string;
  /** Number of products in this category (computed) */
  count?: number;
}

export interface Product {
  /** URL-safe slug */
  slug: string;
  /** Display name */
  name: string;
  /** Short tagline */
  tagline: string;
  /** Product image */
  image: string;
  /** Alt text */
  alt: string;
  /** Category slug (matches Category.slug) */
  category: string;
  /** Brand name */
  brand: string;
  /** Optional badge */
  badge?: string;
  /** Link to detail page or anchor */
  href: string;
  /** Key spec highlights */
  specs?: string[];
}

// ---------------------------------------------------------------------------
// Categories — one visual tile per category on /products
// ---------------------------------------------------------------------------
export const categories: Category[] = [
  {
    slug: 'surgical-tables',
    name: 'Surgical Tables',
    description: 'Multi-specialty surgical table platforms for general, orthopedic, spine, and imaging-intensive procedures.',
    image: '/images/products/surgical-table.webp',
    alt: 'Skytron surgical table in a modern operating room',
  },
  {
    slug: 'surgical-lights',
    name: 'Surgical Lights',
    description: 'LED surgical lighting systems for operating rooms, birthing suites, exam rooms, and procedure areas.',
    image: '/images/products/surgical-light.webp',
    alt: 'Skytron surgical LED light illuminating an operating field',
  },
  {
    slug: 'equipment-booms',
    name: 'Equipment Booms',
    description: 'Ceiling-mounted equipment management systems with integrated gas, electrical, data, and AV routing.',
    image: '/images/products/equipment-boom.webp',
    alt: 'Ceiling-mounted equipment boom system in a surgical suite',
  },
  {
    slug: 'or-integration',
    name: 'OR Integration',
    description: 'AV switching, display routing, and unified room control for hybrid, robotic, and imaging ORs.',
    image: '/images/products/or-integration.webp',
    alt: 'OR integration system with multiple surgical displays',
  },
  {
    slug: 'or-furniture',
    name: 'OR Furniture',
    description: 'Hospital-grade cabinetry, storage systems, and furniture designed for surgical environments.',
    image: '/images/products/hsi-hero.webp',
    alt: 'Operating room furniture and cabinetry systems',
  },
  {
    slug: 'patient-care',
    name: 'Patient Care',
    description: 'Stretchers, transfer systems, and positioning products built for safety and caregiver ergonomics.',
    image: '/images/products/hsi-hero.webp',
    alt: 'Patient care and transfer equipment for hospitals',
  },
];

/** Service-only brands (we service but don't sell) */
export const serviceBrands = ['Steris', 'Stryker', 'Berchtold', 'Maquet', 'Trumpf'] as const;

// ---------------------------------------------------------------------------
// Individual products — shown on category drill-down pages
//
// NOTE: 6700B removed (obsolete per Lance, Jul 22 2026).
//       Legacy 6000/6500/6600 service-only listing also removed.
//       Lance to validate remaining models.
// ---------------------------------------------------------------------------
export const products: Product[] = [
  // ── Surgical Tables ─────────────────────────────────────────────────────
  {
    slug: 'skytron-6701',
    name: 'Skytron 6701',
    tagline: 'Imaging-optimized column table for C-arm workflows',
    image: '/images/products/surgical-table.webp',
    alt: 'Skytron 6701 imaging-optimized surgical table',
    category: 'surgical-tables',
    brand: 'Skytron',
    href: '/products/skytron#tables',
    specs: ['360° C-arm clearance', 'Full carbon fiber top', 'Flush floor column'],
  },
  {
    slug: 'skytron-3600',
    name: 'Skytron 3600 Series',
    tagline: 'Versatile platform for high-volume ORs and ASCs',
    image: '/images/products/surgical-table.webp',
    alt: 'Skytron 3600 Series multi-specialty surgical table',
    category: 'surgical-tables',
    brand: 'Skytron',
    href: '/products/skytron#tables',
    specs: ['600 lb capacity', '5-section modular', 'Cost-effective for ASCs'],
  },

  // ── Surgical Lights ─────────────────────────────────────────────────────
  {
    slug: 'skytron-aurora-led',
    name: 'Skytron Aurora LED',
    tagline: 'CRI 97+ LED with optional integrated camera',
    image: '/images/products/surgical-light.webp',
    alt: 'Skytron Aurora LED surgical light — CRI 97+ illumination',
    category: 'surgical-lights',
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
    category: 'surgical-lights',
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
    category: 'surgical-lights',
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
    category: 'surgical-lights',
    brand: 'Skytron',
    href: '/products/skytron#lights',
    specs: ['Portable / wall-mount', 'Focused LED spot', 'Exam & procedure rooms'],
  },

  // ── Equipment Booms ─────────────────────────────────────────────────────
  {
    slug: 'skytron-center-mount-boom',
    name: 'Skytron Center Mount Boom',
    tagline: 'Ceiling-mounted OR equipment management system',
    image: '/images/products/equipment-boom.webp',
    alt: 'Skytron Center Mount Boom — ceiling-mounted OR equipment management',
    category: 'equipment-booms',
    brand: 'Skytron',
    badge: 'Featured',
    href: '/products/skytron#booms',
    specs: ['Gas + electrical + data + AV', 'NFPA 99 Category 1', 'Custom arm configs'],
  },
  {
    slug: 'hsi-boom-systems',
    name: 'HSI Surgical Boom Systems',
    tagline: 'Ceiling-mounted equipment arms with integrated utilities',
    image: '/images/products/hsi-hero.webp',
    alt: 'HSI Hospital Systems ceiling-mounted boom arms',
    category: 'equipment-booms',
    brand: 'HSI',
    href: '/products/hsi',
    specs: ['Integrated power + gas + data', 'Clear floor space', 'Surgical suite efficiency'],
  },

  // ── OR Integration ──────────────────────────────────────────────────────
  {
    slug: 'skytron-skyvision',
    name: 'Skytron SkyVision',
    tagline: '4K AV integration and unified room control',
    image: '/images/products/or-integration.webp',
    alt: 'SkyVision OR integration — 4K AV switching and room control',
    category: 'or-integration',
    brand: 'Skytron',
    badge: 'Featured',
    href: '/products/skytron#or-integration',
    specs: ['4K AV switching', 'Boom-mounted display routing', 'Endoscope compatible'],
  },

  // ── OR Furniture ────────────────────────────────────────────────────────
  {
    slug: 'hsi-or-furniture',
    name: 'HSI OR Furniture',
    tagline: 'Hospital-grade OR cabinetry and storage systems',
    image: '/images/products/hsi-hero.webp',
    alt: 'HSI Hospital Systems operating room furniture and cabinetry',
    category: 'or-furniture',
    brand: 'HSI',
    href: '/products/hsi',
    specs: ['Hospital-grade durability', 'Easy to clean', 'Custom layouts'],
  },

  // ── Patient Care ────────────────────────────────────────────────────────
  {
    slug: 'hsi-patient-care',
    name: 'HSI Patient Care Equipment',
    tagline: 'Stretchers, transfer systems, and positioning products',
    image: '/images/products/hsi-hero.webp',
    alt: 'HSI Hospital Systems patient care and transfer equipment',
    category: 'patient-care',
    brand: 'HSI',
    href: '/products/hsi',
    specs: ['Stretchers & transfers', 'Caregiver ergonomics', 'Patient safety design'],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Get all products for a given category slug */
export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug);
}

/** Get a category by slug */
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

/** Get categories with product counts */
export function getCategoriesWithCounts(): (Category & { count: number })[] {
  return categories.map((cat) => ({
    ...cat,
    count: products.filter((p) => p.category === cat.slug).length,
  }));
}
