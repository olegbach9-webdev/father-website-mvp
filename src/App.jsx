import { Routes, Route } from "react-router-dom";
import Layout from "./app/Layout.jsx";
import Home from "./pages/Home.jsx";
import Research from "./pages/Research.jsx";
import Publications from "./pages/Publications.jsx";
import Team from "./pages/Team.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/research" element={<Research />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/team" element={<Team />} />
      </Route>
    </Routes>
  );
}
