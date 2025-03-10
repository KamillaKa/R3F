import { ThreeElements } from '@react-three/fiber';
import useTextures from '../hooks/TextureHooks';
import { memo } from 'react';

const Ground = memo((props: ThreeElements['mesh']) => {
  const { stoneTexture } = useTextures();
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} {...props} receiveShadow>
      <planeGeometry args={[1, 1, 50, 50]} />
      <meshStandardMaterial
        {...stoneTexture}
        displacementScale={0.04}
        roughness={0.2}
      />
    </mesh>
  );
});

export default Ground;