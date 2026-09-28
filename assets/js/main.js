// Progressive enhancement: without JS the theme toggle and BibTeX buttons stay hidden.

// ---- Light / dark theme ----
// The inline script in <head> already set data-theme before first paint.
(() => {
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const savedTheme = () => {
    try {
      return localStorage.getItem("theme");
    } catch {
      return null;
    }
  };

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    if (themeMeta) themeMeta.content = theme === "dark" ? "#131312" : "#faf8f4";
    if (toggle) {
      const label = `Switch to ${theme === "dark" ? "light" : "dark"} mode`;
      toggle.setAttribute("aria-label", label);
      toggle.title = label;
    }
  };

  applyTheme(root.dataset.theme === "dark" ? "dark" : "light");

  if (toggle) {
    toggle.hidden = false;
    toggle.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", next);
      } catch {
        // Storage blocked (private mode): the switch still works for this visit.
      }
      if (document.startViewTransition && !reduceMotion.matches) {
        document.startViewTransition(() => applyTheme(next));
      } else {
        applyTheme(next);
      }
    });
  }

  // Follow system changes until the visitor picks a theme explicitly.
  systemDark.addEventListener("change", (event) => {
    const saved = savedTheme();
    if (saved !== "light" && saved !== "dark") applyTheme(event.matches ? "dark" : "light");
  });
})();

// ---- BibTeX toggle + copy ----
(() => {
  for (const button of document.querySelectorAll("[data-bib]")) {
    const panel = document.getElementById(button.dataset.bib);
    if (!panel) continue;
    button.hidden = false;
    button.addEventListener("click", () => {
      const willOpen = panel.hidden;
      panel.hidden = !willOpen;
      button.setAttribute("aria-expanded", String(willOpen));
    });
  }

  for (const copy of document.querySelectorAll(".bib .copy")) {
    copy.addEventListener("click", async () => {
      const pre = copy.parentElement.querySelector("pre");
      try {
        await navigator.clipboard.writeText(pre.textContent);
        copy.textContent = "Copied";
      } catch {
        // Clipboard API unavailable: select the text so the visitor can copy it manually.
        const range = document.createRange();
        range.selectNodeContents(pre);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        copy.textContent = "Selected";
      }
      setTimeout(() => { copy.textContent = "Copy"; }, 1600);
    });
  }
})();
