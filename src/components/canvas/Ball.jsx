import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    //speed와 회전강도 
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
        {/* 주변광 강도 */}
      <ambientLight intensity={0.25} />
        {/* 방향성 조명 위치 */}
      <directionalLight position={[0, 0, 0.05]} />
      {/* 그림자를 받고 크기를 2.75로 줌*/}
      <mesh castShadow receiveShadow scale={2.75}>
        {/* 렌더링 ㅎㄹ 메쉬 내부에 정사면체 기하학 2-면체를 만든다 */}
        <icosahedronGeometry args={[1, 1]} />
        {/* 재료추가 */}
        <meshStandardMaterial
          color='#fff8eb'
        //   다각형
          polygonOffset
          polygonOffsetFactor={-5}
        //   평범한 음영
          flatShading
        />
        {/* 장식 */}
        <Decal
        // 위치를 지정해야 보임
          position={[0, 0, 1]}
        //   2배의 배열과 동일한 회전을 주기위해
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
        //   평면음영
          flatShading
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  return (
    <Canvas
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
