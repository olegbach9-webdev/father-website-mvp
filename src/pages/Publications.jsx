import { useEffect, useMemo, useState } from "react";

export default function Publications() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}/content/publications.json`, { cache: "no-store" })
      .then(r => r.json())
      .then(setData)
      .catch(() => setData({ items: [] }));
  }, []);

  const items = useMemo(() => {
    const arr = data?.items || [];
    return [...arr].sort((a, b) => (b.year || 0) - (a.year || 0));
  }, [data]);

  if (!data) return <div className="card">Loading…</div>;

  return (
    <>
      <section className="hero">
        <h1>{data.title || "Publications"}</h1>
        <p className="sub">{data.intro || ""}</p>
      </section>

      <section className="card" style={{ marginTop: 14 }}>
        <h2>List</h2>
        <div className="list">
          {items.map((p, i) => (
            <div className="item" key={i}>
              <b>{p.year} — {p.title}</b>
              <div className="meta">{p.authors} • {p.where}</div>
              <div className="meta">
                {p.pdf ? <a href={p.pdf} target="_blank" rel="noreferrer">PDF</a> : null}
                {p.pdf && p.link ? " • " : null}
                {p.link ? <a href={p.link} target="_blank" rel="noreferrer">Link</a> : null}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
