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

function computeMeshContentFit(scene: THREE.Group): ModelFit {
  const tempScene = scene.clone(true);

  // Ignore unusual root-scene transforms. We only care about visible mesh content.
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
    2 * CAMERA_DISTANCE * Math.tan((CAMERA_FOV / 2) * (Math.PI / 180));
  const targetHeight = TARGET_HEIGHT_RATIO * visibleHeight;

  return {
    center,
    scale: targetHeight / modelHeight,
  };
}

function DragonModel() {
  const gltf = useGLTF(MODEL_PATH, "/draco/");
  const [fit, setFit] = useState<ModelFit | null>(null);
  const computedRef = useRef(false);

  useEffect(() => {
    if (computedRef.current) {
      return;
    }
    computedRef.current = true;

    gltf.scene.traverse((node) => {
      if (node instanceof THREE.Mesh || node instanceof THREE.SkinnedMesh) {
        node.frustumCulled = false;
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });

    setFit(computeMeshContentFit(gltf.scene));
  }, [gltf.scene]);

  return (
    <group rotation={[0, Math.PI, 0]} scale={fit?.scale ?? 0.02}>
      <group position={fit ? [-fit.center.x, -fit.center.y, -fit.center.z] : [0, -1, 0]}>
        <primitive object={gltf.scene} />
      </group>
    </group>
  );
}

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
      }}
    >
      <ambientLight intensity={1.5} color="#ffffff" />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-5, 3, -5]} intensity={1} color="#ffffff" />

      {process.env.NODE_ENV !== "production" && <OrbitControls makeDefault />}

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
