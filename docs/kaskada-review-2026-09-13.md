# Overenie Kaskády — 13. september 2026

Záver: použiteľný koncept na diskusiu, ale čísla a právne závery nemožno prevziať ako overený investičný podklad. Kontrolované boli [hlavná stránka](https://pupno.github.io/kaskada/), [metodika](https://pupno.github.io/kaskada/metodika/) a [kód modelu](https://pupno.github.io/kaskada/assets/js/model.js). Nejde o audit všetkých podstránok ani odborné stanovisko ku konkrétnemu projektu.

Stránka sama pripisuje časť údajov HeatCloud. Preto nejde o nezávislý benchmark pre naše predpoklady. Hodnotenie sa týka tvrdení, nie úmyslov autora.

## Preukázateľné chyby a významné obmedzenia

1. **Cena tepla:** elektrická zložka nákladu na MWh výstupného tepla je cena elektriny / COP. Pri 90 €/MWh a COP 3,4 vychádza **26,47 €/MWh**, pred distribučnými stratami, pomocnými pohonmi, servisom a kapitálom. Delenie COP − 1 vyjadruje elektrinu voči zachytenému vstupnému teplu, nie výstupnému. Samotná energetická identita v metodike je správna, jej nákladová interpretácia nie. [Definícia COP, US Department of Energy](https://www.energy.gov/cmei/femp/incorporate-minimum-efficiency-requirements-heating-and-cooling-products-federal).

2. **Povolenie na pilot:** umiestnenie pri zákazníkovi nie je automatická výnimka z podnikania v tepelnej energetike. Vlastné využitie a predaj inej právnickej osobe treba odlíšiť. Rovnako nemožno zamieňať povolenie ÚRSO s osvedčením na výstavbu. **Hranica nad 10 MW rozdeľuje právomoc ministerstva a obce**, nie všetky povoľovacie povinnosti. § 12 ods. 2 obsahuje osobitné výnimky, napríklad pre definovaný decentralizovaný zdroj využívajúci výlučne OZE alebo odpadové teplo. Ich použitie závisí od konkrétneho usporiadania. [Zákon 657/2004, najmä § 5 a § 12, znenie od 1. 7. 2026](https://static.slov-lex.sk/static/SK/ZZ/2004/657/20260701.html).

3. **Daňový predpoklad:** základné nastavenie modelu používa 21 %. Pri zdaniteľných výnosoch nad 5 mil. € je aktuálna sadzba **24 %**; model s deklarovanou veľkosťou tržieb musí tento rozdiel vyhodnotiť. Budúce sadzby počas celého horizontu nie sú zaručené. [Finančná správa](https://www.financnasprava.sk/sk/aktualne-dan-clo/faq/dan-z-prijmov/dan-z-prijmov-po).

4. **IRR a peňažné toky:** v skontrolovanej funkcii `run` je počas prevádzky investičný výdavok nulový, projektový cash flow sa počíta ako EBITDA mínus modelovaná daň a nie je samostatný pohyb pracovného kapitálu. Obnova vlastneného IT a infraštruktúry potrebuje harmonogram a rozpočet; údržba nemusí pokryť náhradu zariadení. Odpisy jednej súhrnnej bázy počas 20 rokov a neobmedzené prenášanie strát nie sú overený slovenský daňový model. Preto zobrazené IRR, DSCR ani návratnosť nepreberáme. Pri kolokácii treba zvlášť určiť, ktoré IT vlastní zákazník.

5. **Väzba tepla na IT:** v kóde sa teplo mení podľa obsadenosti, ale nie podľa posuvníka skutočného využitia predanej kapacity. Zníženie tohto využitia zníži výdavok na elektrinu IT bez zodpovedajúceho zníženia tepla. Citlivostné scenáre teda potrebujú kontrolu energetickej bilancie a limit odberu.

6. **Granty na IT:** plošné vylúčenie všetkých európskych nástrojov je nepravdivé. EuroHPC zahŕňa podporu obstarania výpočtovej infraštruktúry. To však **nepreukazuje oprávnenosť bežného komerčného HeatCloud projektu**. Konkrétny program, žiadateľ a náklady sa musia preveriť. [Rada EÚ — AI a superpočítače](https://www.consilium.europa.eu/en/policies/supercomputers/).

7. **ELENA a TARGET:** nemožno ich spojiť do jedného peňažného grantu. ELENA môže kryť do 90 % oprávnenej prípravy vybraného investičného programu. TARGET poskytuje bezplatnú odbornú pomoc pre oprávnené projekty a subjekty v regiónoch Coal+. Z týchto pravidiel nevyplýva schválenie podpory HeatCloud ani Kaskády. [ELENA](https://www.eib.org/en/products/advisory-services/elena/index), [TARGET](https://www.eib.org/en/products/advisory-services/target/index).

8. **Certifikácie:** označenie Tier III+ nie je samostatný stupeň certifikácie Uptime Institute; kategórie sú I až IV. Návrh redundancie sám osebe nepotvrdzuje certifikáciu ani dosiahnutú dostupnosť. SNAS je akreditačná služba, nie alternatívny cloudový certifikát. [Uptime Institute](https://uptimeinstitute.com/tier-certification), [SNAS](https://www.snas.sk/faq).

9. **Emisná aritmetika:** z uvedených podielov a faktorov v metodike vychádza 0,65 × 0,34 + 0,25 × 0,20 + 0,10 × 0,02 = **0,273 t/MWh**, nie 0,294. Pri 48 000 MWh je to 13 104 ton hrubo nahradených emisií pred odpočítaním emisií dodatočnej elektriny. Ide len o kontrolu aritmetiky, nie potvrdenie uvedeného palivového mixu, faktorov alebo reálnej úspory. Vynásobiť dnešnú úsporu 25 rokmi navyše predpokladá nemenný referenčný zdroj a prevádzku.

## Čo zostáva neoverené

Rozpočty, COP pri konkrétnych teplotách, výnosy, obsadenosť, emisné úspory, grantové sumy a rebríček miest sú projektové predpoklady. Nemáme dodávateľské ponuky, zmluvy o odbere, stanoviská distribútora ani rozhodnutia o podpore. Ich presnosť nevyplýva z toho, že sú zobrazené v kalkulačke. Súlad s taxonómiou či prvenstvo na Slovensku týmto overením nepotvrdzujeme.

## Zapracovanie do HeatCloud

- Technologická snímka rozlišuje teplo na výstupe čerpadla a straty rozvodu; elektrická zložka vychádza z 1 / COP.
- Pilot má oddelené meranie IT, čerpadiel a dodaného tepla vrátane letného odberu.
- Výber lokality vyžaduje písomné podmienky pripojenia a mesačný profil tepla s prívodnou aj vratnou teplotou.
- Financovanie rozlišuje ELENA a TARGET. Základný scenár naďalej nezahŕňa nepriznané granty.
- Z Kaskády nepreberáme rozpočty, návratnosť ani tvrdenia o existujúcich partnerstvách. Staršie interaktívne modely na ostatných stránkach HeatCloud zostávajú ilustráciou; toto overenie nepotvrdzuje ich investičnú použiteľnosť.
