import * as THREE from "three";
import { CameraControls, ContactShadows, Environment } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function RackTest() {
  // const rack = useLoader(GLTFLoader, "./models/rack.glb");
  const rack = useLoader(GLTFLoader, "./models/test.glb");

  const RackCameraControls = useRef<CameraControls>(null!);
  const armRef = useRef<THREE.Object3D | undefined>(undefined);

  const [selectedMesh, setSelectedMesh] = useState<THREE.Object3D | null>(null);

  // 슬라이드 문 제어
  const { raycaster, camera, scene } = useThree();

  const findParentMesh = (object: THREE.Object3D | null): THREE.Mesh | null => {
    if (!object) return null;
    if (object instanceof THREE.Mesh) return object;
    return findParentMesh(object.parent); // 재귀적으로 부모를 탐색
  };

  const rackClick = (e) => {
    e.stopPropagation();

    const intersects = raycaster.intersectObject(rack.scene, true);
    if (intersects.length > 0) {
      const mesh = intersects[0].object as THREE.Mesh;
      const parentMesh = findParentMesh(mesh.parent);

      console.log(mesh);

      if (parentMesh && parentMesh instanceof THREE.Mesh) {
        setSelectedMesh(parentMesh);
        console.log("부모");
      } else if (mesh instanceof THREE.Mesh) {
        setSelectedMesh(mesh);
        console.log("자식");
      }
    }
  };

  // 투명도 제거 및 머티리얼 수정
  useEffect(() => {
    if (rack && rack.scene) {
      rack.scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const materials = Array.isArray(child.material)
            ? child.material
            : [child.material]; // 머티리얼을 배열로 통일

          console.log(materials);
          materials.forEach((mat) => {
            if (
              mat.type === "MeshStandardMaterial" ||
              mat.type === "MeshPhysicalMaterial"
            ) {
              // 공통 속성 설정
              mat.transparent = true;
              mat.opacity = 1;
              mat.alphaTest = 0;
              mat.depthWrite = true;

              // PBR 속성 설정
              if (
                mat instanceof THREE.MeshStandardMaterial ||
                mat instanceof THREE.MeshPhysicalMaterial
              ) {
                mat.roughness = mat.roughness || 0.5;
                mat.metalness = mat.metalness || 0.9;
              }

              // 머티리얼 업데이트
              mat.needsUpdate = true;
            }
          });
        }
      });
    }
  }, [rack]);

  useEffect(() => {
    rack.scene.traverse((obj) => {
      if (obj.name === "Left" || obj.name === "Right") {
        armRef.current = obj;
      }
    });
  }, [rack]);

  useFrame(() => {
    if (armRef.current) {
      const time = Date.now() * 0.001;

      // 가로축으로 움직임 크기조절
      const movement = Math.sin(time) * -4;

      rack.scene.traverse((obj) => {
        if (obj.name === "Left") {
          obj.position.z = movement;
        }

        // 반대 방향으로 움직임
        if (obj.name === "Right") {
          obj.position.z = -movement;
        }
      });
    }
  });

  return (
    <>
      {/* <Environment files={"./models/bg.hdr"} background /> */}
      <Environment preset="apartment" />
      <ambientLight intensity={5} />
      <directionalLight intensity={25} />
      <spotLight intensity={50} position={[2, 1, 2]} />
      <spotLight intensity={50} position={[-2, 1, -2]} />

      {/* <pointLight castShadow position={[0, 2, 0]} intensity={1} /> */}
      <CameraControls
        ref={RackCameraControls}
        enabled={true}
        distance={30}
        minDistance={0.5}
        maxDistance={100}
        dollyToCursor={true}
      />
      {/* 모델링 */}
      <primitive
        object={rack.scene}
        scale={1}
        position={[0, 0, 0]}
        // onClick={rackClick}
      />

      {/* 원형받침 */}
      <mesh
        receiveShadow
        scale={6}
        rotation={[0, 0, 0]}
        position={[0, -1.6, 0]}
      >
        <boxGeometry args={[1.8, 0.5, 1.5]} />
        <meshStandardMaterial color={"lightBlue"} />
      </mesh>

      {/* 클릭시 Color */}
      {selectedMesh && selectedMesh instanceof THREE.Mesh && (
        <mesh
          geometry={selectedMesh.geometry}
          position={selectedMesh.position}
          rotation={selectedMesh.rotation}
          scale={selectedMesh
            .getWorldScale(new THREE.Vector3())
            .multiplyScalar(1.05)}
        >
          <meshBasicMaterial
            color={"orange"}
            side={THREE.DoubleSide}
            wireframe={true}
            transparent={true}
          />
        </mesh>
      )}

      <ContactShadows
        position={[0, 0, 0]}
        scale={5}
        color="#000000"
        resolution={512}
        opacity={0.8}
        blur={0.5}
      />
    </>
  );
}
