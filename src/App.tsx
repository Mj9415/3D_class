import "./App.css";
import Home from "@components/Home";
import { RecoilRoot } from "recoil";

export default function App() {
  return (
    <>
      {/* RecoilRoot: 전역상태 */}
      <RecoilRoot>
        <Home />
      </RecoilRoot>
    </>
  );
}
