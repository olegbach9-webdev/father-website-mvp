import { NavLink, Outlet } from "react-router-dom";

function Nav({ lang, setLang }) {
  const link = ({ isActive }) => "link" + (isActive ? " active" : "");

  return (
    <div className="nav">
      <div className="brand">{lang === "en" ? "Oleg Skrynyk" : "Олег Скриник"}</div>
      <div className="links">
        <NavLink to="/" end className={link}>{lang === "en" ? "Home" : "Головна"}</NavLink>
        <NavLink to="/research" className={link}>{lang === "en" ? "Research" : "Дослідження"}</NavLink>
        <NavLink to="/publications" className={link}>{lang === "en" ? "Publications" : "Публікації"}</NavLink>
        <NavLink to="/team" className={link}>{lang === "en" ? "Team" : "Група-Команда"}</NavLink>

        <button
          className="lang-btn"
          onClick={() => setLang(lang === "en" ? "ua" : "en")}
          title={lang === "en" ? "Змінити на українську" : "Switch to English"}
        >
          {lang === "en" ? "UA" : "EN"}
        </button>
      </div>
    </div>
  );
}

function Footer({ lang }) {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Ліва колонка: Контакти */}
          <div className="footer-col">
            <h4>{lang === "en" ? "Contact Information" : "Контактна інформація"}</h4>
            <p><strong>Email:</strong> <a href="mailto:skrynyk@gmail.com">skrynyk@gmail.com</a></p>
            <p><strong>{lang === "en" ? "Location:" : "Локація:"}</strong> {lang === "en" ? "Kyiv, Ukraine" : "Київ, Україна"}</p>
            <p>{lang === "en" ? "Ukrainian Hydrometeorological Institute" : "Український гідрометеорологічний інститут"}</p>
          </div>
          
          {/* Права колонка: Посилання списком */}
          <div className="footer-col">
            <h4>{lang === "en" ? "Academic Profiles" : "Академічні профілі"}</h4>
            <ul className="footer-ul">
              <li><a href="https://scholar.google.com/" target="_blank" rel="noreferrer">Google Scholar</a></li>
              <li><a href="https://www.researchgate.net/" target="_blank" rel="noreferrer">ResearchGate</a></li>
              <li><a href="https://uhmi.org.ua/" target="_blank" rel="noreferrer">{lang === "en" ? "UHMI Official Website" : "Офіційний сайт УГМІ"}</a></li>
              <li><a href="https://orcid.org/" target="_blank" rel="noreferrer">ORCID Profile</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Oleg Skrynyk — {lang === "en" ? "Academic Website" : "Академічний вебсайт"}</p>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ lang, setLang }) {
  return (
    <div className="container">
      <Nav lang={lang} setLang={setLang} />
      <main>
        <Outlet context={[lang]} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
