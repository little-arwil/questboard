"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useAnimations, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const MODEL_PATH = "/models/quest-dragon.glb";
const CAMERA_DISTANCE = 14;
const CAMERA_FOV = 50;
const TARGET_HEIGHT_RATIO = 0.5;

const HEAD_BONES = [
  "Bip002-Head_015",
  "Bip002-Neck2_014",
  "Bip002-Neck1_013",
  "Bip002-Neck_012",
];

const TAIL_BONES = [
  "Bip002-Tail_0214",
  "Bip002-Tail1_0215",
  "Bip002-Tail2_0216",
  "Bip002-Tail3_0217",
  "Bip002-Tail4_0218",
  "Bip002-Tail5_0219",
  "Bip002-Tail6_01",
  "Bip002-Tail7_02",
  "Bip002-Tail8_03",
];

const LEFT_WING_BONES = [
  "Bip001-L-Clavicle_0139",
  "Bip001-L-UpperArm_0140",
  "Bip001-L-Forearm_0141",
  "Bip001-L-Hand_0142",
];

const RIGHT_WING_BONES = [
  "Bip001-R-Clavicle_0149",
  "Bip001-R-UpperArm_0150",
  "Bip001-R-Forearm_0151",
  "Bip001-R-Hand_0152",
];

type CursorTarget = {
  x: number;
  y: number;
  active: boolean;
};

type ModelFit = {
  center: THREE.Vector3;
  scale: number;
};

type BonePose = {
  x: number;
  y: number;
  z: number;
};

function computeMeshContentFit(scene: THREE.Group): ModelFit {
  const tempScene = scene.clone(true);
  tempScene.position.set(0, 0, 0);
  tempScene.rotation.set(0, 0, 0);
  tempScene.scale.set(1, 1, 1);
  tempScene.updateMatrixWorld(true);

  const bounds = new THREE.Box3();
  const nodeBounds = new THREE.Box3();
  let foundMesh = false;

  tempScene.traverse((node) => {
    if (!(node instanceof THREE.Mesh || node instanceof THREE.SkinnedMesh)) {
      return;
    }

    node.updateWorldMatrix(true, false);
    nodeBounds.setFromObject(node);

    if (nodeBounds.isEmpty()) {
      return;
    }

    bounds.union(nodeBounds);
    foundMesh = true;
  });

  if (!foundMesh || bounds.isEmpty()) {
    return { center: new THREE.Vector3(0, 0, 0), scale: 0.02 };
  }

  const center = new THREE.Vector3();
  const size = new THREE.Vector3();
  bounds.getCenter(center);
  bounds.getSize(size);

  const modelHeight = Math.max(size.y, 0.001);
  const visibleHeight =
    2 *
    CAMERA_DISTANCE *
    Math.tan((CAMERA_FOV / 2) * (Math.PI / 180));
  const targetHeight = TARGET_HEIGHT_RATIO * visibleHeight;

  return {
    center,
    scale: targetHeight / modelHeight,
  };
}

function useGlobalCursor() {
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  const targetRef = useRef<CursorTarget>({ x: 0, y: 0, active: false });
  const currentRef = useRef({ x: 0, y: 0 });
  const idleRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion) {
      setCursor({ x: 0, y: 0 });
      return undefined;
    }

    let lastPointerAt = Date.now();

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }

      targetRef.current = {
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: (event.clientY / window.innerHeight - 0.5) * 2,
        active: true,
      };
      lastPointerAt = Date.now();
    };

    const tick = () => {
      const cursorIsIdle = Date.now() - lastPointerAt > 2600;
      let target = targetRef.current;

      if (cursorIsIdle || !target.active) {
        idleRef.current += 0.008;
        target = {
          x: Math.sin(idleRef.current) * 0.48,
          y: Math.sin(idleRef.current * 0.72) * 0.28,
          active: true,
        };
      }

      currentRef.current.x += (target.x - currentRef.current.x) * 0.07;
      currentRef.current.y += (target.y - currentRef.current.y) * 0.07;
      setCursor({ x: currentRef.current.x, y: currentRef.current.y });
      frameRef.current = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [prefersReducedMotion]);

  return { cursor, prefersReducedMotion };
}

function getBone(scene: THREE.Group, name: string) {
  const node = scene.getObjectByName(name);
  return node instanceof THREE.Bone ? node : null;
}

function captureBonePose(bone: THREE.Bone): BonePose {
  return {
    x: bone.rotation.x,
    y: bone.rotation.y,
    z: bone.rotation.z,
  };
}

