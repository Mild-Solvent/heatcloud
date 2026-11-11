/**
 * Copy for /floor-plan/ (Pôdorys): a schematic layout of the 250 kW pilot pod
 * built as an annex to an existing municipal boiler house. No building has
 * been surveyed yet, so every dimension here is a planning assumption for a
 * first talk with a designer, not a drawing anyone can build from.
 *
 * Zone ids are shared with the SVG in components/FloorPlan.tsx.
 */
export type ZoneId = 'it' | 'cdu' | 'heat' | 'tank' | 'power' | 'control' | 'dry' | 'boiler';

type Zone = { id: ZoneId; name: string; size: string; body: string };

type FloorPlanCopy = {
  metaTitle: string; metaDescription: string;
  label: string; title: string; intro: string;
  stats: [string, string][]; statsNote: string;
  planLabel: string; planTitle: string; planIntro: string; planHint: string;
  legendHeat: string; legendReturn: string; legendPower: string; legendExisting: string;
  svg: {
    it: string; cdu: string; heat: string; tank: string; power: string; control: string; dry: string;
    boiler: string; existing: string; network: string; grid: string; entrance: string; scale: string; north: string;
    rack: string; spare: string; yard: string; hx: string; hp: string; pumps: string; ups: string; trafo: string; lv: string;
  };
  zones: Zone[];
  flowLabel: string; flowTitle: string;
  flow: [string, string][];
  siteLabel: string; siteTitle: string; siteIntro: string;
  site: [string, string][];
  openLabel: string; openTitle: string;
  open: string[];
  links: [string, string][];
};

