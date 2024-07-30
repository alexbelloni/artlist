import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ArtworkList from "./components/ArtworkList";
import ArtworkDetail from "./components/ArtworkDetail";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArtworkList />} />
        <Route path="/artwork/:id" element={<ArtworkDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
