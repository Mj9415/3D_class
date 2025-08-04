import * as THREE from "three";
// import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
// import { useLoader } from "@react-three/fiber";

import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { CameraControls, ContactShadows } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

import { selectedColorState, selectedMeshState } from "@src/atoms/Atoms";
import { useRecoilState } from "recoil";
import Constants from "@src/Constants";

export default function ShowRoom() {
  const [selectedColorIdx] = useRecoilState(selectedColorState);

  const [selectedMeshName, setSelectedMeshName] =
    useRecoilState(selectedMeshState);

  const { raycaster, scene } = useThree();
  const cameraControlsRef = useRef<CameraControls>(null!);
  const [isFitting, setIsFitting] = useState(false);

  const gltf = useLoader(GLTFLoader, "/3d_glb/3d_Custom.glb");
  // console.log("gltf:", gltf); //scene 속성을 보면 left랑 right가 있음

  useEffect(() => {
    //key 이벤트
    const handleKeyDown = (e: KeyboardEvent) => {
      // console.log("e.key:", e.key);

      switch (e.key) {
        case "a":
          cameraControlsRef.current.setLookAt(-2, 2, 2, 0, 0, 0, true);
          break;
        case "b":
          cameraControlsRef.current.setLookAt(0, 3, 0, 0, 0, 0, true);
          break;
        case "c":
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // primitive에는 object={gltf.scene} 전체가 들어가 있기때문에 castShadow가 안먹힘 따라서 useEffect를 사용하여 mesh가 다 로드되면 안에 있는 mesh들의 castShadow를 true로 바꾸어야함 */
    //컨택섀도우를 사용하기때문에 아래 코드는 주석처리함
    // gltf.scene.children.forEach((shoes) => {
    //   shoes.children.forEach((mesh) => {
    //     mesh.castShadow = true;
    //   });
    // });

    // cameraControlsRef.current.setTarget(0, 0, 0, false); //이걸 없애줘야 색상변경시 다시 원상태로 카메라가 돌아가지않는다.
    cameraControlsRef.current.addEventListener("control", () => {
      // console.log("control");
      setIsFitting(true);
    });
    cameraControlsRef.current.addEventListener("sleep", () => {
      // console.log("sleep");
      setIsFitting(false);
    });
  }, []);

  useEffect(() => {
    // 배경색 제거 (투명하게 설정)
    scene.background = null;
  }, [scene]);

  // 맨처음 실행시
  useEffect(() => {
    gltf.scene.traverse((item: THREE.Object3D) => {
      // console.log("item", item);

      //파일이 머티리얼을 공유하고 있어서 item Mesh의 머터리얼로 바꿔주는 작업을 해줘야한다.
      if (item.name === "Vamp_Left") {
        const itemMat = (item as THREE.Mesh)
          .material as THREE.MeshStandardMaterial; //속성보고 meterial 타입에 따라 재지정해줘야함
        const cloneMat = itemMat.clone(); //복제

        (item as THREE.Mesh).material = cloneMat;
        setSelectedMeshName(item.name);
      }
    });
  }, [gltf.scene, setSelectedMeshName]);

  useEffect(() => {
    // console.log(selectedColorIdx);

    //선택한 부분을  컬러로 바꾸기
    if (selectedMeshName !== "") {
      // console.log(selectedMeshName);
      const obj = scene.getObjectByName(selectedMeshName) as THREE.Mesh;
      const mat = obj.material as THREE.MeshStandardMaterial;
      const colors = Constants.COLOR_ARR[selectedColorIdx].color;
      mat.color = new THREE.Color(colors);
    }
  }, [selectedColorIdx, scene, selectedMeshName]);

  // const angle = 0; //회전각도
  // const dis = 2.0; //거리

  //★원이나 곡선을 그릴때, sin , cos 함수를 이용하여 (x,z), (x,y)축 두군데에 넣게 되면 앵글을 계속 바꿔주면 원을 그리면서 어떤 포지션이 바뀐다 (이건 외우기)
  // sin, cos 가 합쳐지면서 정원을 그린다.
  useFrame(() => {
    const leftShoes = gltf.scene.children[1];

    //왼쪽신발 각도 조절
    leftShoes.rotation.y = THREE.MathUtils.degToRad(300);
    leftShoes.rotation.z = 2.6;
    leftShoes.rotation.x = 0;
    leftShoes.position.x = 0.5;
    leftShoes.position.z = 0.1;
    leftShoes.position.y = 0.4;

    if (!isFitting) {
      //아래 이걸 없애야 카메라가 원상태로 돌아가는현상이 없어졌다.
      // cameraControlsRef.current.setPosition(
      //   dis * Math.sin(angle),
      //   0.8,
      //   dis * Math.cos(angle),
      //   true //true 로 하면 부드럽게 이동
      // );
      // angle = angle + 0.01; //(0.01은 속도 = 앵글))
    }
  });

  const shoesClick = () => {
    // true로 하면 자식 mesh까지 같이 검사, false로 하면 gltf.scene.children만 검사
    const intersects = raycaster.intersectObjects(gltf.scene.children, true);
    // console.log("intersects:", intersects);

    if (intersects.length > 0) {
      const firstObj = intersects[0].object as THREE.Mesh; //가장 앞에 있는 클릭한 오브젝트
      // console.log("이름:", firstObj.name);
      setSelectedMeshName(firstObj.name);

      const firstMat = firstObj.material as THREE.MeshStandardMaterial; //속성보고 meterial 타입에 따라 재지정해줘야함
      const cloneMat = firstMat.clone(); //복제

      firstObj.material = cloneMat; //복제를 담아놓은 변수를 다시 클릭한 오브젝트에 넣어줌
      const mat = firstObj.material as THREE.MeshStandardMaterial; //다시 타입 재지정
      // mat.color = new THREE.Color("red"); //색상 변경
      const colors = Constants.COLOR_ARR[selectedColorIdx].color;
      mat.color = new THREE.Color(colors);

      //선택한게 보이게끔
      mat.emissive = new THREE.Color("#B7F2F0");
      setTimeout(() => {
        mat.emissive = new THREE.Color("black");
      }, 500);

      //fitToBox: 카메라 위치를 오브젝트에 맞게 변경(오브젝트가 화면에 꽉차게)
      cameraControlsRef.current.fitToBox(
        firstObj,
        true
        //    {
        //   paddingLeft: 0,
        //   paddingRight: 0,
        //   paddingBottom: 1,
        //   paddingTop: 2,
        // }
      );

      //setLookAt: 클릭시 원하는 카메라 위치로 변경
      // cameraControlsRef.current.setLookAt(
      //   0,
      //   2,
      //   2,
      //   firstObj.position.x,
      //   firstObj.position.y,
      //   firstObj.position.z,
      //   true
      // );
    }
  };

  return (
    <>
      <directionalLight position={[3, 3, 3]} />
      <pointLight castShadow position={[0, 1, 0]} intensity={3} />
      {/* //enabled={true}로 하면 OrbitControls 사용가능, 상황: 변수에따라 컨트롤 유,무를 따질때 사용*/}
      {/* dollyToCursor: 3D카메라, 퍼스펙티브 카메라에서만 작동하며, 마우스위치에 있는곳을 중심으로 줌, 아웃이 된다. 모바일에서도 사용가능(집게손) */}
      {/* minDistance: 가까워지는 줌 거리 제한 두는 것 */}
      {/* maxDistance: 멀어지는 줌 거리 제한, Infinity 이 기본값 */}
      {/* infinityDolly: 마우스 휠로 무한 줌, true일 경우 minDistance+maxDistance 설정된값이 무시된다*/}
      <CameraControls
        ref={cameraControlsRef}
        enabled={true}
        dollyToCursor={true}
        minDistance={0.5}
        // maxDistance={10}
        infinityDolly={false}
        onChange={() => {
          // console.log(e.type);
          // console.log("onChange");
          // console.log("camera.position:", camera.position);
          // console.log("camera.zoom:", camera.zoom);
        }}
      />
      {/* test용 */}
      {/* <mesh position={[1, 0.3, 1]}>
        <boxGeometry args={[0.5, 0.5]} />
        <meshStandardMaterial />
      </mesh> */}
      {/* 그림자를 받는애는 receiveShadow castShadow 넣어주기*/}
      <mesh receiveShadow castShadow scale={5} position={[0, -0.51, 0]}>
        <cylinderGeometry args={[0.4, 0.2, 0.2, 100]} />
        <meshStandardMaterial />
      </mesh>
      ``
      {/* 모델링 */}
      <primitive object={gltf.scene} onClick={shoesClick} />
      {/* <mesh
        rotation={[
          THREE.MathUtils.degToRad(45),
          THREE.MathUtils.degToRad(45),
          0,
        ]}
      >
        <boxGeometry />
        <meshStandardMaterial />
      </mesh> */}
      {/* 독립적인 쉐도우 */}
      {/* 독자적으로 만드는 그림자이기 때문에 캔버스 매쉬등 castShadow은 사용안해도 된다. 단 바닥에 있는 그림자만 만들 수있다(이외에는 THREE 쉐도우를 사용해야함) */}
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
