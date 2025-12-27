import { useEffect, useState } from "react";

export default function Research() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}/content/research.json`, { cache: "no-store" })
      .then(r => r.json())
      .then(setData)
      .catch(() => setData({ areas: [] }));
  }, []);

  if (!data) return <div className="card">Loading…</div>;

  return (
    <>
      <section className="hero">
        <h1>{data.title || "Research"}</h1>
        <p className="sub">{data.intro || ""}</p>
      </section>

      <section className="card" style={{ marginTop: 14 }}>
        <h2>Areas</h2>
        <div className="list">
          {(data.areas || []).map((a, i) => (
            <div className="item" key={i}>
              <b>{a.title}</b>
              <div className="meta">{a.text}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
