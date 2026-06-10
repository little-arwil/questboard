"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

const MODEL_PATH = "/models/quest-dragon.glb";
const CAMERA_DISTANCE = 10;
const CAMERA_FOV = 45;
const TARGET_HEIGHT_RATIO = 0.65;

type ModelFit = {
  center: THREE.Vector3;
  scale: number;
};

// ── Bounding box from mesh content only ──────────────────────────

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
    if (nodeBounds.isEmpty()) return;
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

  return { center, scale: targetHeight / modelHeight };
}

// ── Model with material polish ───────────────────────────────────

function DragonModel() {
  const gltf = useGLTF(MODEL_PATH, "/draco/");
  const [fit, setFit] = useState<ModelFit | null>(null);
  const computedRef = useRef(false);

  useEffect(() => {
    if (computedRef.current) return;
    computedRef.current = true;

    gltf.scene.traverse((node) => {
      if (!(node instanceof THREE.Mesh || node instanceof THREE.SkinnedMesh)) {
        return;
      }
      node.frustumCulled = false;
      node.castShadow = true;
      node.receiveShadow = true;

      // Polish materials — warm dragon tone, subtle roughness/metalness
      const materials = Array.isArray(node.material)
        ? node.material
        : [node.material];

      materials.forEach((mat) => {
        if (mat instanceof THREE.MeshStandardMaterial) {
          mat.color.set("#776b63");
          mat.roughness = 0.5;
          mat.metalness = Math.min(Math.max(mat.metalness, 0.08), 0.22);
          mat.envMapIntensity = 0.65;
          mat.needsUpdate = true;
        }
      });
    });

    setFit(computeMeshContentFit(gltf.scene));
  }, [gltf.scene]);

  return (
    <group rotation={[0, Math.PI, 0]} scale={fit?.scale ?? 0.02}>
      <group
        position={
          fit
            ? [-fit.center.x, -fit.center.y, -fit.center.z]
            : [0, -1, 0]
        }
      >
        <primitive object={gltf.scene} />
      </group>
    </group>
  );
}

// ── Scene with cinematic lighting ────────────────────────────────

function DragonScene() {
  return (
    <Canvas
      camera={{
        position: [0, 2, CAMERA_DISTANCE],
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
        gl.toneMappingExposure = 0.9;
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
    >
      <ambientLight intensity={0.65} color="#b7a6c8" />
      <directionalLight
        position={[-4.5, 5, 5.5]}
        intensity={2.8}
        color="#f4c56a"
        castShadow
      />
      <directionalLight
        position={[4.4, 3.2, -5]}
        intensity={2.5}
        color="#8b5cf6"
      />
      <pointLight
        position={[1.8, -0.4, 3.2]}
        intensity={1.5}
        color="#d97706"
        distance={8}
      />
      <pointLight
        position={[-3.5, 1.7, 3.8]}
        intensity={1.0}
        color="#35d39a"
        distance={8}
      />

      {process.env.NODE_ENV !== "production" && (
        <OrbitControls makeDefault />
      )}

      <Suspense fallback={null}>
        <DragonModel />
      </Suspense>
    </Canvas>
  );
}

// ── Slot with atmospheric glow behind the canvas ─────────────────

export function DragonHeroScene() {
  return (
    <div className="absolute inset-0 hidden lg:block" aria-hidden="true">
      {/* Atmospheric glows behind the 3D scene */}
      <div className="absolute inset-[-10%] rounded-full bg-[radial-gradient(circle_at_62%_40%,rgba(244,197,106,0.2),transparent_30%),radial-gradient(circle_at_48%_38%,rgba(139,92,246,0.27),transparent_44%),radial-gradient(circle_at_64%_66%,rgba(53,211,154,0.1),transparent_34%)] blur-3xl" />
      <div className="absolute bottom-[7%] left-[20%] h-[14%] w-[64%] rounded-full bg-black/60 blur-3xl" />
      <DragonScene />
    </div>
  );
}
