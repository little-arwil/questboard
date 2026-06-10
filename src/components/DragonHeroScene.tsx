"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, Center, Html, useGLTF } from "@react-three/drei";
import { PointerEvent, Suspense, useEffect, useRef, useState } from "react";
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

function DragonModel({
  motion,
  prefersReducedMotion,
}: {
  motion: { x: number; y: number };
  prefersReducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF(MODEL_PATH, "/draco/");

  useEffect(() => {
    gltf.scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) {
        return;
      }

      object.castShadow = true;
      object.receiveShadow = true;
      object.frustumCulled = false;

      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          material.color.set("#776b63");
          material.roughness = 0.5;
          material.metalness = Math.min(Math.max(material.metalness, 0.08), 0.22);
          material.envMapIntensity = 0.65;
          material.needsUpdate = true;
        }
      });
    });
  }, [gltf.scene]);

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return;
    }

    const elapsed = clock.getElapsedTime();
    const floatY = prefersReducedMotion ? 0 : Math.sin(elapsed * 0.58) * 0.025;
    const breathScale = prefersReducedMotion ? 1 : 1 + Math.sin(elapsed * 0.88) * 0.003;
    const targetRotY = -0.26 + (prefersReducedMotion ? 0 : motion.x * 0.11);
    const targetRotX = 0.02 + (prefersReducedMotion ? 0 : -motion.y * 0.03);

    groupRef.current.position.y = floatY;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      0.06,
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.06,
    );
    groupRef.current.scale.setScalar(breathScale);
  });

  return (
    <group ref={groupRef} rotation={[0.02, -0.26, 0]}>
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  );
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="rounded-full border border-gold/30 bg-charcoal/70 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-gold shadow-gold-glow backdrop-blur-md">
        Summoning guardian
      </div>
    </Html>
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
      camera={{ position: [0, 1.5, 8], fov: 40, near: 0.01, far: 200 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      shadows
      style={{ background: "transparent" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 0.86;
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
    >
      <ambientLight intensity={0.62} color="#b7a6c8" />
      <directionalLight position={[-4.5, 5, 5.5]} intensity={2.35} color="#f4c56a" castShadow />
      <directionalLight position={[4.4, 3.2, -5]} intensity={2.15} color="#8b5cf6" />
      <pointLight position={[1.8, -0.4, 3.2]} intensity={1.25} color="#d97706" distance={7.5} />
      <pointLight position={[-3.5, 1.7, 3.8]} intensity={0.95} color="#35d39a" distance={7.5} />
      <Suspense fallback={<LoadingFallback />}>
        <Bounds fit clip observe margin={1.4}>
          <DragonModel motion={motion} prefersReducedMotion={prefersReducedMotion} />
        </Bounds>
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
      className="relative hidden aspect-[1.02] w-full max-w-[39rem] overflow-visible lg:block xl:max-w-[42rem]"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-hidden="true"
    >
      <div className="absolute inset-[-10%] rounded-full bg-[radial-gradient(circle_at_62%_40%,rgba(244,197,106,0.2),transparent_30%),radial-gradient(circle_at_48%_38%,rgba(139,92,246,0.27),transparent_44%),radial-gradient(circle_at_64%_66%,rgba(53,211,154,0.1),transparent_34%)] blur-3xl" />
      <div className="absolute bottom-[7%] left-[20%] h-[14%] w-[64%] rounded-full bg-black/60 blur-3xl" />
      <div className="absolute inset-0 overflow-visible">
        <DragonScene motion={motion} prefersReducedMotion={prefersReducedMotion} />
      </div>
    </div>
  );
}
