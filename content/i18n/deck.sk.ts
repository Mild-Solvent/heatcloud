import type { DeckDict } from './deck.en';

// Investorská prezentácia, slovensky. Tvar zrkadlí deck.en.ts.

export const deckSk: DeckDict = {
  metaTitle: 'Pre investorov',
  metaDescription:
    'Investorská prezentácia: slovenské dátové centrá, ktoré predávajú výpočtový výkon slovenským organizáciám a teplo slovenským mestám — model, príklady zo sveta, čísla, plán.',
  navLabel: 'Pre investorov',
  navNote: 'Prezentácia: model, príklady zo sveta, čísla, plán',

  ui: {
    counter: '{i} / {n}',
    next: 'Ďalšia snímka',
    prev: 'Predchádzajúca snímka',
    exit: 'Späť na web',
    fullscreen: 'Celá obrazovka',
    exitFullscreen: 'Ukončiť celú obrazovku',
    hint: '→ ďalej · ← späť · F celá obrazovka',
    confidential: 'Dôverný návrh · indikatívne čísla · spoločnosť v zakladaní',
    deckName: 'Investorská prezentácia',
    date: 'September 2026',
    sources: 'Zdroje na poslednej snímke',
    imageMissing: 'Miesto pre obrázok',
  },

  cover: {
    eyebrow: 'Investorská prezentácia · september 2026',
    title: 'Cloud, ktorý *vykuruje* slovenské mestá.',
    sub: 'Dátové centrá, ktoré predávajú výpočtový výkon slovenským organizáciám a teplo slovenským mestám. Jedna faktúra za elektrinu, dva riadky príjmov.',
    tag: 'Dôverné · návrh',
  },

  problem: {
    eyebrow: 'Východisko',
    title: 'Slovensko kúri plynom a počíta v zahraničí.',
    lede: 'Dve drahé závislosti, ktoré vie vyriešiť jedna stavba.',
    stats: [
      ['58 %', 'tepla v slovenských systémoch CZT sa v roku 2022 vyrobilo zo zemného plynu'],
      ['93,4 €', 'za MWh — priemerná regulovaná cena tepla na rok 2025; bez štátneho stropu hrozil nárast o 40 %'],
      ['760 000', 'domácností v 188 mestách a obciach odoberá teplo z CZT — 2,4 milióna ľudí'],
      ['0', 'hyperscale cloudových regiónov na Slovensku; verejný sektor aj firmy nakupujú výpočtový výkon v zahraničí'],
    ],
    foot: 'ÚRSO, Slovenský zväz výrobcov tepla, MH SR. Podrobne na poslednej snímke.',
  },

  idea: {
    eyebrow: 'Myšlienka',
    title: 'Elektrinu kúpiť raz. Výsledok predať dvakrát.',
    points: [
      ['Príjem 1 · výpočtový výkon', 'Servery, úložisko, Kubernetes, GPU a kancelárske služby predávané slovenským firmám a verejnej správe za európske trhové ceny. Tento riadok musí uniesť biznis sám.'],
      ['Príjem 2 · teplo', '95 % elektriny opúšťa sálu ako teplo. Zachytíme ho, tepelnými čerpadlami zdvihneme na teplotu siete CZT a predáme mestskej teplárni o 20 % lacnejšie než teplo z plynu — zmluvne, na 10 až 15 rokov.'],
      ['Jedna stavba, dve infraštruktúry', 'Dátová sála stojí tam, kde je tepláreň a jej odberatelia: v okresnom meste, nie na poli za Bratislavou.'],
    ],
  },

  physics: {
    eyebrow: 'Ako to funguje',
    title: 'Fyzika je na našej strane.',
    steps: [
      ['Elektrina dnu', 'Megawatt IT záťaže spotrebuje ročne približne 8 760 MWh. Takmer všetko z toho odchádza zo serverov ako teplo.'],
      ['Zachytenie pri 40–50 °C', 'Kvapalinové chladenie odvádza teplo z rackov rovno do vody, nie do vzduchu. Bez komínov, bez strát.'],
      ['Zdvih tepelným čerpadlom', 'S COP 4–5 zdvihneme vodu na 70–85 °C, na ktorých bežia slovenské siete CZT. Na 1 MWh tepla treba len 0,2–0,25 MWh elektriny.'],
      ['Do siete', 'Meranie na odovzdávacej stanici teplárne. Teplo je základné zaťaženie: beží nonstop a nezávisí od počasia ani od ceny plynu.'],
    ],
    stats: [
      ['~95 %', 'elektrického príkonu je využiteľných ako teplo'],
      ['COP 4–5', 'tepelného čerpadla pri zdvihu 45 → 75 °C'],
      ['~1 000', 'bytov vykúri 1 MW IT záťaže pri plnom výkone'],
      ['0 kg', 'spáleného paliva na MWh dodaného tepla'],
    ],
  },

  world: {
    eyebrow: 'Overené vo svete',
    title: 'Nie je to nápad. Je to bežná prax severnej Európy.',
    lede: 'Sedem miest, ktoré dnes kúria dátovými centrami — a čísla, ktoré si to vyžiadali.',
    cases: [
      { city: 'Stockholm', country: 'Švédsko', who: 'Stockholm Data Parks · Stockholm Exergi', fact: '30+ dátových centier dodáva teplo pre 30 000 bytov; cieľ je 10 % tepla mesta do roku 2035. Prevádzkovateľ zarába ~2 mil. SEK na MW ročne.', key: '30 000 bytov', lon: 18.07, lat: 59.33 },
      { city: 'Mäntsälä', country: 'Fínsko', who: 'Yandex · Nivos', fact: '54 % tepla 20-tisícového mesta z jedného dátového centra. Cena tepla −11 %, emisie −40 %.', key: '54 % tepla mesta', lon: 25.32, lat: 60.63 },
      { city: 'Odense', country: 'Dánsko', who: 'Meta · Fjernvarme Fyn', fact: '165 000 MWh ročne — teplo pre 11 000 domácností z jedného hyperscale centra cez najväčšiu tepelnočerpadlovú stanicu v Dánsku.', key: '11 000 domácností', lon: 10.39, lat: 55.4 },
      { city: 'Espoo', country: 'Fínsko', who: 'Microsoft · Fortum', fact: '40 % tepla pre Espoo, Kauniainen a Kirkkonummi; −400 000 t CO₂ ročne. Najväčšia schéma na svete, tepláreň investuje 225 mil. €.', key: '40 % tepla 3 miest', lon: 24.66, lat: 60.21 },
      { city: 'Dublin · Tallaght', country: 'Írsko', who: 'AWS · Heat Works', fact: 'Prvá írska sieť CZT: radnica, univerzita, knižnica a byty. Teplo z dátového centra zadarmo, mestská nezisková teplárenská firma.', key: 'prvá írska sieť', lon: -6.37, lat: 53.29 },
      { city: 'Frankfurt', country: 'Nemecko', who: 'Telehouse · Mainova', fact: '1 300 bytov štvrte Westville dostáva 60 % tepla z dátového centra cez 500 m potrubie; −400 t CO₂ ročne.', key: '1 300 bytov', lon: 8.68, lat: 50.11 },
      { city: 'Oslo', country: 'Nórsko', who: 'DigiPlex · Fortum Oslo Varme', fact: 'Teplo pre 5 000 bytov z jedného dátového centra, od roku 2019.', key: '5 000 bytov', lon: 10.75, lat: 59.91 },
    ],
    here: 'Bratislava · Košice',
    hereNote: 'HeatCloud, v návrhu',
    foot: 'Všetky príklady sú v prevádzke alebo vo výstavbe; zdroje na poslednej snímke.',
  },

  town: {
    eyebrow: 'Precedens pre okresné mesto',
    title: 'Mäntsälä: 20 000 ľudí, jedno dátové centrum, lacnejšie teplo.',
    body: 'Fínske mesto veľkosti Levíc alebo Piešťan pripojilo v roku 2016 dátové centrum Yandexu na mestskú tepláreň. Teplo z chladiaceho okruhu odoberá mestská energetika Nivos — a účty obyvateľov klesli.',
    stats: [
      ['54 %', 'tepla mesta pokrýva dátové centrum (2018: 20 GWh)'],
      ['−11 %', 'cena tepla pre obyvateľov po pripojení'],
      ['−40 %', 'emisie CO₂ z výroby tepla v meste'],
      ['2016', 'v prevádzke — technológia má za sebou desať rokov'],
    ],
    quote: 'Presne toto je model pre Slovensko: 188 miest a obcí so sieťou CZT, väčšina na plyne, mnohé s teplárňou vo vlastníctve mesta.',
  },

  tailwind: {
    eyebrow: 'Regulačný vietor do chrbta',
    title: 'Európa to už nepovoľuje. Európa to vyžaduje.',
    items: [
      ['Smernica o energetickej efektívnosti (EÚ) 2023/1791, čl. 26', 'Dátové centrá nad 1 MW musia posúdiť a využiť odpadové teplo, ak to nie je preukázateľne technicky alebo ekonomicky nemožné. Platí aj na Slovensku.'],
      ['Nemecký zákon o energetickej efektívnosti (EnEfG)', 'Nové dátové centrá musia od júla 2026 využiť 10 % tepla, od roku 2027 15 % a od roku 2028 20 %. Trh sa už prispôsobuje — technológie, ceny, know-how.'],
      ['Dekarbonizácia teplárenstva', '„Účinné CZT“ bude vyžadovať rastúci podiel obnoviteľného a odpadového tepla. Plynové teplárne potrebujú nový zdroj do konca desaťročia.'],
    ],
    big: [
      ['221 TWh', 'odpadového tepla ročne môžu dodať európske dátové centrá — 12 % dopytu EÚ po teple (EUDCA)'],
      ['1 MW', 'hranica, od ktorej EÚ vyžaduje využitie odpadového tepla z dátových centier'],
      ['20 %', 'povinné využitie tepla pre nové dátové centrá v Nemecku od roku 2028'],
    ],
  },

  municipality: {
    eyebrow: 'Čo z toho má mesto',
    title: 'Modul 3 MW v okresnom meste.',
    lede: 'Konkrétne, čo dostane mesto s 20 až 30 tisíc obyvateľmi a mestskou teplárňou, keď pri nej postavíme jednu dátovú sálu.',
    leftTitle: 'Mesto a tepláreň',
    left: [
      ['1 000 – 3 000 bytov', 'vykúrených základným zaťažením, ktoré nezávisí od ceny plynu — rozpätie zodpovedá 45 až 100 % ročnému odberu siete'],
      ['−20 % oproti plynu', 'zmluvná cena tepla pre tepláreň, indexovaná na 10 až 15 rokov — stabilný rozpočet, žiadne prekvapenia v januári'],
      ['−1 700 t CO₂ ročne', 'vykázateľné zníženie emisií mesta bez spaľovania čohokoľvek (pri 45 % odbere)'],
      ['10 – 15 pracovných miest', 'kvalifikované, v regióne, plus miestne dane a poplatky'],
    ],
    rightTitle: 'Obyvatelia a organizácie',
    right: [
      ['Lacnejšie a stabilnejšie teplo', 'úspora teplárne sa premieta do regulovanej ceny pre domácnosti — v Mäntsälä o 11 %'],
      ['Čistejší vzduch', 'menej spáleného plynu a uhlia v strede mesta'],
      ['Digitálne služby doma', 'škola, úrad, nemocnica a miestne firmy majú cloud v slovenskej jurisdikcii — 10 km od radnice, nie v inej krajine'],
      ['Odolnosť', 'dva nezávislé zdroje tepla; sála beží aj cez zimnú špičku, keď je teplo najdrahšie'],
    ],
    foot: 'Odhady z nášho modelu pre 3 MW IT záťaže pri 75 % vyťažení; Mäntsälä podľa Sitra a Európskej komisie.',
  },

  business: {
    eyebrow: 'Biznis model',
    title: 'Dva riadky príjmov na jednej faktúre za elektrinu.',
    lede: 'Referenčná lokalita 5 MW pri 75 % vyťažení, ceny z nášho verejného modelu.',
    panelLabel: 'Referenčná lokalita 5 MW · ročne',
    bars: [
      ['Príjem z výpočtového výkonu', '17,1 mil. €', 94],
      ['Príjem z tepla', '1,05 mil. €', 6],
    ],
    kpis: [
      ['18,1 mil. €', 'ročné príjmy'],
      ['9,6 mil. €', 'EBITDA · marža 53 %'],
      ['39,5 mil. €', 'capex: 34,0 IT + 5,5 tepelná časť'],
      ['4,1 roka', 'jednoduchá návratnosť'],
    ],
    note: 'Teplo je len 6 % príjmov — ale je to jediný riadok, ktorý je zmluvný, indexovaný a s odberateľom vo vlastníctve mesta. Práve preto sa tepelná časť dá financovať oddelene od serverov. Výpočtový výkon musí uniesť biznis sám — a pri cloudových cenách unesie.',
    link: 'Interaktívny model je verejný na webe',
  },

  product: {
    eyebrow: 'Produkt',
    title: 'Cloud, ktorý slovenská organizácia naozaj kúpi.',
    lede: '14 produktov na vlastnom hardvéri, v slovenskej jurisdikcii, s podporou po slovensky a cenami bez prekvapení.',
    groups: [
      ['Výpočtový výkon', ['Cloud servery od 4,90 €/mes.', 'Public Cloud (OpenStack)', 'Spravovaný Kubernetes', 'GPU Cloud — L40S, H200']],
      ['Úložisko a dáta', ['Objektové úložisko 5,90 €/TB, bez poplatkov za egress', 'Spravované databázy', 'Zálohovanie']],
      ['Web a kancelária', ['Webhosting, domény, streaming', 'hSuite, hMail, hDrive — pošta a dokumenty pre úrady a firmy']],
      ['Teplo', ['Odber tepla — zmluva pre teplárne, indexovaná na plyn mínus 20 %']],
    ],
    foot: 'Verejný sektor, zdravotníctvo a regulované odvetvia potrebujú cloud v jurisdikcii EÚ bez materskej firmy mimo nej. Na Slovensku dnes taký nie je.',
  },

  funding: {
    eyebrow: 'Financovanie',
    title: 'Servery zaplatí trh. Tepelnú časť zaplatí dekarbonizácia.',
    leftTitle: 'IT polovica — 6,8 mil. € na MW',
    left: [
      'Financovaná z príjmov z výpočtového výkonu: vlastný kapitál, lízing hardvéru, projektový dlh',
      'Návratnosť približne 4 roky pri cloudových cenách',
      'Modulárna — rastie po 1 MW podľa toho, ako sa kapacita predáva',
    ],
    rightTitle: 'Tepelná polovica — 1,1 mil. € na MW',
    right: [
      'Tepelné čerpadlá, potrubie, odovzdávacia stanica — bežná teplárenská infraštruktúra',
      'Zmluva o odbere tepla s teplárňou vo vlastníctve mesta = bankovateľný, dlhodobý príjem',
      'Presne typ projektu, ktorý verejné schémy na modernizáciu CZT, energetickú efektívnosť a znižovanie emisií spolufinancujú — s mestom ako partnerom',
    ],
    checkTitle: 'Prečo spĺňa kritériá podpory',
    checks: [
      'Merateľné zníženie emisií CO₂ a spotreby plynu',
      'Odpadové teplo do systému CZT — smer, ktorý EÚ výslovne vyžaduje',
      'Nižšia cena tepla pre domácnosti, menej energetickej chudoby',
      'Investícia a pracovné miesta v regiónoch mimo Bratislavy',
      'Digitálna aj zelená transformácia v jednom projekte',
      'Mesto ako partner a projekt pripravený na realizáciu',
    ],
    foot: 'Partizánske už dnes pripravuje modernizáciu svojej mestskej sústavy CZT za 40 mil. € s pomocou Európskej investičnej banky a počíta s odpadovým teplom. Dopyt miest existuje.',
  },

  plan: {
    eyebrow: 'Plán',
    title: 'Od jedného kontajnera po desať miest.',
    phases: [
      ['2026 · Q4', 'Pilot 250 kW', 'Kontajnerová sála pri mestskej teplárni partnerského mesta. Overí odovzdávanie tepla, meranie a zmluvu — a dá prvé slovenské číslo.'],
      ['2027', 'sk-bts-1 · 5 MW', 'Prvý plný región v Bratislave: kvapalinové chladenie, dva nezávislé prívody, teplo do bratislavskej siete. Katalóg v predaji od prvého dňa.'],
      ['2028', 'sk-kos-1 · 3 MW', 'Košice pre redundanciu v rámci krajiny a východoslovenskú latenciu; napojenie na sieť TEKO.'],
      ['2029 →', 'HeatCloud Obec', 'Štandardný modul 2–3 MW pre okresné mestá s mestskou teplárňou: rovnaký projekt, rovnaká zmluva, rovnaké financovanie — desaťkrát.'],
    ],
  },

  risks: {
    eyebrow: 'Riziká a poistky',
    title: 'Čo by z toho spravilo zlý nápad.',
    items: [
      ['Zmluva o odbere tepla sa nepodpíše', 'Žiadna lokalita sa nestavia bez podpísanej zmluvy s teplárňou. Model musí vyjsť aj na výpočtovom výkone samotnom — a vychádza.'],
      ['Dopyt po výpočtovom výkone sa neobjaví', 'Rezervácie verejného sektora pred stavbou; katalóg od hostingu po GPU; kapacita rastie po 1 MW podľa predaja.'],
      ['Cena elektriny', 'Dlhodobé PPA a zaistenie; teplo je indexované na plyn, nie na elektrinu, takže obe strany zmluvy nesú iné riziko.'],
      ['Regulácia cien tepla', 'Cena pre tepláreň je pod regulovanou cenou tepla z plynu; regulátor má dôvod to podporiť, nie brzdiť.'],
      ['Realizácia', 'Overené komponenty (tepelné čerpadlá, kvapalinové chladenie), skúsení dodávatelia; pilot pred plným regiónom.'],
    ],
  },

  ask: {
    eyebrow: 'Čo hľadáme',
    title: 'Kolo 1: 2,5 mil. € na prvý slovenský megawatt.',
    stats: [
      ['2,5 mil. €', 'kolo 1 · 2026 – 2027'],
      ['250 kW', 'pilotná sála pri mestskej teplárni'],
      ['1', 'podpísaná zmluva o odbere tepla'],
      ['5 MW', 'projektovo pripravená lokalita sk-bts-1'],
    ],
    useTitle: 'Použitie prostriedkov',
    use: [
      ['Pilotná sála a tepelné pripojenie', 45],
      ['Projektová príprava a povolenia sk-bts-1', 25],
      ['Tím: prevádzka, predaj, teplárenstvo', 20],
      ['Rezerva', 10],
    ],
    next: 'Kolo 2 (2027): projektové financovanie sk-bts-1 — 34 mil. € IT časť (kapitál, lízing, dlh) a 5,5 mil. € tepelná časť spolufinancovaná s mestom.',
    foot: 'Indikatívne. Spoločnosť je v zakladaní; podmienky kola sa dohodnú s vedúcim investorom.',
  },

  close: {
    title: 'Poďme vykurovať mestá dátami.',
    sub: 'Prvé mesto, prvý megawatt, prvá slovenská zmluva o odbere tepla z dátového centra.',
    cta: 'Napíšte nám',
    siteLabel: 'Celý model, katalóg aj právne dokumenty sú verejné na webe',
  },

  sources: {
    eyebrow: 'Zdroje',
    title: 'Odkiaľ sú čísla',
    items: [
      ['ÚRSO — ceny tepla 2025: priemerná variabilná zložka 0,0934 €/kWh', 'https://www.urso.gov.sk/pokles-cien-tepla-v-roku-2025-napriek-zdrazeniu-prepravy-plynu/'],
      ['MH SR — ceny plynu a tepla pre domácnosti 2025 zastropované (hrozil nárast tepla o 40 %)', 'https://www.economy.gov.sk/top/vlada-sr-zabezpecila-ze-ceny-plynu-a-tepla-pre-slovenske-domacnosti-v-roku-2025-neporastu'],
      ['TASR / SZVT — CZT v 188 mestách a obciach, ~761 000 domácností', 'https://www.teraz.sk/ekonomika/systemy-centralneho-zasobovania-teplo/604191-clanok.html'],
      ['Vykurovanie24 / SIEA — plyn 58 % regulovanej výroby tepla (2022)', 'https://vykurovanie24.sk/magazin/aktuality/najviac-tepla-sa-vlani-vyrobilo-z-plynu-biomasa-zaznamenala-pokles-oleje-a-bioplyn-rast/'],
      ['EU Covenant of Mayors — Stockholm: rekuperácia tepla z dátových centier', 'https://eu-mayors.ec.europa.eu/en/news/stockholm-sweden-heat-recovery-data-centres'],
      ['Eurelectric — Stockholm Exergi Data Parks: 30+ centier, 30 000 bytov, 2 mil. SEK/MW/rok', 'https://www.eurelectric.org/stories/stockholm-exergi-data-parks-shows-the-potential-for-scaling-the-reuse-of-waste-heat-when-it-becomes-a-tradable-product/'],
      ['Sitra — teplo z dátového centra pre mesto Mäntsälä', 'https://arkisto.sitra.fi/en/cases/district-heating-from-data-centre-waste-heat-mantsala/'],
      ['EU Smart Cities Marketplace — Mäntsälä: 54 % tepla, cena −11 %', 'https://smart-cities-marketplace.ec.europa.eu/insights/solutions/datacentre-supplies-local-heating-mantsala-finland'],
      ['Ramboll / Meta — Odense: odpadové teplo do CZT', 'https://www.ramboll.com/projects/energy/meta-surplus-heat-to-district-heating'],
      ['Fortum — Espoo Clean Heat s Microsoftom: 40 %, 225 mil. €, −400 000 t CO₂', 'https://www.fortum.com/en/media/2023/06/fortum-invest-approximately-eur-225-million-waste-heat-projects-espoo-and-kirkkonummi-finland'],
      ['South Dublin County Council — sieť CZT Tallaght', 'https://www.sdcc.ie/en/news/tallaght-district-heating-network-and-energy-centre-officially-opened.html'],
      ['Telehouse / Mainova — Westville, Frankfurt', 'https://www.telehouse.net/news/telehouse-germany-combines-growth-performance-and-sustainability-at-newly-opened-data-centre-in-frankfurt/'],
      ['DCD — DigiPlex Oslo: teplo pre 5 000 bytov', 'https://www.datacenterdynamics.com/en/news/digiplex-data-center-will-help-keep-oslo-warm/'],
      ['White & Case — nemecký EnEfG: faktor využitia tepla 10 / 15 / 20 %', 'https://www.whitecase.com/insight-alert/data-center-requirements-under-new-german-energy-efficiency-act'],
      ['Danfoss — smernica 2023/1791, čl. 26: dátové centrá nad 1 MW', 'https://www.danfoss.com/en/industries/buildings-commercial/shared/data-centers/data-center-policies-in-the-eu/'],
      ['EUDCA / Data Centre Review — 221 TWh, 12 % dopytu EÚ po teple', 'https://datacentrereview.com/2026/01/data-centres-dont-have-to-waste-heat-they-could-heat-our-towns/'],
      ['Bankwatch — Partizánske modernizuje svoju sústavu CZT', 'https://bankwatch.org/blog/how-a-pioneering-slovak-town-is-modernising-its-district-heating-system'],
    ],
    model: 'Čísla HeatCloud: verejný biznis model na tomto webe (referenčný prípad 5 MW).',
  },
};
