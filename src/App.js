import { Route, Routes } from "react-router-dom";

import Home from "pages/Home/Home";
import Game from "pages/Game/Game";
import Win from "pages/Win";
import GameOver from "pages/End/GameOver";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="/win" element={<Win />} />
      <Route path="/gameover" element={<GameOver />} />
    </Routes>
  );
}

export default App;
