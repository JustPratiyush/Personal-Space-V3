// Abhinav's Space. Everything here is an enhancement: every page reads fine without it.
(() => {
  const d = document;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- Slug: live IST clock, date, and days since I started building (1 Dec 2024, IST) ----
  const BUILDING_SINCE = Date.UTC(2024, 11, 1) - 5.5 * 3600e3;
  const timeFmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
  });
  const dateFmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata", month: "short", day: "2-digit", year: "numeric",
  });
  const clocks = d.querySelectorAll("[data-clock]");
  const dates = d.querySelectorAll("[data-date]");
  const days = d.querySelectorAll("[data-day]");
  function tick() {
    const now = new Date();
    const day = Math.floor((now - BUILDING_SINCE) / 864e5) + 1;
    clocks.forEach((el) => (el.textContent = `${timeFmt.format(now)} IST`));
    dates.forEach((el) => (el.textContent = dateFmt.format(now).toUpperCase()));
    days.forEach((el) => (el.textContent = `Day ${day}`));
  }
  if (clocks.length || days.length) {
    tick();
    setInterval(tick, 1000);
  }

  // ---- Ticker: "a few things I've done" ----
  d.querySelectorAll("[data-ticker]").forEach((root) => {
    const list = root.querySelector("ol");
    const items = [...list.children];
    const ctl = root.querySelector("[data-ctl]");
    if (items.length < 2 || !ctl) return;

    const count = ctl.querySelector("[data-count]");
    const toggle = ctl.querySelector("[data-toggle]");
    let i = 0;
    let timer = null;
    let paused = reduceMotion;
    let hovering = false;

    list.classList.add("is-live");
    items[0].classList.add("is-on");
    ctl.hidden = false;

    const fit = () => {
      list.style.minHeight = "";
      const h = Math.max(...items.map((li) => {
        li.classList.add("is-on");
        const height = li.offsetHeight;
        if (li !== items[i]) li.classList.remove("is-on");
        return height;
      }));
      list.style.minHeight = `${h}px`;
    };

    function go(n) {
      items[i].classList.remove("is-on");
      i = (n + items.length) % items.length;
      items[i].classList.add("is-on");
      count.textContent = `${i + 1} of ${items.length}`;
    }
    function schedule() {
      clearInterval(timer);
      if (!paused && !hovering) timer = setInterval(() => go(i + 1), 5200);
      toggle.textContent = paused ? "Play" : "Pause";
      toggle.setAttribute("aria-pressed", String(paused));
    }

    ctl.querySelector("[data-prev]").addEventListener("click", () => { list.setAttribute("aria-live", "polite"); go(i - 1); schedule(); });
    ctl.querySelector("[data-next]").addEventListener("click", () => { list.setAttribute("aria-live", "polite"); go(i + 1); schedule(); });
    toggle.addEventListener("click", () => { paused = !paused; schedule(); });
    root.addEventListener("mouseenter", () => { hovering = true; schedule(); });
    root.addEventListener("mouseleave", () => { hovering = false; schedule(); });
    root.addEventListener("focusin", () => { hovering = true; schedule(); });
    root.addEventListener("focusout", () => { hovering = false; schedule(); });

    fit();
    addEventListener("resize", fit);
    d.fonts && d.fonts.ready.then(fit);
    go(0);
    schedule();
  });

  // ---- Signature: written left to right when it scrolls into view ----
  const sig = d.querySelector(".signature");
  if (sig) {
    if ("IntersectionObserver" in window && !reduceMotion) {
      const io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          sig.classList.add("is-in");
          io.disconnect();
        }
      }, { threshold: 0.6 });
      io.observe(sig);
    } else {
      sig.classList.add("is-in");
    }
  }

  // ---- Taste: tabs over plain sections ----
  const tablist = d.querySelector("[data-tabs]");
  if (tablist) {
    const tabs = [...tablist.querySelectorAll("[role=tab]")];
    const panels = [...d.querySelectorAll("[data-panel]")];
    d.documentElement.classList.add("tabs-live");
    tablist.hidden = false;
    panels.forEach((p) => p.setAttribute("role", "tabpanel"));

    function show(id, focus) {
      tabs.forEach((t) => {
        const on = t.dataset.tab === id;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        if (on && focus) t.focus();
      });
      panels.forEach((p) => (p.hidden = p.dataset.panel !== id));
    }
    tabs.forEach((t, n) => {
      t.addEventListener("click", () => {
        show(t.dataset.tab);
        history.replaceState(null, "", `#${t.dataset.tab}`);
      });
      t.addEventListener("keydown", (e) => {
        const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!step) return;
        e.preventDefault();
        const next = tabs[(n + step + tabs.length) % tabs.length];
        show(next.dataset.tab, true);
        history.replaceState(null, "", `#${next.dataset.tab}`);
      });
    });
    const fromHash = location.hash.slice(1);
    show(tabs.some((t) => t.dataset.tab === fromHash) ? fromHash : tabs[0].dataset.tab);
  }

  // ---- Work: GitHub contributions, drawn in ink ----
  const heatmap = d.querySelector("[data-heatmap]");
  if (heatmap) {
    const user = heatmap.dataset.heatmap;
    fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        const list = data.contributions || [];
        if (!list.length) return;
        const grid = heatmap.querySelector(".heatmap-grid");
        const months = heatmap.querySelector(".heatmap-months");
        const lead = new Date(`${list[0].date}T00:00:00Z`).getUTCDay();
        const cells = Array(lead).fill(null).concat(list);
        const frag = d.createDocumentFragment();
        cells.forEach((c) => {
          const cell = d.createElement("i");
          if (!c) cell.className = "pad";
          else {
            cell.dataset.l = c.level;
            cell.title = `${c.count} contribution${c.count === 1 ? "" : "s"} on ${c.date}`;
          }
          frag.appendChild(cell);
        });
        grid.appendChild(frag);

        const monthFmt = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });
        let last = "";
        for (let col = 0; col * 7 < cells.length; col++) {
          const first = cells.slice(col * 7, col * 7 + 7).find(Boolean);
          const label = first ? monthFmt.format(new Date(`${first.date}T00:00:00Z`)) : "";
          const span = d.createElement("span");
          if (label !== last && first && new Date(`${first.date}T00:00:00Z`).getUTCDate() <= 7) {
            span.textContent = label;
            last = label;
          }
          months.appendChild(span);
        }
        const total = data.total ? data.total.lastYear : list.reduce((s, c) => s + c.count, 0);
        heatmap.querySelector("[data-total]").textContent = `${total.toLocaleString("en-US")} contributions in the last year`;
        grid.setAttribute("aria-label", `GitHub contributions: ${total} in the last year`);
        heatmap.hidden = false;
        const scroller = heatmap.querySelector(".heatmap-scroll");
        scroller.scrollLeft = scroller.scrollWidth;
      })
      .catch(() => {});
  }
})();
