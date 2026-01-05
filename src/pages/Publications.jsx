import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function Publications() {
  const [lang] = useOutletContext();
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Стан для пошукового запиту

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}/content/publications.json`, { cache: "no-store" })
      .then(r => r.json())
      .then(setData)
      .catch(() => setData({ items: [] }));
  }, []);

  // Об'єднуємо фільтрацію та сортування в одному useMemo
  const filteredItems = useMemo(() => {
    const arr = data?.items || [];
    
    // 1. Фільтруємо за запитом
    const filtered = arr.filter(p => {
      const query = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(query) ||
        p.authors.toLowerCase().includes(query) ||
        p.year.toString().includes(query) ||
        (p.where && p.where.toLowerCase().includes(query))
      );
    });

    // 2. Сортуємо (від нових до старих)
    return [...filtered].sort((a, b) => (b.year || 0) - (a.year || 0));
  }, [data, searchQuery]);

  if (!data) return <div className="card">Loading…</div>;

  return (
    <>
      <section className="hero">
        <h1>{lang === "en" ? "Publications" : "Публікації"}</h1>
        <p className="sub">
          {lang === "en" 
            ? "A list of selected scientific papers, articles, and conference materials." 
            : "Список обраних наукових праць, статей та конференційних матеріалів."}
        </p>
      </section>

      {/* Поле пошуку */}
      <section className="card" style={{ marginTop: 14, padding: '12px 20px' }}>
        <input
          type="text"
          placeholder={lang === "en" ? "Search by title, author or year..." : "Пошук за назвою, автором або роком..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </section>

      <section className="card" style={{ marginTop: 14 }}>
        <h2>
          {lang === "en" ? "Selected Works" : "Обрані праці"} 
          {searchQuery && ` (${filteredItems.length})`}
        </h2>
        
        <div className="list">
          {filteredItems.length > 0 ? (
            filteredItems.map((p, i) => (
              <div className="item" key={i}>
                <span className="meta" style={{ 
                  fontFamily: 'ui-monospace, monospace', 
                  background: '#f1f5f9', 
                  padding: '2px 6px', 
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  marginRight: '8px'
                }}>
                  {p.year}
                </span>
                
                <b style={{ fontSize: '1.1rem', lineHeight: '1.4', display: 'block', marginTop: '8px' }}>
                  {p.title}
                </b>
                
                <div className="meta" style={{ margin: '8px 0', fontStyle: 'italic' }}>
                  {p.authors}
                </div>
                
                <div className="meta" style={{ color: 'var(--text)', fontWeight: '500' }}>
                  {p.where}
                </div>

                <div className="meta" style={{ marginTop: '12px', display: 'flex', gap: '15px' }}>
                  {p.pdf && (
                    <a href={`${import.meta.env.BASE_URL}/${p.pdf}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
                      <span>📄</span> PDF
                    </a>
                  )}
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
                      <span>🔗</span> {lang === "en" ? "Source" : "Джерело"}
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', padding: '20px', color: 'var(--muted)' }}>
              {lang === "en" ? "No publications found." : "Публікацій не знайдено."}
            </p>
          )}
        </div>
      </section>
    </>
  );
}