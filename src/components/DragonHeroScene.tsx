"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const MODEL_PATH = "/models/quest-dragon.glb";
const CAMERA_DISTANCE = 10;
const CAMERA_FOV = 45;
const TARGET_HEIGHT_RATIO = 0.72;

type CursorTarget = {
  x: number;
  y: number;
  active: boolean;
};

type ModelFit = {
  center: THREE.Vector3;
  scale: number;
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
          x: Math.sin(idleRef.current) * 0.75,
          y: Math.sin(idleRef.current * 0.72) * 0.42,
          active: true,
        };
      }

      currentRef.current.x += (target.x - currentRef.current.x) * 0.055;
      currentRef.current.y += (target.y - currentRef.current.y) * 0.055;
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

function DragonModel({
  cursor,
  prefersReducedMotion,
}: {
  cursor: { x: number; y: number };
  prefersReducedMotion: boolean;
}) {
  const gltf = useGLTF(MODEL_PATH, "/draco/");
  const outerRef = useRef<THREE.Group>(null);
  const [fit, setFit] = useState<ModelFit | null>(null);
  const computedRef = useRef(false);

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

      const materials = Array.isArray(node.material) ? node.material : [node.material];
      materials.forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          material.color.set("#6f625b");
          material.roughness = 0.56;
          material.metalness = Math.min(Math.max(material.metalness, 0.08), 0.18);
          material.envMapIntensity = 0.7;
          material.needsUpdate = true;
        }
      });
    });

    setFit(computeMeshContentFit(gltf.scene));
  }, [gltf.scene]);

  useFrame(({ clock }) => {
    if (!outerRef.current) {
      return;
    }

    const elapsed = clock.getElapsedTime();
    const idleY = prefersReducedMotion ? 0 : Math.sin(elapsed * 0.52) * 0.1;
    const targetX = prefersReducedMotion ? 0.1 : 0.1 - cursor.y * 0.16;
    const targetY = prefersReducedMotion ? Math.PI : Math.PI + cursor.x * 0.48;
    const targetZ = prefersReducedMotion ? -0.08 : -0.08 - cursor.x * 0.08;

    outerRef.current.position.x = THREE.MathUtils.lerp(
      outerRef.current.position.x,
      1.65 + cursor.x * 0.42,
      0.045,
    );
    outerRef.current.position.y = THREE.MathUtils.lerp(
      outerRef.current.position.y,
      -0.2 + idleY - cursor.y * 0.18,
      0.045,
    );
    outerRef.current.rotation.x = THREE.MathUtils.lerp(
      outerRef.current.rotation.x,
      targetX,
      0.045,
    );
    outerRef.current.rotation.y = THREE.MathUtils.lerp(
      outerRef.current.rotation.y,
      targetY,
      0.045,
    );
    outerRef.current.rotation.z = THREE.MathUtils.lerp(
      outerRef.current.rotation.z,
      targetZ,
      0.045,
    );
  });

  return (
    <group ref={outerRef} scale={(fit?.scale ?? 0.02) * 1.08}>
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
        position: [0, 1.4, CAMERA_DISTANCE],
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
        gl.toneMappingExposure = 0.96;
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
    >
      <ambientLight intensity={0.7} color="#b7a6c8" />
      <directionalLight
        position={[-4.5, 5, 5.5]}
        intensity={3.2}
        color="#f4c56a"
        castShadow
      />
      <directionalLight
        position={[4.4, 3.2, -5]}
        intensity={2.7}
        color="#8b5cf6"
      />
      <pointLight
        position={[2.5, 0.2, 3.8]}
        intensity={1.5}
        color="#d97706"
        distance={9}
      />
      <pointLight
        position={[-3.8, 2.0, 4.2]}
        intensity={1.0}
        color="#35d39a"
        distance={9}
      />
      <Environment preset="night" environmentIntensity={0.45} />

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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_36%,rgba(244,197,106,0.2),transparent_25%),radial-gradient(circle_at_62%_42%,rgba(139,92,246,0.24),transparent_38%),radial-gradient(circle_at_78%_66%,rgba(53,211,154,0.1),transparent_32%)] blur-2xl" />
      <div className="absolute bottom-[12%] right-[8%] h-[13%] w-[48%] rounded-full bg-black/60 blur-3xl" />
      <DragonScene cursor={cursor} prefersReducedMotion={prefersReducedMotion} />
    </div>
  );
}
