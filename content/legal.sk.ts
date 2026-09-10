// Sedem právnych dokumentov, slovensky. Telá sú dôveryhodné autorské HTML
// a vykresľujú sa cez dangerouslySetInnerHTML. Slugy zrkadlia legal.en.ts.
//
// Rovnako ako anglická verzia: návrhy, ktoré neprešli kontrolou advokáta.

import { company, site } from './company';
import { esc, table } from './html';
import { sk } from './i18n/sk';
import type { LegalDoc } from './types';

const N = company.legalName;
const seat = sk.company.seat;
const effective = 'dňom prvého komerčného spustenia (zatiaľ neúčinné)';

const slaTable = table(['Služba', { t: 'Mesačná dostupnosť' }, 'Meria sa ako'], [
  ['Cloud servery', '99,9 %', 'Dosiahnuteľnosť verejného rozhrania inštancie z hypervízora'],
  ['Public Cloud — API', '99,9 %', 'Odpoveď API Keystone a Nova na syntetickú požiadavku'],
  ['Public Cloud — inštancie', '99,95 %', 'Dosiahnuteľnosť inštancie, okrem stavov zavinených zákazníkom'],
  ['Spravovaný Kubernetes — control plane', '99,95 %', 'Odpoveď API servera, klastre s ≥3 worker uzlami'],
  ['GPU Cloud', '99,5 %', 'Dosiahnuteľnosť inštancie a prítomnosť akcelerátora'],
  ['Objektové úložisko', '99,9 %', 'Úspešný GET/PUT na kontrolný bucket'],
  ['Spravované databázy — jeden uzol', '99,9 %', 'Úspešné pripojenie a dopyt na primárny endpoint'],
  ['Spravované databázy — s replikou', '99,95 %', 'To isté, vrátane času automatického failoveru'],
  ['Spravované zálohovanie', '99,9 %', 'Dostupnosť služby zálohovania a obnovy'],
  ['Webhosting', '99,9 %', 'HTTP 200 z kontrolnej cesty na webe zákazníka'],
  ['hSuite, hMail, hDrive', '99,9 %', 'Úspešné prihlásenie a protokolová transakcia'],
  ['Streaming', '99,9 %', 'Doručenie manifestu a segmentov z originu'],
]);

