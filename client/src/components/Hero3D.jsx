import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, OrbitControls, Float } from '@react-three/drei'

// Diya (Indian oil lamp) - floating around
function Diya({ position, speed, offset }) {
  const ref = useRef()
  const flameRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.position.y = position[1] + Math.sin(t * speed + offset) * 0.3
    ref.current.rotation.y = t * 0.3
    if (flameRef.current) {
      flameRef.current.scale.y = 0.8 + Math.sin(t * 8 + offset) * 0.3
      flameRef.current.material.emissiveIntensity = 2 + Math.sin(t * 6 + offset) * 1
    }
  })

  return (
    <group ref={ref} position={position}>
      {/* Diya base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.08, 0.06, 16]} />
        <meshStandardMaterial color="#c9a84c" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Flame */}
      <mesh ref={flameRef} position={[0, 0.1, 0]}>
        <coneGeometry args={[0.04, 0.15, 8]} />
        <meshStandardMaterial
          color="#ff6b00"
          emissive="#ff4400"
          emissiveIntensity={3}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Flame glow light */}
      <pointLight position={[0, 0.2, 0]} intensity={0.8} color="#ff6b00" distance={1.5} />
    </group>
  )
}

// Taj Mahal 3D model built from primitives
function TajMahal() {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.2
  })

  return (
    <group ref={groupRef} position={[0, -1.5, 0]} scale={0.9}>

      {/* Main platform */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 0.2, 4]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Second platform */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[3, 0.2, 3]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.3} metalness={0.3} />
      </mesh>

      {/* Main building base */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[1.8, 0.8, 1.8]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.3} metalness={0.3} emissive="#fff5e0" emissiveIntensity={0.1} />
      </mesh>

      {/* Main dome */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.65, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial color="#f8f4ec" roughness={0.2} metalness={0.4} emissive="#fff5e0" emissiveIntensity={0.15} />
      </mesh>

      {/* Dome tip */}
      <mesh position={[0, 2.1, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#c9a84c" metalness={1} roughness={0} emissive="#c9a84c" emissiveIntensity={1} />
      </mesh>

      {/* 4 corner minarets */}
      {[[-1.4, 0, -1.4], [1.4, 0, -1.4], [-1.4, 0, 1.4], [1.4, 0, 1.4]].map((pos, i) => (
        <group key={i} position={pos}>
          {/* Minaret base */}
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.12, 0.14, 1.2, 12]} />
            <meshStandardMaterial color="#f5f0e8" roughness={0.3} metalness={0.2} />
          </mesh>
          {/* Minaret middle */}
          <mesh position={[0, 1.3, 0]}>
            <cylinderGeometry args={[0.1, 0.12, 0.6, 12]} />
            <meshStandardMaterial color="#f5f0e8" roughness={0.3} metalness={0.2} />
          </mesh>
          {/* Minaret dome */}
          <mesh position={[0, 1.7, 0]}>
            <sphereGeometry args={[0.12, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
            <meshStandardMaterial color="#f8f4ec" roughness={0.2} metalness={0.4} />
          </mesh>
          {/* Minaret tip */}
          <mesh position={[0, 1.95, 0]}>
            <coneGeometry args={[0.02, 0.15, 8]} />
            <meshStandardMaterial color="#c9a84c" metalness={1} roughness={0} emissive="#c9a84c" emissiveIntensity={1} />
          </mesh>
        </group>
      ))}

      {/* Arched entrances */}
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((rot, i) => (
        <mesh key={i} position={[
          Math.sin(rot) * 0.91,
          0.9,
          Math.cos(rot) * 0.91
        ]} rotation={[0, rot, 0]}>
          <boxGeometry args={[0.5, 0.7, 0.05]} />
          <meshStandardMaterial color="#e8e0d0" roughness={0.5} metalness={0.1} />
        </mesh>
      ))}

      {/* Reflecting pool */}
      <mesh position={[0, 0.05, 2.2]}>
        <boxGeometry args={[0.4, 0.05, 1.2]} />
        <meshStandardMaterial color="#4a9ab5" roughness={0} metalness={0.9} transparent opacity={0.7} />
      </mesh>

      {/* Garden path */}
      {[-0.6, 0, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0.12, 2]}>
          <boxGeometry args={[0.15, 0.05, 1.2]} />
          <meshStandardMaterial color="#4a7c3f" roughness={1} />
        </mesh>
      ))}

    </group>
  )
}

