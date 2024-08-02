import { useState } from "react";
import "tailwindcss/tailwind.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Questions from "./components/Questions";
import Score from "./components/Score";
import { Protected } from "./protected/Protucted";
import { Public } from "./protected/Public";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Public />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<Protected />}>
            <Route path="/questions" element={<Questions />} />
            <Route path="/score" element={<Score />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
