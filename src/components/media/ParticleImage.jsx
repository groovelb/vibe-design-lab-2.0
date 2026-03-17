'use client';
import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Box from '@mui/material/Box';

// ============================================================
// Shaders
// ============================================================

const VERTEX_SHADER = /* glsl */ `
uniform float uProgress;
uniform float uBaseSize;

attribute float aSize;
attribute float aOpacity;
attribute vec2 aImageUV;

varying float vOpacity;
varying vec2 vImageUV;
varying float vProgress;

void main() {
  vOpacity = aOpacity;
  vImageUV = aImageUV;
  vProgress = uProgress;

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

  float particleSize = uBaseSize * aSize;
  float imageSize = uBaseSize * 0.55;
  gl_PointSize = mix(particleSize, imageSize, uProgress);

  gl_Position = projectionMatrix * mvPosition;
}
`;

const FRAGMENT_SHADER = /* glsl */ `
uniform sampler2D uTexture;
uniform float uProgress;

varying float vOpacity;
varying vec2 vImageUV;
varying float vProgress;

void main() {
  vec2 center = gl_PointCoord - 0.5;
  float dist = length(center);
  if (dist > 0.5) discard;

  float circle = smoothstep(0.5, 0.35, dist);

  vec4 particleColor = vec4(1.0, 1.0, 1.0, vOpacity * circle);
  vec4 imageColor = texture2D(uTexture, vImageUV);

  gl_FragColor = mix(particleColor, imageColor, vProgress);
}
`;

// ============================================================
// Image Processing (CPU, one-time)
// ============================================================

const SAMPLE_RESOLUTION = 200;
const LUMA_THRESHOLD = 0.88;

function processImage(img) {
  const canvas = document.createElement('canvas');
  const aspect = img.height / img.width;
  const w = SAMPLE_RESOLUTION;
  const h = Math.round(SAMPLE_RESOLUTION * aspect);
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h);

  const positions = [];
  const uvs = [];
  const sizes = [];
  const opacities = [];

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const r = data[i] / 255;
      const g = data[i + 1] / 255;
      const b = data[i + 2] / 255;

      const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      if (luma > LUMA_THRESHOLD) continue;

      const inv = 1.0 - luma;

      positions.push(x / w - 0.5, -(y / h - 0.5), 0);
      uvs.push(x / w, 1 - y / h);
      sizes.push(inv);
      opacities.push(Math.pow(inv, 0.8));
    }
  }

  return {
    positions: new Float32Array(positions),
    uvs: new Float32Array(uvs),
    sizes: new Float32Array(sizes),
    opacities: new Float32Array(opacities),
    count: positions.length / 3,
  };
}

// ============================================================
// R3F Scene
// ============================================================

function ParticleScene({ imageSrc, isHovered }) {
  const pointsRef = useRef();
  const progressRef = useRef(0);
  const [particleData, setParticleData] = useState(null);
  const { viewport, size } = useThree();

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uBaseSize: { value: 4.0 },
      uTexture: { value: null },
    }),
    [],
  );

  // Load image → process pixels → create texture
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setParticleData(processImage(img));

      const tex = new THREE.TextureLoader().load(imageSrc);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      uniforms.uTexture.value = tex;
    };
    img.src = imageSrc;

    return () => {
      if (uniforms.uTexture.value) {
        uniforms.uTexture.value.dispose();
      }
    };
  }, [imageSrc, uniforms]);

  // Recalculate base size when canvas resizes
  useEffect(() => {
    const dpr = Math.min(window.devicePixelRatio, 2);
    uniforms.uBaseSize.value = (size.width * dpr) / SAMPLE_RESOLUTION;
  }, [size.width, uniforms]);

  // Animate progress (lerp for smooth 60fps transition)
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  useFrame((_, delta) => {
    const target = isHovered ? 1 : 0;
    if (prefersReducedMotion) {
      progressRef.current = target;
    } else {
      progressRef.current += (target - progressRef.current) * Math.min(delta * 4, 1);
    }
    uniforms.uProgress.value = progressRef.current;
  });

  if (!particleData) return null;

  return (
    <group scale={[viewport.width, viewport.height, 1]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={particleData.positions}
            count={particleData.count}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aImageUV"
            array={particleData.uvs}
            count={particleData.count}
            itemSize={2}
          />
          <bufferAttribute
            attach="attributes-aSize"
            array={particleData.sizes}
            count={particleData.count}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aOpacity"
            array={particleData.opacities}
            count={particleData.count}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={VERTEX_SHADER}
          fragmentShader={FRAGMENT_SHADER}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </points>
    </group>
  );
}

// ============================================================
// Public Component
// ============================================================

/**
 * ParticleImage 컴포넌트
 *
 * 이미지를 GPU 파티클로 렌더링.
 * 기본: 흰색 파티클 (inverse luminance), 호버: 원본 사진 트랜지션.
 *
 * @param {string} src - 이미지 경로 [Required]
 * @param {string} alt - 대체 텍스트 [Required]
 * @param {object} sx - 컨테이너 추가 스타일 [Optional]
 *
 * Example usage:
 * <ParticleImage src="/photo.png" alt="프로필" />
 */
export function ParticleImage({ src, alt, sx }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio: '3 / 4',
        bgcolor: 'common.black',
        position: 'relative',
        cursor: 'pointer',
        ...sx,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={alt}
      role="img"
    >
      <Canvas
        camera={{ position: [0, 0, 1], fov: 50 }}
        dpr={[1, 2]}
        style={{ position: 'absolute', inset: 0 }}
        gl={{ alpha: true, antialias: false }}
      >
        <ParticleScene imageSrc={src} isHovered={isHovered} />
      </Canvas>
    </Box>
  );
}