// Floating gold particles like fireflies
function Fireflies() {
  const count = 40
  const refs = useRef([])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    refs.current.forEach((ref, i) => {
      if (ref) {
        ref.position.y += Math.sin(t * 1.5 + i * 0.5) * 0.003
        ref.position.x += Math.cos(t * 0.8 + i * 0.3) * 0.002
        ref.material.emissiveIntensity = 1 + Math.sin(t * 3 + i) * 0.8
      }
    })
  })

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2
        const r = 2 + Math.random() * 4
        const colors = ['#f47c3a', '#c9a84c', '#ff9f45', '#ffd700']
        const color = colors[i % colors.length]
        return (
          <mesh
            key={i}
            ref={el => refs.current[i] = el}
            position={[
              Math.cos(angle) * r,
              (Math.random() - 0.5) * 5,
              Math.sin(angle) * r
            ]}
          >
            <sphereGeometry args={[0.03 + Math.random() * 0.04, 8, 8]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
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

// Floating lotus petals
function LotusParticles() {
  const ref = useRef()

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  return (
    <group ref={ref}>
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2
        const r = 3.5 + Math.random() * 1.5
        return (
          <Float key={i} speed={1 + Math.random()} floatIntensity={0.5}>
            <mesh
              position={[
                Math.cos(angle) * r,
                (Math.random() - 0.5) * 3,
                Math.sin(angle) * r
              ]}
              rotation={[Math.random(), Math.random(), Math.random()]}
            >
              <tetrahedronGeometry args={[0.08 + Math.random() * 0.06]} />
              <meshStandardMaterial
                color="#ff9f9f"
                emissive="#ff6b6b"
                emissiveIntensity={0.5}
                roughness={0.3}
                transparent
                opacity={0.7}
              />
            </mesh>
          </Float>
        )
      })}
    </group>
  )
}

export default function Hero3D() {
  const diyas = [
    { position: [-2.5, 0.5, 1], speed: 1.2, offset: 0 },
    { position: [2.5, 0.3, 1], speed: 1.0, offset: 1 },
    { position: [-1.5, 1.2, -1], speed: 1.5, offset: 2 },
    { position: [1.5, 0.8, -1], speed: 0.9, offset: 3 },
    { position: [-3, -0.5, 0], speed: 1.3, offset: 4 },
    { position: [3, -0.3, 0], speed: 1.1, offset: 5 },
    { position: [0, 1.5, -2], speed: 0.8, offset: 6 },
    { position: [-0.8, -0.8, 2], speed: 1.4, offset: 7 },
    { position: [0.8, -0.6, 2], speed: 1.2, offset: 8 },
  ]

  return (
    <Canvas
      camera={{ position: [0, 1, 8], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Warm Indian sunset lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 5]} intensity={3} color="#ff9f45" />
      <pointLight position={[-8, 5, -5]} intensity={2} color="#c9a84c" />
      <pointLight position={[0, -5, 8]} intensity={1.5} color="#f47c3a" />
      <pointLight position={[0, 8, 0]} intensity={1} color="#fff5e0" />

      <Suspense fallback={null}>
        {/* Main Taj Mahal */}
        <TajMahal />

        {/* Floating diyas */}
        {diyas.map((diya, i) => (
          <Diya key={i} {...diya} />
        ))}

        {/* Fireflies */}
        <Fireflies />

        {/* Lotus particles */}
        <LotusParticles />

        {/* Stars */}
        <Stars radius={100} depth={50} count={4000} factor={3} fade />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.3}
        enablePan={false}
        maxPolarAngle={Math.PI * 0.6}
        minPolarAngle={Math.PI * 0.35}
      />
    </Canvas>
  )
}