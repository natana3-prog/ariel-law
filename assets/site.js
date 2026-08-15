/* Ariel Amar Law Office — shared behavior */
(function () {
  "use strict";

  /* ----- nav: transparent at top, navy when scrolled ----- */
  var nav = document.querySelector(".nav");
  if (nav && !nav.classList.contains("inner-nav")) {
    var onScroll = function () {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ----- mobile menu ----- */
  var menuBtn = document.querySelector(".menu-toggle");
  var mobileMenu = document.querySelector(".mobile-menu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function () {
      var open = mobileMenu.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    mobileMenu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        mobileMenu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ----- language dropdown ----- */
  var langMenu = document.querySelector(".lang-menu");
  var langBtn = document.querySelector(".lang-btn");
  if (langMenu && langBtn) {
    langBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = langMenu.classList.toggle("open");
      langBtn.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", function () {
      langMenu.classList.remove("open");
      langBtn.setAttribute("aria-expanded", "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        langMenu.classList.remove("open");
        langBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ----- FAQ: keep a single item open, matching the original ----- */
  var faqItems = Array.prototype.slice.call(document.querySelectorAll(".faq-item"));
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  /* ----- accessibility widget ----- */
  var A11Y_KEY = "a11y-settings";
  var defaults = { fontScale: 1, contrast: false, invert: false, grayscale: false, links: false, readable: false };
  var state;
  try {
    state = Object.assign({}, defaults, JSON.parse(localStorage.getItem(A11Y_KEY) || "{}"));
  } catch (err) {
    state = Object.assign({}, defaults);
  }

  var root = document.documentElement;

  function apply() {
    root.style.fontSize = state.fontScale === 1 ? "" : (state.fontScale * 100) + "%";
    var filters = [];
    if (state.contrast) filters.push("contrast(1.35)");
    if (state.grayscale) filters.push("grayscale(1)");
    if (state.invert) filters.push("invert(1) hue-rotate(180deg)");
    root.style.setProperty("--a11y-filter", filters.length ? filters.join(" ") : "none");
    root.classList.toggle("a11y-links", state.links);
    root.classList.toggle("a11y-readable", state.readable);
    root.classList.toggle("a11y-invert", state.invert);
    document.querySelectorAll(".a11y-panel button[data-a11y]").forEach(function (btn) {
      var key = btn.getAttribute("data-a11y");
      if (key in defaults && typeof defaults[key] === "boolean") {
        btn.setAttribute("aria-pressed", String(state[key]));
      }
    });
    try { localStorage.setItem(A11Y_KEY, JSON.stringify(state)); } catch (err) { /* private mode */ }
  }

  var a11yToggle = document.querySelector(".a11y-toggle");
  var a11yPanel = document.querySelector(".a11y-panel");
  if (a11yToggle && a11yPanel) {
    a11yToggle.addEventListener("click", function () {
      var open = a11yPanel.classList.toggle("open");
      a11yToggle.setAttribute("aria-expanded", String(open));
    });
    a11yPanel.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-a11y]");
      if (!btn) return;
      var action = btn.getAttribute("data-a11y");
      if (action === "font-plus") state.fontScale = Math.min(1.5, Math.round((state.fontScale + 0.1) * 10) / 10);
      else if (action === "font-minus") state.fontScale = Math.max(0.8, Math.round((state.fontScale - 0.1) * 10) / 10);
      else if (action === "reset") state = Object.assign({}, defaults);
      else if (action in defaults) state[action] = !state[action];
      apply();
    });
  }
  apply();
})();
