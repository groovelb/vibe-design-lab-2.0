/**
 * PlayerExternal 컴포넌트 (Claw'd 캐릭터 — 외부 프로젝트용)
 *
 * 모든 의존성(상수, 키보드 훅, 스토어)을 인라인 하드코딩하여
 * 외부 프로젝트에서 단독으로 사용 가능합니다.
 *
 * 필요 패키지:
 * - react, @react-three/fiber, @react-three/rapier
 *
 * Example usage:
 * <PlayerExternal />
 */

import { useRef, useMemo, useEffect, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CuboidCollider } from '@react-three/rapier';

// ─── 하드코딩 상수 (PLAYER) ──────────────────────────────────────

const PLAYER = {
  CHARACTER_SCALE: 0.3,
  WALK_SPEED: 8,
  SPRINT_SPEED: 14,
  JUMP_IMPULSE: 12,
  JUMP_COOLDOWN: 300,
  BOUNCE_HEIGHT: 0.12,
  BOUNCE_SPEED: 13,
  SPAWN_POSITION: { x: 0, y: 1, z: 0 },
  COLLIDER_HALF: [1.35, 0.9, 0.45],
  COLLIDER_OFFSET: [0, 0.9, 0],
  TURN_SPEED: 3.0,
  BACKWARD_MULTIPLIER: 0.6,
  FALL_RESET_Y: -10,
};

// ─── 캐릭터 색상 ────────────────────────────────────────────────

const ORANGE = '#E57B55';
const BLACK = '#1A1A1A';

// ─── 인라인 키보드 훅 ───────────────────────────────────────────

/**
 * useKeyboardInline Hook
 *
 * WASD / 화살표 키 입력을 감지하여 이동 의도(intent)를 반환합니다.
 * W/S → 전진/후진, A/D → 좌회전/우회전, Shift → 달리기, Space → 점프.
 *
 * @returns {{ getMovement: function }}
 */
