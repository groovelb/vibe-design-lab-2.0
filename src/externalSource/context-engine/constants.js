/**
 * ContextEngine visual constants
 */

// Colors
export const COLORS = {
  green: '#1aa049',
  greenDim: '#1aa04966',
  greenGlow: '#1aa04940',
  bg: '#0a0a0a',
  surface: '#171717',
  foreground: '#fafafa',
  muted: '#a1a1a1',
  dimmer: '#525252',
  border: '#282828',
};

// SVG viewBox dimensions (widened for horizontal space)
export const VIEW = { w: 1600, h: 500 };

// Sphere center and radius (centered in wider canvas, slightly larger)
export const SPHERE = { cx: 800, cy: 260, r: 160 };

// Input streams (left panel) — spread across vertical space
export const INPUT_STREAMS = [
  { label: 'Code',           y: 90 },
  { label: 'Dependencies',   y: 155 },
  { label: 'Documentation',  y: 220 },
  { label: 'Style',          y: 285 },
  { label: 'Recent Changes', y: 350 },
  { label: 'Issues',         y: 415 },
];

// Output channels (right panel)
export const OUTPUT_CHANNELS = [
  { label: 'Completions', y: 120 },
  { label: 'Code Review', y: 210 },
  { label: 'Agents',      y: 300 },
  { label: 'Intent',      y: 390 },
];

// Layout positions for wider canvas
export const LAYOUT = {
  inputLabelX: 40,
  inputDotsX: 200,
  inputPathStartX: 270,
  outputEndX: 1380,
  outputLabelX: 1400,
};

// Source file names for sphere highlight labels
export const SOURCE_NAMES = [
  'billing.service.ts',
  'stripe-webhook.ts',
  'auth/session.ts',
  'feature-flags.ts',
  'api/routes.ts',
  'db/migrations.ts',
  'user.model.ts',
  'payment.controller.ts',
  'middleware/auth.ts',
  'config/env.ts',
  'utils/crypto.ts',
  'hooks/useAuth.ts',
  'components/Dashboard.tsx',
  'lib/redis.ts',
  'services/email.ts',
  'workers/sync.ts',
  'schema/graphql.ts',
  'tests/e2e/auth.spec.ts',
  'deploy/k8s.yaml',
  'ci/pipeline.yml',
  'docs/api-ref.md',
  'README.md',
  'package.json',
  'tsconfig.json',
  '.env.production',
  'Dockerfile',
  'nginx.conf',
  'prisma/schema.prisma',
  'tailwind.config.ts',
  'next.config.js',
];

// Highlight timing
export const HIGHLIGHT = {
  maxActive: 10,
  fadeIn: 0.6,
  holdMin: 3,
  holdMax: 5,
  fadeOut: 0.6,
  cooldownMin: 0.5,
  cooldownMax: 1.5,
};
