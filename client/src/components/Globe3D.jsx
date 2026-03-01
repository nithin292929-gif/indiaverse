import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'

function AnimatedSphere() {
  const meshRef = useRef()
  const ringRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    meshRef.current.rotation.y = t * 0.12
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.1
    ringRef.current.rotation.z = t * 0.08
    ringRef.current.rotation.x = 1.2 + Math.sin(t * 0.2) * 0.05
  })

  return (
    <group>
      {/* Main globe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#1a3a5c"
          roughness={0.4}
          metalness={0.9}
          emissive="#0a1f35"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Glowing ring around globe */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.8, 0.04, 16, 100]} />
        <meshStandardMaterial
          color="#f47c3a"
          emissive="#f47c3a"
          emissiveIntensity={1}
          roughness={0}
          metalness={1}
        />
      </mesh>

      {/* Second ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.2, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#c9a84c"
          emissive="#c9a84c"
          emissiveIntensity={0.6}
          roughness={0}
          metalness={1}
        />
      </mesh>
    </group>
  )
}

export default function Globe3D() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 55 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={3} color="#f47c3a" />
      <pointLight position={[-10, -5, -10]} intensity={1.5} color="#4488ff" />
      <pointLight position={[0, -10, 5]} intensity={1} color="#c9a84c" />
      <AnimatedSphere />
      <Stars radius={120} depth={60} count={7000} factor={4} fade />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} enablePan={false} />
    </Canvas>
  )
}