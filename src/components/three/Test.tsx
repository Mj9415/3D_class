import { CameraControls } from "@react-three/drei";
import * as THREE from "three";

export default function Test() {
  const x = 0,
    y = 0;
  const heartShape = new THREE.Shape();

  heartShape.moveTo(x + 5, y + 5);
  heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
  heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
  heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
  heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
  heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
  heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);
  return (
    <>
      <hemisphereLight intensity={5} />
      <CameraControls />
      <mesh scale={0.2} rotation={[-9.5, 0, 0]} position={[-1, 4, 0]}>
        <shapeGeometry args={[heartShape]} />
        <meshBasicMaterial color={"hotPink"} />
      </mesh>
    </>
  );
}
