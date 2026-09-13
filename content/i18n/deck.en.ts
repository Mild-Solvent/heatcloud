// The investor deck, English. The Slovak file mirrors this shape exactly; the
// type is derived from this one. Figures for the foreign cases are from the
// public sources listed on the last slide; the HeatCloud figures are the
// reference case of the public business model (5 MW, 75% utilisation).

export const deckEn = {
  metaTitle: 'For investors',
  metaDescription:
    'Investor presentation: Slovak data centres that sell compute to Slovak organisations and heat to Slovak towns — the model, the precedents, the numbers, the plan.',
  navLabel: 'For investors',
  navNote: 'The presentation: the model, the precedents abroad, the numbers, the plan',

  ui: {
    counter: '{i} / {n}',
    next: 'Next slide',
    prev: 'Previous slide',
    exit: 'Back to the site',
    fullscreen: 'Full screen',
    exitFullscreen: 'Leave full screen',
    hint: '→ next · ← back · F full screen',
    confidential: 'Confidential draft · indicative figures · company in formation',
    deckName: 'Investor presentation',
    date: 'September 2026',
    sources: 'Sources on the last slide',
    imageMissing: 'Image slot',
  },

  cover: {
    eyebrow: 'Investor presentation · September 2026',
    title: 'The cloud that *heats* Slovak towns.',
    sub: 'Data centres that sell compute to Slovak organisations and heat to Slovak towns. One electricity bill, two lines of revenue.',
    tag: 'Confidential · draft',
  },

  problem: {
    eyebrow: 'The starting point',
    title: 'Slovakia heats with gas and computes abroad.',
    lede: 'Two expensive dependencies that one building can address.',
    stats: [
      ['58 %', 'of the heat in Slovak district heating systems was made from natural gas in 2022'],
      ['€93.4', 'per MWh — the average regulated heat price for 2025; without the state cap it was heading up 40 %'],
      ['760,000', 'households in 188 towns and villages take heat from district networks — 2.4 million people'],
      ['0', 'hyperscale cloud regions in Slovakia; public bodies and companies buy their compute abroad'],
    ] as [string, string][],
    foot: 'ÚRSO, the Slovak heat producers association, the Ministry of Economy. Details on the last slide.',
  },

  idea: {
    eyebrow: 'The idea',
    title: 'Buy electricity once. Sell the result twice.',
    points: [
      ['Revenue 1 · compute', 'Servers, storage, Kubernetes, GPU and workplace services sold to Slovak companies and public bodies at European market rates. This line has to carry the business on its own.'],
      ['Revenue 2 · heat', '95 % of the electricity leaves the hall as heat. We capture it, lift it with heat pumps to district-network temperature and sell it to the town\'s heat utility at 20 % below gas — under a 10–15-year contract.'],
      ['One building, two infrastructures', 'The hall stands where the heat plant and its customers are: in a district town, not in a field outside Bratislava.'],
    ] as [string, string][],
  },

  physics: {
    eyebrow: 'How it works',
    title: 'Physics is on our side.',
    steps: [
      ['Electricity in', 'A megawatt of IT load uses about 8,760 MWh a year. Almost all of it leaves the servers as heat.'],
      ['Captured at 40–50 °C', 'Liquid cooling takes the heat from the racks straight into water, not air. No chimneys, no losses.'],
      ['Lifted by heat pump', 'At a COP of 4–5 we raise the water to the 70–85 °C Slovak networks run on. One MWh of heat needs only 0.2–0.25 MWh of electricity.'],
      ['Into the network', 'Metered at the heat plant\'s transfer station. Heat is base load: it runs 24/7 and depends on neither the weather nor the gas price.'],
    ] as [string, string][],
    stats: [
      ['~95 %', 'of the electrical input is recoverable as heat'],
      ['COP 4–5', 'of the heat pump lifting 45 → 75 °C'],
      ['~1,000', 'flats heated per MW of IT load at full output'],
      ['0 kg', 'of fuel burnt per MWh of heat delivered'],
    ] as [string, string][],
  },

  world: {
    eyebrow: 'Proven abroad',
    title: 'Not an idea. Northern Europe\'s everyday practice.',
    lede: 'Seven cities that heat with data centres today — and the numbers it took.',
    cases: [
      { city: 'Stockholm', country: 'Sweden', who: 'Stockholm Data Parks · Stockholm Exergi', fact: '30+ data centres supply heat for 30,000 flats; target 10 % of the city\'s heat by 2035. An operator earns ~SEK 2 million per MW a year.', key: '30,000', unit: 'flats from 30+ data centres', year: 2017 },
      { city: 'Mäntsälä', country: 'Finland', who: 'Yandex · Nivos', fact: '54 % of a 20,000-person town\'s heat from one data centre. Heat price −11 %, emissions −40 %.', key: '54 %', unit: "of the town's heat from one centre", year: 2016 },
      { city: 'Odense', country: 'Denmark', who: 'Meta · Fjernvarme Fyn', fact: '165,000 MWh a year — heat for 11,000 homes from one hyperscale centre, through Denmark\'s largest heat pump plant.', key: '11,000', unit: 'homes from one centre', year: 2020 },
      { city: 'Espoo', country: 'Finland', who: 'Microsoft · Fortum', fact: '40 % of the heat for Espoo, Kauniainen and Kirkkonummi; −400,000 t CO₂ a year. The world\'s largest scheme, €225 million invested by the utility.', key: '40 %', unit: 'of the heat of three towns', year: 2025 },
      { city: 'Dublin · Tallaght', country: 'Ireland', who: 'AWS · Heat Works', fact: 'Ireland\'s first district heating network: county hall, university, library and flats. Heat from the data centre free of charge, a not-for-profit municipal utility.', key: '1st', unit: 'district heating network in Ireland', year: 2023 },
      { city: 'Frankfurt', country: 'Germany', who: 'Telehouse · Mainova', fact: '1,300 flats of the Westville quarter get 60 % of their heat from a data centre through a 500 m pipe; −400 t CO₂ a year.', key: '1,300', unit: 'flats, 60 % of their heat', year: 2023 },
      { city: 'Oslo', country: 'Norway', who: 'DigiPlex · Fortum Oslo Varme', fact: 'Heat for 5,000 flats from one data centre, since 2019.', key: '5,000', unit: 'flats from one centre', year: 2019 },
    ],
    here: 'Bratislava · Košice',
    hereNote: 'HeatCloud, in design',
    hereKey: '250 kW → 5 MW',
    hereFact: 'A pilot beside a municipal heat plant, then sk-bts-1 at 5 MW — the same physics, the same contract, a Slovak network.',
    timeline: 'Ten years in operation',
    timelineHere: 'HeatCloud · pilot',
    foot: 'All examples are operating or under construction; sources on the last slide.',
  },

  town: {
    eyebrow: 'The precedent for a district town',
    title: 'Mäntsälä: 20,000 people, one data centre, cheaper heat.',
    body: 'A Finnish town the size of Levice or Piešťany connected Yandex\'s data centre to its municipal heat plant in 2016. The town\'s energy company, Nivos, takes the heat from the cooling loop — and residents\' bills went down.',
    stats: [
      ['54 %', 'of the town\'s heat covered by the data centre (2018: 20 GWh)'],
      ['−11 %', 'heat price for residents after the connection'],
      ['−40 %', 'CO₂ emissions from the town\'s heat production'],
      ['2016', 'in operation — the technology has a decade behind it'],
    ] as [string, string][],
    quote: 'This is the model for Slovakia: 188 towns and villages with a district network, most of them on gas, many with a heat plant the town owns.',
  },

  tailwind: {
    eyebrow: 'The regulatory tailwind',
    title: 'Europe no longer permits this. Europe requires it.',
    items: [
      ['Energy Efficiency Directive (EU) 2023/1791, Article 26', 'Data centres above 1 MW must assess and use their waste heat unless it is demonstrably infeasible, technically or economically. It applies in Slovakia too.'],
      ['Germany\'s Energy Efficiency Act (EnEfG)', 'New data centres must reuse 10 % of their heat from July 2026, 15 % from 2027 and 20 % from 2028. The market is already adapting — technology, prices, know-how.'],
      ['Decarbonising district heating', '"Efficient district heating" will require a rising share of renewable and waste heat. Gas-fired plants need a new source before the decade ends.'],
    ] as [string, string][],
    big: [
      ['221 TWh', 'of waste heat a year available from European data centres — 12 % of EU heat demand (EUDCA)'],
      ['1 MW', 'the threshold above which the EU requires data-centre waste heat to be used'],
      ['20 %', 'mandatory heat reuse for new data centres in Germany from 2028'],
    ] as [string, string][],
  },

  municipality: {
    eyebrow: 'What the town gets',
    title: 'A 3 MW module in a district town.',
    lede: 'Concretely, what a town of 20–30 thousand people with a municipal heat plant gets when we build one hall beside it.',
    leftTitle: 'The town and its heat plant',
    left: [
      ['1,000–3,000 flats', 'heated by base load that does not depend on the gas price — the range spans 45–100 % annual offtake by the network'],
      ['−20 % against gas', 'contracted heat price for the utility, indexed for 10–15 years — a stable budget, no January surprises'],
      ['−1,700 t CO₂ a year', 'a reportable cut in the town\'s emissions without burning anything (at 45 % offtake)'],
      ['10–15 jobs', 'skilled, in the region, plus local taxes and fees'],
    ] as [string, string][],
    rightTitle: 'Residents and organisations',
    right: [
      ['Cheaper, steadier heat', 'the utility\'s saving flows into the regulated household price — in Mäntsälä by 11 %'],
      ['Cleaner air', 'less gas and coal burnt in the middle of town'],
      ['Digital services at home', 'the school, the office, the hospital and local firms get cloud in Slovak jurisdiction — 10 km from the town hall, not in another country'],
      ['Resilience', 'two independent heat sources; the hall runs through the winter peak, when heat is dearest'],
    ] as [string, string][],
    foot: 'Estimates from our model for 3 MW of IT load at 75 % utilisation; Mäntsälä per Sitra and the European Commission.',
  },

  business: {
    eyebrow: 'Business model',
    title: 'Two lines of revenue on one electricity bill.',
    lede: 'Reference site of 5 MW at 75 % utilisation, prices from our public model.',
    panelLabel: 'Reference 5 MW site · per year',
    bars: [
      ['Compute revenue', '€17.1m', 94],
      ['Heat revenue', '€1.05m', 6],
    ] as [string, string, number][],
    kpis: [
      ['€18.1m', 'annual revenue'],
      ['€9.6m', 'EBITDA · 53 % margin'],
      ['€39.5m', 'capex: 34.0 IT + 5.5 thermal'],
      ['4.1 years', 'simple payback'],
    ] as [string, string][],
    note: 'Heat is only 6 % of revenue — but it is the one line that is contracted, indexed and sold to a customer the town owns. That is why the thermal half can be financed separately from the servers. Compute has to carry the business on its own — and at cloud prices it does.',
    link: 'The interactive model is public on the site',
  },

  product: {
    eyebrow: 'Product',
    title: 'A cloud a Slovak organisation will actually buy.',
    lede: '14 products on our own hardware, in Slovak jurisdiction, with support in Slovak and prices without surprises.',
    groups: [
      ['Compute', ['Cloud servers from €4.90/month', 'Public Cloud (OpenStack)', 'Managed Kubernetes', 'GPU Cloud — L40S, H200']],
      ['Storage and data', ['Object storage €5.90/TB, no egress fees', 'Managed databases', 'Backup']],
      ['Web and workplace', ['Web hosting, domains, streaming', 'hSuite, hMail, hDrive — mail and documents for offices and firms']],
      ['Heat', ['Heat offtake — a contract for heat utilities, indexed at gas minus 20 %']],
    ] as [string, string[]][],
    foot: 'The public sector, healthcare and regulated industries need cloud in EU jurisdiction without a parent company outside it. Slovakia has none today.',
  },

  funding: {
    eyebrow: 'Financing',
    title: 'The market pays for the servers. Decarbonisation pays for the heat.',
    leftTitle: 'The IT half — €6.8m per MW',
    left: [
      'Financed from compute revenue: equity, hardware leasing, project debt',
      'Payback of ~4 years at cloud prices',
      'Modular — grows 1 MW at a time, as capacity sells',
    ],
    rightTitle: 'The thermal half — €1.1m per MW',
    right: [
      'Heat pumps, pipes, transfer station — ordinary district heating infrastructure',
      'A heat offtake contract with a town-owned utility = bankable, long-term revenue',
      'Exactly the kind of project that public schemes for district heating modernisation, energy efficiency and emission cuts co-finance — with the town as partner',
    ],
    checkTitle: 'Why it qualifies for support',
    checks: [
      'Measurable cuts in CO₂ and gas consumption',
      'Waste heat into a district network — the direction the EU explicitly requires',
      'Lower heat prices for households, less energy poverty',
      'Investment and jobs in regions outside Bratislava',
      'Digital and green transition in one project',
      'A town as partner and a project ready to build',
    ],
    foot: 'Partizánske is already preparing a €40 million modernisation of its municipal district network with the European Investment Bank\'s help, and counts on waste heat. The demand from towns exists.',
  },

  plan: {
    eyebrow: 'The plan',
    title: 'From one container to ten towns.',
    phases: [
      ['2026 · Q4', 'Pilot 250 kW', 'A container hall beside the municipal heat plant of a partner town. Proves the heat transfer, the metering and the contract — and produces the first Slovak number.'],
      ['2027', 'sk-bts-1 · 5 MW', 'The first full region in Bratislava: liquid cooling, two independent feeds, heat into the city network. The catalogue on sale from day one.'],
      ['2028', 'sk-kos-1 · 3 MW', 'Košice for in-country redundancy and east-Slovak latency; connected to the TEKO network.'],
      ['2029 →', 'HeatCloud Town', 'A standard 2–3 MW module for district towns with a municipal heat plant: the same design, the same contract, the same financing — ten times over.'],
    ] as [string, string, string][],
  },

  risks: {
    eyebrow: 'Risks and safeguards',
    title: 'What would make this a bad idea.',
    items: [
      ['The heat offtake contract is never signed', 'No site is built without a signed contract with the heat utility. The model has to work on compute alone — and it does.'],
      ['Compute demand does not appear', 'Public-sector reservations before construction; a catalogue from hosting to GPU; capacity grows 1 MW at a time as it sells.'],
      ['The power price', 'Long-term PPAs and hedging; heat is indexed to gas, not electricity, so the two sides of the contract carry different risks.'],
      ['Heat price regulation', 'The utility\'s price sits below the regulated gas-fired price; the regulator has reason to back it, not to brake it.'],
      ['Execution', 'Proven components (heat pumps, liquid cooling), experienced suppliers; a pilot before the full region.'],
    ] as [string, string][],
  },

  ask: {
    eyebrow: 'What we are looking for',
    title: 'Round 1: €2.5 million for the first Slovak megawatt.',
    stats: [
      ['€2.5m', 'round 1 · 2026–2027'],
      ['250 kW', 'pilot hall beside a municipal heat plant'],
      ['1', 'signed heat offtake contract'],
      ['5 MW', 'sk-bts-1 designed and permitted'],
    ] as [string, string][],
    useTitle: 'Use of funds',
    use: [
      ['Pilot hall and thermal connection', 45],
      ['Design and permits for sk-bts-1', 25],
      ['Team: operations, sales, heat', 20],
      ['Reserve', 10],
    ] as [string, number][],
    next: 'Round 2 (2027): project financing for sk-bts-1 — €34m for the IT half (equity, leasing, debt) and €5.5m for the thermal half, co-financed with the town.',
    foot: 'Indicative. The company is in formation; the terms of the round will be agreed with the lead investor.',
  },

  close: {
    title: 'Let\'s heat towns with data.',
    sub: 'The first town, the first megawatt, the first Slovak heat offtake contract with a data centre.',
    cta: 'Write to us',
    siteLabel: 'The whole model, catalogue and legal documents are public on the site',
  },

  sources: {
    eyebrow: 'Sources',
    title: 'Where the numbers come from',
    items: [
      ['ÚRSO — heat prices 2025: average variable component 0.0934 €/kWh', 'https://www.urso.gov.sk/pokles-cien-tepla-v-roku-2025-napriek-zdrazeniu-prepravy-plynu/'],
      ['Ministry of Economy — 2025 household gas and heat prices capped (heat was heading up 40 %)', 'https://www.economy.gov.sk/top/vlada-sr-zabezpecila-ze-ceny-plynu-a-tepla-pre-slovenske-domacnosti-v-roku-2025-neporastu'],
      ['TASR / Slovak heat producers — district heating in 188 towns, ~761,000 households', 'https://www.teraz.sk/ekonomika/systemy-centralneho-zasobovania-teplo/604191-clanok.html'],
      ['Vykurovanie24 / SIEA — gas at 58 % of regulated heat production (2022)', 'https://vykurovanie24.sk/magazin/aktuality/najviac-tepla-sa-vlani-vyrobilo-z-plynu-biomasa-zaznamenala-pokles-oleje-a-bioplyn-rast/'],
      ['EU Covenant of Mayors — Stockholm: heat recovery from data centres', 'https://eu-mayors.ec.europa.eu/en/news/stockholm-sweden-heat-recovery-data-centres'],
      ['Eurelectric — Stockholm Exergi Data Parks: 30+ centres, 30,000 flats, SEK 2m/MW/year', 'https://www.eurelectric.org/stories/stockholm-exergi-data-parks-shows-the-potential-for-scaling-the-reuse-of-waste-heat-when-it-becomes-a-tradable-product/'],
      ['Sitra — district heating from data centre waste heat, Mäntsälä', 'https://arkisto.sitra.fi/en/cases/district-heating-from-data-centre-waste-heat-mantsala/'],
      ['EU Smart Cities Marketplace — Mäntsälä: 54 % of heat, price −11 %', 'https://smart-cities-marketplace.ec.europa.eu/insights/solutions/datacentre-supplies-local-heating-mantsala-finland'],
      ['Ramboll / Meta — Odense: surplus heat to district heating', 'https://www.ramboll.com/projects/energy/meta-surplus-heat-to-district-heating'],
      ['Fortum — Espoo Clean Heat with Microsoft: 40 %, €225m, −400,000 t CO₂', 'https://www.fortum.com/en/media/2023/06/fortum-invest-approximately-eur-225-million-waste-heat-projects-espoo-and-kirkkonummi-finland'],
      ['South Dublin County Council — Tallaght district heating network', 'https://www.sdcc.ie/en/news/tallaght-district-heating-network-and-energy-centre-officially-opened.html'],
      ['Telehouse / Mainova — Westville, Frankfurt', 'https://www.telehouse.net/news/telehouse-germany-combines-growth-performance-and-sustainability-at-newly-opened-data-centre-in-frankfurt/'],
      ['DCD — DigiPlex Oslo: heat for 5,000 flats', 'https://www.datacenterdynamics.com/en/news/digiplex-data-center-will-help-keep-oslo-warm/'],
      ['White & Case — Germany\'s EnEfG: reuse factor 10 / 15 / 20 %', 'https://www.whitecase.com/insight-alert/data-center-requirements-under-new-german-energy-efficiency-act'],
      ['Danfoss — EED 2023/1791 Article 26: data centres above 1 MW', 'https://www.danfoss.com/en/industries/buildings-commercial/shared/data-centers/data-center-policies-in-the-eu/'],
      ['EUDCA / Data Centre Review — 221 TWh, 12 % of EU heat demand', 'https://datacentrereview.com/2026/01/data-centres-dont-have-to-waste-heat-they-could-heat-our-towns/'],
      ['Bankwatch — Partizánske modernises its district heating', 'https://bankwatch.org/blog/how-a-pioneering-slovak-town-is-modernising-its-district-heating-system'],
    ] as [string, string][],
    model: 'HeatCloud figures: the public business model on this site (5 MW reference case).',
  },
};

export type DeckDict = typeof deckEn;
