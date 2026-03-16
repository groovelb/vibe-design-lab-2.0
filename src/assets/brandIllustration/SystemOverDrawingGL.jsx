'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Box from '@mui/material/Box';

/* ── Layer definitions (from reference PNG + V3/V6 measurements) ── */

const LAYERS = [
  { id: 'background', fw: 159, fd: 106, iz: 0 },
  { id: 'spatial',    fw: 150, fd: 100, iz: 5 },
  { id: 'motion',     fw: 141, fd: 94,  iz: 10 },
  { id: 'color',      fw: 132, fd: 88,  iz: 15 },
  { id: 'typography', fw: 123, fd: 82,  iz: 20 },
];

const BH = 11;        // Slab thickness (SVG units, shared)
const CR = 8;         // Corner radius (SVG units)
const UNIT = 8;       // Vertical spacing unit
const S = 0.01;       // SVG → Three.js scale
const FILL = 0x08090a;
const EDGE = 0xffffff;

/* ── Geometry helpers ─────────────────────────────────────── */

/**
 * Rounded rectangle Shape in XY plane, centered at origin.
 */
function roundedRectShape(w, h, r) {
  const s = new THREE.Shape();
  const hw = w / 2, hh = h / 2;
  r = Math.min(r, hw, hh);

  s.moveTo(-hw + r, -hh);
  s.lineTo(hw - r, -hh);
  s.quadraticCurveTo(hw, -hh, hw, -hh + r);
  s.lineTo(hw, hh - r);
  s.quadraticCurveTo(hw, hh, hw - r, hh);
  s.lineTo(-hw + r, hh);
  s.quadraticCurveTo(-hw, hh, -hw, hh - r);
  s.lineTo(-hw, -hh + r);
  s.quadraticCurveTo(-hw, -hh, -hw + r, -hh);

  return s;
}

/**
 * Slab geometry: ExtrudeGeometry rotated so it lies flat in XZ with height along Y.
 *
 * After rotateX(-π/2): shape XY → XZ, extrusion Z → Y(up).
 * Bottom face at y=0, top face at y=BH*S.
 */
function createSlabGeometry(fw, fd) {
  const shape = roundedRectShape(fw * S, fd * S, CR * S);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: BH * S,
    bevelEnabled: false,
    curveSegments: 12,
  });
  geo.rotateX(-Math.PI / 2);
  return geo;
}

/**
 * Vertical edge lines at straight-section endpoints.
 *
 * EdgesGeometry captures top/bottom outlines (90° face transitions)
 * but misses vertical edges (smooth rounded corner transitions).
 *
 * We add 8 vertical lines at the points where straight sections
 * meet rounded arcs. These positions are exactly on the mesh surface
 * and at vertices shared with the EdgesGeometry outlines, ensuring
 * seamless visual connection.
 */
function createVerticalEdges(fw, fd) {
  const hw = fw * S / 2;
  const hd = fd * S / 2;
  const h = BH * S;
  const r = CR * S;

  // 8 transition points: 2 per corner (end of each straight section)
  // After rotateX(-π/2): shape (x, y) → world (x, *, -y)
  const positions = new Float32Array([
    // Right side: ends at front and back corners
    hw, 0, hd - r,     hw, h, hd - r,      // right→front-right
    hw, 0, -(hd - r),  hw, h, -(hd - r),   // right→back-right
    // Front side: ends at right and left corners
    hw - r, 0, hd,     hw - r, h, hd,      // front→front-right
    -(hw - r), 0, hd,  -(hw - r), h, hd,   // front→front-left
    // Left side: ends at front and back corners
    -hw, 0, hd - r,    -hw, h, hd - r,     // left→front-left
    -hw, 0, -(hd - r), -hw, h, -(hd - r),  // left→back-left
    // Back side: ends at right and left corners
    hw - r, 0, -hd,    hw - r, h, -hd,     // back→back-right
    -(hw - r), 0, -hd, -(hw - r), h, -hd,  // back→back-left
  ]);

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return geo;
}

