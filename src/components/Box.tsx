import { ThreeElements, ThreeEvent, useFrame } from '@react-three/fiber';
import useTextures from '../hooks/TextureHooks';
import { useRef, useState } from 'react';
import { Mesh } from 'three';

const Box = (props: ThreeElements['mesh']) => {
  const [rotate, setRotate] = useState(false);
  const meshRef = useRef<Mesh>(null);
  useFrame(() => {
    if (rotate && meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  const pointerOverHandler = (evt: ThreeEvent<PointerEvent>) => {
    setRotate(true);
    evt.object.scale.set(5, 5, 5);
  };

  const pointerOutHandler = (evt: ThreeEvent<PointerEvent>) => {
    setRotate(false);
    evt.object.scale.set(4, 4, 4);
  };

  const { metalTexture } = useTextures();
  return (
    <mesh
      {...props}
      onPointerOver={pointerOverHandler}
      onPointerOut={pointerOutHandler}
      ref={meshRef}
      receiveShadow
      castShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial {...metalTexture} metalness={0.5} roughness={0.4} />
    </mesh>
  );
};

export default Box;