import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, OrbitControls, Float, Trail } from '@react-three/drei'
import FloatingLandmarks from './FloatingLandmarks'

// The main globe with atmosphere glow effect
function Globe() {
  const meshRef = useRef()
  const glowRef = useRef()
  const ringRef = useRef()
  const ring2Ref = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    meshRef.current.rotation.y = t * 0.1
    glowRef.current.rotation.y = t * 0.12
    ringRef.current.rotation.z = t * 0.06
    ringRef.current.rotation.x = 1.3 + Math.sin(t * 0.15) * 0.08
    ring2Ref.current.rotation.z = -t * 0.04
    ring2Ref.current.rotation.x = 0.8 + Math.sin(t * 0.2) * 0.06
  })

  return (
    <group>
      {/* Outer atmosphere glow */}
      <mesh ref={glowRef} scale={1.15}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#1a4a8a"
          transparent
          opacity={0.08}
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* Main globe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#0d2137"
          roughness={0.3}
          metalness={0.95}
          emissive="#061525"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Orange glowing orbit ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[3, 0.05, 16, 120]} />
        <meshStandardMaterial
          color="#f47c3a"
          emissive="#f47c3a"
          emissiveIntensity={2}
          roughness={0}
          metalness={1}
        />
      </mesh>

      {/* Gold orbit ring */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.6, 0.03, 16, 120]} />
        <meshStandardMaterial
          color="#c9a84c"
          emissive="#c9a84c"
          emissiveIntensity={1.5}
          roughness={0}
          metalness={1}
        />
      </mesh>

      {/* Small glowing satellite dots orbiting */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2
        return (
          <Float key={i} speed={2} floatIntensity={0.5}>
            <mesh position={[
              Math.cos(angle) * 3,
              Math.sin(angle * 0.5) * 0.5,
              Math.sin(angle) * 3
            ]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial
                color="#f47c3a"
                emissive="#f47c3a"
                emissiveIntensity={3}
              />
            </mesh>
          </Float>
        )
      })}
    </group>
  )
}

// Animated particles floating everywhere
function Particles() {
  const count = 80
  const meshRefs = useRef([])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    meshRefs.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.position.y += Math.sin(t * 0.5 + i) * 0.003
        mesh.rotation.x += 0.005
        mesh.rotation.y += 0.003
      }
    })
  })

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2
        const radius = 4 + Math.random() * 4
        const colors = ['#f47c3a', '#c9a84c', '#ff6b9d', '#4af0ff', '#a78bfa', '#34d399']
        return (
          <mesh
            key={i}
            ref={el => meshRefs.current[i] = el}
            position={[
              Math.cos(angle) * radius,
              (Math.random() - 0.5) * 8,
              Math.sin(angle) * radius
            ]}
          >
            <octahedronGeometry args={[0.04 + Math.random() * 0.06]} />
            <meshStandardMaterial
              color={colors[i % colors.length]}
              emissive={colors[i % colors.length]}
              emissiveIntensity={2}
              roughness={0}
              metalness={1}
            />
          </mesh>
        )
      })}
    </>
  )
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Lighting setup for dramatic effect */}
      <ambientLight intensity={0.15} />
      <pointLight position={[15, 15, 15]} intensity={4} color="#f47c3a" />
      <pointLight position={[-15, -10, -10]} intensity={2} color="#4488ff" />
      <pointLight position={[0, -15, 10]} intensity={1.5} color="#c9a84c" />
      <pointLight position={[0, 15, -5]} intensity={1} color="#ff6b9d" />

      <Suspense fallback={null}>
        <Globe />
        <FloatingLandmarks />
        <Particles />
        <Stars radius={150} depth={80} count={8000} factor={5} fade speed={0.5} />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.2}
        enablePan={false}
        maxPolarAngle={Math.PI * 0.65}
        minPolarAngle={Math.PI * 0.35}
      />
    </Canvas>
  )
}