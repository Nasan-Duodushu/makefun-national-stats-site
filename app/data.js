// The figures behind UK in Numbers. Every number below is a published
// statistic with its source and year, verified against the source named
// beside it (see sources.js note at the bottom of each indicator page).
// Values are rounded for display; charts use the same series.
//
// Sources used: ONS mid-year population estimates (mid-2024, released
// 26 September 2025); ONS GDP quarterly national accounts, Oct–Dec 2024
// and Blue Book 2026; ONS Labour Force Survey; ONS Consumer price inflation;
// ONS national population projections, 2024-based; World Bank/IMF via the
// 2024 nominal GDP per capita figure. Figures are as published in 2025–26.

export const site = {
  name: "UK in Numbers",
  tagline: "The United Kingdom, measured — population, the economy, jobs and prices.",
  updated: "26 November 2026",
};

export const headline = [
  {
    slug: "population",
    label: "Population",
    value: "69.3m",
    change: "+0.9% on mid-2023",
    note: "Mid-year estimate, mid-2024",
    source: "ONS mid-year population estimates",
  },
  {
    slug: "economy",
    label: "GDP",
    value: "£2.91tr",
    change: "+1.1% real growth in 2024",
    note: "Nominal GDP, 2024",
    source: "ONS, Blue Book 2026",
  },
  {
    slug: "jobs",
    label: "Unemployment",
    value: "4.4%",
    change: "of people aged 16+, 2024",
    note: "Labour Force Survey average",
    source: "ONS Labour Force Survey",
  },
  {
    slug: "prices",
    label: "Inflation (CPI)",
    value: "2.5%",
    change: "annual average, 2024",
    note: "Down from 7.3% in 2023",
    source: "ONS Consumer price inflation",
  },
];

