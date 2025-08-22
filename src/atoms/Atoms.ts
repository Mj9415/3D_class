// https://recoiljs.org/docs/basic-tutorial/atoms/
import { atom } from "recoil";

export const selectedColorState = atom({
  key: "color",
  default: 0,
});

export const selectedMeshState = atom({
  key: "mesh",
  default: "",
});

export const cameraResetState = atom({
  key: "cameraReset",
  default: false,
});
