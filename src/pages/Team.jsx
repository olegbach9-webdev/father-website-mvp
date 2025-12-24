import { useEffect, useState } from "react";

export default function Team() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/content/team.json", { cache: "no-store" })
      .then(r => r.json())
      .then(setData)
      .catch(() => setData({ members: [] }));
  }, []);

  if (!data) return <div className="card">Loading…</div>;

  return (
    <>
      <section className="hero">
        <h1>{data.title || "Team"}</h1>
        <p className="sub">{data.intro || ""}</p>
      </section>

      <section className="card" style={{ marginTop: 14 }}>
        <img className="heroImg" src={data.photo || "/img/team-group.jpg"} alt="Team" />
      </section>

      <section className="card" style={{ marginTop: 14 }}>
        <h2>Members</h2>
        <div className="list">
          {(data.members || []).map((m, i) => (
            <div className="item" key={i}>
              <b>{m.name}</b>
              <div className="meta">{m.role}{m.area ? ` • ${m.area}` : ""}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