function useKeyboardInline() {
  const keysRef = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });
  const sprintRef = useRef(false);
  const jumpRequestedRef = useRef(false);

  const handleKeyDown = useCallback((e) => {
    switch (e.code) {
      case 'KeyW':
      case 'ArrowUp':
        keysRef.current.forward = true;
        e.preventDefault();
        break;
      case 'KeyS':
      case 'ArrowDown':
        keysRef.current.backward = true;
        e.preventDefault();
        break;
      case 'KeyA':
      case 'ArrowLeft':
        keysRef.current.left = true;
        e.preventDefault();
        break;
      case 'KeyD':
      case 'ArrowRight':
        keysRef.current.right = true;
        e.preventDefault();
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        sprintRef.current = true;
        break;
      case 'Space':
        if (!e.repeat) {
          jumpRequestedRef.current = true;
          e.preventDefault();
        }
        break;
    }
  }, []);

  const handleKeyUp = useCallback((e) => {
    switch (e.code) {
      case 'KeyW':
      case 'ArrowUp':
        keysRef.current.forward = false;
        break;
      case 'KeyS':
      case 'ArrowDown':
        keysRef.current.backward = false;
        break;
      case 'KeyA':
      case 'ArrowLeft':
        keysRef.current.left = false;
        break;
      case 'KeyD':
      case 'ArrowRight':
        keysRef.current.right = false;
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        sprintRef.current = false;
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const getMovement = useCallback(() => {
    const keys = keysRef.current;
    const jump = jumpRequestedRef.current;
    jumpRequestedRef.current = false;

    return {
      forward: keys.forward,
      backward: keys.backward,
      turnLeft: keys.left,
      turnRight: keys.right,
      isMoving: keys.forward || keys.backward,
      isSprinting: sprintRef.current,
      jumpRequested: jump,
    };
  }, []);

  return { getMovement };
}

// ─── 복셀 캐릭터 모델 ──────────────────────────────────────────

/**
 * Claw'd 캐릭터의 복셀 구조 데이터를 생성합니다.
 * - 몸통 9w×3h×3d, 다리 8개, 팔 양쪽 2w×3d
 * 각 블록은 { x, y, z, color } 형태입니다.
 */
function buildCharacterBlocks() {
  const blocks = [];

  const bodyW = 9;
  const bodyOffset = -4;
  const bodyD = 3;
  const zOffset = -1;

  /** Y=0~2: 다리 8개 (각 1w×1d×3h) */
  const legXPositions = [0, 2, 6, 8];
  const legZPositions = [0, 2];
  for (const lx of legXPositions) {
    for (const lz of legZPositions) {
      for (let y = 0; y <= 2; y++) {
        blocks.push({
          x: lx + bodyOffset,
          y,
          z: lz + zOffset,
          color: ORANGE,
        });
      }
    }
  }

  /** Y=3~5: 몸통/머리 3층 (9w×3d) */
  for (let y = 3; y <= 5; y++) {
    for (let x = 0; x < bodyW; x++) {
      for (let z = 0; z < bodyD; z++) {
        let color = ORANGE;
        if (y === 4 && z === 0 && (x === 3 || x === 5)) {
          color = BLACK;
        }
        blocks.push({
          x: x + bodyOffset,
          y,
          z: z + zOffset,
          color,
        });
      }
    }
  }

  /** Y=4: 양쪽 팔 (각 2w×3d) */
  for (let ax = 1; ax <= 2; ax++) {
    for (let z = 0; z < bodyD; z++) {
      blocks.push({ x: bodyOffset - ax, y: 4, z: z + zOffset, color: ORANGE });
      blocks.push({ x: bodyW + bodyOffset - 1 + ax, y: 4, z: z + zOffset, color: ORANGE });
    }
  }

  return blocks;
}

/** InstancedMesh용 캐릭터 블록 렌더러 */
function CharacterMesh({ blocks }) {
  const { orangeBlocks, blackBlocks } = useMemo(() => {
    const oranges = [];
    const blacks = [];
    blocks.forEach((b) => {
      if (b.color === BLACK) {
        blacks.push(b);
      } else {
        oranges.push(b);
      }
    });
    return { orangeBlocks: oranges, blackBlocks: blacks };
  }, [blocks]);

  return (
    <group>
      { orangeBlocks.map((b, i) => (
        <mesh
          key={ `o-${i}` }
          position={ [b.x, b.y, b.z] }
          castShadow
        >
          <boxGeometry args={ [1, 1, 1] } />
          <meshStandardMaterial
            color={ ORANGE }
            roughness={ 0.85 }
            metalness={ 0 }
          />
        </mesh>
      )) }

      { blackBlocks.map((b, i) => (
        <mesh
          key={ `b-${i}` }
          position={ [b.x, b.y, b.z] }
          castShadow
        >
          <boxGeometry args={ [1, 1, 1] } />
          <meshStandardMaterial
            color={ BLACK }
            roughness={ 0.9 }
            metalness={ 0 }
          />
        </mesh>
      )) }
    </group>
  );
}

// ─── 메인 컴포넌트 ──────────────────────────────────────────────

/**
 * PlayerExternal 컴포넌트 (외부 프로젝트 독립 사용)
 *
 * Props:
 * @param {object} spawnPosition - 초기 스폰 위치 { x, y, z } [Optional, 기본값: { x: 0, y: 1, z: 0 }]
 * @param {function} onPositionChange - 위치 변경 콜백 (pos) => void [Optional]
 * @param {function} onRotationChange - 회전 변경 콜백 (angle) => void [Optional]
 * @param {boolean} isVisible - 캐릭터 표시 여부 [Optional, 기본값: true]
 *
 * Example usage:
 * <PlayerExternal />
 * <PlayerExternal spawnPosition={{ x: 5, y: 1, z: 3 }} onPositionChange={console.log} />
 */
function PlayerExternal({
  spawnPosition = PLAYER.SPAWN_POSITION,
  onPositionChange,
  onRotationChange,
  isVisible = true,
}) {
  const rigidBodyRef = useRef();
  const characterGroupRef = useRef();
  const lastJumpTimeRef = useRef(0);
  const facingAngleRef = useRef(0);
  const { getMovement } = useKeyboardInline();

  const characterBlocks = useMemo(() => buildCharacterBlocks(), []);

  useFrame(({ clock }, delta) => {
    if (!rigidBodyRef.current) return;

    const { forward, backward, turnLeft, turnRight, isMoving, isSprinting, jumpRequested } =
      getMovement();

    // A/D → 캐릭터 회전
    if (turnLeft) facingAngleRef.current += PLAYER.TURN_SPEED * delta;
    if (turnRight) facingAngleRef.current -= PLAYER.TURN_SPEED * delta;

    // facingAngle 기준 전방 벡터
    const fwdX = -Math.sin(facingAngleRef.current);
    const fwdZ = -Math.cos(facingAngleRef.current);

    const speed = isSprinting ? PLAYER.SPRINT_SPEED : PLAYER.WALK_SPEED;

    const currentVel = rigidBodyRef.current.linvel();
    let velX = 0;
    let velZ = 0;

    if (forward) {
      velX = fwdX * speed;
      velZ = fwdZ * speed;
    } else if (backward) {
      velX = -fwdX * speed * PLAYER.BACKWARD_MULTIPLIER;
      velZ = -fwdZ * speed * PLAYER.BACKWARD_MULTIPLIER;
    }

    rigidBodyRef.current.setLinvel({ x: velX, y: currentVel.y, z: velZ }, true);

    // 점프
    if (jumpRequested) {
      const now = Date.now();
      const isGrounded = Math.abs(currentVel.y) < 0.5;
      const cooldownOk = now - lastJumpTimeRef.current > PLAYER.JUMP_COOLDOWN;

      if (isGrounded && cooldownOk) {
        rigidBodyRef.current.setLinvel(
          { x: currentVel.x, y: PLAYER.JUMP_IMPULSE, z: currentVel.z },
          true
        );
        lastJumpTimeRef.current = now;
      }
    }

    // 캐릭터 비주얼 회전
    if (characterGroupRef.current) {
      characterGroupRef.current.rotation.y = facingAngleRef.current;
    }
    if (onRotationChange) {
      onRotationChange(facingAngleRef.current);
    }

    // 바운스 애니메이션
    if (characterGroupRef.current) {
      if (isMoving) {
        const bounceSpeed = isSprinting
          ? PLAYER.BOUNCE_SPEED * 1.3
          : PLAYER.BOUNCE_SPEED;
        const bounce = Math.abs(
          Math.sin(clock.getElapsedTime() * bounceSpeed)
        ) * PLAYER.BOUNCE_HEIGHT;
        characterGroupRef.current.position.y = bounce;
      } else {
        characterGroupRef.current.position.y *= 0.85;
      }
    }

    // 위치 콜백
    const pos = rigidBodyRef.current.translation();
    if (onPositionChange) {
      onPositionChange({ x: pos.x, y: pos.y, z: pos.z });
    }

    // 낙하 방지
    if (pos.y < PLAYER.FALL_RESET_Y) {
      rigidBodyRef.current.setTranslation(spawnPosition, true);
      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    }
  });

  return (
    <RigidBody
      ref={ rigidBodyRef }
      type="dynamic"
      position={ [spawnPosition.x, spawnPosition.y, spawnPosition.z] }
      enabledRotations={ [false, false, false] }
      linearDamping={ 2 }
      mass={ 1 }
      colliders={ false }
      ccd={ true }
    >
      <CuboidCollider
        args={ PLAYER.COLLIDER_HALF }
        position={ PLAYER.COLLIDER_OFFSET }
      />

      <group ref={ characterGroupRef } visible={ isVisible }>
        <group scale={ PLAYER.CHARACTER_SCALE }>
          <CharacterMesh blocks={ characterBlocks } />
        </group>
      </group>
    </RigidBody>
  );
}

export default PlayerExternal;
export { CharacterMesh, buildCharacterBlocks, PLAYER, useKeyboardInline };
