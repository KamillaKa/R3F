import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

import { ThreeElements } from '@react-three/fiber';

const ControlPanel = (props: ThreeElements['group']) => {
  const panelRef = useRef<Mesh>(null);
  const antennaRef = useRef<Mesh>(null);
  const [buttonActive, setButtonActive] = useState(false);
  const [lightOn, setLightOn] = useState(false);

  // Animate antenna movement
  useFrame(() => {
    if (antennaRef.current && lightOn) {
      antennaRef.current.rotation.x = Math.sin(Date.now() * 0.002) * 0.3;
    }
  });

  return (
    <group {...props}>
      {/* Panel Base */}
      <mesh ref={panelRef} position={[0, 0.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[3, 0.5, 2]} />
        <meshStandardMaterial color="gray" metalness={0.6} roughness={0.4} />
      </mesh>
      
      {/* Button */}
      <mesh
        position={[0, 0.8, 0.5]}
        onClick={() => {
          setButtonActive(!buttonActive);
          setLightOn(!lightOn);
        }}
        castShadow
      >
        <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
        <meshStandardMaterial color={buttonActive ? 'red' : 'green'} />
      </mesh>
      
      {/* Antenna */}
      <mesh ref={antennaRef} position={[1, 0.9, 0.5]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
        <meshStandardMaterial color="silver" />
      </mesh>
      
      {/* Spotlight that toggles on button press */}
      {lightOn && (
        <>
          <spotLight
            position={[0, 5, 0]}
            angle={0.8}
            intensity={10} // Brighter light
            color="blue"
            penumbra={0.5}
            castShadow
          />
          {/* Glow effect */}
          <mesh position={[0, 1.6, 0]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color="blue" emissiveIntensity={5} />
          </mesh>
        </>
      )}
    </group>
  );
};

export default ControlPanel;
