export const site = {
  brand: 'Surgiquip Solutions, Inc.',
  short: 'Surgiquip',
  tagline: 'Dedicated to Excellence',
  established: 1983,
  yearsInBusiness: 43,
  phone: '(713) 681-6362',
  phoneE164: '+17136816362',
  fax: '(713) 957-8355',
  email: 'info@surgiquipsolutions.com',
  address: {
    street: '10653 Kinghurst Drive',
    city: 'Houston',
    region: 'TX',
    postalCode: '77099',
    country: 'US',
  },
  hours: 'Mon–Fri 7:30am–4:30pm',
  hoursSchema: 'Mo-Fr 07:30-16:30',
  social: {
    linkedin: 'https://www.linkedin.com/company/surgiquip-solutions-inc-',
    youtube: 'https://www.youtube.com/@surgiquip',
  },
  url: 'https://surgiquip.com',
} as const;

export const nav = [
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'Skytron', href: '/products/skytron' },
      { label: 'HSI', href: '/products/hsi' },
      { label: 'Knight', href: '/products/knight' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Equipment Sales', href: '/services/equipment-sales' },
      { label: 'Service & Repair', href: '/services/service-and-repair' },
      { label: 'OR Installation', href: '/services/or-installation' },
      { label: 'Preventive Maintenance', href: '/services/preventive-maintenance' },
    ],
  },
  { label: 'Projects', href: '/projects' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Our Story', href: '/about/our-story' },
      { label: 'Our Team', href: '/about/team' },
      { label: 'Accreditation', href: '/about/accreditation' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

export const services = [
  { slug: 'equipment-sales', title: 'Equipment Sales', blurb: 'Premium medical equipment from industry-leading manufacturers, including Skytron.', icon: 'cart' },
  { slug: 'service-and-repair', title: 'Service & Repair', blurb: 'Factory-trained technicians providing fast, reliable repair and support.', icon: 'wrench' },
  { slug: 'or-installation', title: 'OR Installation', blurb: 'Turnkey OR integration and installation with precision and expertise.', icon: 'gear' },
  { slug: 'preventive-maintenance', title: 'Preventive Maintenance', blurb: 'Planned maintenance programs to maximize uptime and protect your investment.', icon: 'shield' },
];

export const stats = [
  { value: '43 Years', label: 'Serving Healthcare', sub: 'Since 1983' },
  { value: 'A+ BBB', label: 'Accredited Business', sub: 'Since 1983' },
  { value: '500+ Facilities', label: 'Hospitals & Surgical', sub: 'Centers Served' },
  { value: '24hr Response', label: 'Rapid Support When', sub: 'You Need It Most' },
];

export const partners = [
  { name: 'Skytron', label: 'SKYTRON®' },
  { name: 'HSI', label: 'HSI Hospital Systems, Inc.' },
  { name: 'Knight', label: 'KNIGHT®' },
  { name: 'BBB', label: 'BBB Accredited Business' },
];
