// ---------------------------------------------------------------------------
// products.ts — 3-level product catalog data
//
// Level 1: Product categories (visual tiles on /products)
// Level 2: Individual products within each category (/products/[category])
// Level 3: Product detail pages (/products/[category]/[slug])
// ---------------------------------------------------------------------------

export interface SpecItem {
  label: string;
  value: string;
}

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
  /** Full product description for the detail page */
  description: string;
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
  /** Structured spec table for detail page */
  specTable?: SpecItem[];
  /** Feature bullet points */
  features?: string[];
  /** Typical use / application areas */
  use?: string;
  /** Key spec highlights (shown as pills on category grid) */
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
    description:
      'The Skytron 6701 is a column-based surgical table engineered for imaging-intensive procedures. Its flush floor column provides unobstructed 360° C-arm and O-arm positioning, while the full carbon fiber tabletop delivers head-to-toe radiolucency. Ideal for spine, orthopedic trauma, vascular, and interventional workflows where imaging access is non-negotiable.',
    image: '/images/products/surgical-table.webp',
    alt: 'Skytron 6701 imaging-optimized surgical table',
    category: 'surgical-tables',
    brand: 'Skytron',
    badge: 'Imaging-Optimized',
    specTable: [
      { label: 'Column Design', value: 'Pendant / floor column' },
      { label: 'C-arm Access', value: '360° clearance' },
      { label: 'Table Top', value: 'Full carbon fiber' },
      { label: 'Traction', value: 'Optional traction tower' },
    ],
    features: [
      'Unobstructed C-arm and O-arm positioning',
      'Ideal for spine, trauma, and orthopedic imaging workflows',
      'Integrated traction attachment points',
      'Flush floor column — no base frame obstruction',
    ],
    use: 'Spine, orthopedic trauma, vascular, interventional',
    specs: ['360° C-arm clearance', 'Full carbon fiber top', 'Flush floor column'],
  },
  {
    slug: 'skytron-3600',
    name: 'Skytron 3600 Series',
    tagline: 'Versatile platform for high-volume ORs and ASCs',
    description:
      'The Skytron 3600 Series is a multi-specialty surgical table platform designed for high-volume general surgery suites and ambulatory surgery centers. Its 5-section modular design handles most surgical specialties, while the low floor-to-top height accommodates shorter staff. A cost-effective solution that doesn\'t sacrifice versatility.',
    image: '/images/products/surgical-table.webp',
    alt: 'Skytron 3600 Series multi-specialty surgical table',
    category: 'surgical-tables',
    brand: 'Skytron',
    badge: 'Multi-Specialty',
    specTable: [
      { label: 'Weight Capacity', value: '600 lb' },
      { label: 'Table Sections', value: '5-section modular' },
      { label: 'Controls', value: 'Hand pendant + tabletop' },
      { label: 'Base', value: 'Floor-level low-profile' },
    ],
    features: [
      'Interchangeable section design handles most specialties',
      'Low floor-to-top height for shorter staff comfort',
      'Compatible with most OR accessory systems',
      'Cost-effective for high-volume general surgery suites',
    ],
    use: 'General surgery, GYN, ENT, urology, outpatient/ASC',
    specs: ['600 lb capacity', '5-section modular', 'Cost-effective for ASCs'],
  },

  // ── Surgical Lights ─────────────────────────────────────────────────────
  {
    slug: 'skytron-aurora-led',
    name: 'Skytron Aurora LED',
    tagline: 'CRI 97+ LED with optional integrated camera',
    description:
      'The Aurora LED delivers CRI 97+ and R9 95+ color rendering for accurate tissue differentiation across all surgical specialties. No IR heat at the field. Available with an integrated in-light camera for documentation and remote viewing — no separate camera arm required.',
    image: '/images/products/surgical-light.webp',
    alt: 'Skytron Aurora LED surgical light — CRI 97+ illumination',
    category: 'surgical-lights',
    brand: 'Skytron',
    badge: 'Primary OR Light',
    specTable: [
      { label: 'CRI', value: '97+' },
      { label: 'R9 (Red)', value: '95+' },
      { label: 'Color Temp', value: '3,500–5,000 K adjustable' },
      { label: 'IR Heat', value: 'None (LED)' },
      { label: 'Camera', value: 'Optional in-light integration' },
    ],
    features: [
      'CRI 97+ with R9 95+ for accurate tissue differentiation',
      'Adjustable color temperature 3,500–5,000 K',
      'Zero IR heat at the surgical field',
      'Optional integrated in-light camera — no separate arm needed',
    ],
    use: 'General, orthopedic, oncologic, neuro, GYN, robotic-assist',
    specs: ['CRI 97+ / R9 95+', '3,500–5,000 K adjustable', 'No IR heat'],
  },
  {
    slug: 'skytron-stellar-led',
    name: 'Skytron Stellar LED',
    tagline: 'Reliable LED performance for general surgery',
    description:
      'The Stellar provides high-quality LED surgical lighting with adjustable intensity and color temperature. A cost-effective solution for general OR suites that demand reliable, low-maintenance illumination without the in-light camera option.',
    image: '/images/products/surgical-light.webp',
    alt: 'Skytron Stellar LED surgical light',
    category: 'surgical-lights',
    brand: 'Skytron',
    badge: 'Standard OR Light',
    specTable: [
      { label: 'Light Type', value: 'LED' },
      { label: 'Color Temp', value: 'Adjustable' },
      { label: 'Shadow Mgmt', value: 'Multi-point LED array' },
      { label: 'Maintenance', value: 'Long-life LED — no bulb changes' },
    ],
    features: [
      'High-quality LED illumination with adjustable intensity',
      'Multi-point LED array minimizes shadow artifacts',
      'Long-life LED — no bulb replacements needed',
      'Cost-effective for general OR suites',
    ],
    use: 'General OR, outpatient, ASC suites',
    specs: ['Adjustable color temp', 'Multi-point LED array', 'Long-life — no bulb changes'],
  },
  {
    slug: 'skytron-ar24',
    name: 'Skytron AR24 Birthing Light',
    tagline: 'Purpose-built for LDRP and birthing suites',
    description:
      'The AR24 is designed specifically for labor, delivery, recovery, and postpartum (LDRP) environments. Provides focused exam and delivery lighting without the intensity of a full OR overhead — appropriate for the patient-centered environment of a birthing suite.',
    image: '/images/products/surgical-light.webp',
    alt: 'Skytron AR24 birthing light for LDRP suites',
    category: 'surgical-lights',
    brand: 'Skytron',
    badge: "Women's Health",
    specTable: [
      { label: 'Application', value: 'LDRP, delivery, postpartum' },
      { label: 'Design', value: 'Recessed / ceiling-mount' },
      { label: 'Control', value: 'Bedside dimming' },
      { label: 'Environment', value: 'Patient-comfort optimized' },
    ],
    features: [
      'Purpose-built for labor, delivery, recovery, and postpartum rooms',
      'Recessed ceiling-mount design for a clean aesthetic',
      'Bedside dimming for patient comfort during recovery',
      'Focused exam and delivery lighting without full OR intensity',
    ],
    use: "LDRP rooms, birthing suites, women's health floors",
    specs: ['LDRP optimized', 'Bedside dimming', 'Patient-comfort design'],
  },
  {
    slug: 'skytron-mini-argos',
    name: 'Skytron Mini Argos',
    tagline: 'Portable exam and procedure light',
    description:
      'The Mini Argos is a compact, portable LED exam light for procedure rooms, patient rooms, and secondary lighting in clinical environments. Bright, focused spot with no shadow artifacts.',
    image: '/images/products/surgical-light.webp',
    alt: 'Skytron Mini Argos portable exam light',
    category: 'surgical-lights',
    brand: 'Skytron',
    badge: 'Exam Light',
    specTable: [
      { label: 'Form Factor', value: 'Portable / wall-mount' },
      { label: 'Light Type', value: 'LED' },
      { label: 'Application', value: 'Exam, procedure, recovery rooms' },
    ],
    features: [
      'Compact and portable — easily repositioned between rooms',
      'Bright, focused LED spot with no shadow artifacts',
      'Wall-mount option for permanent installation',
      'Ideal for exam rooms, procedure areas, and recovery bays',
    ],
    use: 'Procedure rooms, patient bays, recovery, secondary OR lighting',
    specs: ['Portable / wall-mount', 'Focused LED spot', 'Exam & procedure rooms'],
  },

  // ── Equipment Booms ─────────────────────────────────────────────────────
  {
    slug: 'skytron-center-mount-boom',
    name: 'Skytron Center Mount Boom',
    tagline: 'Ceiling-mounted OR equipment management system',
    description:
      'Skytron Center Mount Booms are ceiling-mounted equipment management systems that integrate medical gas (O₂, Air, N₂O, vacuum), electrical outlets, data, and AV routing into a single articulating arm. They free the OR floor, reduce trip hazards, and support multi-team room configurations — critical for hybrid OR, robotic-assist, and cardiac catheterization suites.',
    image: '/images/products/equipment-boom.webp',
    alt: 'Skytron Center Mount Boom — ceiling-mounted OR equipment management',
    category: 'equipment-booms',
    brand: 'Skytron',
    badge: 'Featured',
    specTable: [
      { label: 'Utilities', value: 'Gas + electrical + data + AV' },
      { label: 'Compliance', value: 'NFPA 99 Category 1' },
      { label: 'Mount', value: 'Center-mount ceiling' },
      { label: 'Compatibility', value: 'SkyVision AV integration' },
    ],
    features: [
      'Integrated gas, electrical, data, and AV on one arm',
      'NFPA 99 Category 1 compliant — required for hospital ORs',
      'Center-mount configuration ideal for bilateral surgeon access',
      'Compatible with SkyVision AV integration',
      'Custom arm configurations for robotic, biplane, and imaging suites',
      'Preventive maintenance programs with documented compliance records',
    ],
    use: 'Hybrid OR, robotic-assist, cardiac cath labs, imaging suites',
    specs: ['Gas + electrical + data + AV', 'NFPA 99 Category 1', 'Custom arm configs'],
  },
  {
    slug: 'hsi-boom-systems',
    name: 'HSI Surgical Boom Systems',
    tagline: 'Ceiling-mounted equipment arms with integrated utilities',
    description:
      'HSI Surgical Boom Systems provide ceiling-mounted equipment arms with integrated power, gas, and data connections. These systems clear the OR floor of cables and hoses, improving surgical team movement and reducing trip hazards while maintaining full utility access at the point of care.',
    image: '/images/products/hsi-hero.webp',
    alt: 'HSI Hospital Systems ceiling-mounted boom arms',
    category: 'equipment-booms',
    brand: 'HSI',
    specTable: [
      { label: 'Utilities', value: 'Power + gas + data' },
      { label: 'Mount', value: 'Ceiling-mounted' },
      { label: 'Benefit', value: 'Clear floor space' },
      { label: 'Application', value: 'Surgical suites' },
    ],
    features: [
      'Integrated power, gas, and data connections on one arm',
      'Clears the OR floor of cables and hoses',
      'Improves surgical team movement and workflow',
      'Reduces trip hazards in the operating environment',
    ],
    use: 'Surgical suites, procedure rooms, OR renovations',
    specs: ['Integrated power + gas + data', 'Clear floor space', 'Surgical suite efficiency'],
  },

  // ── OR Integration ──────────────────────────────────────────────────────
  {
    slug: 'skytron-skyvision',
    name: 'Skytron SkyVision',
    tagline: '4K AV integration and unified room control',
    description:
      "SkyVision is Skytron's integrated OR control and AV routing platform — connecting surgical displays, camera systems, boom-mounted monitors, and documentation systems into a unified room environment. Designed for hybrid OR, robotic-assist, and imaging suites where multiple video sources need to be managed in real time.",
    image: '/images/products/or-integration.webp',
    alt: 'SkyVision OR integration — 4K AV switching and room control',
    category: 'or-integration',
    brand: 'Skytron',
    badge: 'Featured',
    specTable: [
      { label: 'Resolution', value: '4K-capable AV switching' },
      { label: 'Display Routing', value: 'Boom-mounted + overhead' },
      { label: 'Control', value: 'Room lighting + AV + camera views' },
      { label: 'Compatibility', value: 'Stryker, Arthrex, major endoscope platforms' },
    ],
    features: [
      '4K-capable AV switching across all OR displays',
      'Integrates with boom-mounted monitors and overhead lights',
      'Control panel for room lighting, AV routing, and camera views',
      'Compatible with Stryker, Arthrex, and major endoscope platforms',
    ],
    use: 'Hybrid OR, robotic-assist, imaging suites, endoscopy',
    specs: ['4K AV switching', 'Boom-mounted display routing', 'Endoscope compatible'],
  },

  // ── OR Furniture ────────────────────────────────────────────────────────
  {
    slug: 'hsi-or-furniture',
    name: 'HSI OR Furniture',
    tagline: 'Hospital-grade OR cabinetry and storage systems',
    description:
      'HSI OR Furniture includes hospital-grade cabinetry, storage systems, and workstation solutions designed specifically for surgical environments. Built for durability, infection control compliance, and efficient OR organization — from instrument storage to back-table setups.',
    image: '/images/products/hsi-hero.webp',
    alt: 'HSI Hospital Systems operating room furniture and cabinetry',
    category: 'or-furniture',
    brand: 'HSI',
    specTable: [
      { label: 'Material', value: 'Hospital-grade stainless / laminate' },
      { label: 'Compliance', value: 'Infection control ready' },
      { label: 'Customization', value: 'Custom layouts available' },
      { label: 'Cleaning', value: 'Easy-clean surfaces' },
    ],
    features: [
      'Hospital-grade durability for high-traffic surgical environments',
      'Easy-clean surfaces compliant with infection control protocols',
      'Custom layouts to match OR workflow and room dimensions',
      'Instrument storage, back-table, and workstation configurations',
    ],
    use: 'Operating rooms, sterile processing, procedure rooms',
    specs: ['Hospital-grade durability', 'Easy to clean', 'Custom layouts'],
  },

  // ── Patient Care ────────────────────────────────────────────────────────
  {
    slug: 'hsi-patient-care',
    name: 'HSI Patient Care Equipment',
    tagline: 'Stretchers, transfer systems, and positioning products',
    description:
      'HSI Patient Care equipment includes stretchers, transfer systems, and patient positioning products engineered for safety and caregiver ergonomics. Designed to reduce patient handling injuries while maintaining comfort during transport and positioning.',
    image: '/images/products/hsi-hero.webp',
    alt: 'HSI Hospital Systems patient care and transfer equipment',
    category: 'patient-care',
    brand: 'HSI',
    specTable: [
      { label: 'Products', value: 'Stretchers, transfer systems, positioning' },
      { label: 'Focus', value: 'Patient safety + caregiver ergonomics' },
      { label: 'Design', value: 'Injury reduction engineering' },
      { label: 'Application', value: 'Transport, pre-op, post-op, recovery' },
    ],
    features: [
      'Stretchers and transfer systems for safe patient movement',
      'Ergonomic design reduces caregiver handling injuries',
      'Patient comfort during transport and positioning',
      'Suitable for pre-op, post-op, and recovery environments',
    ],
    use: 'Transport, pre-op staging, post-op recovery, patient floors',
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

/** Get a single product by its slug */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Get categories with product counts */
export function getCategoriesWithCounts(): (Category & { count: number })[] {
  return categories.map((cat) => ({
    ...cat,
    count: products.filter((p) => p.category === cat.slug).length,
  }));
}
