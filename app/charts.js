// Small SVG charts, drawn from the data in data.js. No library, no network:
// a line chart for series that move smoothly (population, unemployment)
// and a bar chart for series with a sign that matters (GDP growth, CPI).

const NS = "http://www.w3.org/2000/svg";

function fmt(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const step = span / count;
  const mag = 10 ** Math.floor(Math.log10(step));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const size = nice * mag;
  const start = Math.ceil(min / size) * size;
  const ticks = [];
  for (let v = start; v <= max + 1e-9; v += size) ticks.push(v);
  return ticks;
}

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
}

// Draws a line chart for { year, value } points. Returns an SVG string.
export function lineChart(series, label) {
  const W = 760;
  const H = 300;
  const padL = 52;
  const padR = 16;
  const padT = 18;
  const padB = 34;
  const values = series.map((p) => p.value);
  let min = Math.min(...values);
  let max = Math.max(...values);
  const pad = (max - min) * 0.12 || 1;
  min -= pad;
  max += pad;
  const x = (i) => padL + ((W - padL - padR) * i) / (series.length - 1);
  const y = (v) => padT + ((max - v) * (H - padT - padB)) / (max - min);
  const ticks = niceTicks(min, max, 4);
  const points = series.map((p, i) => `${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
  const area = `${padL},${y(min).toFixed(1)} ${points} ${x(series.length - 1).toFixed(1)},${y(min).toFixed(1)}`;
  const grid = ticks
    .map(
      (t) =>
        `<line x1="${padL}" y1="${y(t)}" x2="${W - padR}" y2="${y(t)}" class="grid"/>` +
        `<text x="${padL - 8}" y="${y(t) + 4}" class="tick" text-anchor="end">${fmt(t)}</text>`,
    )
    .join("");
  const dots = series
    .map(
      (p, i) =>
        `<circle cx="${x(i)}" cy="${y(p.value)}" r="3.5" class="dot"/>` +
        `<text x="${x(i)}" y="${H - 10}" class="tick" text-anchor="middle">${p.year}</text>`,
    )
    .join("");
  const last = series[series.length - 1];
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)}" class="chart">
  <polygon points="${area}" class="area"/>
  ${grid}
  <polyline points="${points}" class="line" fill="none"/>
  ${dots}
  <text x="${padL}" y="${y(last.value) - 10}" class="callout">${fmt(last.value)} in ${last.year}</text>
</svg>`;
}

// Draws a bar chart for { year, value } points, with a zero line when the
// series crosses it. Returns an SVG string.
export function barChart(series, label) {
  const W = 760;
  const H = 300;
  const padL = 52;
  const padR = 16;
  const padT = 18;
  const padB = 34;
  const values = series.map((p) => p.value);
  let min = Math.min(0, ...values);
  let max = Math.max(0, ...values);
  const pad = (max - min) * 0.1 || 1;
  min -= pad;
  max += pad;
  const slot = (W - padL - padR) / series.length;
  const bw = Math.min(44, slot * 0.62);
  const x = (i) => padL + slot * i + (slot - bw) / 2;
  const y = (v) => padT + ((max - v) * (H - padT - padB)) / (max - min);
  const ticks = niceTicks(min, max, 4);
  const grid = ticks
    .map(
      (t) =>
        `<line x1="${padL}" y1="${y(t)}" x2="${W - padR}" y2="${y(t)}" class="grid"/>` +
        `<text x="${padL - 8}" y="${y(t) + 4}" class="tick" text-anchor="end">${fmt(t)}</text>`,
    )
    .join("");
  const bars = series
    .map((p, i) => {
      const top = y(Math.max(0, p.value));
      const bottom = y(Math.min(0, p.value));
      const cls = p.value < 0 ? "bar neg" : "bar";
      return `<rect x="${x(i).toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(1, bottom - top).toFixed(1)}" class="${cls}"/>` +
        `<text x="${(x(i) + bw / 2).toFixed(1)}" y="${H - 10}" class="tick" text-anchor="middle">${p.year}</text>`;
    })
    .join("");
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)}" class="chart">
  ${grid}
  <line x1="${padL}" y1="${y(0)}" x2="${W - padR}" y2="${y(0)}" class="zero"/>
  ${bars}
</svg>`;
}

export function chartFor(indicator) {
  return indicator.chart.kind === "bar"
    ? barChart(indicator.series, indicator.chart.label)
    : lineChart(indicator.series, indicator.chart.label);
}
