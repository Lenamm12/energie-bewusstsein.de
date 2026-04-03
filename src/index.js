import "./style.css";

import "@fortawesome/fontawesome-free/js/solid.js";
import "@fortawesome/fontawesome-free/js/fontawesome.js";

// Dark-Mode
function toggleDarkMode() {
  const body = document.querySelector("body");
  body?.classList.toggle("dark-mode");

  if (body?.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", null);
  }
}

document
  .getElementById("dark-mode-toggle")
  .addEventListener("click", toggleDarkMode);

if (localStorage.getItem("darkMode") === "enabled") {
  document.body?.classList.add("dark-mode");
} else {
  document.body?.classList.remove("dark-mode");
}

document.getElementById("toTop").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

import downloads from "./pages/downloads.html";
import elektrizitaet from "./pages/elektrizitaet.html";
import energie from "./pages/energie.html";
import heizung from "./pages/heizung.html";
import home from "./pages/home.html";
import impressum from "./pages/impressum.html";
import klima from "./pages/klima.html";
import labor from "./pages/labor.html";
import links from "./pages/links.html";
import mobilitaet from "./pages/mobilitaet.html";
import rechner from "./pages/rechner.html";
import tipps from "./pages/tipps.html";
import ueber from "./pages/ueber.html";

const pages = {
  downloads,
  elektrizitaet,
  energie,
  heizung,
  home,
  impressum,
  klima,
  labor,
  links,
  mobilitaet,
  rechner,
  tipps,
  ueber,
};

const textDiv = document.getElementById("textDiv");
const nav = document.getElementById("nav");

function hideMobileNav() {
  if (window.innerWidth <= 768 && nav) {
    nav.style.display = "none";
  }
}

function normalizePage(value) {
  return (value || "").trim().toLowerCase();
}

function getPageFromLocation() {
  const url = new URL(window.location.href);
  return normalizePage(url.searchParams.get("page")) || "home";
}

function setupAccordions() {
  const accordions = textDiv.querySelectorAll(".accordion");
  accordions.forEach((accordion) => {
    if (!accordion.classList.contains("active")) {
      const panel = accordion.nextElementSibling;
      if (panel && panel.classList.contains("panel")) {
        panel.style.display = "none";
      }
    }
  });
}

function scrollToHash(hash) {
  if (!hash) return;
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!id) return;
  const target = textDiv.querySelectorAll("[id]");
  const match = Array.from(target).find((element) => element.id === id);

  if (match) {
    match.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

function setActiveNav(page) {
  document.querySelectorAll(".nav-links a.link[data-page]").forEach((link) => {
    const isActive = normalizePage(link.dataset.page) === page;
    link.classList.toggle("active", isActive);
  });
}

function loadPage(page, options = {}) {
  const safePage = pages[page] ? page : "home";
  const hash = options.hash || "";

  textDiv.innerHTML = pages[safePage];
  setupAccordions();
  setActiveNav(safePage);

  if (options.updateHistory) {
    const url = new URL(window.location.href);
    url.searchParams.set("page", safePage);
    url.hash = hash || "";

    if (options.replaceHistory) {
      history.replaceState(null, "", url);
    } else {
      history.pushState(null, "", url);
    }
  }

  if (hash) {
    window.requestAnimationFrame(() => scrollToHash(hash));
  }
}

document.querySelectorAll(".nav-links a.link").forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    const page = normalizePage(btn.dataset.page);
    if (!page || !pages[page]) return;

    loadPage(page, { updateHistory: true });
    hideMobileNav();
  });
});

document.querySelector("header a.home").addEventListener("click", (event) => {
  event.preventDefault();
  loadPage("home", { updateHistory: true });
  hideMobileNav();
});

textDiv.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const accordion = target.closest("button.accordion");
  if (accordion && textDiv.contains(accordion)) {
    accordion.classList.toggle("active");
    const panel = accordion.nextElementSibling;

    if (panel && panel.classList.contains("panel")) {
      panel.style.display = panel.style.display === "block" ? "none" : "block";
    }

    return;
  }

  const anchor = target.closest("a");
  if (!(anchor instanceof HTMLAnchorElement) || !textDiv.contains(anchor)) {
    return;
  }

  const href = anchor.getAttribute("href") || "";
  if (!href) return;

  if (href.startsWith("?page=")) {
    event.preventDefault();
    const parsed = new URL(href, window.location.origin);
    const page = normalizePage(parsed.searchParams.get("page"));
    if (!page || !pages[page]) return;

    loadPage(page, {
      updateHistory: true,
      hash: parsed.hash,
    });

    return;
  }

  if (href.startsWith("#")) {
    event.preventDefault();
    scrollToHash(href);
    history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}${href}`,
    );
  }
});

const initialUrl = new URL(window.location.href);
const initialPage = getPageFromLocation();

loadPage(initialPage, {
  updateHistory: true,
  replaceHistory: true,
  hash: initialUrl.hash,
});

window.onpopstate = () => {
  const currentUrl = new URL(window.location.href);
  const page = getPageFromLocation();
  loadPage(page, { hash: currentUrl.hash });
};

window.onhashchange = () => {
  scrollToHash(window.location.hash);
};
