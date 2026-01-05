import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import teamGroup from "./../../public/img/team-group.jpg"

export default function Team() {
  const [data, setData] = useState(null);
  const [lang] = useOutletContext();

  useEffect(() => {
    const fileName = lang === "en" ? "team.json" : "team_ua.json";
    const url = `${import.meta.env.BASE_URL}/content/${fileName}`;

    fetch(url, { cache: "no-store" })
      .then(r => r.json())
      .then(setData)
      .catch(() => setData({ members: [] }));
  }, [lang]);

  if (!data) return <div className="card">Loading…</div>;

  return (
    <>
      <section className="hero">
        <h1>{data.title}</h1>
        <p className="sub">{data.intro}</p>
      </section>

      <section className="card" style={{ marginTop: 14 }}>
        <img
          className="heroImg"
          // src={data.photo || "/img/team-group.jpg"}
          src={teamGroup}
          alt="Team Research Group"
        />
      </section>

      <section className="card" style={{ marginTop: 14 }}>
        <h2>{lang === "en" ? "Department Members" : "Склад відділу"}</h2>
        <div className="list">
          {(data.members || []).map((m, i) => (
            <div className="item team-member" key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>

              {/* Фото учасника */}
              <img
                src={`${import.meta.env.BASE_URL}/${m.photo || 'img/avatar-placeholder.jpg'}`}
                alt={m.name}
                style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--stroke)' }}
              />

              <div style={{ flex: 1 }}>
                <b style={{ fontSize: '1.2rem' }}>{m.name}</b>
                <div className="meta" style={{ marginBottom: '8px' }}>
                  {m.role}{m.degree ? `, ${m.degree}` : ""}
                  {m.area ? ` • ${m.area}` : ""}
                </div>

                <div className="member-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  {/* Посилання на наукові профілі */}
                  {m.links && (
                    <div className="member-links" style={{ display: 'flex', gap: '12px', fontSize: '0.85rem' }}>
                      {m.links.scholar && <a href={m.links.scholar} target="_blank" rel="noreferrer">Google Scholar</a>}
                      {m.links.researchgate && <a href={m.links.researchgate} target="_blank" rel="noreferrer">ResearchGate</a>}
                      {m.links.orcid && <a href={m.links.orcid} target="_blank" rel="noreferrer">ORCID</a>}
                    </div>
                  )}

                  {/* Контактна пошта */}
                  {m.email && (
                    <div className="member-contact" style={{ fontSize: '0.85rem' }}>
                      <a href={`mailto:${m.email}`} title={lang === "en" ? "Send email" : "Написати листа"} style={{ color: 'var(--muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span>✉</span> {m.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
