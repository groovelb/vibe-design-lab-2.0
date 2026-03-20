/**
 * Context Engine — self-contained interactive visualization
 *
 * Usage:
 *   import ContextEngine from './context-engine'
 *
 * Dependencies: react, gsap
 *
 * Files:
 *   ContextEngine.jsx  — Main orchestrator (SVG desktop / FloatingNodes mobile)
 *   Sphere.jsx         — 3D rotating sphere (120 square nodes, golden spiral)
 *   InputStreams.jsx    — Left panel: 6 input streams with bezier curves
 *   OutputChannels.jsx  — Right panel: 4 output channels with bezier curves
 *   FloatingNodes.jsx   — Mobile fallback (25 DOM divs, Brownian motion)
 *   constants.js        — Colors, layout, labels
 *   curves.js           — Bezier curve generators
 *   math.js             — 3D sphere math (golden spiral, projection, z-sort)
 */
export { default } from './ContextEngine';
