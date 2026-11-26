// HTML for each page, built from the data in data.js. Every value is escaped
// before it goes into the page. Links are hash routes, so every page is
// reached by a link and the browser back button works.

import { chartFor } from "./charts.js";
import { headline, indicators, releases, site } from "./data.js";

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function statCard(h) {
  return `<article class="card">
  <h3><a href="#/indicator/${h.slug}">${esc(h.label)}</a></h3>
  <p class="big">${esc(h.value)}</p>
  <p class="change">${esc(h.change)}</p>
  <p class="source">${esc(h.note)} · ${esc(h.source)}</p>
</article>`;
}

function releaseRow(r) {
  return `<li><a href="#/indicator/${r.slug}">${esc(r.title)}</a>
  <span class="rel-date">${esc(r.date)}</span>
  <span>${esc(r.detail)}</span></li>`;
}

export function home(query) {
  const q = (query || "").trim().toLowerCase();
  const shown = q
    ? indicators.filter((i) => (i.title + " " + i.intro).toLowerCase().includes(q))
    : indicators;
  const cards = headline.map(statCard).join("");
  const list = shown
    .map(
      (i) => `<li class="topic">
  <a href="#/indicator/${i.slug}">${esc(i.title)}</a>
  <span>${esc(i.latest)}</span>
</li>`,
    )
    .join("");
  const none = shown.length === 0 ? `<p class="empty">No topic matches “${esc(query)}”. Try “population”, “GDP”, “jobs” or “prices”.</p>` : "";
  return `<section class="hero">
  <p class="kicker">National statistics · United Kingdom</p>
  <h1>The United Kingdom, measured.</h1>
  <p class="lede">${esc(site.tagline)} Every figure below carries its source and year.</p>
  <label class="search">Find a topic
    <input id="search" type="search" placeholder="Try “inflation” or “jobs”" value="${esc(query || "")}" autocomplete="off">
  </label>
</section>
<section aria-label="Headline figures">
  <h2 class="section-title">Headline figures</h2>
  <div class="cards">${cards}</div>
</section>
<section aria-label="Topics">
  <h2 class="section-title">Explore by topic</h2>
  <ul class="topics">${list}</ul>
  ${none}
</section>
<section aria-label="Latest releases">
  <h2 class="section-title">Latest releases</h2>
  <ul class="releases">${releases.map(releaseRow).join("")}</ul>
</section>
<p class="updated">Figures as published to ${esc(site.updated)}. See <a href="#/about">About this site</a> for sources and methods.</p>`;
}

export function indicatorPage(ind, years) {
  const shown = years === 5 ? ind.series.slice(-5) : ind.series;
  const range = years === 5 ? "Last 5 years" : "Last 10 years";
  const rows = ind.facts
    .map((f) => `<tr><th scope="row">${esc(f.label)}</th><td>${esc(f.value)}</td><td>${esc(f.source)}</td></tr>`)
    .join("");
  const srcs = ind.sources.map((s) => `<li>${esc(s)}</li>`).join("");
  const other = indicators
    .filter((i) => i.slug !== ind.slug)
    .map((i) => `<li><a href="#/indicator/${i.slug}">${esc(i.title)}</a></li>`)
    .join("");
  return `<p class="crumb"><a href="#/">&larr; All topics</a></p>
<h1>${esc(ind.title)}</h1>
<p class="lede">${esc(ind.intro)}</p>
<p class="big-line">${esc(ind.latest)}</p>
<figure class="figure">
  <figcaption>${esc(ind.chart.label)} — ${esc(range)}</figcaption>
  ${chartFor({ ...ind, series: shown })}
  <div class="range" role="group" aria-label="Chart range">
    <button type="button" data-range="10" class="${years === 10 ? "on" : ""}">10 years</button>
    <button type="button" data-range="5" class="${years === 5 ? "on" : ""}">5 years</button>
  </div>
</figure>
<h2>Key figures</h2>
<table class="facts">
  <thead><tr><th scope="col">Figure</th><th scope="col">Value</th><th scope="col">Source</th></tr></thead>
  <tbody>${rows}</tbody>
</table>
<h2>Sources</h2>
<ul class="sources">${srcs}</ul>
<h2>Other topics</h2>
<ul class="topics-inline">${other}</ul>`;
}

export function about() {
  return `<p class="crumb"><a href="#/">&larr; All topics</a></p>
<h1>About this site</h1>
<p class="lede">UK in Numbers is an independent national statistics site. It is not affiliated with the Office for National Statistics, whose published figures it cites with source and year on every page.</p>
<h2>What it is</h2>
<p>Four topics — population, the economy, jobs and prices — each with a chart over ten years, a table of key figures, and the source of every number. The site is plain static files: it works offline, on a desktop and on a phone, and loads nothing from the network.</p>
<h2>How to read the figures</h2>
<ul>
  <li><strong>Population</strong> is the ONS mid-year estimate: the number of people usually resident in the UK on 30 June.</li>
  <li><strong>GDP growth</strong> is real growth, adjusted for inflation; nominal GDP is the cash value of everything produced.</li>
  <li><strong>Unemployment</strong> is the Labour Force Survey rate: people aged 16 and over without a job, available to start work, and actively seeking it.</li>
  <li><strong>CPI</strong> is the Consumer Prices Index, the annual average change in the price of a fixed basket of goods and services.</li>
</ul>
<h2>How to cite it</h2>
<p>Quote the figure, its year and its source as shown on the page — for example, “UK population, 69.3 million, mid-2024 (ONS mid-year population estimates)”.</p>
<h2>Topics</h2>
<ul class="topics-inline">${indicators.map((i) => `<li><a href="#/indicator/${i.slug}">${esc(i.title)}</a></li>`).join("")}</ul>`;
}

export function missing() {
  return `<h1>Not found</h1>
<p>There is no page at this address. <a href="#/">See all topics</a>.</p>`;
}
