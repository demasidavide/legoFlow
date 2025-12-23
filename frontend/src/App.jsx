import { Routes, Route } from "react-router-dom";
import  Home  from "./pages/Home";
import Structure from "./pages/Structure";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/Structure" element={<Structure />}></Route>
    </Routes>
  );
}
export default App;