export const floorPlan: Record<'sk' | 'en', FloorPlanCopy> = {
  sk: {
    metaTitle: 'Pôdorys pilotu',
    metaDescription: 'Schematický pôdorys 250 kW pilotného modulu pri mestskej kotolni: dátová sála, chladenie, výmenník, tepelné čerpadlo, zásobník a napojenie na CZT.',
    label: 'PÔDORYS · KONCEPT PILOTU',
    title: 'Kde bude stáť\n250 kW pilot.',
    intro: 'Pilot je prístavba k existujúcej mestskej kotolni. Servery odovzdajú teplo vode, tepelné čerpadlo ho zdvihne na teplotu siete a kotolňa ho pošle do mesta tými istými rúrami ako dnes.',
    stats: [['≈ 200 m²', 'zastavaná plocha prístavby vrátane dvora'], ['8', 'regálov v dátovej sále, 6 výpočtových po ≈ 40 kW'], ['45 °C', 'teplota vody z kvapalinového chladenia'], ['≈ 0,29 MW', 'tepla do siete pri plnom zaťažení']],
    statsNote: 'Koncept, nie projekt. Konkrétnu budovu sme ešte nezamerali; rozmery sú odhad pre prvú debatu s projektantom. Ako vzor slúži kotolňa v sieti, akú prevádzkujú Technické služby mesta Partizánske.',
    planLabel: 'PÔDORYS', planTitle: 'Prístavba\nv mierke.',
    planIntro: 'Kliknite na miestnosť alebo na položku v zozname. Oranžová je horúca voda, modrá vratná, sivá elektrina.',
    planHint: 'Vyberte miestnosť',
    legendHeat: 'Horúca voda (prívod)', legendReturn: 'Vratná voda', legendPower: 'Elektrina 22 kV / 0,4 kV', legendExisting: 'Existujúca kotolňa',
    svg: {
      it: 'DÁTOVÁ SÁLA', cdu: 'CDU', heat: 'STROJOVŇA TEPLA', tank: 'ZÁSOBNÍK', power: 'ELEKTRO', control: 'VELÍN · VSTUP', dry: 'SUCHÝ CHLADIČ',
      boiler: 'KOTOLŇA', existing: 'existujúca budova', network: 'do siete CZT', grid: 'SSD 22 kV', entrance: 'vstup', scale: '0   2   4 m', north: 'S',
      rack: 'regál', spare: 'sieť/disk', yard: 'dvor', hx: 'výmenník', hp: 'tepelné čerpadlo', pumps: 'čerpadlá', ups: 'UPS + batérie', trafo: 'trafo', lv: 'rozvádzač NN',
    },
    zones: [
      { id: 'it', name: 'Dátová sála', size: '10 × 6 m · 60 m²', body: 'Jeden rad ôsmich regálov s uzavretou uličkou. Šesť výpočtových regálov po zhruba 40 kW má priame kvapalinové chladenie čipov, dva regály nesú sieť a úložisko. Vzduch v sále odvádza len zvyšok tepla.' },
      { id: 'cdu', name: 'Chladenie (CDU)', size: '3 × 6 m · 18 m²', body: 'Dve distribučné jednotky chladiva v zapojení N+1. Oddeľujú čistý okruh serverov od technologickej vody a držia výstup okolo 45 °C. Výpadok jednej jednotky prevezme druhá.' },
      { id: 'heat', name: 'Strojovňa tepla', size: '5 × 6 m · 30 m²', body: 'Doskový výmenník, tepelné čerpadlo voda–voda a obehové čerpadlá. Čerpadlo zdvihne 45 °C na 70–75 °C, ktoré potrebuje mestská sieť. Pri tomto zdvihu počíta model s COP okolo 6.' },
      { id: 'tank', name: 'Zásobník tepla', size: '10 m³ · Ø 2,2 m', body: 'Akumulačná nádrž medzi pilotom a kotolňou. Vyrovnáva noc a deň, a keď mesto teplo práve nechce, dáva serverom niekoľko minút rezervy, kým sa nespustí suchý chladič.' },
      { id: 'power', name: 'Elektro miestnosť', size: '6,5 × 4 m · 26 m²', body: 'Transformátor 22/0,4 kV, rozvádzač nízkeho napätia a UPS s batériami. Prípojka od distribučnej spoločnosti (v Partizánskom SSD) je najdlhšia položka harmonogramu.' },
      { id: 'control', name: 'Velín a vstup', size: '3,5 × 4 m · 14 m²', body: 'Jediný vstup do pilotu cez zádverie s kontrolou prístupu, pracovisko obsluhy a monitoring. Dátová sála a strojovňa sú prístupné len odtiaľto.' },
      { id: 'dry', name: 'Suchý chladič', size: 'vonku · ≈ 4,5 × 2 m', body: 'Odvádza teplo do vzduchu, keď ho sieť neodoberie, napríklad v lete alebo pri odstávke kotolne. Bez neho by servery stáli vždy, keď mesto nepotrebuje teplo.' },
      { id: 'boiler', name: 'Existujúca kotolňa', size: 'mimo rozsahu pilotu', body: 'Budova mesta s kotlami a rozdeľovačom siete CZT. Pilot sa napojí na jej rozdeľovač ako ďalší zdroj tepla; kotly zostávajú ako záloha a na zimné špičky.' },
    ],
    flowLabel: 'AKO TEČIE TEPLO', flowTitle: 'Päť krokov\nod čipu k radiátoru.',
    flow: [
      ['Čip → chladivo', 'Kvapalinou chladené dosky odoberú teplo priamo z procesorov a odovzdajú ho okruhu v CDU.'],
      ['CDU → voda 45 °C', 'Distribučná jednotka prenesie teplo do technologickej vody a pošle ju do strojovne.'],
      ['Výmenník a tepelné čerpadlo', 'Teplo prejde výmenníkom a tepelné čerpadlo ho zdvihne na 70–75 °C.'],
      ['Zásobník', 'Horúca voda ide do zásobníka, ktorý vyrovnáva rozdiel medzi výrobou a odberom.'],
      ['Kotolňa → mesto', 'Z rozdeľovača kotolne ide teplo do siete CZT. Vratná voda sa vráti studenšia a kruh sa uzavrie.'],
    ],
    siteLabel: 'ČO POTREBUJEME OD MIESTA', siteTitle: 'Kritériá\npre budovu.',
    siteIntro: 'Pôdorys sa prispôsobí konkrétnemu miestu. Toto musí miesto splniť, aby mal pilot zmysel.',
    site: [
      ['Pozemok pri kotolni', 'Približne 300 m² vedľa kotolne alebo voľná hala v nej, aby potrubie k rozdeľovaču meralo desiatky metrov, nie stovky.'],
      ['Prípojka elektriny', 'Rezervovaný výkon okolo 0,4 MW (IT, tepelné čerpadlo, chladenie) a reálny termín pripojenia od distribučnej spoločnosti.'],
      ['Odber tepla celý rok', 'Sieť, ktorá teplo prijme aj v lete (teplá voda), inak bude suchý chladič bežať mesiace.'],
      ['Optika', 'Dve nezávislé optické trasy k pilotu. Bez nich sa výpočtový výkon nedá predať.'],
      ['Prevádzkovateľ siete', 'Dohoda s prevádzkovateľom tepla (v Partizánskom TSM) o napojení, meraní a cene tepla, plus cesta k licencii ÚRSO.'],
    ],
    openLabel: 'ČO JE EŠTE OTVORENÉ', openTitle: 'Toto pôdorys\nzatiaľ nevie.',
    open: [
      'Konkrétna budova ani pozemok nie sú vybrané a nezamerané.',
      'Statika strechy alebo dvora pre suchý chladič a nosnosť podlahy pre regály nie sú overené.',
      'Požiarne úseky, únikové cesty a hasenie dátovej sály navrhne až projektant.',
      'Výkon a typ tepelného čerpadla a výmenníka sú výsledok modelu, nie ponuka dodávateľa.',
    ],
    links: [['Tepelný model', '/heat-model/'], ['Prehľad repozitára', '/repo/']],
  },

  en: {
    metaTitle: 'Pilot floor plan',
    metaDescription: 'Schematic floor plan of the 250 kW pilot pod at a municipal boiler house: data hall, cooling, heat exchanger, heat pump, buffer tank and the district-heating connection.',
    label: 'FLOOR PLAN · PILOT CONCEPT',
    title: 'Where the 250 kW\npilot will stand.',
    intro: 'The pilot is an annex to an existing municipal boiler house. The servers hand their heat to water, a heat pump lifts it to network temperature, and the boiler house sends it into town through the same pipes it uses today.',
    stats: [['≈ 200 m²', 'annex footprint including the yard'], ['8', 'racks in the data hall, 6 compute racks at ≈ 40 kW'], ['45 °C', 'water temperature out of the liquid cooling'], ['≈ 0.29 MW', 'heat into the network at full load']],
    statsNote: 'A concept, not a design. No building has been surveyed yet; dimensions are estimates for a first talk with a designer. The model is a boiler house on a network like the one Technické služby mesta Partizánske runs.',
    planLabel: 'FLOOR PLAN', planTitle: 'The annex,\nto scale.',
    planIntro: 'Click a room or an item in the list. Orange is hot water, blue is the return, grey is electricity.',
    planHint: 'Pick a room',
    legendHeat: 'Hot water (supply)', legendReturn: 'Return water', legendPower: 'Power 22 kV / 0.4 kV', legendExisting: 'Existing boiler house',
    svg: {
      it: 'DATA HALL', cdu: 'CDU', heat: 'HEAT PLANT ROOM', tank: 'BUFFER', power: 'ELECTRICAL', control: 'CONTROL · ENTRY', dry: 'DRY COOLER',
      boiler: 'BOILER HOUSE', existing: 'existing building', network: 'to district heating', grid: 'SSD 22 kV', entrance: 'entry', scale: '0   2   4 m', north: 'N',
      rack: 'rack', spare: 'net/storage', yard: 'yard', hx: 'heat exchanger', hp: 'heat pump', pumps: 'pumps', ups: 'UPS + batteries', trafo: 'transformer', lv: 'LV board',
    },
    zones: [
      { id: 'it', name: 'Data hall', size: '10 × 6 m · 60 m²', body: 'One row of eight racks with a contained aisle. Six compute racks of about 40 kW each use direct-to-chip liquid cooling; two racks carry network and storage. Air in the hall only removes the remainder.' },
      { id: 'cdu', name: 'Cooling (CDU)', size: '3 × 6 m · 18 m²', body: 'Two coolant distribution units in N+1. They separate the clean server loop from process water and hold the outlet near 45 °C. If one fails, the other carries the load.' },
      { id: 'heat', name: 'Heat plant room', size: '5 × 6 m · 30 m²', body: 'Plate heat exchanger, water-to-water heat pump and circulation pumps. The heat pump lifts 45 °C to the 70–75 °C the town network needs; at that lift the model assumes a COP of about 6.' },
      { id: 'tank', name: 'Buffer tank', size: '10 m³ · Ø 2.2 m', body: 'Storage between the pilot and the boiler house. It evens out day and night, and when the town does not want heat it gives the servers a few minutes of headroom before the dry cooler starts.' },
      { id: 'power', name: 'Electrical room', size: '6.5 × 4 m · 26 m²', body: 'A 22/0.4 kV transformer, low-voltage switchboard and UPS with batteries. The connection from the distribution company (SSD in Partizánske) is the longest item on the schedule.' },
      { id: 'control', name: 'Control room and entry', size: '3.5 × 4 m · 14 m²', body: 'The only way in, through an access-controlled airlock, with an operator desk and monitoring. The data hall and plant room open only from here.' },
      { id: 'dry', name: 'Dry cooler', size: 'outdoor · ≈ 4.5 × 2 m', body: 'Rejects heat to air when the network will not take it, in summer or during boiler-house maintenance. Without it the servers would stop whenever the town needs no heat.' },
      { id: 'boiler', name: 'Existing boiler house', size: 'outside the pilot scope', body: 'The town’s building with its boilers and district-heating header. The pilot joins the header as one more heat source; the boilers stay as backup and for winter peaks.' },
    ],
    flowLabel: 'HOW THE HEAT FLOWS', flowTitle: 'Five steps\nfrom chip to radiator.',
    flow: [
      ['Chip → coolant', 'Liquid-cooled cold plates take heat straight off the processors and pass it to the loop in the CDU.'],
      ['CDU → 45 °C water', 'The distribution unit moves the heat into process water and sends it to the plant room.'],
      ['Exchanger and heat pump', 'Heat crosses the plate exchanger and the heat pump lifts it to 70–75 °C.'],
      ['Buffer tank', 'Hot water goes into the tank, which evens out the gap between production and demand.'],
      ['Boiler house → town', 'From the boiler-house header the heat goes into the network. Return water comes back cooler and the loop closes.'],
    ],
    siteLabel: 'WHAT WE NEED FROM A SITE', siteTitle: 'Criteria\nfor the building.',
    siteIntro: 'The plan adapts to the actual site. This is what a site has to offer for the pilot to make sense.',
    site: [
      ['Land at the boiler house', 'Around 300 m² beside the boiler house or a spare hall inside it, so the pipe run to the header is tens of metres, not hundreds.'],
      ['Grid connection', 'About 0.4 MW of reserved capacity (IT, heat pump, cooling) and a real connection date from the distribution company.'],
      ['Year-round heat demand', 'A network that takes heat in summer too (hot water), or the dry cooler runs for months.'],
      ['Fibre', 'Two independent fibre routes to the pilot. Without them the compute cannot be sold.'],
      ['Network operator', 'An agreement with the heat operator (TSM in Partizánske) on connection, metering and heat price, plus a route to an ÚRSO licence.'],
    ],
    openLabel: 'STILL OPEN', openTitle: 'What this plan\ndoes not know yet.',
    open: [
      'No specific building or plot has been chosen or surveyed.',
      'Roof or yard structure for the dry cooler and floor loading for the racks are unchecked.',
      'Fire compartments, escape routes and data-hall suppression are for the designer.',
      'Heat pump and exchanger size and type come from the model, not from a supplier quote.',
    ],
    links: [['Heat model', '/heat-model/'], ['Repository overview', '/repo/']],
  },
};
