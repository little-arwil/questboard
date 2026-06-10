"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useAnimations, useGLTF } from "@react-three/drei";
import { PointerEvent, Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type CursorTarget = {
  x: number;
  y: number;
  active: boolean;
};

const MODEL_PATH = "/models/quest-dragon.glb";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

function useDesktopCanvas() {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updatePreference = () => setCanRender(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return canRender;
}

function useDragonAnimationNames(names: string[]) {
  return useMemo(() => {
    const calmHints = ["idle", "stand", "rest", "breath", "loop"];
    const lowerNames = names.map((name) => name.toLowerCase());
    const calmIndex = lowerNames.findIndex((name) =>
      calmHints.some((hint) => name.includes(hint)),
    );

    return {
      idleName: calmIndex >= 0 ? names[calmIndex] : names[0],
      hasAnimations: names.length > 0,
    };
  }, [names]);
}

function DragonModel({
  motion,
  prefersReducedMotion,
}: {
  motion: { x: number; y: number };
  prefersReducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF(MODEL_PATH);
  const { actions, names } = useAnimations(gltf.animations, groupRef);
  const { idleName, hasAnimations } = useDragonAnimationNames(names);

  useEffect(() => {
    if (!hasAnimations || !idleName) {
      return undefined;
    }

    const action = actions[idleName];
    if (!action) {
      return undefined;
    }

    action.reset().fadeIn(0.8).play();
    return () => {
      action.fadeOut(0.4);
    };
  }, [actions, hasAnimations, idleName]);

  useEffect(() => {
    gltf.scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) {
        return;
      }

      object.castShadow = true;
      object.receiveShadow = true;

      if (object.material instanceof THREE.MeshStandardMaterial) {
        object.material.roughness = Math.max(object.material.roughness, 0.54);
        object.material.metalness = Math.min(object.material.metalness, 0.16);
      }
    });
  }, [gltf.scene]);

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return;
    }

    const elapsed = clock.getElapsedTime();
    const floatY = prefersReducedMotion ? 0 : Math.sin(elapsed * 0.78) * 0.045;
    const breathScale = prefersReducedMotion ? 1 : 1 + Math.sin(elapsed * 1.1) * 0.006;
    const targetRotY = -0.58 + (prefersReducedMotion ? 0 : motion.x * 0.18);
    const targetRotX = prefersReducedMotion ? 0.02 : 0.02 - motion.y * 0.055;

    groupRef.current.position.y = -0.42 + floatY;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.055);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.055);
    groupRef.current.scale.setScalar(breathScale);
  });

  return (
    <group ref={groupRef} position={[0.25, -0.42, 0]} rotation={[0.02, -0.58, 0]} scale={1.08}>
      <primitive object={gltf.scene} />
    </group>
  );
}

function DragonScene({
  motion,
  prefersReducedMotion,
}: {
  motion: { x: number; y: number };
  prefersReducedMotion: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0.2, 0.55, 5.1], fov: 34 }}
      dpr={[1, 1.7]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      shadows
    >
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#080b0d", 5.5, 9]} />
      <ambientLight intensity={1.15} color="#d8c8ff" />
      <directionalLight
        position={[-3.2, 3.5, 4.4]}
        intensity={3.1}
        color="#ffd79a"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[3.2, 2.4, -3.5]} intensity={2.5} color="#8b5cf6" />
      <pointLight position={[0.2, -0.6, 2.4]} intensity={2.4} color="#f4c56a" distance={5.5} />
      <pointLight position={[2.5, 0.7, 1.6]} intensity={1.2} color="#35d39a" distance={4.8} />
      <Suspense fallback={null}>
        <DragonModel motion={motion} prefersReducedMotion={prefersReducedMotion} />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}

export function DragonHeroScene() {
  const prefersReducedMotion = useReducedMotion();
  const canRenderCanvas = useDesktopCanvas();
  const targetRef = useRef<CursorTarget>({ x: 0, y: 0, active: false });
  const currentRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const [motion, setMotion] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!canRenderCanvas || prefersReducedMotion) {
      setMotion({ x: 0, y: 0 });
      return undefined;
    }

    const tick = () => {
      const target = targetRef.current.active ? targetRef.current : { x: 0, y: 0 };
      currentRef.current.x += (target.x - currentRef.current.x) * 0.07;
      currentRef.current.y += (target.y - currentRef.current.y) * 0.07;
      setMotion({ x: currentRef.current.x, y: currentRef.current.y });
      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [canRenderCanvas, prefersReducedMotion]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || event.pointerType === "touch") {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    targetRef.current = {
      x: clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1),
      y: clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1),
      active: true,
    };
  }

  function handlePointerLeave() {
    targetRef.current.active = false;
  }

  if (!canRenderCanvas) {
    return null;
  }

  return (
    <div
      className="relative hidden aspect-[1.05] w-full max-w-[35rem] overflow-visible lg:block xl:max-w-[40rem]"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-hidden="true"
    >
      <div className="absolute inset-[-8%] rounded-full bg-[radial-gradient(circle_at_55%_42%,rgba(244,197,106,0.24),transparent_32%),radial-gradient(circle_at_44%_38%,rgba(139,92,246,0.23),transparent_42%),radial-gradient(circle_at_62%_62%,rgba(53,211,154,0.12),transparent_36%)] blur-3xl" />
      <div className="absolute bottom-[8%] left-[18%] h-[12%] w-[62%] rounded-full bg-black/50 blur-3xl" />
      <div className="absolute inset-0 overflow-visible">
        <DragonScene motion={motion} prefersReducedMotion={prefersReducedMotion} />
      </div>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
