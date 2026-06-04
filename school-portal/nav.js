(function () {
  const navEntries = performance.getEntriesByType("navigation");
  const isReload = navEntries.length && navEntries[0].type === "reload";
  const isHomePage = /\/index\.html$/i.test(window.location.pathname);

  if (isReload && !isHomePage) {
    window.location.href = "index.html";
    return;
  }

  const toggles = document.querySelectorAll(".nav-toggle");

  toggles.forEach((toggle) => {
    const header = toggle.closest(".site-header");
    const nav = header ? header.querySelector("#primary-nav") : null;
    if (!header || !nav) return;

    const closeMenu = () => {
      header.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    document.addEventListener("click", (event) => {
      if (!header.classList.contains("nav-open")) return;
      if (header.contains(event.target)) return;
      closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 720) closeMenu();
    });
  });
})();
