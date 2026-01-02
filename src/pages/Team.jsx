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
            <div className="item" key={i}>
              <b>{m.name}</b>
              <div className="meta">
                {m.role}{m.degree ? `, ${m.degree}` : ""} 
                {m.area ? ` • ${m.area}` : ""}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
