import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Layout from "./app/Layout.jsx";
import Home from "./pages/Home.jsx";
import Research from "./pages/Research.jsx";
import Publications from "./pages/Publications.jsx";
import Team from "./pages/Team.jsx";

export default function App() {

  const [lang, setLang] = useState("en");

  return (
    <Routes>
      <Route element={<Layout lang={lang} setLang={setLang} />}>
        <Route path="/" element={<Home lang={lang} />} />
        <Route path="/research" element={<Research lang={lang} />} />
        <Route path="/publications" element={<Publications lang={lang} />} />
        <Route path="/team" element={<Team lang={lang} />} />
      </Route>
    </Routes>
  );
}
