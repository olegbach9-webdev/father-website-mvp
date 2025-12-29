import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function Research() {
  const [data, setData] = useState(null);
  const [lang] = useOutletContext();

  useEffect(() => {
    const fileName = lang === "en" ? "research.json" : "research_ua.json";
    const url = `${import.meta.env.BASE_URL}/content/${fileName}`;

    fetch(url, { cache: "no-store" })
      .then(r => r.json())
      .then(setData)
      .catch(() => setData({ areas: [] }));
  }, [lang]);

  if (!data) return <div className="card">Loading…</div>;

  return (
    <>
      <section className="hero">
        <h1>{data.title}</h1>
        <p className="sub">{data.intro}</p>
      </section>

      <section className="card" style={{ marginTop: 14 }}>
        <h2>{lang === "en" ? "Research Areas" : "Напрямки досліджень"}</h2>
        <div className="list">
          {(data.areas || []).map((a, i) => (
            <div className="item" key={i}>
              <b style={{ display: "block", marginBottom: "4px" }}>{a.title}</b>
              <div className="meta" style={{ fontSize: "15px", lineHeight: "1.5" }}>
                {a.text}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {data.projects && (
        <section className="card" style={{ marginTop: 14 }}>
          <h2>{lang === "en" ? "Current Projects" : "Поточні проєкти"}</h2>
          <div className="list">
            {data.projects.map((p, i) => (
              <div className="item" key={i}>
                <b>{p.name}</b>
                <div className="meta">{p.description}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
