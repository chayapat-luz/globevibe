'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';

// Thailand flag (three horizontal stripes: red, white, blue)
function ThailandFlag({ hovered, onClick, onPointerOver, onPointerOut }: any) {
  const radius = 2.02;

  // Thailand center position
  const thailandLat = 13;
  const thailandLon = 101;

  // Convert lat/lon to 3D position
  const phi = (90 - thailandLat) * Math.PI / 180;
  const theta = (thailandLon - 90) * Math.PI / 180;

  const position = new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );

  // Calculate rotation to face outward from Earth
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    position.clone().normalize()
  );

  return (
    <group
      position={position}
      quaternion={quaternion}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* Red stripe (top) */}
      <mesh position={[0, 0.15, 0.01]}>
        <planeGeometry args={[0.4, 0.1]} />
        <meshBasicMaterial
          color="#ED1C24"
          side={THREE.DoubleSide}
          transparent
          opacity={hovered ? 1 : 0.95}
        />
      </mesh>

      {/* White stripe */}
      <mesh position={[0, 0.05, 0.01]}>
        <planeGeometry args={[0.4, 0.1]} />
        <meshBasicMaterial
          color="#FFFFFF"
          side={THREE.DoubleSide}
          transparent
          opacity={hovered ? 1 : 0.95}
        />
      </mesh>

      {/* Blue stripe (middle - wider) */}
      <mesh position={[0, -0.05, 0.01]}>
        <planeGeometry args={[0.4, 0.1]} />
        <meshBasicMaterial
          color="#241E4E"
          side={THREE.DoubleSide}
          transparent
          opacity={hovered ? 1 : 0.95}
        />
      </mesh>

      {/* White stripe */}
      <mesh position={[0, -0.15, 0.01]}>
        <planeGeometry args={[0.4, 0.1]} />
        <meshBasicMaterial
          color="#FFFFFF"
          side={THREE.DoubleSide}
          transparent
          opacity={hovered ? 1 : 0.95}
        />
      </mesh>

      {/* Red stripe (bottom) */}
      <mesh position={[0, -0.25, 0.01]}>
        <planeGeometry args={[0.4, 0.1]} />
        <meshBasicMaterial
          color="#ED1C24"
          side={THREE.DoubleSide}
          transparent
          opacity={hovered ? 1 : 0.95}
        />
      </mesh>

      {/* Glow effect when hovered */}
      {hovered && (
        <mesh position={[0, -0.05, 0]}>
          <planeGeometry args={[0.5, 0.6]} />
          <meshBasicMaterial
            color="#FFD700"
            side={THREE.DoubleSide}
            transparent
            opacity={0.3}
          />
        </mesh>
      )}
    </group>
  );
}

function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    // Create a canvas to draw the Earth texture
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Draw ocean (blue)
    ctx.fillStyle = '#1e3a8a'; // Deep blue for oceans
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Simplified land masses (green)
    ctx.fillStyle = '#22c55e'; // Green for land

    // Africa
    ctx.fillRect(900, 400, 300, 350);
    // Europe
    ctx.fillRect(950, 250, 200, 150);
    // Asia (including Thailand region)
    ctx.fillRect(1200, 200, 500, 400);
    // North America
    ctx.fillRect(200, 150, 400, 450);
    // South America
    ctx.fillRect(400, 550, 250, 350);
    // Australia
    ctx.fillRect(1550, 600, 250, 200);

    const canvasTexture = new THREE.CanvasTexture(canvas);
    canvasTexture.colorSpace = THREE.SRGBColorSpace;
    setTexture(canvasTexture);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005;
    }
  });

  // Thailand accurate position (lat: 13°N, lon: 101°E)
  const thailandLat = 13;
  const thailandLon = 101;

  const handleClick = (event: THREE.Event) => {
    event.stopPropagation();
    router.push('/thailand');
  };

  return (
    <group>
      <Sphere
        ref={meshRef}
        args={[2, 64, 64]}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {texture ? (
          <meshStandardMaterial
            map={texture}
            roughness={0.3}
            metalness={0.1}
            emissive="#ffffff"
            emissiveIntensity={0.15}
          />
        ) : (
          <meshStandardMaterial
            color="#4a9eff"
            roughness={0.3}
            metalness={0.1}
          />
        )}
      </Sphere>

      {/* Thailand flag */}
      <ThailandFlag
        hovered={hovered}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />

      <ambientLight intensity={2.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <directionalLight position={[-5, -5, -5]} intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      <pointLight position={[-10, -10, -10]} intensity={1.5} />
      <pointLight position={[0, 10, 0]} intensity={1.5} />
      <pointLight position={[0, -10, 0]} intensity={1} />
    </group>
  );
}

export default function Globe() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#000000']} />
        <Earth />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
