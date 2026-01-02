import { Routes, Route } from "react-router-dom";
import  Home  from "./pages/Home";
import Structure from "./pages/Structure";
import Insert from "./pages/Insert"
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/Structure" element={<Structure />}></Route>
      <Route path="/Insert" element={<Insert />}></Route>
    </Routes>
  );
}
export default App;
