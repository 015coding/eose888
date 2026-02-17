// app/constants/index.ts

export const NAVIGATION_ITEMS = ['Trading', 'Platforms', 'Markets', 'Partners', 'About'] as const

export const TRADING_STATS = [
  { value: '600K+', label: 'Active Traders' },
  { value: '$4T+', label: 'Monthly Volume' },
  { value: '0.1ms', label: 'Avg Execution' },
  { value: '120+', label: 'Instruments' },
] as const

export const FEATURES = [
  {
    title: 'Ultra-Fast Execution',
    description: 'Execute trades in milliseconds with our advanced infrastructure and technology.',
  },
  {
    title: 'Regulated & Secure',
    description: 'Trade with confidence knowing your funds are protected by top-tier security.',
  },
  {
    title: 'Competitive Spreads',
    description: 'Access tight spreads and transparent pricing across all major markets.',
  },
  {
    title: 'Global Markets',
    description: 'Trade forex, metals, indices, and cryptocurrencies from a single platform.',
  },
] as const

export const TRUST_INDICATORS = [
  { text: 'No Commission' },
  { text: '0.1ms Execution' },
  { text: 'Tier-1 Regulated' },
] as const

export const FOOTER_LINKS = [
  {
    title: 'Product',
    links: ['Trading Accounts', 'Platforms', 'Markets', 'Pricing', 'API'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Blog', 'Careers', 'Press', 'Contact'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'Risk Disclosure', 'Compliance'],
  },
] as const

export const COLORS = {
  primary: {
    gold: '#FFD700',
    orange: '#FFA500',
    gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  },
  background: {
    dark: '#0A0E27',
    darkAlt: '#1A1F3A',
    card: '#0F1229',
  },
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    muted: 'rgba(255, 255, 255, 0.6)',
  },
} as const