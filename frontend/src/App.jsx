import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Insert } from "./pages/Insert";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/insert" element={<Insert />}></Route>
    </Routes>
  );
}
export default App;
