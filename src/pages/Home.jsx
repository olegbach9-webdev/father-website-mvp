import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import olegPortrait from "./../../public/img/oleg-portrait.jpg"
import heroResearch from "./../../public/img/hero-research.jpg"


export default function Home() {
  const [lang] = useOutletContext();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fileName = lang === "en" ? "home.json" : "home_ua.json";
    const url = `${import.meta.env.BASE_URL}/content/${fileName}`; 

    fetch(url, { cache: "no-store" })
      .then(r => r.json())
      .then(setData)
      .catch(() => setData({}));
  }, [lang]);

  if (!data) return <div className="card">Loading…</div>;
  

  return (
    <>
      <section className="hero">
        <div className="heroGrid">
          <div>
            <h1>{data.name || "Oleg Skrynyk"}</h1>
            <p className="sub">{data.subtitle || ""}</p>
            <p className="sub">
              <a href={data.email ? `mailto:${data.email}` : "#"}>
                {data.email || ""}
              </a>
            </p>
          </div>

          <img
            className="portrait"
            // src={data.photos?.portrait || `${import.meta.env.BASE_URL}/img/oleg-portrait.jpg`}
            src={olegPortrait}
            alt="Portrait"
          />
        </div>
      </section>

      <section className="card" style={{ marginTop: 14 }}>
        <img
          className="heroImg"
          // src={data.photos?.hero || "/img/hero-research.jpg"}
          src={heroResearch}
          alt="Research"
        />
        <p className="sub" style={{ marginTop: 8 }}>
          {data.heroCaption || "Research activity and atmospheric studies"}
        </p>
      </section>

      <div className="grid">
        <section className="card">
          <h2>About</h2>
          <p>{data.about || ""}</p>
        </section>

        <aside className="card">
          <h2>Quick info</h2>
          <div className="kv">
            <div className="row"><span>Affiliation</span><b>{data.affiliation || "—"}</b></div>
            <div className="row"><span>City</span><b>{data.city || "—"}</b></div>
          </div>
        </aside>
      </div>
    </>
  );
}