/* ── Component ────────────────────────────────────────────── */

/**
 * SystemOverDrawingGL — Three.js 아이소메트릭 분해도
 *
 * OrthographicCamera + EdgesGeometry로 5개 디자인 토큰 레이어의
 * 구조를 정확하게 렌더링. 슬래브 비율·간격·우측정렬.
 *
 * @param {object} sx - MUI sx 스타일 오버라이드 [Optional]
 */
function SystemOverDrawingGL({ sx, ...props }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    /* ── Scene ── */
    const scene = new THREE.Scene();

    /* ── Camera: dimetric 2:1 (screen slope = 0.5, angle ≈ 26.57°) ── */
    const { width: w0, height: h0 } = el.getBoundingClientRect();
    const iw = Math.max(w0, 1), ih = Math.max(h0, 1);
    const fSize = 3.0;
    const aspect = iw / ih;

    const camera = new THREE.OrthographicCamera(
      -fSize * aspect / 2, fSize * aspect / 2,
      fSize / 2, -fSize / 2,
      0.1, 100,
    );

    // Scene centroid (average of all slab centers)
    const cxScene = LAYERS.reduce((a, l) => a - (l.fw + l.fd) * S / 2, 0) / LAYERS.length;
    const cyScene = LAYERS.reduce((a, l) => a + l.iz * UNIT * S, 0) / LAYERS.length + BH * S / 2;

    // Dimetric 2:1: camera at target + d*(1, √(2/3), 1)
    // This produces exact 26.57° (atan 1/2) screen slopes
    const d = 20;
    camera.position.set(cxScene + d, cyScene + d * Math.sqrt(2 / 3), d);
    camera.lookAt(cxScene, cyScene, 0);

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(iw, ih);
    el.appendChild(renderer.domElement);

    /* ── Materials (shared) ── */
    const fillMat = new THREE.MeshBasicMaterial({
      color: FILL,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });
    const edgeMat = new THREE.LineBasicMaterial({ color: EDGE });
    // Separate material for vertical edges — depthTest off to prevent
    // z-fighting with mesh surface at shared positions
    const vertMat = new THREE.LineBasicMaterial({ color: EDGE, depthTest: false });

    /* ── Build slabs ── */
    const geometries = [];

    LAYERS.forEach((l) => {
      const group = new THREE.Group();
      const geo = createSlabGeometry(l.fw, l.fd);
      geometries.push(geo);

      // Fill mesh
      group.add(new THREE.Mesh(geo, fillMat));

      // Wireframe edges (threshold 15°: captures 90° face transitions,
      // excludes rounded corner sub-segments)
      const eGeo = new THREE.EdgesGeometry(geo, 15);
      geometries.push(eGeo);
      group.add(new THREE.LineSegments(eGeo, edgeMat));

      // Vertical edges at straight-section endpoints
      const vGeo = createVerticalEdges(l.fw, l.fd);
      geometries.push(vGeo);
      group.add(new THREE.LineSegments(vGeo, vertMat));

      // Right-aligned: back-right-top vertex screen X = constant for all slabs
      // px = -(fw + fd) * S / 2 ensures this
      group.position.set(-(l.fw + l.fd) * S / 2, l.iz * UNIT * S, 0);
      group.name = l.id;
      scene.add(group);
    });

    /* ── Render ── */
    renderer.render(scene, camera);

    /* ── Resize ── */
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (!width || !height) return;
      const a = width / height;
      camera.left = -fSize * a / 2;
      camera.right = fSize * a / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.render(scene, camera);
    });
    ro.observe(el);

    /* ── Cleanup ── */
    return () => {
      ro.disconnect();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      renderer.dispose();
      fillMat.dispose();
      edgeMat.dispose();
      vertMat.dispose();
      geometries.forEach((g) => g.dispose());
    };
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{ width: '100%', height: '100%', minHeight: 400, ...sx }}
      {...props}
    />
  );
}

export { SystemOverDrawingGL };
