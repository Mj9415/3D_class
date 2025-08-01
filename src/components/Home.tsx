import { Canvas } from "@react-three/fiber";
import ShowRoom from "@components/three/ShowRoom";
import ColorComp from "@components/ColorComp";
import { Environment } from "@react-three/drei";
// import { OrbitControls } from "@react-three/drei";
import ResponsiveAppBar from "@components/menuBar";
// import RackTest from "./three/RackTest";
// import Test from "./three/test";

export default function Home() {
  const angle = 90; //회전각도
  const dis = 100; //거리
  return (
    <>
      <ResponsiveAppBar />
      {/* //캔버스 안에 이커머스 3D 만들거임 (캔버스 안에는 캔버스 컴포넌트만 넣기)*/}
      {/* {orthographic: true} //2D로 보여줌 */}
      {/*   gl={{ alpha: true }} 투명도를 줘서 기본 css 배경색이 보여지며 그라데이션 처리 */}
      <Canvas
        style={{ background: "#eaf6fb" }}
        shadows
        camera={{
          position: [-1.8, 0.8, 1.5],
          zoom: 1,
          far: 300,
        }}
        gl={{ alpha: true }}
        // orthographic
      >
        {/* 축 헬퍼 */}
        {/* <axesHelper args={[10]} /> */}

        {/* 그리드 헬퍼 */}
        {/* <gridHelper args={[8]} /> */}

        {/* OrbitControls 넣으면 회전가능 */}
        {/* <CameraControls /> */}

        {/* <directionalLight position={[3, 3, 3]} /> */}

        {/* <Environment preset="city" background /> */}
        <ShowRoom />

        {/* ShowRoom은 THREE.JS 컴포넌트 */}
        {/* <RackTest /> */}
        {/* <Test /> */}
      </Canvas>
      <ColorComp />
    </>
  );
}
