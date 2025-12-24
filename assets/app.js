export async function loadJSON(path){
  const r = await fetch(path, { cache: "no-store" });
  if(!r.ok) throw new Error(`Failed to load ${path}`);
  return r.json();
}

const LS_LANG = "fw_lang";
const DEFAULT_LANG = "en"; // можеш поставити "uk"

export function getLang(){
  return localStorage.getItem(LS_LANG) || DEFAULT_LANG;
}

export function setLang(lang){
  localStorage.setItem(LS_LANG, lang);
  // найпростіше: перезавантажуємо сторінку, щоб усе перемалювалось
  location.reload();
}

export function initLangUI(){
  const lang = getLang();
  const btnEN = document.getElementById("langEN");
  const btnUA = document.getElementById("langUA");

  if(btnEN) btnEN.classList.toggle("active", lang === "en");
  if(btnUA) btnUA.classList.toggle("active", lang === "uk");

  btnEN?.addEventListener("click", () => setLang("en"));
  btnUA?.addEventListener("click", () => setLang("uk"));
}

export function t(obj){
  // obj може бути {en:"...", uk:"..."} або простий рядок
  if(typeof obj === "string") return obj;
  const lang = getLang();
  return obj?.[lang] ?? obj?.en ?? obj?.uk ?? "";
}

export function setActiveNav(){
  const p = (location.pathname.replace(/\/+$/, "") || "/");
  document.querySelectorAll("[data-nav]").forEach(a => {
    const href = (a.getAttribute("href") || "").replace(/\/+$/, "") || "/";
    a.classList.toggle("active", href === p);
  });
}

export function initTheme(){
  const key = "fw_theme";
  const saved = localStorage.getItem(key);
  if(saved) document.documentElement.setAttribute("data-theme", saved);

  const btn = document.getElementById("themeBtn");
  if(!btn) return;

  btn.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") || "dark";
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(key, next);
  });
}

export function labels(){
  // захардкоджені лейбли UI
  return {
    home: { en: "Home", uk: "Головна" },
    research: { en: "Research", uk: "Дослідження" },
    publications: { en: "Publications", uk: "Публікації" },
    team: { en: "Team", uk: "Команда" },
    about: { en: "About", uk: "Про" },
    quick: { en: "Quick info", uk: "Коротко" },
    email: { en: "Email", uk: "Пошта" },
    pdf: { en: "PDF", uk: "PDF" },
    link: { en: "Link", uk: "Посилання" },
  };
}
