export async function loadJSON(path){
  const r = await fetch(path, { cache: "no-store" });
  if(!r.ok) throw new Error(`Failed to load ${path}`);
  return r.json();
}

export function setActiveNav(){
  const p = location.pathname.replace(/\/+$/, "") || "/";
  document.querySelectorAll("[data-nav]").forEach(a => {
    const href = a.getAttribute("href").replace(/\/+$/, "") || "/";
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
