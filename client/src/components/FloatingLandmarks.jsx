import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'

// Each landmark is a unique 3D shape representing an Indian monument
function Landmark({ position, shape, color, speed, distort }) {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    meshRef.current.rotation.y = clock.getElapsedTime() * speed
    meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.3
  })

  const geometry = () => {
    switch(shape) {
      case 'taj':
        // Taj Mahal → dome shape = sphere on top of box
        return <sphereGeometry args={[0.3, 32, 32]} />
      case 'temple':
        // Temple → cone/pyramid shape
        return <coneGeometry args={[0.25, 0.6, 8]} />
      case 'fort':
        // Fort → octahedron (diamond) shape
        return <octahedronGeometry args={[0.3]} />
      case 'mountain':
        // Himalaya → tetrahedron (triangle)
        return <tetrahedronGeometry args={[0.35]} />
      case 'lotus':
        // Lotus temple → torus
        return <torusGeometry args={[0.25, 0.1, 16, 40]} />
      case 'boat':
        // Kerala boat → elongated box
        return <boxGeometry args={[0.5, 0.15, 0.2]} />
      default:
        return <dodecahedronGeometry args={[0.25]} />
    }
  }

  return (
    // Float = makes the object gently bob up and down automatically
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        {geometry()}
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.9}
          distort={distort || 0.2}
          speed={2}
        />
      </mesh>
    </Float>
  )
}

// All Indian landmarks scattered in 3D space around the globe
export default function FloatingLandmarks() {
  const landmarks = [
    { position: [-5, 2, -2], shape: 'taj', color: '#f47c3a', speed: 0.4, distort: 0.3 },
    { position: [5, -1, -3], shape: 'temple', color: '#c9a84c', speed: 0.3, distort: 0.2 },
    { position: [-4, -3, 1], shape: 'fort', color: '#ff6b9d', speed: 0.5, distort: 0.4 },
    { position: [4, 3, -1], shape: 'mountain', color: '#4af0ff', speed: 0.2, distort: 0.15 },
    { position: [-6, 0, 2], shape: 'lotus', color: '#a78bfa', speed: 0.6, distort: 0.3 },
    { position: [6, 1, 0], shape: 'boat', color: '#34d399', speed: 0.35, distort: 0.2 },
    { position: [2, -4, -2], shape: 'taj', color: '#fb923c', speed: 0.45, distort: 0.25 },
    { position: [-3, 4, -3], shape: 'fort', color: '#f472b6', speed: 0.3, distort: 0.35 },
    { position: [7, -2, -1], shape: 'temple', color: '#fbbf24', speed: 0.5, distort: 0.2 },
    { position: [-7, 1, -2], shape: 'mountain', color: '#60a5fa', speed: 0.25, distort: 0.15 },
    { position: [3, 5, 1], shape: 'lotus', color: '#e879f9', speed: 0.4, distort: 0.3 },
    { position: [-2, -5, 0], shape: 'boat', color: '#2dd4bf', speed: 0.35, distort: 0.2 },
  ]

  return (
    <>
      {landmarks.map((lm, i) => (
        <Landmark key={i} {...lm} />
      ))}
    </>
  )
}