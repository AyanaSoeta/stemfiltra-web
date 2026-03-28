"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { motion, useInView } from "framer-motion";
import * as THREE from "three";

/* ================================================================
   Three.js Scene Components
   ================================================================ */

function Particles({ count = 300 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, seeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;
      sd[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, seeds: sd };
  }, [count]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const arr = pointsRef.current.geometry.attributes.position
      .array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += Math.sin(t * 0.15 + seeds[i]) * 0.002;
      arr[i * 3] += Math.cos(t * 0.1 + seeds[i] * 1.3) * 0.001;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = 0.35 + Math.sin(t * 0.4) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#a5f2f3"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function ExosomeSphere() {
  const groupRef = useRef<THREE.Group>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const { size } = useThree();

  const isMobile = size.width < 768;
  const baseX = isMobile ? 0 : -3.2;
  const baseY = isMobile ? 1.8 : 0;
  const scale = isMobile ? 1.1 : 1.8;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const g = groupRef.current;

    g.rotation.y = t * 0.1;
    g.rotation.x = Math.sin(t * 0.07) * 0.12;
    g.position.y = baseY + Math.sin(t * 0.35) * 0.35;
    g.position.x = baseX;

    const cs = 1 + Math.sin(t * 0.6) * 0.12;
    coreRef.current.scale.setScalar(cs);
    (coreRef.current.material as THREE.MeshBasicMaterial).opacity =
      0.55 + Math.sin(t * 1.0) * 0.2;

    (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
      0.07 + Math.sin(t * 0.45) * 0.03;
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Glass outer shell */}
      <mesh>
        <sphereGeometry args={[1, 128, 128]} />
        <meshPhysicalMaterial
          color="#b8f0f0"
          metalness={0.05}
          roughness={0}
          transmission={0.94}
          thickness={1.5}
          ior={1.45}
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={2.5}
          transparent
        />
      </mesh>

      {/* Bright core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshBasicMaterial color="#a5f2f3" transparent opacity={0.6} />
      </mesh>

      {/* Mid glow halo */}
      <mesh>
        <sphereGeometry args={[0.48, 32, 32]} />
        <meshBasicMaterial color="#a5f2f3" transparent opacity={0.08} />
      </mesh>

      {/* Outer ambient aura */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.12, 32, 32]} />
        <meshBasicMaterial
          color="#a5f2f3"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 5]} intensity={1} color="#ffffff" />
      <pointLight
        position={[-5, 2, 4]}
        intensity={3}
        color="#a5f2f3"
        distance={25}
        decay={2}
      />
      <pointLight
        position={[5, -3, 3]}
        intensity={1.5}
        color="#88c8c8"
        distance={18}
        decay={2}
      />
      <Environment resolution={64}>
        <Lightformer
          form="ring"
          color="#a5f2f3"
          intensity={0.6}
          scale={8}
          position={[0, 5, -8]}
        />
        <Lightformer
          form="rect"
          color="#ffffff"
          intensity={0.3}
          scale={[12, 3, 1]}
          position={[0, -2, -6]}
        />
        <Lightformer
          form="ring"
          color="#88dddd"
          intensity={0.4}
          scale={5}
          position={[-6, 0, -4]}
        />
      </Environment>
      <Particles />
      <ExosomeSphere />
    </>
  );
}

/* ================================================================
   Fluid Metaball Background (CSS + SVG Filter)
   ================================================================ */

function FluidBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute" width="0" height="0">
        <defs>
          <filter id="metaball-goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="35"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
            />
          </filter>
        </defs>
      </svg>
      <div
        className="absolute inset-0 opacity-25"
        style={{ filter: "url(#metaball-goo)" }}
      >
        <div className="exo-fluid-blob exo-fluid-blob-1" />
        <div className="exo-fluid-blob exo-fluid-blob-2" />
        <div className="exo-fluid-blob exo-fluid-blob-3" />
      </div>
    </div>
  );
}

/* ================================================================
   Content Card (Glassmorphism + Framer Motion)
   ================================================================ */

function ContentCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="exosome-glass-card p-8 md:p-12 lg:p-16"
    >
      {/* Heading */}
      <motion.h2
        variants={item}
        className="font-shippori text-2xl md:text-3xl lg:text-[2.5rem] text-white leading-relaxed mb-10"
      >
        美しさの司令塔、目覚める。
        <br />
        次世代の伝達物質「エクソソーム
        <sup className="text-[0.5em]">*</sup>」
      </motion.h2>

      {/* Body */}
      <motion.div variants={item} className="space-y-5 mb-10">
        <p className="font-zen text-base text-white/85 leading-[1.95]">
          私たちの内側には、美しさを呼び覚ますための「言葉」が行き交っています。その鍵を握るのが、極小のメッセンジャー・エクソソーム。
        </p>
        <p className="font-zen text-base text-white/85 leading-[1.95]">
          これまでの「補う」ケアから、眠れる美の可能性へ「届ける」アプローチへ。最先端バイオテクノロジーが精製した、かつてない純度と浸透力
          <sup className="text-[0.5em]">*</sup>。
        </p>
        <p className="font-zen text-base text-white/85 leading-[1.95]">
          鼻腔から広がる清涼な一滴が、あなた自身が持つコンディションを整え、澄み渡るような毎日へと導きます。
        </p>
      </motion.div>

      {/* Footnotes */}
      <motion.div variants={item}>
        <div className="border-t border-white/10 pt-6">
          <p className="font-zen text-xs text-white/40 leading-relaxed">
            *幹細胞濾液賦活剤
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ================================================================
   Main Section Export
   ================================================================ */

export default function ExosomeAboutSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #1a1a1a 0%, #242424 40%, #333333 100%)",
      }}
    >
      {/* Fluid metaball BG */}
      <FluidBackground />

      {/* Three.js Canvas */}
      {mounted && (
        <div className="absolute inset-0 z-[1]">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent" }}
          >
            <Scene />
          </Canvas>
        </div>
      )}

      {/* Content overlay */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 flex items-center"
        style={{ minHeight: "90vh" }}
      >
        <div className="flex flex-col md:flex-row items-center w-full">
          {/* Left space — 3D sphere lives here visually */}
          <div className="hidden md:block md:w-[45%] shrink-0" />

          {/* Right — Glass card */}
          <div className="w-full md:w-[55%]">
            <ContentCard />
          </div>
        </div>
      </div>
    </section>
  );
}