function applyMaterialStyle(node: THREE.Mesh | THREE.SkinnedMesh) {
  const isHeadMesh = node.name.toLowerCase().includes("head");
  const materials = Array.isArray(node.material) ? node.material : [node.material];

  materials.forEach((material) => {
    if (!(material instanceof THREE.MeshStandardMaterial)) {
      return;
    }

    material.color.set(isHeadMesh ? "#c84d2e" : "#8f241d");
    material.emissive = new THREE.Color(isHeadMesh ? "#32100b" : "#260807");
    material.emissiveIntensity = isHeadMesh ? 0.18 : 0.12;
    material.roughness = 0.5;
    material.metalness = Math.min(Math.max(material.metalness, 0.06), 0.16);
    material.envMapIntensity = isHeadMesh ? 1.08 : 0.92;
    material.needsUpdate = true;
  });
}

function DragonModel({
  cursor,
  prefersReducedMotion,
}: {
  cursor: { x: number; y: number };
  prefersReducedMotion: boolean;
}) {
  const gltf = useGLTF(MODEL_PATH, "/draco/");
  const { actions, names } = useAnimations(gltf.animations, gltf.scene);
  const outerRef = useRef<THREE.Group>(null);
  const [fit, setFit] = useState<ModelFit | null>(null);
  const computedRef = useRef(false);
  const bonePosesRef = useRef<Map<string, BonePose>>(new Map());

  useEffect(() => {
    if (computedRef.current) {
      return;
    }
    computedRef.current = true;

    gltf.scene.traverse((node) => {
      if (!(node instanceof THREE.Mesh || node instanceof THREE.SkinnedMesh)) {
        return;
      }

      node.frustumCulled = false;
      node.castShadow = true;
      node.receiveShadow = true;
      applyMaterialStyle(node);
    });

    const poseMap = bonePosesRef.current;
    [...HEAD_BONES, ...TAIL_BONES, ...LEFT_WING_BONES, ...RIGHT_WING_BONES].forEach(
      (boneName) => {
        const bone = getBone(gltf.scene, boneName);
        if (bone) {
          poseMap.set(boneName, captureBonePose(bone));
        }
      },
    );

    setFit(computeMeshContentFit(gltf.scene));
  }, [gltf.scene]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const standActionName = names.find((name) => name.includes("Battle_Stand"));
    const standAction = standActionName ? actions[standActionName] : undefined;

    if (!standAction) {
      return;
    }

    standAction.reset().setLoop(THREE.LoopRepeat, Infinity);
    standAction.timeScale = 0.32;
    standAction.weight = 0.28;
    standAction.fadeIn(0.8).play();

    return () => {
      standAction.fadeOut(0.4);
    };
  }, [actions, names, prefersReducedMotion]);

  useFrame(({ clock }) => {
    if (!outerRef.current) {
      return;
    }

    const elapsed = clock.getElapsedTime();
    const idleBob = prefersReducedMotion ? 0 : Math.sin(elapsed * 0.52) * 0.085;
    const idleLean = prefersReducedMotion ? 0 : Math.sin(elapsed * 0.34) * 0.018;

    // Keep the dragon body mostly fixed and front-facing. The previous version
    // rotated the entire model with the cursor, which made the landing page see
    // mostly the dragon's back.
    outerRef.current.position.x = THREE.MathUtils.lerp(
      outerRef.current.position.x,
      2.05,
      0.045,
    );
    outerRef.current.position.y = THREE.MathUtils.lerp(
      outerRef.current.position.y,
      -1.35 + idleBob,
      0.045,
    );
    outerRef.current.rotation.x = THREE.MathUtils.lerp(
      outerRef.current.rotation.x,
      0.08 + idleLean,
      0.045,
    );
    outerRef.current.rotation.y = THREE.MathUtils.lerp(
      outerRef.current.rotation.y,
      -0.34 + Math.sin(elapsed * 0.23) * 0.025,
      0.045,
    );
    outerRef.current.rotation.z = THREE.MathUtils.lerp(
      outerRef.current.rotation.z,
      -0.06,
      0.045,
    );

    if (prefersReducedMotion) {
      return;
    }

    const poses = bonePosesRef.current;

    HEAD_BONES.forEach((boneName, index) => {
      const bone = getBone(gltf.scene, boneName);
      const pose = poses.get(boneName);
      if (!bone || !pose) return;

      const strength = [1, 0.55, 0.34, 0.18][index] ?? 0.15;
      const breathing = Math.sin(elapsed * 0.9 + index * 0.4) * 0.018;

      bone.rotation.x = THREE.MathUtils.lerp(
        bone.rotation.x,
        pose.x - cursor.y * 0.24 * strength + breathing,
        0.095,
      );
      bone.rotation.y = THREE.MathUtils.lerp(
        bone.rotation.y,
        pose.y + cursor.x * 0.42 * strength,
        0.095,
      );
      bone.rotation.z = THREE.MathUtils.lerp(
        bone.rotation.z,
        pose.z - cursor.x * 0.08 * strength,
        0.095,
      );
    });

    TAIL_BONES.forEach((boneName, index) => {
      const bone = getBone(gltf.scene, boneName);
      const pose = poses.get(boneName);
      if (!bone || !pose) return;

      const progress = index / Math.max(TAIL_BONES.length - 1, 1);
      const wave = Math.sin(elapsed * 0.78 - index * 0.54);
      const secondaryWave = Math.sin(elapsed * 0.43 - index * 0.33);
      const amplitude = 0.05 + progress * 0.22;

      bone.rotation.y = THREE.MathUtils.lerp(
        bone.rotation.y,
        pose.y + wave * amplitude,
        0.08,
      );
      bone.rotation.z = THREE.MathUtils.lerp(
        bone.rotation.z,
        pose.z + secondaryWave * amplitude * 0.48,
        0.08,
      );
    });

    // Periodic wing flaps: a short burst every few seconds, with a gentle
    // breathing spread in-between so the dragon doesn't look frozen.
    const flapPeriod = 6.4;
    const flapWindow = 1.35;
    const phase = elapsed % flapPeriod;
    const burst = phase < flapWindow ? Math.sin((phase / flapWindow) * Math.PI * 4) : 0;
    const breathe = Math.sin(elapsed * 0.5) * 0.045;
    const flap = burst * 0.34 + breathe;

    [
      { names: LEFT_WING_BONES, side: 1 },
      { names: RIGHT_WING_BONES, side: -1 },
    ].forEach(({ names: wingNames, side }) => {
      wingNames.forEach((boneName, index) => {
        const bone = getBone(gltf.scene, boneName);
        const pose = poses.get(boneName);
        if (!bone || !pose) return;

        const falloff = 1 - index * 0.12;
        bone.rotation.z = THREE.MathUtils.lerp(
          bone.rotation.z,
          pose.z + side * flap * falloff,
          0.12,
        );
        bone.rotation.y = THREE.MathUtils.lerp(
          bone.rotation.y,
          pose.y + side * flap * 0.32 * falloff,
          0.12,
        );
      });
    });
  });

  return (
    <group ref={outerRef} scale={(fit?.scale ?? 0.02) * 0.92}>
      <group
        position={
          fit ? [-fit.center.x, -fit.center.y, -fit.center.z] : [0, -1, 0]
        }
      >
        <primitive object={gltf.scene} />
      </group>
    </group>
  );
}