export const indicators = [
  {
    slug: "population",
    title: "Population",
    intro:
      "How many people live in the UK, where they live, and how the population is changing. The population reached 69.3 million in mid-2024 and is projected to pass 70 million by mid-2028.",
    latest: "69.3 million people (mid-2024)",
    unit: "million people",
    chart: { kind: "line", label: "UK population, mid-year, millions" },
    series: [
      { year: 2015, value: 65.1 },
      { year: 2016, value: 65.6 },
      { year: 2017, value: 66.0 },
      { year: 2018, value: 66.4 },
      { year: 2019, value: 66.8 },
      { year: 2020, value: 67.1 },
      { year: 2021, value: 67.0 },
      { year: 2022, value: 67.6 },
      { year: 2023, value: 68.3 },
      { year: 2024, value: 69.3 },
    ],
    facts: [
      { label: "England", value: "58.6 million", source: "ONS, mid-2024" },
      { label: "Scotland", value: "5.5 million", source: "ONS, mid-2024" },
      { label: "Wales", value: "3.2 million", source: "ONS, mid-2024" },
      { label: "Northern Ireland", value: "1.9 million", source: "ONS, mid-2024" },
      { label: "Median age", value: "40.7 years", source: "ONS, mid-2024" },
      { label: "Life expectancy at birth", value: "79 years (men), 83 years (women)", source: "ONS, 2022–24" },
      { label: "Net international migration", value: "431,000", source: "ONS, year to Dec 2024" },
      { label: "Projected population, mid-2034", value: "71.0 million", source: "ONS, 2024-based projections" },
    ],
    sources: [
      "ONS, Population estimates for the UK, England, Wales, Scotland and Northern Ireland: mid-2024 (released 26 September 2025).",
      "ONS, National population projections: 2024-based (released 28 April 2026).",
    ],
  },
  {
    slug: "economy",
    title: "The economy",
    intro:
      "The size of the UK economy and how fast it is growing. Real GDP grew 1.1% in 2024 after 0.4% in 2023; nominal GDP reached £2.91 trillion.",
    latest: "£2.91 trillion nominal GDP (2024)",
    unit: "real GDP growth, % per year",
    chart: { kind: "bar", label: "Real GDP growth, % per year" },
    series: [
      { year: 2015, value: 2.7 },
      { year: 2016, value: 2.0 },
      { year: 2017, value: 2.4 },
      { year: 2018, value: 1.4 },
      { year: 2019, value: 1.6 },
      { year: 2020, value: -10.2 },
      { year: 2021, value: 8.6 },
      { year: 2022, value: 5.0 },
      { year: 2023, value: 0.4 },
      { year: 2024, value: 1.1 },
    ],
    facts: [
      { label: "Nominal GDP, 2024", value: "£2.91 trillion", source: "ONS, Blue Book 2026" },
      { label: "GDP per person, 2024", value: "$52,947", source: "World Bank / IMF, 2024" },
      { label: "Real GDP growth, 2025", value: "1.2%", source: "ONS, Blue Book 2026" },
      { label: "Services share of output", value: "about 80%", source: "ONS, 2024" },
      { label: "Manufacturing share", value: "about 10%", source: "ONS, 2024" },
      { label: "Construction share", value: "about 6%", source: "ONS, 2024" },
      { label: "Public sector net debt", value: "about 98% of GDP", source: "ONS, early 2024" },
      { label: "Real GDP per head, 2024", value: "no growth", source: "ONS, 2024" },
    ],
    sources: [
      "ONS, GDP quarterly national accounts, UK: October to December 2024 (released 28 March 2025).",
      "ONS, National accounts at a glance, Blue Book 2026.",
    ],
  },
  {
    slug: "jobs",
    title: "Jobs and pay",
    intro:
      "Who is working, who is looking for work, and what pay looks like. Unemployment averaged 4.4% in 2024, up from 4.0% in 2023, while median full-time weekly pay reached £728 in April 2024.",
    latest: "Unemployment 4.4% (2024 average)",
    unit: "unemployment rate, %",
    chart: { kind: "line", label: "Unemployment rate, % of people aged 16+" },
    series: [
      { year: 2015, value: 5.4 },
      { year: 2016, value: 4.9 },
      { year: 2017, value: 4.4 },
      { year: 2018, value: 4.1 },
      { year: 2019, value: 3.8 },
      { year: 2020, value: 4.5 },
      { year: 2021, value: 4.6 },
      { year: 2022, value: 3.7 },
      { year: 2023, value: 4.0 },
      { year: 2024, value: 4.4 },
    ],
    facts: [
      { label: "Unemployment rate, 2024", value: "4.4%", source: "ONS Labour Force Survey" },
      { label: "Unemployment rate, 2025", value: "about 4.7%", source: "ONS Labour Force Survey" },
      { label: "Employment rate, 16–64", value: "about 75%", source: "ONS, 2024" },
      { label: "Median weekly pay, full-time", value: "£728", source: "ONS ASHE, April 2024" },
      { label: "Lowest unemployment in series", value: "3.7% (2022)", source: "ONS Labour Force Survey" },
      { label: "Highest in series", value: "5.4% (2015)", source: "ONS Labour Force Survey" },
    ],
    sources: [
      "ONS, Labour market overview and Labour Force Survey, 2024–25.",
      "ONS, Annual Survey of Hours and Earnings (ASHE), April 2024.",
    ],
  },
  {
    slug: "prices",
    title: "Prices and inflation",
    intro:
      "What prices are doing. Consumer price inflation averaged 2.5% in 2024, down sharply from 9.1% in 2022 and 7.3% in 2023, after the Bank of England's rate rises.",
    latest: "CPI 2.5% (2024 annual average)",
    unit: "CPI, annual average %",
    chart: { kind: "bar", label: "CPI inflation, annual average %" },
    series: [
      { year: 2015, value: 0.0 },
      { year: 2016, value: 0.7 },
      { year: 2017, value: 2.7 },
      { year: 2018, value: 2.5 },
      { year: 2019, value: 1.8 },
      { year: 2020, value: 0.9 },
      { year: 2021, value: 2.6 },
      { year: 2022, value: 9.1 },
      { year: 2023, value: 7.3 },
      { year: 2024, value: 2.5 },
    ],
    facts: [
      { label: "CPI, 2024 annual average", value: "2.5%", source: "ONS Consumer price inflation" },
      { label: "CPI, 2022 annual average", value: "9.1%", source: "ONS Consumer price inflation" },
      { label: "Bank Rate", value: "4.75%", source: "Bank of England, November 2024" },
      { label: "CPI target", value: "2%", source: "Bank of England" },
      { label: "Lowest in series", value: "0.0% (2015)", source: "ONS Consumer price inflation" },
    ],
    sources: [
      "ONS, Consumer price inflation, UK: 2024 annual averages.",
      "Bank of England, Monetary Policy Report and Bank Rate decisions, 2024.",
    ],
  },
];

export const releases = [
  { date: "26 Sep 2025", title: "Population estimates: mid-2024", detail: "UK population 69.3 million, up 0.9% on the year.", slug: "population" },
  { date: "28 Mar 2025", title: "GDP quarterly national accounts: Oct–Dec 2024", detail: "Real GDP grew 1.1% in 2024.", slug: "economy" },
  { date: "Apr 2024", title: "Annual Survey of Hours and Earnings", detail: "Median full-time weekly pay £728.", slug: "jobs" },
  { date: "Jan 2025", title: "Consumer price inflation: 2024", detail: "CPI averaged 2.5% across 2024.", slug: "prices" },
];
