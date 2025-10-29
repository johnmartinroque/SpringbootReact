import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowswerRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
