"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

const MODEL_PATH = "/models/quest-dragon.glb";

// ── Debug tuning knobs ──────────────────────────────────────────
// Increase MODEL_SCALE to the largest value where the full dragon
// silhouette remains visible (try: 0.005, 0.01, 0.02, 0.05, 0.1)
const MODEL_SCALE = 0.02;
const MODEL_POSITION: [number, number, number] = [0, -1, 0];
const MODEL_ROTATION: [number, number, number] = [0, Math.PI, 0];

function DragonModel() {
  const gltf = useGLTF(MODEL_PATH, "/draco/");

  gltf.scene.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.frustumCulled = false;
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });

  return (
    <group position={MODEL_POSITION} scale={MODEL_SCALE} rotation={MODEL_ROTATION}>
      <primitive object={gltf.scene} />
    </group>
  );
}

function DragonScene() {
  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 45, near: 0.1, far: 1000 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      shadows
      style={{ background: "transparent" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <ambientLight intensity={1.5} color="#ffffff" />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-5, 3, -5]} intensity={1} color="#ffffff" />

      {process.env.NODE_ENV !== "production" && (
        <OrbitControls makeDefault />
      )}

      <Suspense fallback={null}>
        <DragonModel />
      </Suspense>
    </Canvas>
  );
}

export function DragonHeroScene() {
  return (
    <div className="absolute inset-0 hidden lg:block" aria-hidden="true">
      <DragonScene />
    </div>
  );
}