function DragonScene({
  cursor,
  prefersReducedMotion,
}: {
  cursor: { x: number; y: number };
  prefersReducedMotion: boolean;
}) {
  return (
    <Canvas
      camera={{
        position: [0, 1.35, CAMERA_DISTANCE],
        fov: CAMERA_FOV,
        near: 0.1,
        far: 1000,
      }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      shadows
      style={{ background: "transparent" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
    >
      <ambientLight intensity={0.58} color="#d8b9a9" />
      <directionalLight
        position={[-4.5, 5, 5.5]}
        intensity={3.6}
        color="#ffb15c"
        castShadow
      />
      <directionalLight
        position={[4.4, 3.2, -5]}
        intensity={2.6}
        color="#a855f7"
      />
      <pointLight
        position={[2.2, 0.4, 3.8]}
        intensity={1.8}
        color="#ef4444"
        distance={9}
      />
      <pointLight
        position={[-3.8, 2.0, 4.2]}
        intensity={1.0}
        color="#f59e0b"
        distance={9}
      />
      <pointLight
        position={[3.8, 2.5, 2.2]}
        intensity={0.9}
        color="#38bdf8"
        distance={8}
      />
      <Environment preset="night" environmentIntensity={0.52} />

      <Suspense fallback={null}>
        <DragonModel cursor={cursor} prefersReducedMotion={prefersReducedMotion} />
      </Suspense>
    </Canvas>
  );
}

export function DragonHeroScene() {
  const { cursor, prefersReducedMotion } = useGlobalCursor();

  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_36%,rgba(239,68,68,0.24),transparent_25%),radial-gradient(circle_at_62%_42%,rgba(168,85,247,0.22),transparent_38%),radial-gradient(circle_at_78%_66%,rgba(245,158,11,0.16),transparent_32%)] blur-2xl" />
      <div className="absolute bottom-[12%] right-[8%] h-[13%] w-[48%] rounded-full bg-black/60 blur-3xl" />
      <DragonScene cursor={cursor} prefersReducedMotion={prefersReducedMotion} />
    </div>
  );
}
