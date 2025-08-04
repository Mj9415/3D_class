import "./App.css";

import { RecoilRoot } from "recoil";
import Home from "./components/Home";

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
