(function () {
  "use strict";
  var cfg = window.SITE_CONFIG || {};
  var lang = document.documentElement.getAttribute("lang") || "fr";
  var links = (cfg.amazon && cfg.amazon[lang]) || {};

  // Liens Amazon : <a data-amazon="t1">. Sans lien configuré, le bouton
  // renvoie vers la section des tomes.
  document.querySelectorAll("[data-amazon]").forEach(function (a) {
    var url = links[a.getAttribute("data-amazon")];
    if (url) {
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
    } else {
      a.href = "#tomes";
    }
  });

  // Réseaux sociaux : <a data-social="youtube">, masqués si non configurés.
  var social = cfg.social || {};
  document.querySelectorAll("[data-social]").forEach(function (a) {
    var url = social[a.getAttribute("data-social")];
    if (url) {
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
    } else {
      a.hidden = true;
    }
  });

  // Menu mobile
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      });
    });
  }

  // Ferme le sélecteur de langue en cliquant ailleurs
  document.addEventListener("click", function (e) {
    document.querySelectorAll("details.lang[open]").forEach(function (d) {
      if (!d.contains(e.target)) d.removeAttribute("open");
    });
  });
})();