export const legalDocs: LegalDoc[] = [
  {
    slug: 'terms',
    title: 'Všeobecné obchodné podmienky',
    short: 'VOP',
    lede: 'Zmluva medzi vami a nami: ako sa služby objednávajú, koľko stoja, čo sa stane, keď sa niečo pokazí, a ako môže ktokoľvek z nás odísť.',
    effective,
    sections: [
      { h: 'Kto sme a čo tieto podmienky upravujú', body: `
        <p>Tieto Všeobecné obchodné podmienky (<b>„Podmienky“</b>) upravujú poskytovanie všetkých
        služieb (<b>„Služby“</b>) spoločnosťou ${N}, so sídlom ${seat}
        (<b>„my“</b>, <b>„HeatCloud“</b>), vám (<b>„Zákazník“</b>).</p>
        <p>Podmienky platia spolu so <a href="/legal/aup/">Zásadami prijateľného používania</a>,
        <a href="/legal/sla/">Dohodou o úrovni služieb</a>,
        <a href="/legal/dpa/">Zmluvou o spracúvaní osobných údajov</a> tam, kde sa uplatní, a
        cenníkom zverejneným na <a href="/pricing/">/pricing/</a>. V prípade rozporu platí toto
        poradie prednosti: podpísaná individuálna zmluva, Zmluva o spracúvaní osobných údajov, SLA,
        Zásady prijateľného používania, tieto Podmienky, cenník.</p>
        <p>Zmluvy o dodávke tepla s prevádzkovateľmi sietí CZT sa dojednávajú individuálne a
        tieto Podmienky sa na ne <b>nevzťahujú</b>.</p>` },

      { h: 'Definície', body: `
        <ul>
          <li><b>Účet</b> — administrátorský prístup Zákazníka k Službám.</li>
          <li><b>Obsah Zákazníka</b> — akékoľvek dáta, softvér alebo materiál, ktoré Zákazník alebo
          jeho používatelia ukladajú v Službách, prenášajú cez ne alebo pomocou nich vytvárajú.</li>
          <li><b>Fakturačné obdobie</b> — kalendárny mesiac, ak nie je zvolená ročná fakturácia.</li>
          <li><b>Spotrebiteľ</b> — fyzická osoba, ktorá koná mimo rámca svojej podnikateľskej alebo
          inej obchodnej činnosti alebo povolania, v zmysle zákona č. 250/2007 Z. z.</li>
          <li><b>Pracovný deň</b> — pondelok až piatok, okrem slovenských štátnych sviatkov a dní
          pracovného pokoja.</li>
        </ul>` },

      { h: 'Uzavretie zmluvy', body: `
        <p>Zmluva je uzavretá, keď objednávku písomne potvrdíme (e-mail je písomná forma) alebo keď
        objednanú Službu sprístupníme, podľa toho, čo nastane skôr. Ktorúkoľvek objednávku môžeme
        odmietnuť bez uvedenia dôvodu, najmä ak nedokážeme poskytnúť požadovanú kapacitu, ak by
        zamýšľané použitie porušilo Zásady prijateľného používania alebo ak zlyhá overenie
        totožnosti.</p>
        <p>Zákazník je povinný uviesť presné identifikačné a fakturačné údaje a udržiavať ich
        aktuálne. Firemní zákazníci musia uviesť platné identifikačné číslo pre DPH, ak chcú byť
        fakturovaní v režime prenesenia daňovej povinnosti.</p>
        <p>Zákazník zodpovedá za všetku činnosť pod svojím Účtom, je povinný chrániť prihlasovacie
        údaje a zapnúť viacfaktorovú autentifikáciu na administrátorskom prístupe. Kompromitované
        prihlasovacie údaje nám musí oznámiť bez zbytočného odkladu.</p>` },

      { h: 'Služby', body: `
        <p>Služby poskytujeme s odbornou starostlivosťou kompetentného prevádzkovateľa, v súlade
        s ich zverejneným popisom a SLA. Popisy služieb na tejto stránke sú súčasťou zmluvy;
        marketingové vyhlásenia inde nie sú.</p>
        <p>Technickú implementáciu môžeme kedykoľvek zmeniť za predpokladu, že sa funkčnosť a výkon
        Služby podstatne nezhoršia. Ak ich zmena podstatne zhorší, oznámime to najmenej 30 dní
        vopred a Zákazník môže v tejto lehote dotknutú Službu vypovedať bez sankcie.</p>
        <p>Beta, náhľadové a bezplatné funkcie sa poskytujú tak, ako sú, bez SLA, a môžu byť
        kedykoľvek stiahnuté. Sú takto označené.</p>` },

      { h: 'Povinnosti Zákazníka', body: `
        <p>Zákazník je povinný:</p>
        <ul>
          <li>používať Služby v súlade so <a href="/legal/aup/">Zásadami prijateľného
          používania</a> a platným právom vrátane slovenského a európskeho;</li>
          <li>mať všetky práva a súhlasy potrebné k Obsahu Zákazníka, ktorý ukladá alebo
          prenáša;</li>
          <li>udržiavať vlastné zálohy všetkého, čoho strata by mala význam — naše zálohovacie
          funkcie sú Službou, nie náhradou vlastnej retenčnej politiky Zákazníka, s výnimkou
          prípadu, keď je zakúpená konkrétna zálohovacia Služba;</li>
          <li>aplikovať bezpečnostné aktualizácie na softvér, ktorý prevádzkuje na našej
          infraštruktúre, a nenechávať zneužiteľné systémy bežať bez dozoru;</li>
          <li>reagovať na oznámenia o zneužití, ktoré preposielame, v lehote uvedenej v
          oznámení.</li>
        </ul>
        <p>Ak Zákazník Služby ďalej predáva alebo poskytuje, zostáva voči nám plne zodpovedný za
        konanie svojich vlastných zákazníkov.</p>` },

      { h: 'Ceny, fakturácia a platba', body: `
        <p>Ceny sú tie, ktoré sú zverejnené na <a href="/pricing/">/pricing/</a> v deň objednávky,
        uvedené v eurách a <b>bez</b> dane z pridanej hodnoty. Slovenská DPH vo výške ${site.vatRate} %
        sa pripočíta tam, kde sa uplatňuje. Firemným zákazníkom usadeným v inom členskom štáte EÚ
        s platným identifikačným číslom pre DPH fakturujeme v režime prenesenia daňovej
        povinnosti.</p>
        <p>Predplatné Služby sa fakturujú vopred za každé Fakturačné obdobie. Merané Služby sa
        fakturujú pozadu na základe našich záznamov o meraní, ktoré sú rozhodujúce, ak nejde o
        zjavnú chybu. Faktúry sa vystavujú elektronicky a sú splatné <b>14 dní</b> od vystavenia,
        ak nie je dohodnuté inak.</p>
        <p>Prijímané spôsoby platby sú platobná karta, SEPA inkaso a bankový prevod. Verejné
        inštitúcie a firemní zákazníci nad dohodnutý mesačný objem môžu požiadať o fakturáciu na
        objednávku a 30-dňovú splatnosť.</p>
        <p><b>Zmeny cien.</b> Ceny môžeme zmeniť s najmenej 30-dňovým písomným oznámením. Zákazník
        môže dotknutú Službu vypovedať bez sankcie pred účinnosťou zmeny. Poplatky tretích strán
        za registre a licencie (najmä poplatky registrov domén) sa prenášajú v skutočnej výške a
        môžu sa meniť s takým predstihom, aký nám register poskytne. Ceny predplateného ročného
        obdobia sa počas tohto obdobia nemenia.</p>` },

      { h: 'Omeškanie s platbou, pozastavenie a zmazanie', body: `
        <p>Ak faktúra nie je uhradená v deň splatnosti, pošleme pripomienku. Ak zostane
        neuhradená:</p>
        <ul>
          <li><b>7. deň po splatnosti</b> — dotknuté Služby môžu byť pozastavené. Dáta sa
          uchovávajú a Zákazník ich môže naďalej exportovať.</li>
          <li><b>30. deň po pozastavení</b> — dotknuté Služby a súvisiaci Obsah Zákazníka môžu byť
          natrvalo zmazané.</li>
        </ul>
        <p>Pred každým krokom Zákazníka upozorníme e-mailom. Na omeškané platby sa vzťahujú
        zákonné úroky z omeškania. Sumy, ktoré nám Zákazník dlhuje, môžeme započítať proti
        kreditom, ktoré dlhujeme my.</p>
        <p>Službu môžeme pozastaviť aj okamžite, bez vyššie uvedených krokov, ak to vyžaduje zákon,
        ak jej ďalšia prevádzka predstavuje vážne bezpečnostné riziko pre nás alebo tretie strany,
        alebo ako to stanovujú Zásady prijateľného používania. Ak pozastavíme bez upozornenia,
        vysvetlíme dôvod hneď, ako to bude možné, a Službu obnovíme, len čo príčina pominie.</p>` },

      { h: 'Trvanie, obnova a ukončenie', body: `
        <p>Mesačné Služby sa automaticky obnovujú o ďalší mesiac, ak nie sú zrušené pred koncom
        aktuálneho mesiaca. Ročné Služby sa obnovujú o ďalší rok, ak nie sú zrušené najmenej 30
        dní pred dátumom obnovy. <b>Obnova je za rovnakú cenu ako končiace obdobie</b>, s výhradou
        článku 6.</p>
        <p>Ktorákoľvek strana môže zmluvu vypovedať bez udania dôvodu s účinnosťou ku koncu
        aktuálneho Fakturačného obdobia, oznámením cez Účet alebo písomne. Poplatok za zrušenie
        neexistuje. Predplatené ročné poplatky sa pri výpovedi bez udania dôvodu nevracajú.</p>
        <p>Ktorákoľvek strana môže ktorúkoľvek Službu ukončiť s okamžitou účinnosťou pre podstatné
        porušenie, ktoré nie je napravené do 14 dní od písomného upozornenia, alebo okamžite a bez
        upozornenia pri insolvencii druhej strany. My môžeme ukončiť okamžite pre závažné alebo
        opakované porušenie Zásad prijateľného používania.</p>
        <p><b>Po ukončení.</b> Obsah Zákazníka zostáva dostupný na export 30 dní, potom sa zmaže.
        Na požiadanie v tejto lehote poskytneme primeranú súčinnosť pri migrácii za naše štandardné
        sadzby; za šírku pásma pri egresse neúčtujeme nič.</p>` },

      { h: 'Dostupnosť a úroveň služieb', body: `
        <p>Záväzky dostupnosti a kredity splatné pri ich nesplnení sú stanovené v
        <a href="/legal/sla/">SLA</a>. Servisné kredity sú jediným a výlučným finančným nárokom
        Zákazníka pri nesplnení záväzku dostupnosti, bez toho, aby bolo dotknuté právo na ukončenie
        pre podstatné porušenie podľa článku 8.</p>` },

      { h: 'Obsah Zákazníka a dáta', body: `
        <p>Obsah Zákazníka zostáva majetkom Zákazníka. Nenadobúdame k nemu žiadne práva okrem
        obmedzených práv nevyhnutných na poskytovanie Služieb. K Obsahu Zákazníka nepristupujeme
        okrem prípadov, keď je to nevyhnutné na poskytovanie alebo ochranu Služieb, keď nás o to
        Zákazník požiada alebo keď to od nás vyžaduje zákon; takýto prístup sa loguje a je
        Zákazníkovi na požiadanie k dispozícii.</p>
        <p>Obsah Zákazníka nepoužívame na reklamu, profilovanie ani trénovanie modelov strojového
        učenia. Toto je zmluvný záväzok, nie politika, ktorú môžeme jednostranne zmeniť.</p>
        <p>Obsah Zákazníka je uložený v slovenskom regióne, ktorý si Zákazník vybral. Ak
        spracúvame osobné údaje v mene Zákazníka, uplatňuje sa <a href="/legal/dpa/">Zmluva o
        spracúvaní osobných údajov</a> a tvorí súčasť tejto zmluvy.</p>
        <p>Ak sme zo zákona povinní Obsah Zákazníka sprístupniť, informujeme Zákazníka pred
        sprístupnením, ak nám to zákon nezakazuje, a sprístupníme len to, čo daný právny akt
        skutočne vyžaduje.</p>` },

      { h: 'Duševné vlastníctvo', body: `
        <p>Ponechávame si všetky práva k Službám, nášmu softvéru, dokumentácii a ochranným známkam.
        Zákazník získava nevýhradné, neprevoditeľné právo používať ich počas trvania zmluvy a na
        zamýšľaný účel.</p>
        <p>Open-source komponenty sú licencované podľa vlastných podmienok, ktoré majú pre tieto
        komponenty prednosť pred týmito Podmienkami. Ak je Služba postavená na open-source
        projekte, uvádzame to na jej stránke.</p>` },

      { h: 'Záruky a zodpovednosť', body: `
        <p>Zaručujeme, že Služby budú poskytované s primeranou odbornosťou a starostlivosťou a
        budú podstatne zodpovedať svojmu zverejnenému popisu. V rozsahu povolenom zákonom sú
        všetky ostatné záruky vylúčené.</p>
        <p><b>Strop.</b> Naša celková zodpovednosť vzniknutá v ktoromkoľvek dvanásťmesačnom období je
        obmedzená na celkové poplatky, ktoré Zákazník zaplatil za dotknutú Službu v dvanástich
        mesiacoch pred udalosťou, ktorá viedla k nároku.</p>
        <p><b>Vylúčená škoda.</b> Nezodpovedáme za ušlý zisk, stratu príjmov, stratu očakávaných
        úspor, stratu dobrého mena ani za stratu či poškodenie dát v rozsahu, v akom im Zákazník
        mohol predísť udržiavaním záloh v súlade s článkom 5.</p>
        <p><b>Čo sa nikdy neobmedzuje.</b> Nič v týchto Podmienkach neobmedzuje zodpovednosť za smrť
        alebo ujmu na zdraví spôsobenú nedbanlivosťou, za škodu spôsobenú úmyselne alebo hrubou
        nedbanlivosťou, za podvod ani za žiadnu zodpovednosť, ktorú podľa slovenského práva nemožno
        obmedziť. Pri Spotrebiteľoch nič v tomto článku nemá vplyv na zákonné práva.</p>` },

      { h: 'Odškodnenie', body: `
        <p>Zákazník nás odškodní za nároky tretích strán vyplývajúce z Obsahu Zákazníka alebo z
        používania Služieb Zákazníkom v rozpore s týmito Podmienkami alebo Zásadami prijateľného
        používania, vrátane primeraných právnych nákladov. O každom takom nároku Zákazníka bez
        odkladu informujeme, umožníme mu podieľať sa na obrane a neuzavrieme zmier bez súhlasu
        Zákazníka, ktorý nesmie byť bezdôvodne odopretý.</p>` },

      { h: 'Zmeny týchto Podmienok', body: `
        <p>Tieto Podmienky môžeme meniť s najmenej 30-dňovým písomným oznámením. Ak zmena Zákazníka
        podstatne znevýhodňuje, môže dotknuté Služby vypovedať bez sankcie pred jej účinnosťou;
        ďalšie používanie po tomto dátume znamená súhlas. Zmeny vyžadované zákonom nadobúdajú
        účinnosť dňom, ktorý zákon stanovuje.</p>
        <p>Každá verzia týchto Podmienok je archivovaná a na požiadanie dostupná, aby Zákazník
        mohol zistiť, čo bolo dohodnuté v ktoromkoľvek čase.</p>` },

      { h: 'Vyššia moc', body: `
        <p>Žiadna strana nezodpovedá za neplnenie spôsobené udalosťou mimo jej primeranej kontroly,
        vrátane prírodnej katastrofy, vojny, terorizmu, všeobecného zlyhania elektrickej alebo
        telekomunikačnej siete alebo aktov verejnej moci. Vyššia moc neospravedlňuje neuhradenie
        už splatných súm. Ak udalosť trvá dlhšie ako 30 dní, ktorákoľvek strana môže dotknutú
        Službu ukončiť bez zodpovednosti.</p>` },

      { h: 'Dôvernosť', body: `
        <p>Každá strana zachová dôvernosť neverejných informácií druhej strany sprístupnených v
        súvislosti so zmluvou, použije ich len na účely zmluvy a chráni ich s najmenej takou
        starostlivosťou, akú venuje vlastným dôverným informáciám. Tento záväzok trvá tri roky po
        ukončení a pri Obsahu Zákazníka časovo neobmedzene.</p>` },

      { h: 'Postúpenie a subdodávatelia', body: `
        <p>Zákazník nesmie zmluvu postúpiť bez nášho písomného súhlasu, ktorý nebude bezdôvodne
        odopretý. My môžeme zmluvu postúpiť právnemu nástupcovi nášho podniku s oznámením. Môžeme
        využívať subdodávateľov vrátane subdodávateľov spracúvania uvedených v
        <a href="/legal/dpa/">Zmluve o spracúvaní osobných údajov</a> a zostávame plne zodpovední
        za ich plnenie.</p>` },

      { h: 'Spotrebitelia', body: `
        <p>Tento článok sa uplatňuje len vtedy, ak je Zákazník Spotrebiteľom, a má prednosť pred
        akýmkoľvek odporujúcim ustanovením týchto Podmienok.</p>
        <p><b>Právo na odstúpenie.</b> Podľa zákona č. 102/2014 Z. z. môže Spotrebiteľ odstúpiť od
        zmluvy uzavretej na diaľku do 14 dní bez uvedenia dôvodu akýmkoľvek jednoznačným
        vyhlásením zaslaným na <a href="mailto:${company.email}">${company.email}</a>. Ak
        Spotrebiteľ požiadal o začatie poskytovania Služby počas tejto lehoty a Služba bola
        poskytnutá v plnom rozsahu, právo na odstúpenie zaniká; ak bola poskytnutá čiastočne,
        Spotrebiteľ uhradí pomernú časť za to, čo bolo poskytnuté. Peniaze vraciame do 14 dní od
        doručenia oznámenia, rovnakým spôsobom platby.</p>
        <p><b>Reklamácie.</b> Reklamácie možno posielať na <a href="mailto:${company.email}">${company.email}</a>;
        potvrdíme ich okamžite a vybavíme do 30 dní.</p>
        <p><b>Alternatívne riešenie sporov.</b> Spotrebiteľ sa môže s nevyriešenou reklamáciou
        obrátiť na Slovenskú obchodnú inšpekciu ako všeobecný subjekt alternatívneho riešenia
        sporov alebo použiť európsku platformu riešenia sporov online. Nič v týchto Podmienkach
        nezbavuje Spotrebiteľa ochrany podľa kogentného slovenského spotrebiteľského práva.</p>` },

      { h: 'Rozhodné právo a súdna právomoc', body: `
        <p>Tieto Podmienky sa riadia právom Slovenskej republiky, s vylúčením jeho kolíznych noriem
        a s vylúčením Dohovoru OSN o zmluvách o medzinárodnej kúpe tovaru. Právomoc majú súdy
        Slovenskej republiky.</p>
        <p>Pri Spotrebiteľoch táto voľba nezbavuje Spotrebiteľa ochrany podľa kogentného práva
        krajiny jeho obvyklého pobytu a Spotrebiteľ môže podať žalobu na súdoch tejto krajiny.</p>` },

      { h: 'Záverečné ustanovenia', body: `
        <p>Ak je alebo sa stane niektoré ustanovenie neplatným, ostatné zostávajú v platnosti a
        neplatné ustanovenie sa nahradí takým, ktoré sa najviac blíži jeho obchodnému zámeru.</p>
        <p>Neuplatnenie práva nie je vzdaním sa tohto práva. Neexistujú žiadne ústne vedľajšie
        dojednania; zmeny musia byť písomné. Oznámenia nám sa posielajú na
        <a href="mailto:${company.email}">${company.email}</a>; oznámenia Zákazníkovi na e-mailovú
        adresu uvedenú na Účte.</p>
        <p>Tieto Podmienky sú zverejnené v slovenčine a angličtine. Ak sa verzie rozchádzajú, pre
        Spotrebiteľov s pobytom na Slovensku má prednosť slovenská verzia a v ostatných prípadoch
        anglická. <i>(Obe verzie sú návrhy; ani jednu neskontroloval advokát.)</i></p>` },
    ],
  },
  {
    slug: 'aup',
    title: 'Zásady prijateľného používania',
    short: 'Prijateľné používanie',
    lede: 'Čo na našej infraštruktúre bežať nesmie, ako sa to dozvieme a čo s tým robíme. Zámerne napísané úzko — politika dosť široká na to, aby zakázala čokoľvek, je politika, ktorá nechráni nikoho.',
    effective,
    sections: [
      { h: 'Rozsah', body: `
        <p>Tieto Zásady prijateľného používania (<b>„Zásady“</b>) sa vzťahujú na každého, kto
        používa Služby, vrátane vlastných používateľov a zákazníkov Zákazníka. Tvoria súčasť
        <a href="/legal/terms/">Podmienok</a>. Ak Zásady niečo zakazujú, Zákazník musí zabrániť aj
        vlastným používateľom, aby to robili.</p>` },

      { h: 'Zakázaný obsah', body: `
        <p>Služby nemožno použiť na ukladanie, prenos alebo sprístupňovanie:</p>
        <ul>
          <li>materiálu zobrazujúceho sexuálne zneužívanie detí — hlási sa orgánom činným v
          trestnom konaní okamžite a bez upozornenia Zákazníka;</li>
          <li>obsahu, ktorý podnecuje k násiliu alebo terorizmu alebo predstavuje nezákonné
          nenávistné prejavy podľa slovenského alebo európskeho práva;</li>
          <li>materiálu porušujúceho práva duševného vlastníctva tretích strán, ak sme dostali
          platné oznámenie a Zákazník naň nereagoval;</li>
          <li>malvéru, exploit kitov, phishingových stránok alebo infraštruktúry na zber
          prihlasovacích údajov;</li>
          <li>obsahu, ktorého šírenie je v Slovenskej republike inak nezákonné.</li>
        </ul>
        <p>Obsah Zákazníka proaktívne nekontrolujeme. Konáme na základe hlásení, právnych príkazov
        a automatizovaných signálov o zneužití platformy, ako je odchádzajúci spam alebo útočný
        prenos.</p>` },

      { h: 'Zakázané činnosti', body: `
        <ul>
          <li><b>Neoprávnený prístup</b> — skenovanie, sondovanie, prienik do akéhokoľvek systému
          alebo jeho narušenie bez zdokumentovaného oprávnenia od jeho vlastníka.</li>
          <li><b>Útočná infraštruktúra</b> — command and control, koordinácia botnetov, DDoS na
          objednávku, proxy siete postavené z kompromitovaných hostiteľov.</li>
          <li><b>Zneužívanie prihlasovacích údajov</b> — password spraying, credential stuffing
          alebo hrubá sila proti akejkoľvek tretej strane.</li>
          <li><b>Podvod</b> — carding, falošné e-shopy, investičné podvody, vydávanie sa za
          skutočnú osobu alebo organizáciu.</li>
          <li><b>Obchádzanie našich limitov</b> — vyhýbanie sa kvótam, filtrom, pozastaveniam alebo
          fakturácii pomocou viacerých účtov alebo technických prostriedkov.</li>
        </ul>` },

      { h: 'E-mail a hromadné správy', body: `
        <p>Hromadné alebo obchodné e-maily odosielané cez naše Služby musia byť v súlade so
        zákonom č. 351/2011 Z. z. a GDPR. Konkrétne:</p>
        <ul>
          <li>príjemcovia museli dať súhlas alebo spadajú pod úzku výnimku pre existujúcich
          zákazníkov;</li>
          <li>každá správa musí identifikovať odosielateľa a obsahovať funkčné odhlásenie, ktoré sa
          rešpektuje do 48 hodín;</li>
          <li>kúpené, vyťažené alebo „doplnené“ zoznamy sa nesmú používať;</li>
          <li>služby schránok sú na korešpondenciu, nie na kampane — schránka, ktorá začne posielať
          kampaňové objemy, bude obmedzená a nasmerujeme vás na poriadne odosielacie riešenie.</li>
        </ul>
        <p>Otvorené relay servery, otvorené proxy a otvorené rekurzívne resolvery sú zakázané
        úplne.</p>` },

      { h: 'Používanie siete a zdrojov', body: `
        <p>Zákazník nesmie falšovať zdrojové adresy, ohlasovať IP priestor, ktorý nekontroluje,
        prevádzkovať služby schopné amplifikácie bez obmedzenia rýchlosti ani generovať prenos
        určený na zhoršenie služby tretej strany.</p>
        <p>Zdieľané služby (Webhosting, hSuite, hDrive) majú limity zdrojov na nájomcu, aby jeden
        nájomca nepokazil stroj všetkým. Ak ich Zákazník sústavne prekračuje, povieme mu to a
        odporučíme dedikovaný produkt namiesto tichého obmedzovania.</p>
        <p><b>Ťažba kryptomien</b> nie je povolená na zdieľaných službách ani na skúšobnej kapacite.
        Je povolená na Cloud serveroch, Public Cloude a GPU Cloude na platených, overených účtoch
        — za rovnakých fair use podmienok ako ktorýkoľvek iný workload.</p>` },

      { h: 'Bezpečnostný výskum', body: `
        <p>Vítame bezpečnostný výskum v dobrej viere proti <b>našej vlastnej</b> platforme. Zistenia
        hláste na <a href="mailto:${company.security}">${company.security}</a>. Nebudeme právne
        stíhať výskumníka, ktorý koná v dobrej viere, nepristupuje k dátam iných zákazníkov,
        nemení ich ani neodnáša, nezhoršuje Službu a dá nám primeraný čas na opravu pred
        zverejnením.</p>
        <p>Testovanie tretích strán z našej siete vyžaduje zdokumentované oprávnenie tejto strany,
        ktoré si môžeme vyžiadať.</p>` },

      { h: 'Hlásenie zneužitia', body: `
        <p>Hlásenia posielajte na <a href="mailto:${company.abuse}">${company.abuse}</a> s úplnými
        hlavičkami alebo logmi, časovými pečiatkami v UTC a dotknutou IP adresou alebo URL.
        Potvrdíme do 24 hodín a konáme podľa závažnosti.</p>
        <p>Oznámenia o údajne nezákonnom obsahu by mali identifikovať konkrétny materiál, právny
        základ a kontaktné údaje oznamovateľa, v súlade s požiadavkami aktu o digitálnych službách
        na oznamovanie a prijímanie opatrení.</p>` },

      { h: 'Vymáhanie', body: `
        <p>Naša reakcia je primeraná závažnosti a histórii Zákazníka:</p>
        <ul>
          <li><b>Upozornenie</b> — väčšina prípadov. Prepošleme hlásenie a požiadame o nápravu v
          stanovenej lehote, zvyčajne 24 až 72 hodín.</li>
          <li><b>Obmedzenie</b> — obmedzenie rýchlosti, null-routing jednej adresy alebo vypnutie
          jednej funkcie, ak to škodu odstráni.</li>
          <li><b>Pozastavenie</b> — ak škoda pokračuje a Zákazník nekonal.</li>
          <li><b>Okamžité pozastavenie bez upozornenia</b> — vyhradené pre aktívny útočný prenos,
          CSAM a prípady, keď to vyžaduje právny príkaz.</li>
          <li><b>Ukončenie</b> — pri závažnom alebo opakovanom porušení.</li>
        </ul>
        <p>Snažíme sa konať tým najužším spôsobom, ktorý škodu zastaví. Pozastaviť celý účet kvôli
        jednému zlému virtuálnemu stroju je zlyhanie inžinierstva, nie prejav dôslednosti.</p>` },

      { h: 'Odvolania', body: `
        <p>Proti každému rozhodnutiu o vymáhaní sa možno odvolať odpoveďou na oznámenie alebo
        napísaním na <a href="mailto:${company.email}">${company.email}</a>. Odvolania posudzuje
        niekto iný než osoba, ktorá pôvodné rozhodnutie urobila, a odpovedáme do piatich Pracovných
        dní. Ak sme sa pomýlili, Službu obnovíme a povieme to.</p>` },
    ],
  },
  {
    slug: 'sla',
    title: 'Dohoda o úrovni služieb (SLA)',
    short: 'SLA',
    lede: 'K čomu sa zaväzujeme, ako sa to meria, čo sa nepočíta a aký kredit dostanete, keď zlyháme — uplatniteľný bez hádky.',
    effective,
    sections: [
      { h: 'Čo tento dokument robí', body: `
        <p>Táto Dohoda o úrovni služieb (<b>„SLA“</b>) stanovuje dostupnosť, ku ktorej sa
        zaväzujeme pri každej Službe, a servisné kredity splatné, ak ju nesplníme. Tvorí súčasť
        <a href="/legal/terms/">Podmienok</a>. Servisné kredity sú jediným finančným nárokom pri
        nesplnenej dostupnosti, bez toho, aby bolo dotknuté právo na ukončenie pre podstatné
        porušenie.</p>` },

      { h: 'Záväzky dostupnosti', body: `
        <p><b>Mesačná dostupnosť</b> znamená pre daný kalendárny mesiac:
        <code>(celkové minúty − minúty Výpadku) ÷ celkové minúty × 100</code>, zaokrúhlené na dve
        desatinné miesta, merané pre každú inštanciu Služby.</p>
        ${slaTable}
        <p>Beta a bezplatné funkcie nemajú žiadny záväzok. Klastre Kubernetes s menej než tromi
        worker uzlami nemajú záväzok pre control plane.</p>` },

      { h: 'Ako sa meria Výpadok', body: `
        <p><b>Výpadok</b> je obdobie najmenej piatich po sebe idúcich minút, počas ktorých Služba
        nesplní meranie opísané v tabuľke vyššie. Meranie vykonáva náš vlastný monitoring z
        najmenej dvoch nezávislých sond mimo dotknutej domény zlyhania, so vzorkovaním v
        30-sekundových intervaloch.</p>
        <p>Monitorovacie dáta podporujúce nárok na kredit poskytneme Zákazníkovi na požiadanie. Ak
        sa vlastný monitoring Zákazníka s naším rozchádza a Zákazník vie svoje meranie doložiť,
        preveríme to a v prípade skutočnej pochybnosti rozhodneme v prospech Zákazníka.</p>` },

      { h: 'Čo sa nepočíta ako Výpadok', body: `
        <ul>
          <li>Ohlásená údržba v zverejnenom okne — najmenej 14 dní vopred pri údržbe ovplyvňujúcej
          službu, 7 dní pri bezpečnostných záplatách.</li>
          <li>Núdzová údržba na odstránenie aktívne zneužívanej zraniteľnosti, pri ktorej dáme
          toľko predstihu, koľko okolnosti dovolia, a potom písomné vysvetlenie.</li>
          <li>Pozastavenie podľa Podmienok alebo Zásad prijateľného používania, alebo
          neplatenie.</li>
          <li>Chyby vo vlastnom softvéri, konfigurácii, DNS alebo operačnom systéme Zákazníka;
          vyčerpanie kvóty alebo vlastných zdrojov inštancie.</li>
          <li>Zlyhania sietí mimo našej kontroly, vrátane poskytovateľa internetu Zákazníka a
          verejného internetu za našimi hraničnými smerovačmi.</li>
          <li>Vyššia moc v zmysle Podmienok.</li>
          <li>Pri nasadeniach s jednou inštanciou výpadok spôsobený zlyhaním jedného fyzického
          hostiteľa, ak je Služba navrhnutá na redundantné nasadenie a Zákazník sa rozhodol ho
          nevyužiť. Táto výnimka sa nevzťahuje na control plane Spravovaného Kubernetes, Objektové
          úložisko ani replikované Spravované databázy.</li>
        </ul>` },

      { h: 'Servisné kredity', body: `
        <p>Ak Mesačná dostupnosť Služby klesne pod jej záväzok, Zákazník má nárok na kredit na
        ďalšiu faktúru, vypočítaný z mesačného poplatku za túto Službu:</p>
        ${table([{ t: 'Dosiahnutá Mesačná dostupnosť', num: false }, { t: 'Kredit', num: true }], [
          ['Pod záväzkom, ale ≥ 99,0 %', '10 %'],
          ['Pod 99,0 %, ale ≥ 95,0 %', '25 %'],
          ['Pod 95,0 %', '50 %'],
          ['Pod 95,0 % v dvoch po sebe idúcich mesiacoch', '50 % a právo okamžite ukončiť dotknutú Službu s vrátením všetkých predplatených nevyužitých poplatkov'],
        ])}
        <p>Pri meraných Službách je „mesačný poplatok“ suma vyúčtovaná za túto Službu v dotknutom
        mesiaci. Kredity sa nekumulujú nad 100 % mesačného poplatku za Službu a uplatňujú sa ako
        kredit, nie výplata v hotovosti, s výnimkou prípadu, keď už nebude vystavená žiadna ďalšia
        faktúra.</p>` },

      { h: 'Uplatnenie kreditu', body: `
        <p>Nárok pošlite na <a href="mailto:${company.email}">${company.email}</a> do
        <b>30 dní</b> od konca dotknutého mesiaca, s uvedením Služby, približných časov
        nedostupnosti a akýchkoľvek dôkazov, ktoré máte. Odpovieme do 10 Pracovných dní.</p>
        <p>Ak náš vlastný monitoring už ukazuje, že záväzok nebol splnený, kredit uplatníme bez
        čakania na nárok a Zákazníkovi to oznámime. Proces uplatnenia existuje pre prípady, ktoré
        nám ušli, nie ako prekážková dráha.</p>` },

      { h: 'Komunikácia pri incidentoch', body: `
        <p>Zaväzujeme sa: k verejnej stavovej stránke odrážajúcej stav každej Služby; k
        upozorneniu dotknutých zákazníkov do 30 minút od potvrdenia incidentu; k aktualizáciám
        najmenej každú hodinu, kým je otvorený incident S1; a k písomnej správe po incidente do
        piatich Pracovných dní od vyriešenia, zverejnenej, nie len poslanej tým, ktorí sa
        sťažovali.</p>` },

      { h: 'Ciele odozvy podpory', body: `
        ${table(['Závažnosť', 'Prvá odozva', 'Hodiny'], [
          ['S1 — výpadok produkcie, bez obchádzky', '1 hodina', '24/7'],
          ['S2 — obmedzená produkcia', '4 hodiny', 'Pracovné hodiny'],
          ['S3 — otázka alebo neprodukčný problém', '1 Pracovný deň', 'Pracovné hodiny'],
          ['S4 — požiadavka na zmenu alebo funkciu', '3 Pracovné dni', 'Pracovné hodiny'],
        ])}
        <p>Sú to ciele odozvy, nie záruky vyriešenia, a platia na každom pláne. Nesplnenie cieľa
        odozvy nezakladá servisný kredit, ale oprávňuje Zákazníka eskalovať na
        <a href="mailto:${company.email}">${company.email}</a>, ktorú čítajú ľudia prevádzkujúci
        platformu.</p>` },
    ],
  },
  {
    slug: 'privacy',
    title: 'Zásady ochrany osobných údajov',
    short: 'Ochrana údajov',
    lede: 'Aké osobné údaje spracúvame ako prevádzkovateľ — o návštevníkoch, zákazníkoch a ľuďoch, ktorí nám píšu — prečo, ako dlho a čo od nás môžete žiadať.',
    effective,
    sections: [
      { h: 'Prevádzkovateľ a kontakt', body: `
        <p>${N}, ${seat}, je prevádzkovateľom spracúvania opísaného v tomto dokumente. Kontakt pre
        všetky záležitosti ochrany údajov: <a href="mailto:${company.dpo}">${company.dpo}</a>.</p>
        <p>Ak spracúvame osobné údaje <i>v mene</i> zákazníka — všetko vnútri služieb, ktoré
        zákazník prevádzkuje — konáme ako sprostredkovateľ, nie prevádzkovateľ, a namiesto týchto
        zásad to upravuje <a href="/legal/dpa/">Zmluva o spracúvaní osobných údajov</a>.</p>
        <p>Zodpovedná osoba bude vymenovaná, ak a keď to rozsah spracúvania bude vyžadovať podľa
        článku 37 GDPR. Dovtedy uvedená adresa vedie k zodpovednej osobe.</p>` },

      { h: 'Čo spracúvame, prečo a na akom základe', body: `
        ${table(['Údaje', 'Účel', 'Právny základ', 'Uchovávanie'], [
          ['Meno, e-mail, telefón, spoločnosť, adresa, IČ DPH', 'Uzavretie a plnenie zmluvy; podpora', 'čl. 6 ods. 1 písm. b) — zmluva', 'Trvanie zmluvy + 4 roky'],
          ['Fakturačné záznamy, faktúry, platobné referencie', 'Fakturácia a zákonné účtovníctvo', 'čl. 6 ods. 1 písm. c) — zákonná povinnosť', '10 rokov (zákon č. 431/2002 Z. z.)'],
          ['Logy účtu a administrátorských úkonov', 'Bezpečnosť, vyšetrovanie zneužitia, auditná stopa', 'čl. 6 ods. 1 písm. f) — oprávnený záujem na bezpečnej platforme', '12 mesiacov'],
          ['Serverové a sieťové logy vrátane IP adries', 'Prevádzka a obrana platformy', 'čl. 6 ods. 1 písm. f) — oprávnený záujem na bezpečnosti', '90 dní, dlhšie pri otvorenom incidente'],
          ['Tikety podpory a ich obsah', 'Vybavenie požiadavky; kvalita', 'čl. 6 ods. 1 písm. b) a f)', '3 roky od uzavretia'],
          ['Správy poslané cez kontaktný formulár', 'Odpoveď na otázku', 'čl. 6 ods. 1 písm. b) predzmluvne, alebo f)', '2 roky'],
          ['Hlásenia zneužitia a záznamy o vymáhaní', 'Riešenie zneužitia; právna obrana', 'čl. 6 ods. 1 písm. c) a f)', '3 roky'],
        ])}
        <p>Ako prevádzkovateľ nespracúvame osobitné kategórie osobných údajov, nevykonávame
        automatizované rozhodovanie s právnymi účinkami a neprofilujeme návštevníkov.</p>` },

      { h: 'Čo nerobíme', body: `
        <ul>
          <li>Osobné údaje nepredávame ani neprenajímame. Neexistuje okolnosť, za ktorej by sme to
          urobili.</li>
          <li>Na tejto stránke nepoužívame reklamné siete, sledovacie pixely ani analytiku
          tretích strán.</li>
          <li>Obsah zákazníkov neskenujeme na reklamu ani profilovanie a nepoužívame ho na
          trénovanie modelov strojového učenia.</li>
          <li>Naše záznamy neobohacujeme dátami kúpenými od brokerov.</li>
        </ul>` },

      { h: 'Príjemcovia', body: `
        <p>Osobné údaje sa sprístupňujú len: zamestnancom a dodávateľom, ktorí ich potrebujú pre
        svoju rolu, pod záväzkom mlčanlivosti; sprostredkovateľom, ktorých používame na platby,
        účtovníctvo a transakčné e-maily, každému na základe zmluvy podľa článku 28; a orgánom
        verejnej moci, ak to vyžaduje právne záväzná žiadosť.</p>
        <p>Aktuálny zoznam sprostredkovateľov a subdodávateľov spracúvania s ich rolou a krajinou
        je zverejnený v <a href="/legal/dpa/">Zmluve o spracúvaní osobných údajov</a> a
        aktualizuje sa s 30-dňovým predstihom.</p>` },

      { h: 'Medzinárodné prenosy', body: `
        <p>Naša infraštruktúra je v Slovenskej republike. Snažíme sa používať sprostredkovateľov
        usadených v EÚ alebo EHP. Ak sa prenosu do tretej krajiny nedá vyhnúť, uskutoční sa na
        základe rozhodnutia o primeranosti alebo štandardných zmluvných doložiek Európskej
        komisie, s posúdením vplyvu prenosu založeným v dokumentácii a dostupným na požiadanie.</p>` },

      { h: 'Bezpečnosť', body: `
        <p>Šifrovanie pri prenose pre všetky služby a v pokoji pre všetky uložené dáta;
        viacfaktorová autentifikácia na administrátorskom prístupe; prístup s najnižšími
        oprávneniami a logovaním; oddelenie produkčného a neprodukčného prostredia; pravidelné
        záplatovanie, zálohovanie a testovanie obnovy; a proces reakcie na incidenty, ktorý
        dotknuté osoby informuje bez zbytočného odkladu.</p>
        <p>Porušenia ochrany osobných údajov sa oznamujú Úradu na ochranu osobných údajov
        Slovenskej republiky do 72 hodín, ak sú splnené kritériá článku 33, a dotknutým osobám,
        ak to vyžaduje článok 34.</p>` },

      { h: 'Vaše práva', body: `
        <p>Podľa GDPR máte právo: na prístup k svojim údajom; na opravu nepresných údajov; na
        vymazanie, ak sa uplatní niektorý z dôvodov podľa článku 17; na obmedzenie spracúvania; na
        získanie svojich údajov v prenosnom formáte; namietať proti spracúvaniu založenému na
        oprávnených záujmoch; a v zriedkavých prípadoch, keď spracúvanie stojí na súhlase, ho
        kedykoľvek odvolať bez vplyvu na predchádzajúce spracúvanie.</p>
        <p>Napíšte na <a href="mailto:${company.dpo}">${company.dpo}</a>. Odpovedáme do jedného
        mesiaca, pri zložitých žiadostiach s možným predĺžením o ďalšie dva mesiace, o čom vás
        informujeme. Neúčtujeme za to nič a nebudeme od vás žiadať preukázanie totožnosti nad rámec
        toho, čo je potrebné na istotu, že hovoríme so správnou osobou.</p>
        <p>Sťažnosť môžete podať aj na <b>Úrad na ochranu osobných údajov Slovenskej republiky</b>,
        Hraničná 12, 820 07 Bratislava, alebo na dozorný orgán v mieste vášho obvyklého pobytu.</p>` },

      { h: 'Cookies a táto stránka', body: `
        <p>Táto stránka nenastavuje žiadne cookies a nenačítava žiadne zdroje tretích strán.
        Neexistuje lišta so súhlasom, lebo niet s čím súhlasiť. Pozri
        <a href="/legal/cookies/">Zásady používania cookies</a>, ktoré sú z rovnakého dôvodu
        krátke.</p>` },

      { h: 'Zmeny týchto zásad', body: `
        <p>Podstatné zmeny oznamujeme zákazníkom e-mailom najmenej 30 dní vopred a uvádzame na
        tejto stránke. Verzia a dátum na začiatku dokumentu hovoria, ktorý text čítate.</p>` },
    ],
  },
  {
    slug: 'dpa',
    title: 'Zmluva o spracúvaní osobných údajov',
    short: 'Spracúvanie údajov',
    lede: 'Podmienky podľa článku 28, ktoré platia, keď naše služby používate na spracúvanie osobných údajov. Nadobúda účinnosť automaticky so zmluvou — nie je čo podpisovať a nie je žiadna brána „enterprise plánu“.',
    effective,
    sections: [
      { h: 'Strany, roly a rozsah', body: `
        <p>Táto Zmluva o spracúvaní osobných údajov (<b>„Zmluva o spracúvaní“</b>) tvorí súčasť
        <a href="/legal/terms/">Podmienok</a> medzi Zákazníkom (<b>„Prevádzkovateľ“</b>) a ${N}
        (<b>„Sprostredkovateľ“</b>) a uplatňuje sa vždy, keď Zákazník používa Služby na
        spracúvanie osobných údajov v zmysle nariadenia (EÚ) 2016/679 (<b>„GDPR“</b>).</p>
        <p>Nevyžaduje osobitný podpis. Ak je Zákazník sám sprostredkovateľom pre tretiu stranu,
        táto Zmluva o spracúvaní sa uplatňuje zrkadlovo a pokyny Zákazníka sa považujú za pokyny
        jeho vlastného prevádzkovateľa.</p>` },

      { h: 'Predmet a podrobnosti spracúvania', body: `
        ${table(['Položka', 'Podrobnosti'], [
          ['<b>Predmet</b>', 'Poskytovanie Služieb objednaných Prevádzkovateľom'],
          ['<b>Trvanie</b>', 'Doba trvania zmluvy plus 30-dňové okno na export'],
          ['<b>Povaha a účel</b>', 'Hosting, ukladanie, prenos, zálohovanie a spracúvanie v rozsahu technicky potrebnom na poskytnutie Služieb'],
          ['<b>Typy osobných údajov</b>', 'Určuje Prevádzkovateľ. Typicky identifikačné a kontaktné údaje, obsahové údaje, údaje o používaní a logy'],
          ['<b>Kategórie dotknutých osôb</b>', 'Určuje Prevádzkovateľ. Typicky jeho zamestnanci, zákazníci, používatelia a korešpondenti'],
          ['<b>Osobitné kategórie</b>', 'Len ak sa ich Prevádzkovateľ rozhodne ukladať; za dodatočné záruky vyžadované článkom 9 zodpovedá Prevádzkovateľ'],
        ])}` },

      { h: 'Pokyny', body: `
        <p>Sprostredkovateľ spracúva osobné údaje len na základe zdokumentovaných pokynov
        Prevádzkovateľa, ktoré tvorí táto Zmluva o spracúvaní, Podmienky, konfigurácia, ktorú
        Prevádzkovateľ nastaví v Službách, a akýkoľvek ďalší písomný pokyn, na ktorom sa strany
        dohodnú.</p>
        <p>Ak právo Únie alebo slovenské právo vyžaduje, aby Sprostredkovateľ spracúval nad rámec
        týchto pokynov, informuje Prevádzkovateľa o tejto požiadavke pred spracúvaním, pokiaľ to
        zákon nezakazuje zo závažných dôvodov verejného záujmu.</p>
        <p>Sprostredkovateľ informuje Prevádzkovateľa, ak podľa jeho názoru pokyn porušuje GDPR, a
        môže tento pokyn pozastaviť, kým nebude potvrdený alebo odvolaný.</p>` },

      { h: 'Dôvernosť', body: `
        <p>Sprostredkovateľ zabezpečí, aby osoby oprávnené spracúvať osobné údaje boli viazané
        povinnosťou mlčanlivosti, ktorá trvá aj po skončení ich pôsobenia, boli vyškolené v oblasti
        ochrany údajov a mali prístup len k údajom, ktoré ich rola vyžaduje.</p>` },

      { h: 'Bezpečnosť spracúvania', body: `
        <p>S ohľadom na najnovšie poznatky a riziká Sprostredkovateľ zavádza technické a
        organizačné opatrenia vyžadované článkom 32, vrátane:</p>
        <ul>
          <li>šifrovania pri prenose (TLS 1.2+) a v pokoji (LUKS alebo ekvivalent) pre všetky
          zákaznícke dáta;</li>
          <li>pseudonymizácie tam, kde to Služba umožňuje bez narušenia funkčnosti;</li>
          <li>viacfaktorovej autentifikácie a prístupu založeného na rolách s najnižšími
          oprávneniami pre všetok administrátorský prístup, s nemenným logovaním;</li>
          <li>oddelenia prostredí zákazníkov na úrovni hypervízora, úložiska a siete;</li>
          <li>redundancie napájania, chladenia, siete a úložiska dostatočnej na splnenie SLA a
          postupov obnovy testovaných najmenej raz ročne;</li>
          <li>riadenia zraniteľností s definovanými oknami záplatovania a pravidelného
          penetračného testovania nezávislou stranou, len čo bude platforma v komerčnej
          prevádzke;</li>
          <li>zdokumentovaného procesu reakcie na incidenty s definovanými rolami a cestami
          oznamovania.</li>
        </ul>
        <p>Sprostredkovateľ môže opatrenia časom aktualizovať za predpokladu, že sa úroveň ochrany
        nezníži.</p>` },

      { h: 'Subdodávatelia spracúvania', body: `
        <p>Prevádzkovateľ udeľuje všeobecné povolenie na zapojenie subdodávateľov spracúvania.
        Každý je zapojený na základe písomnej zmluvy ukladajúcej rovnaké povinnosti ako táto
        Zmluva o spracúvaní a Sprostredkovateľ zostáva plne zodpovedný za ich plnenie.</p>
        <p>Aktuálny zoznam, ktorý bude vedený tu a v tomto náhľade je ilustračný:</p>
        ${table(['Subdodávateľ', 'Rola', 'Umiestnenie'], [
          ['Bude uvedený pri spustení', 'Spracovanie platieb', 'EÚ'],
          ['Bude uvedený pri spustení', 'Doručovanie transakčných e-mailov', 'EÚ'],
          ['Bude uvedený pri spustení', 'Účtovníctvo a fakturácia', 'Slovensko'],
          ['Bude uvedený pri spustení', 'Kolokácia dátového centra, prvý región', 'Slovensko'],
        ])}
        <p>Sprostredkovateľ oznámi pridanie alebo nahradenie subdodávateľa najmenej <b>30 dní
        vopred</b>. Prevádzkovateľ môže v tejto lehote namietať z primeraných dôvodov ochrany
        údajov; ak strany námietku nevyriešia, Prevádzkovateľ môže dotknutú Službu ukončiť bez
        sankcie a dostať späť predplatené nevyužité poplatky.</p>` },

      { h: 'Súčinnosť Prevádzkovateľovi', body: `
        <p>Sprostredkovateľ poskytuje Prevádzkovateľovi súčinnosť primeranými technickými a
        organizačnými opatreniami a v možnej miere:</p>
        <ul>
          <li>pri odpovedaní na žiadosti dotknutých osôb — predovšetkým poskytnutím funkcií exportu,
          vymazania a prístupu v Službách a preposlaním každej priamo prijatej žiadosti bez
          zbytočného odkladu;</li>
          <li>pri zabezpečení súladu s článkami 32 až 36 vrátane posúdení vplyvu na ochranu údajov
          a predchádzajúcich konzultácií, poskytnutím informácií, ktoré má primerane k
          dispozícii.</li>
        </ul>
        <p>Táto súčinnosť sa pri žiadostiach bežného rozsahu poskytuje bezplatne.</p>` },

      { h: 'Porušenia ochrany osobných údajov', body: `
        <p>Sprostredkovateľ oznámi Prevádzkovateľovi porušenie ochrany osobných údajov týkajúce sa
        údajov Prevádzkovateľa <b>bez zbytočného odkladu a v každom prípade do 24 hodín</b> od
        momentu, keď sa o ňom dozvie, s uvedením povahy porušenia, kategórií a približného počtu
        dotknutých záznamov, pravdepodobných následkov, prijatých opatrení a kontaktného miesta
        — doplnené, keď budú dostupné ďalšie informácie.</p>
        <p>Sprostredkovateľ neoznamuje porušenia dozorným orgánom ani dotknutým osobám v mene
        Prevádzkovateľa, pokiaľ na to nie je výslovne poverený.</p>` },

      { h: 'Vymazanie alebo vrátenie údajov', body: `
        <p>Po ukončení môže Prevádzkovateľ 30 dní exportovať svoje údaje pomocou funkcií v
        Službách. Po tejto lehote Sprostredkovateľ údaje vymaže, vrátane záloh v rámci bežnej
        rotácie záloh v trvaní najviac 35 dní, pokiaľ právo Únie alebo slovenské právo nevyžaduje
        ich uchovanie. Sprostredkovateľ na požiadanie vymazanie písomne potvrdí.</p>` },

      { h: 'Audity', body: `
        <p>Sprostredkovateľ sprístupní informácie potrebné na preukázanie súladu s článkom 28 a
        umožní audity vrátane inšpekcií vykonávaných Prevádzkovateľom alebo ním povereným
        audítorom a prispieva k nim.</p>
        <p>V praxi: Sprostredkovateľ najprv ponúkne svoju aktuálnu audítorskú správu alebo
        certifikáciu, ak existuje. Ak to na otázku Prevádzkovateľa neodpovie, Prevádzkovateľ môže
        požiadať o audit na mieste alebo na diaľku s 30-dňovým predstihom, raz ročne a dodatočne po
        porušení, obmedzený na systémy spracúvajúce údaje tohto Prevádzkovateľa, s výhradou
        dôvernosti a neohrozenia bezpečnosti iných zákazníkov. Každá strana znáša vlastné náklady
        na jeden audit ročne.</p>` },

      { h: 'Medzinárodné prenosy', body: `
        <p>Sprostredkovateľ ukladá a spracúva údaje Prevádzkovateľa v Slovenskej republike.
        Neprenesie osobné údaje do tretej krajiny bez pokynu alebo povolenia Prevádzkovateľa a
        každý takýto prenos sa uskutoční na základe rozhodnutia o primeranosti alebo štandardných
        zmluvných doložiek Európskej komisie, ktoré sú tam, kde sa uplatňujú, začlenené odkazom.</p>` },

      { h: 'Zodpovednosť a prednosť', body: `
        <p>Zodpovednosť podľa tejto Zmluvy o spracúvaní podlieha obmedzeniam v Podmienkach, pokiaľ
        GDPR nestanovuje inak. V prípade rozporu medzi touto Zmluvou o spracúvaní a Podmienkami vo
        veci ochrany údajov má prednosť táto Zmluva o spracúvaní. Nič v tejto Zmluve o spracúvaní
        neobmedzuje povinnosti ktorejkoľvek strany priamo uložené GDPR.</p>` },
    ],
  },
  {
    slug: 'cookies',
    title: 'Zásady používania cookies',
    short: 'Cookies',
    lede: 'Najkratší dokument na tejto stránke, lebo poctivá verzia je krátka.',
    effective: site.updated,
    sections: [
      { h: 'Čo táto stránka ukladá', body: `
        <p><b>Nič.</b> Táto stránka nenastavuje žiadne cookies, nepoužíva local storage, nenačítava
        žiadne písma, skripty, obrázky ani štýly zo serverov tretích strán a neobsahuje žiadny
        analytický ani reklamný kód. Písma sa servírujú z vlastných súborov tejto stránky. Neexistuje
        lišta so súhlasom, lebo niet s čím súhlasiť.</p>
        <p>Váš prehliadač pošle nášmu webovému serveru požiadavku, ktorá sa zaloguje s vašou IP
        adresou, požadovanou stránkou, časom a user agentom, na 90 dní, na účely bezpečnosti a
        kapacity. To je opísané v <a href="/legal/privacy/">Zásadách ochrany osobných údajov</a>.</p>` },

      { h: 'Čo budú ukladať produkty', body: `
        <p>Keď sa služby spustia, zákaznícky ovládací panel a aplikácie (hSuite, hMail, hDrive)
        budú potrebovať nevyhnutné cookies na udržanie prihlásenia a ochranu pred cross-site
        request forgery. Tie sú oslobodené od súhlasu podľa § 109 zákona č. 452/2021 Z. z. a článku
        5 ods. 3 smernice o súkromí a elektronických komunikáciách, lebo služba bez nich nemôže
        fungovať.</p>
        <p>Ak neskôr budeme chcieť čokoľvek, čo <i>nie je</i> nevyhnutné — napríklad produktovú
        analytiku — najprv požiadame o súhlas, s odmietnutím rovnako ľahkým ako prijatie, a bude to
        vypnuté, kým nepoviete áno.</p>` },

      { h: 'Obsah tretích strán', body: `
        <p>Na tejto stránke nevkladáme videoprehrávače tretích strán, sociálne widgety, chatovacie
        okná, mapy ani služby písiem. Ak sa to zmení, táto stránka sa zmení ako prvá.</p>` },
    ],
  },
  {
    slug: 'imprint',
    title: 'Právne informácie',
    short: 'Právne informácie',
    lede: 'Kto stojí za touto stránkou, aký je jej skutočný právny stav a kde sa sťažovať.',
    effective: site.updated,
    sections: [
      { h: 'Stav tejto stránky', body: `
        <p>Táto stránka je <b>náhľad</b>. Predstavuje zamýšľaný katalóg služieb, ceny a podmienky
        spoločnosti, ktorá je <b>${sk.company.status}</b>. Žiadna tu opísaná služba momentálne
        nefunguje, nemožno zadať objednávku, uzavrieť zmluvu ani prijať platbu.</p>
        <p>Identifikátory nižšie sú zástupné. Nie sú to vymyslené registračné čísla, lebo
        vymyslené IČO na stránke, ktorá vyzerá ako právne informácie skutočnej spoločnosti, by bolo
        presne tým, čomu má tento dokument zabrániť.</p>` },

      { h: 'Identifikácia prevádzkovateľa', body: `
        ${table(['Položka', 'Hodnota'], [
          ['Obchodné meno', esc(company.legalName)],
          ['Právny stav', esc(sk.company.status)],
          ['Sídlo', esc(seat)],
          ['IČO', esc(sk.company.notAssigned)],
          ['DIČ', esc(sk.company.notAssigned)],
          ['IČ DPH', esc(sk.company.notAssigned)],
          ['Obchodný register', esc(sk.company.register)],
          ['E-mail', `<a href="mailto:${company.email}">${company.email}</a>`],
          ['Webová stránka', esc(site.origin)],
        ])}
        <p class="small">Zverejnené vo forme vyžadovanej § 4 zákona č. 22/2004 Z. z. o elektronickom
        obchode a § 3a Obchodného zákonníka, v rozsahu, v akom informácie existujú.</p>` },

      { h: 'Dozorné orgány', body: `
        <p><b>Dozor nad obchodom a ochrana spotrebiteľa:</b> Slovenská obchodná inšpekcia,
        Inšpektorát SOI pre Bratislavský kraj.</p>
        <p><b>Ochrana osobných údajov:</b> Úrad na ochranu osobných údajov Slovenskej republiky,
        Hraničná 12, 820 07 Bratislava.</p>
        <p><b>Regulácia energetiky a tepla</b> (relevantné pre činnosť odberu tepla, len čo bude
        existovať): Úrad pre reguláciu sieťových odvetví (ÚRSO), podľa zákona č. 657/2004 Z. z. o
        tepelnej energetike.</p>` },

      { h: 'Riešenie sporov', body: `
        <p>Spotrebitelia sa môžu s nevyriešenými sťažnosťami obrátiť na Slovenskú obchodnú
        inšpekciu ako všeobecný subjekt alternatívneho riešenia sporov podľa zákona č. 391/2015
        Z. z. alebo použiť platformu Európskej komisie na riešenie sporov online. Sťažnosti nám
        posielajte najprv na <a href="mailto:${company.email}">${company.email}</a> — radšej ich
        vyriešime tam.</p>` },

      { h: 'Obsah tejto stránky', body: `
        <p>Všetky údaje na tejto stránke týkajúce sa rekuperácie tepla, cien energií a ekonomiky
        nasadenia sú odhady od stola čerpané zo zverejnenej
        <a href="${site.dossier}">výskumnej štúdie HeatCloud Slovakia</a>. Sú prezentované na účely
        posúdenia. Nie sú inžinierskym návrhom, ponukou ani investičným odporúčaním.</p>
        <p>Špecifikácie služieb, ceny a dátumy dostupnosti opisujú zamýšľanú ponuku a môžu sa pred
        spustením úplne zmeniť. Názvy tretích strán — Infomaniak, NVIDIA, Kubernetes, Nextcloud,
        OpenStack a ďalšie — sa používajú opisne a sú ochrannými známkami svojich vlastníkov; ich
        použitie tu neznamená žiadne odporúčanie ani prepojenie. Fotografia lokality je
        vizualizácia zamýšľanej lokality, nie fotografia postavenej.</p>` },

      { h: 'Autorské práva', body: `
        <p>Text a dizajn tejto stránky sú © 2026 ${N}. Výskumná štúdia, z ktorej čerpá, je
        zverejnená osobitne podľa vlastných podmienok.</p>` },
    ],
  },
];
