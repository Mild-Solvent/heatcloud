/**
 * Copy for /heat-model/, the deep dive into the engineers' heat-reuse study
 * (github.com/Fenixcrowlite/datacenter-heat-reuse). The interactive lab itself
 * is built from tools/heat-lab/ into public/heat-lab/.
 */
export type LabView = 'model' | 'sim' | 'components' | 'build';

export const heatModel = {
  sk: {
    metaTitle: 'Tepelný model', metaDescription: 'Interaktívny model rekuperácie tepla z dátového centra do mestskej siete: ročný výpočet, simulátor s vypínaním komponentov, fyzika komponentov a bezpečnosť.',
    label: 'LABORATÓRIUM TEPELNÉHO MODELU',
    title: 'Sledujte teplo\nkomponent po komponente.',
    intro: 'Celú inžiniersku štúdiu sme preniesli do prehliadača. Každé číslo nižšie sa prepočíta naživo z pôvodných rovníc a dáva rovnaké výsledky ako ich Python a Simulink.',
    open: 'Otvoriť simulátor', source: 'Zdrojová štúdia na GitHube',
    stats: [['8 760', 'hodín v ročnom modeli siete'], ['60', 'pôvodných Simulink a Stateflow modelov'], ['3', 'modely prenesené do prehliadača, overené voči originálu'], ['18', 'porúch, ktoré treba overiť na hardvéri']],
    statsNote: 'Vstupy štúdie sú syntetické (10 MW dátové centrum, modelové mesto). Počasie pre Partizánske a Spišskú Novú Ves je reálny typický rok PVGIS.',
    insideLabel: 'ČO JE VNÚTRI', insideTitle: 'Štyri pohľady\nna ten istý systém.',
    insideIntro: 'Vyberte pohľad. Laboratórium sa otvorí nižšie a všetky prepínače fungujú priamo na stránke.',
    views: [
      ['model', 'Ročný model', 'Hodinový výpočet celého roka: koľko tepla dátové centrum dodá do siete, aký je COP a návratnosť pri rôznych cenách a lokalitách.'],
      ['sim', 'Simulátor a vypínače', 'Simulink/Stateflow model bazénového zariadenia. Vypnite IT, výmenník, zásobník, bazén alebo sieť a sledujte, ako riadenie prepne režim.'],
      ['components', 'Komponenty', 'Každá časť zvlášť: zdroj tepla, výmenník, tepelné čerpadlo, ekvitermná sieť, zásobník, straty bazéna a režimy riadenia.'],
      ['build', 'Výstavba a bezpečnosť', 'Navrhnuté zariadenia, počet modulov N+1, simulátor poruchy chladenia, dimenzovanie 250 kW pilotu a zoznam porúch.'],
    ] as [LabView, string, string][],
    labLabel: 'LABORATÓRIUM', labLoading: 'Načítava sa model…',
    labNoScript: 'Laboratórium potrebuje JavaScript.', labStandalone: 'Otvoriť na celú obrazovku',
    findLabel: 'ČO Z TOHO VYPLÝVA', findTitle: 'Päť zistení\npre pilot.',
    findings: [
      ['Kvapalinové chladenie je podmienka', 'Pri 45 °C má tepelné čerpadlo COP okolo 6, pri vzduchu 25 °C len okolo 3. Polovica elektriny na každú MWh tepla.'],
      ['Reálna zima znižuje pokrytie', 'S počasím Partizánskeho pokryje dátové centrum 78 % potreby siete, v Spišskej Novej Vsi 71 %. Syntetický rok štúdie uvádzal 82 %.'],
      ['Leto je limit', 'V lete mesto potrebuje málo tepla. Zásobník pomôže len na hodiny, nie na sezóny.'],
      ['Chladenie IT musí stáť samo', 'Servery musia odviesť celých 10 MW aj bez odberateľa tepla. Štúdia navrhuje 7 chladičov po 2 MW; pri 6 a letnom znížení výkonu sa servery prehrejú.'],
      ['250 kW pilot je malý a čistý', 'Pilot dodá okolo 2,3 GWh tepla ročne do väčšej siete, takže sa využije všetko. Ekonomiku nesie predaj výpočtového výkonu.'],
    ],
    limitsLabel: 'HRANICE MODELU', limitsTitle: 'Čo model nevie.',
    limits: [
      'Záťaž dátového centra a dopyt mesta sú syntetické. Pred rozhodnutím potrebujeme merania z konkrétnej lokality.',
      'COP tepelných čerpadiel je Carnotov odhad. Výrobcovia ešte nedodali výkonové mapy pre 35/30 → 50/70 °C.',
      'Ceny zariadení sú rozpočtové odhady, nie ponuky. Údržba, poplatky za sieť a licencia ÚRSO nie sú v modeli.',
      'Žiadna z 18 porúch nie je fyzicky overená. Ide o numerický model, nie certifikovaný návrh.',
    ],
  },
  en: {
    metaTitle: 'Heat model', metaDescription: 'Interactive model of recovering data-centre heat into a district network: annual run, simulator with component switches, component physics, construction and safety.',
    label: 'HEAT MODEL LAB',
    title: 'Follow the heat,\ncomponent by component.',
    intro: 'We brought the full engineering study into the browser. Every number below is recalculated live from the original equations and matches their Python and Simulink results.',
    open: 'Open the simulator', source: 'Source study on GitHub',
    stats: [['8,760', 'hours in the annual network model'], ['60', 'original Simulink and Stateflow models'], ['3', 'models ported to the browser, checked against the originals'], ['18', 'failure modes still to prove on hardware']],
    statsNote: 'Study inputs are synthetic (10 MW data centre, model town). Weather for Partizánske and Spišská Nová Ves is a real PVGIS typical year.',
    insideLabel: 'WHAT IS INSIDE', insideTitle: 'Four views of\nthe same system.',
    insideIntro: 'Pick a view. The lab opens below and every switch works right on the page.',
    views: [
      ['model', 'Annual model', 'An hourly run of the whole year: how much heat the data centre delivers to the network, the COP, and payback across prices and sites.'],
      ['sim', 'Simulator and switches', 'The Simulink/Stateflow pool plant model. Switch off IT, the exchanger, storage, pool or network and watch the controller change mode.'],
      ['components', 'Components', 'Each part on its own: heat source, exchanger, heat pump, weather-compensated network, storage, pool losses and control modes.'],
      ['build', 'Construction and safety', 'The specified equipment, N+1 module count, a cooling-failure simulator, sizing for the 250 kW pilot and the failure-mode list.'],
    ] as [LabView, string, string][],
    labLabel: 'THE LAB', labLoading: 'Loading the model…',
    labNoScript: 'The lab needs JavaScript.', labStandalone: 'Open full screen',
    findLabel: 'WHAT IT MEANS', findTitle: 'Five findings\nfor the pilot.',
    findings: [
      ['Liquid cooling is the condition', 'At 45 °C the heat pump runs at a COP around 6; with 25 °C air cooling only around 3. Half the electricity for every MWh of heat.'],
      ['A real winter lowers coverage', 'With Partizánske weather the data centre covers 78 % of the network’s demand, in Spišská Nová Ves 71 %. The study’s synthetic year showed 82 %.'],
      ['Summer is the limit', 'The town needs little heat in summer. Storage helps for hours, not seasons.'],
      ['IT cooling must stand alone', 'The servers must reject the full 10 MW with no heat customer. The study specifies 7 coolers of 2 MW; with 6 and summer derating the servers overheat.'],
      ['A 250 kW pilot is small and clean', 'A pilot delivers about 2.3 GWh of heat a year into a larger network, so all of it is used. Compute sales carry the economics.'],
    ],
    limitsLabel: 'MODEL LIMITS', limitsTitle: 'What the model cannot tell us.',
    limits: [
      'Data-centre load and town demand are synthetic. A decision needs measurements from a specific site.',
      'Heat-pump COP is a Carnot estimate. Manufacturers have not yet supplied performance maps for 35/30 → 50/70 °C.',
      'Equipment prices are budget estimates, not quotations. Maintenance, grid fees and the ÚRSO licence are not modelled.',
      'None of the 18 failure modes is physically validated. This is a numerical model, not a certified design.',
    ],
  },
};
