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
            {/* Замість h1 тепер відразу статус/позиція */}
            <p className="sub" style={{ fontSize: '1.5rem', color: 'var(--text)', fontStyle: 'normal', fontWeight: '700', marginTop: 0 }}>
              {data.subtitle || "Senior Scientist • Candidate of Physical and Mathematical Sciences"}
            </p>
            
            <p style={{ marginTop: '20px', fontSize: '1.1rem' }}>
              {data.intro || "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."}
            </p>

            <p className="sub">
              <a href={data.email ? `mailto:${data.email}` : "#"} style={{ fontFamily: 'var(--font-mono)' }}>
                ✉ {data.email || "skrynyk@gmail.com"}
              </a>
            </p>
          </div>

          <img className="portrait" src={olegPortrait} alt="Portrait" />
        </div>
      </section>

      <section className="card" style={{ marginTop: 14 }}>
        <img
          className="heroImg"
          src={heroResearch}
          alt="Research activity"
        />
        <p className="sub" style={{ marginTop: 8, textAlign: 'center', fontSize: '0.9rem' }}>
          {data.heroCaption || "Field observations and data rescue processes at UHMI"}
        </p>
      </section>

      <div className="grid">
        <section className="card">
          <h2>{lang === "en" ? "Biography" : "Біографія"}</h2>
          <p style={{ whiteSpace: 'pre-line' }}>{data.about || "Detailed scientific background and research journey..."}</p>
        </section>

        <aside className="card">
          <h2>{lang === "en" ? "Quick info" : "Коротко"}</h2>
          <div className="kv">
            <div className="row"><span>{lang === "en" ? "Affiliation" : "Установа"}</span><b>{data.affiliation || "UHMI"}</b></div>
            <div className="row"><span>{lang === "en" ? "City" : "Місто"}</span><b>{data.city || "Kyiv, Ukraine"}</b></div>
            <div className="row"><span>{lang === "en" ? "Degree" : "Ступінь"}</span><b>Ph.D. / к.г.н.</b></div>
          </div>
        </aside>
      </div>

      {/* Нова секція: Наукові профілі (External Database Profiles) */}
      <section className="card" style={{ marginTop: 14 }}>
        <h2>{lang === "en" ? "Scientific Profiles" : "Наукові профілі"}</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '15px' }}>
          <a href="https://scholar.google.com/" target="_blank" rel="noreferrer" className="link-box">Google Scholar</a>
          <a href="https://www.researchgate.net/" target="_blank" rel="noreferrer" className="link-box">ResearchGate</a>
          <a href="https://orcid.org/" target="_blank" rel="noreferrer" className="link-box">ORCID</a>
          <a href="https://www.scopus.com/" target="_blank" rel="noreferrer" className="link-box">Scopus</a>
        </div>
      </section>
    </>
  );
}
