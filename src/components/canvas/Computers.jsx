import { Suspense} from 'react';
import {Canvas} from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';
const Computers = () => {
  // 객체를 가져오는 방법
  const computer = useGLTF('./desktop_pc/scene.gltf')

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black"/>
      <pointLight intensity={1}/>
      {/* 메인조명 */}
      <spotLight
        position={[-20,50,10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        // 맵크기
        shadow-mapSize={1024}
        />
      <primitive
        object={computer.scene}
        scale={0.75}
        position={[0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  return (
    <Canvas
    frameloop='demand'
    shadows
    camera={{position: [20,3,5], fov: 25}}
    gl={{preserveDrawingBuffer : true }}
    >

      {/* 모델 렌더링 suspense를 통해 나옴 */}
     <Suspense fallback={<CanvasLoader/ >}>
      {/* 확대 enableZoom */}
        <OrbitControls 
        enableZoom={false}
        // 최대 극각과 최소 극각 끝까지 회전하지않도록 하는 것
        maxPolarAngle={Math.PI/2}
        minPolarAngle={Math.PI/2}
        />
        <Computers />
     </Suspense>
    {/* 자동폐세회로 닫기 */}
     <Preload all />
    </Canvas>
  )
}

export default Computers
