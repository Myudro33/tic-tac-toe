import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import PlayerVsAi from "./pages/PlayerVsAi";
import PlayerVsPlayer from "./pages/PlayerVsPlayer";
const App = () => {
  return (
    <div className=" bg-[#1A2A33]">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/playervsplayer" element={<PlayerVsPlayer />} />
        <Route path="/playervsai" element={<PlayerVsAi />} />
      </Routes>
    </div>
  );
};

export default App;
