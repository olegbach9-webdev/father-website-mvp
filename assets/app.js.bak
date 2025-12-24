function setActiveNav(){
  var p = location.pathname.replace(/\/+$/, "");
  if(p === "") p = "/";

  var links = document.querySelectorAll("[data-nav]");
  for(var i=0;i<links.length;i++){
    var href = (links[i].getAttribute("href") || "").replace(/\/+$/, "") || "/";
    if(href === p) links[i].classList.add("active");
  }
}

function loadJSON(path, cb){
  fetch(path, { cache: "no-store" })
    .then(function(r){ return r.json(); })
    .then(function(d){ cb(null, d); })
    .catch(function(e){ cb(e); });
}

function byId(id){ return document.getElementById(id); }

// Home page renderer
function renderHome(){
  loadJSON("/content/home.json", function(err, home){
    if(err) return;

    if(byId("name")) byId("name").textContent = home.name || "Oleg Skrynyk";
    if(byId("subtitle")) byId("subtitle").textContent = home.subtitle || "";
    if(byId("about")) byId("about").textContent = home.about || "";

    if(byId("email")) {
      byId("email").textContent = home.email || "";
      byId("email").href = home.email ? ("mailto:" + home.email) : "#";
    }

    if(byId("affiliation")) byId("affiliation").textContent = home.affiliation || "—";
    if(byId("city")) byId("city").textContent = home.city || "—";
  });
}

// Team page renderer
function renderTeam(){
  loadJSON("/content/team.json", function(err, team){
    if(err) return;

    if(byId("teamTitle")) byId("teamTitle").textContent = team.title || "Team";
    if(byId("teamIntro")) byId("teamIntro").textContent = team.intro || "";

    var list = byId("teamList");
    if(!list) return;
    list.innerHTML = "";

    (team.members || []).forEach(function(m){
      var div = document.createElement("div");
      div.className = "item";
      div.innerHTML =
        "<b>" + (m.name || "Member") + "</b>" +
        "<div class='meta'>" + (m.role || "") + (m.area ? (" • " + m.area) : "") + "</div>";
      list.appendChild(div);
    });
  });
}

document.addEventListener("DOMContentLoaded", function(){
  setActiveNav();
  if(document.body.getAttribute("data-page") === "home") renderHome();
  if(document.body.getAttribute("data-page") === "team") renderTeam();
});
