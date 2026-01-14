import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

function Nav({ lang, setLang }) {
  const [isOpen, setIsOpen] = useState(false); // Стан для гамбургера
  const link = ({ isActive }) => "link" + (isActive ? " active" : "");

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="nav">
      <div className="nav-header">
        <div className="brand">{lang === "en" ? "Oleg Skrynyk" : "Олег Скриник"}</div>
        
        {/* Кнопка Гамбургера */}
        <button className="hamburger" onClick={toggleMenu}>
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      <div className={`links ${isOpen ? "open" : ""}`}>
        <NavLink to="/" end className={link} onClick={closeMenu}>
          {lang === "en" ? "Home" : "Головна"}
        </NavLink>
        <NavLink to="/research" className={link} onClick={closeMenu}>
          {lang === "en" ? "Research" : "Дослідження"}
        </NavLink>
        <NavLink to="/publications" className={link} onClick={closeMenu}>
          {lang === "en" ? "Publications" : "Публікації"}
        </NavLink>
        <NavLink to="/team" className={link} onClick={closeMenu}>
          {lang === "en" ? "Team" : "Команда"}
        </NavLink>

        <button
          className="lang-btn"
          onClick={() => { setLang(lang === "en" ? "ua" : "en"); closeMenu(); }}
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
        <div className="footer-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="footer-col">
            <h4>{lang === "en" ? "Contact" : "Контакти"}</h4>
            <p><strong>Oleg Skrynyk:</strong> <a href="mailto:skrynyk@gmail.com">skrynyk@gmail.com</a></p>
            {/* Тут можна додати інші пошти, якщо будуть */}
          </div>
          
          <div className="footer-col" style={{ textAlign: 'right' }}>
            <h4>{lang === "en" ? "Location" : "Локація"}</h4>
            <p>{lang === "en" ? "Ukrainian Hydrometeorological Institute" : "Український гідрометеорологічний інститут"}</p>
            <p>{lang === "en" ? "Kyiv, Ukraine" : "Київ, Україна"}</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Oleg Skrynyk - Academic website</p>
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
