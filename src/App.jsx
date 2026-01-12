import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Heart } from './Heart.jsx'
import Dashboard from './Dashboard.jsx'
import LoginPage from './LoginPage.jsx'

function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      style={{ background: '#020209' }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <Heart />
      <OrbitControls />
      <Environment preset="night" />
    </Canvas>
  )
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      background: '#020209'
    }}>
      <Scene />
      <Dashboard />
    </div>
  )
}
