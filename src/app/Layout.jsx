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

export default function Layout({ lang, setLang }) {
  return (
    <div className="container">
      <Nav lang={lang} setLang={setLang} />
      <Outlet context={[lang]} />
    </div>
  );
}
