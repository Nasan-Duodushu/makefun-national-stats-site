// The router: hash routes for the home page, one page per indicator, and
// the about page. The search box filters topics live; the chart range
// buttons re-render the chart for 5 or 10 years.
//
//   #/                     home, with search + headline figures
//   #/indicator/<slug>    one topic, with chart + key figures
//   #/about                sources and methods
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { indicators } from "./data.js";
import { about, home, indicatorPage, missing } from "./views.js";

const app = document.getElementById("app");
let query = "";
let years = 10;

function render() {
  window.__shotReady = false;
  const hash = location.hash || "#/";
  const match = hash.match(/^#\/indicator\/([^/?]+)/);
  if (match) {
    const found = indicators.find((i) => i.slug === decodeURIComponent(match[1]));
    document.title = `${found ? found.title : "Not found"} | UK in Numbers`;
    app.innerHTML = found ? indicatorPage(found, years) : missing();
    bindRangeButtons();
  } else if (hash === "#/about") {
    document.title = "About this site | UK in Numbers";
    app.innerHTML = about();
  } else {
    document.title = "UK in Numbers — population, economy, jobs and prices";
    app.innerHTML = home(query);
    bindSearch();
  }
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

function bindSearch() {
  const input = document.getElementById("search");
  if (!input) return;
  input.addEventListener("input", () => {
    query = input.value;
    const pos = input.selectionStart;
    app.innerHTML = home(query);
    const next = document.getElementById("search");
    next.focus();
    next.setSelectionRange(pos, pos);
    bindSearch();
  });
}

function bindRangeButtons() {
  app.querySelectorAll(".range button").forEach((button) => {
    button.addEventListener("click", () => {
      years = Number(button.dataset.range);
      render();
    });
  });
}

window.addEventListener("hashchange", render);
render();
