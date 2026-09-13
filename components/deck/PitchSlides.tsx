import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { BASE } from "@/lib/base";
import { company } from "@/content/company";
import type { Locale } from "@/lib/i18n";
import type { DeckSlide } from "./Deck";
import "./pitch.css";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;
function Reveal({
  children,
  i = 2,
  className = "",
}: {
  children: ReactNode;
  i?: number;
  className?: string;
}) {
  return (
    <div className={`s ${className}`} style={delay(i)}>
      {children}
    </div>
  );
}
function Frame({
  tag,
  title,
  intro,
  children,
  foot,
}: {
  tag: string;
  title: ReactNode;
  intro?: string;
  children: ReactNode;
  foot?: ReactNode;
}) {
  return (
    <div className="pitch-frame">
      <p className="s pitch-kicker" style={delay(0)}>
        <span />
        {tag}
      </p>
      <h2 className="s pitch-title" style={delay(1)}>
        {title}
      </h2>
      {intro && (
        <p className="s pitch-intro" style={delay(2)}>
          {intro}
        </p>
      )}
      <div className="pitch-content">{children}</div>
      {foot && (
        <p className="s pitch-foot" style={delay(5)}>
          {foot}
        </p>
      )}
    </div>
  );
}
function Columns({
  items,
}: {
  items: { title: string; body: string; tag?: string }[];
}) {
  return (
    <div className="pitch-columns">
      {items.map((item, i) => (
        <Reveal key={item.title} i={i + 2} className="pitch-column">
          <span className="pitch-index">{item.tag ?? `0${i + 1}`}</span>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </Reveal>
      ))}
    </div>
  );
}

/** Planning assumptions, not supplier quotes. Keep financial scenarios distinct from evidence. */
export function buildPitchSlides(locale: Locale): DeckSlide[] {
  const sk = locale === "sk";
  const f = (s: string, e: string) => (sk ? s : e);
  const slide = (
    id: string,
    label: string,
    tone: DeckSlide["tone"],
    content: ReactNode,
  ): DeckSlide => ({ id, label, tone, content });
  return [
    slide(
      "cover",
      f("Investičná téza", "Investment thesis"),
      "night",
      <div className="pitch-cover">
        <Image
          src={`${BASE}/hero-investor.webp`}
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="pitch-cover-image s-photo"
        />
        <div className="pitch-cover-shade" />
        <div className="pitch-cover-content">
          <p className="s pitch-kicker" style={delay(0)}>
            HEATCLOUD / SLOVAKIA
          </p>
          <h1 className="s" style={delay(1)}>
            {f("Výpočtový výkon.", "Computing power.")}
            <br />
            <em>{f("Teplo pre mesto.", "Heat for the city.")}</em>
          </h1>
          <p className="s pitch-cover-lede" style={delay(2)}>
            {f(
              "Slovenský cloud pre firmy. Odpadové teplo pre lokálnych odberateľov. Infraštruktúra, ktorá spája oboje.",
              "A Slovak cloud for businesses. Recovered heat for local customers. Infrastructure that connects both.",
            )}
          </p>
          <div className="s pitch-cover-bottom" style={delay(3)}>
            <span>
              {f(
                "Investičný koncept · september 2026",
                "Investment concept · September 2026",
              )}
            </span>
            <span>
              {f(
                "Príprava → pilot → rozšírenie",
                "Development → pilot → expansion",
              )}
            </span>
          </div>
        </div>
        <span className="pitch-image-caption">
          {f(
            "Koncepčná vizualizácia plánovaného areálu",
            "Concept visualisation of a proposed site",
          )}
        </span>
      </div>,
    ),
    slide(
      "opportunity",
      f("Príležitosť", "Opportunity"),
      "paper",
      <Frame
        tag={f("01 / Príležitosť", "01 / Opportunity")}
        title={
          <>
            {f("Dva odbery.", "Two customers.")}
            <br />
            <em>{f("Jedna infraštruktúra.", "One infrastructure.")}</em>
          </>
        }
        intro={f(
          "Výpočty potrebujú elektrinu. Mestá potrebujú teplo. Navrhujeme ich spojiť na jednom mieste.",
          "Computing needs electricity. Cities need heat. We propose bringing them together in one place.",
        )}
      >
        <div className="pitch-dual">
          <Reveal className="pitch-demand">
            <span className="pitch-index">CLOUD</span>
            <h3>{f("Firmy kupujú výkon", "Businesses buy compute")}</h3>
            <p>
              {f(
                "Virtuálne servery, úložisko a spravované služby s lokálnou podporou a jasnou zodpovednosťou za dáta.",
                "Virtual servers, storage and managed services with local support and clear accountability for data.",
              )}
            </p>
          </Reveal>
          <Reveal i={3} className="pitch-demand heat">
            <span className="pitch-index">HEAT</span>
            <h3>{f("Odberateľ kupuje teplo", "A local customer buys heat")}</h3>
            <p>
              {f(
                "Bazén, priemyselný areál alebo tepláreň môže využiť teplo, ktoré by dátové centrum odviedlo do okolia.",
                "A pool, industrial site or utility can use heat that a data centre would otherwise reject.",
              )}
            </p>
          </Reveal>
        </div>
      </Frame>,
    ),
    slide(
      "system",
      f("Ako to funguje", "How it works"),
      "night",
      <Frame
        tag={f("02 / Technológia", "02 / Technology")}
        title={
          <>
            {f("Výkon predáme.", "Sell the computing.")}
            <br />
            <em>{f("Teplo využijeme.", "Recover the heat.")}</em>
          </>
        }
        foot={f(
          "Teplo na výstupe čerpadla = zachytené teplo + jeho elektrina. Elektrina na MWh tohto tepla = 1 / COP; rozvod pridáva straty a náklady. COP overíme pri miestnych teplotách.",
          "Heat-pump output = recovered heat + its electricity input. Electricity per MWh of this output = 1 / COP; distribution adds losses and costs. Validate COP at site temperatures.",
        )}
      >
        <Reveal className="pitch-system">
          <div className="pitch-node">
            <span className="pitch-index">01 / IT</span>
            <div className="pitch-rack" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <span key={i}>
                  <i />
                  <i />
                  <i />
                </span>
              ))}
            </div>
            <h3>{f("Dátové centrum", "Data centre")}</h3>
            <p>
              {f("Elektrina → výpočty + teplo", "Electricity → compute + heat")}
            </p>
          </div>
          <div className="pitch-flow" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="pitch-node">
            <span className="pitch-index">02 / HEAT</span>
            <div className="pitch-pump" aria-hidden="true">
              <span />
            </div>
            <h3>{f("Tepelná stanica", "Heat station")}</h3>
            <p>
              {f("Výmenník / tepelné čerpadlo", "Heat exchanger / heat pump")}
            </p>
          </div>
          <div className="pitch-flow" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="pitch-node">
            <span className="pitch-index">03 / OFFTAKE</span>
            <div className="pitch-city" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <h3>{f("Lokálny odberateľ", "Local heat customer")}</h3>
            <p>{f("Meraný a zmluvný odber", "Metered, contracted delivery")}</p>
          </div>
        </Reveal>
        <Reveal i={4} className="pitch-inline-note">
          {f(
            "Nezávislé chladenie zachová prevádzku aj pri nulovom odbere tepla.",
            "Independent cooling keeps the data centre running even with zero heat offtake.",
          )}
        </Reveal>
      </Frame>,
    ),
    slide(
      "customers",
      f("Zákazníci", "Customers"),
      "paper",
      <Frame
        tag={f("03 / Obchodný model", "03 / Business model")}
        title={
          <>
            {f("Cloud je hlavný biznis.", "Cloud is the core business.")}
            <br />
            <em>{f("Teplo pridáva hodnotu.", "Heat adds value.")}</em>
          </>
        }
        intro={f(
          "Začíname úzkou ponukou pre konkrétne potreby. Kapacitu rozširujeme spolu s predajom.",
          "Start with a focused offer for concrete needs. Expand capacity as sales grow.",
        )}
        foot={f(
          "Cieľové segmenty, nie existujúce kontrakty. Verejný sektor je ďalšia etapa po splnení požiadaviek na služby a obstarávanie.",
          "Target segments, not existing contracts. Public-sector sales follow service qualification and procurement requirements.",
        )}
      >
        <Columns
          items={[
            {
              tag: "01 / CLOUD",
              title: f("Firmy a IT partneri", "Businesses & IT partners"),
              body: f(
                "Privátny cloud, zálohy a spravovaná infraštruktúra. Predaj priamo aj cez existujúcich IT integrátorov.",
                "Private cloud, backups and managed infrastructure. Direct sales and distribution through established IT integrators.",
              ),
            },
            {
              tag: "02 / COMPUTE",
              title: f("Výpočtové úlohy", "Compute workloads"),
              body: f(
                "Dávkové CPU/GPU úlohy podľa zazmluvneného dopytu. Hardvér vyberáme podľa zákazníkov.",
                "Batch CPU/GPU workloads matched to contracted demand. Select hardware around customer requirements.",
              ),
            },
            {
              tag: "03 / HEAT",
              title: f("Partner s odberom tepla", "Heat offtake partner"),
              body: f(
                "Dlhodobá zmluva na merané dodávky. Cena vychádza z alternatívnych nákladov odberateľa a príslušnej regulácie.",
                "A long-term contract for metered delivery. Pricing reflects avoided costs and applicable regulation.",
              ),
            },
          ]}
        />
      </Frame>,
    ),
    slide(
      "precedents",
      f("Precedensy", "Precedents"),
      "night",
      <Frame
        tag={f("04 / Overený princíp", "04 / Proven principle")}
        title={
          <>
            {f("Technológia už funguje.", "The technology works.")}
            <br />
            <em>{f("Lokalitu musíme overiť.", "The site must be proven.")}</em>
          </>
        }
        foot={f(
          "Referencie dokladajú princíp, nie výnos HeatCloudu. Zdroje a odkazy sú v prílohe.",
          "References demonstrate the principle, not HeatCloud returns. Sources and links are in the appendix.",
        )}
      >
        <Columns
          items={[
            {
              tag: "GENEVA / CH",
              title: "Infomaniak",
              body: f(
                "Cloudový prevádzkovateľ prepojil dátové centrum s tepelnou sieťou. Poučenie: zákazníci a energetický partner patria na začiatok.",
                "A cloud operator connected its data centre to a heat network. The lesson: customers and an energy partner come first.",
              ),
            },
            {
              tag: "ESPOO / FI",
              title: "Fortum × Microsoft",
              body: f(
                "Projekt využitia tepla z dátových centier v mestskej sieti. Poučenie: tepelná časť potrebuje silného prevádzkového partnera.",
                "A project to recover data-centre heat for district heating. The lesson: thermal assets need a capable operating partner.",
              ),
            },
            {
              tag: "TALLAGHT / IE",
              title: "Heat Works",
              body: f(
                "Teplo z dátového centra zásobuje miestnu sieť. Poučenie: vzdialenosť a konkrétny odber rozhodujú o návrhu.",
                "Data-centre heat supplies a local network. The lesson: distance and actual demand determine the design.",
              ),
            },
          ]}
        />
      </Frame>,
    ),
    slide(
      "pilot",
      f("Prvý projekt", "First project"),
      "paper",
      <Frame
        tag={f("05 / Prvý projekt", "05 / First project")}
        title={
          <>
            {f("Najprv jeden partner.", "One partner first.")}
            <br />
            <em>{f("A merateľný výsledok.", "A measurable result.")}</em>
          </>
        }
        foot={f(
          "Navrhovaný rozsah. Rozpočet a harmonogram vzniknú z ponúk a preverenia pripojenia. Predaj tepla v areáli nie je automaticky bez povolenia.",
          "Proposed scope. Quotes and connection studies establish budget and schedule. On-site heat sales are not automatically licence-exempt.",
        )}
      >
        <div className="pitch-split">
          <Reveal className="pitch-big-stat">
            <span>250–300</span>
            <strong>kW IT</strong>
            <p>
              {f(
                "Pilotný modul pri odberateľovi s celoročnou potrebou tepla",
                "A pilot module beside a customer with year-round heat demand",
              )}
            </p>
          </Reveal>
          <Reveal i={3}>
            <ol className="pitch-list">
              {[
                [
                  f("Predané výpočty", "Sold compute"),
                  f(
                    "Overiť cenu, náklady a spoľahlivosť služby.",
                    "Validate pricing, costs and service reliability.",
                  ),
                ],
                [
                  f("Merané teplo", "Metered heat"),
                  f(
                    "Samostatne merať elektrinu IT a čerpadiel, dodané teplo a letný odber. Úsporu porovnať s reálnym zdrojom zákazníka.",
                    "Meter IT and heat-pump electricity, delivered heat and summer demand separately. Compare savings with the customer’s actual heat source.",
                  ),
                ],
                [
                  f("Opakovateľný projekt", "Repeatable design"),
                  f(
                    "Získať dáta, referenciu a rozpočet ďalšieho modulu.",
                    "Establish operating data, a reference and the next module’s budget.",
                  ),
                ],
              ].map(([a, b]) => (
                <li key={a}>
                  <h3>{a}</h3>
                  <p>{b}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Frame>,
    ),
    slide(
      "site",
      f("Výber lokality", "Site selection"),
      "night",
      <Frame
        tag={f("06 / Lokalita", "06 / Site")}
        title={
          <>
            {f("Najlepší pozemok má", "The best site has")}
            <br />
            <em>{f("elektrinu aj odber.", "power and demand.")}</em>
          </>
        }
        intro={f(
          "Po predbežnom záujme investora preveríme kandidátov. Mesto vyberieme podľa dát, nie podľa mapy expanzie.",
          "After initial investor interest, we screen candidate sites. Evidence determines the city rather than a preset expansion map.",
        )}
      >
        <Columns
          items={[
            {
              title: f("Elektrina", "Power"),
              body: f(
                "Písomné podmienky pripojenia: príkon, termín a cena vrátane IT, chladenia a čerpadiel. Blízka rozvodňa nepotvrdzuje voľnú kapacitu.",
                "Written connection terms: power, date and cost for IT, cooling and heat pumps. A nearby substation does not establish available capacity.",
              ),
            },
            {
              title: f("Teplo", "Heat"),
              body: f(
                "Mesačný profil vrátane leta, prívodná aj vratná teplota, krátka trasa a náklady nahradeného zdroja. Výroba tepla ešte neznamená jeho predaj.",
                "Monthly demand including summer, supply and return temperatures, a short route and avoided heat costs. Heat production alone does not establish sales.",
              ),
            },
            {
              title: f("Realizovateľnosť", "Deliverability"),
              body: f(
                "Optika, práva k pozemkom, územný plán, hluk a priestor pre rozšírenie.",
                "Fibre, land rights, planning compatibility, noise and room for expansion.",
              ),
            },
          ]}
        />
      </Frame>,
    ),
    slide(
      "build",
      f("Realizácia", "Delivery"),
      "paper",
      <Frame
        tag={f("07 / Realizácia", "07 / Delivery")}
        title={
          <>
            {f("Stavať po etapách.", "Build in stages.")}
            <br />
            <em>{f("Rozširovať podľa dopytu.", "Expand with demand.")}</em>
          </>
        }
        foot={f(
          "Novostavba 5 MW: pracovný horizont prípravy a realizácie 2–4 roky, s možným predĺžením podľa siete a povolení. Pilot má samostatný harmonogram.",
          "New 5 MW facility: a preliminary development and delivery horizon of 2–4 years, subject to grid and permitting delays. The pilot has a separate schedule.",
        )}
      >
        <div className="pitch-stages">
          {[
            [
              f("Preverenie", "Feasibility"),
              f(
                "Lokalita, pripojenie, odber a technický koncept",
                "Site, grid connection, offtake and technical concept",
              ),
            ],
            [
              f("Projekt", "Design"),
              f(
                "Povoľovanie, ponuky a financovanie",
                "Permits, supplier quotes and financing",
              ),
            ],
            [
              f("Výstavba", "Construction"),
              f(
                "Budova / moduly, napájanie, chladenie a tepelná stanica",
                "Building / modules, power, cooling and heat station",
              ),
            ],
            [
              f("Spustenie", "Commissioning"),
              f(
                "Záťažové skúšky, výpadky, revízie a servis",
                "Load tests, failure scenarios, inspections and service",
              ),
            ],
          ].map(([a, b], i) => (
            <Reveal key={a} i={i + 2}>
              <span className="pitch-stage-number">0{i + 1}</span>
              <h3>{a}</h3>
              <p>{b}</p>
            </Reveal>
          ))}
        </div>
      </Frame>,
    ),
    slide(
      "investment",
      f("Investičný rámec", "Investment scope"),
      "night",
      <Frame
        tag={f("08 / Investičný rámec", "08 / Investment scope")}
        title={
          <>
            {f("Rozpočet začína", "A budget starts with")}
            <br />
            <em>{f("presným rozsahom.", "a precise scope.")}</em>
          </>
        }
        foot={f(
          "Pracovný odhad HeatCloud bez DPH, nie ponuka ani slovenský benchmark. T&T dokladá výluky benchmarkov, nie tento rozsah. Pilot sa nacení samostatne.",
          "HeatCloud estimate excluding VAT, not a quote or a Slovak benchmark. T&T supports the distinction in scope, not this range. Price the pilot separately.",
        )}
      >
        <div className="pitch-split">
          <Reveal className="pitch-big-stat">
            <span>40–65</span>
            <strong>{f("mil. € / 5 MW IT", "€ million / 5 MW IT")}</strong>
            <p>
              {f(
                "Orientačný rámec výstavby a technológií s tepelnou časťou",
                "Indicative construction and facility systems envelope including heat recovery",
              )}
            </p>
          </Reveal>
          <Reveal i={3} className="pitch-scope">
            <div>
              <span className="pitch-index">
                {f("V rámci odhadu", "Within the estimate")}
              </span>
              <p>
                {f(
                  "Budova, interné napájanie a záloha, chladenie, tepelná stanica s krátkym napojením, projekt, skúšky a rezerva.",
                  "Building, internal power and backup, cooling, heat station with a short connection, design, testing and contingency.",
                )}
              </p>
            </div>
            <div>
              <span className="pitch-index">
                {f("Naceniť navyše", "Price separately")}
              </span>
              <p>
                {f(
                  "Pozemok, posilnenie siete, náročné externé trasy, servery a GPU, financovanie a nábeh prevádzky.",
                  "Land, grid reinforcement, complex external routes, servers and GPUs, financing and operating runway.",
                )}
              </p>
            </div>
          </Reveal>
        </div>
      </Frame>,
    ),
    slide(
      "economics",
      f("Ekonomika", "Economics"),
      "paper",
      <Frame
        tag={f("09 / Citlivosť modelu", "09 / Model sensitivity")}
        title={
          <>
            {f("Výnos určuje predaj.", "Sales determine revenue.")}
            <br />
            <em>{f("Nie počet rackov.", "Capacity alone does not.")}</em>
          </>
        }
        intro={f(
          "Ročné tržby z cloudu na 1 MW inštalovanej IT kapacity. Tri pracovné scenáre, nie prognóza.",
          "Annual cloud revenue per 1 MW of installed IT capacity. Three planning scenarios, not a forecast.",
        )}
        foot={f(
          "Vzorec: 1 000 kW × predaná kapacita × €/kW/mesiac × 12. Bez tepla, DPH a nákladov; nejde o EBITDA ani návratnosť. Ceny a vyťaženosť nie sú zazmluvnené.",
          "Formula: 1,000 kW × sold capacity × €/kW/month × 12. Excludes heat, VAT and costs; not EBITDA or payback. Pricing and utilisation are not contracted.",
        )}
      >
        <div className="pitch-scenarios">
          {[
            { label: f("Pomalší nábeh", "Slower ramp"), u: 0.3, rate: 240 },
            { label: f("Pracovný scenár", "Working case"), u: 0.6, rate: 350 },
            { label: f("Silný predaj", "Strong sales"), u: 0.75, rate: 380 },
          ].map((s, i) => (
            <Reveal key={s.label} i={i + 2} className="pitch-scenario">
              <span className="pitch-index">{s.label}</span>
              <h3>
                {((s.u * s.rate * 12000) / 1e6).toLocaleString(
                  sk ? "sk-SK" : "en-GB",
                  { minimumFractionDigits: 2, maximumFractionDigits: 2 },
                )}
                <small>{f("mil. €/rok", "€m/year")}</small>
              </h3>
              <div className="pitch-chart-track">
                <span
                  className="s-bar"
                  style={{ width: `${((s.u * s.rate) / 285) * 100}%` }}
                />
              </div>
              <p>
                {s.u * 100} % · {s.rate} €/kW/{f("mesiac", "month")}
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal i={4} className="pitch-inline-note">
          {f(
            "Do cash flow doplníme elektrinu, prevádzku, obnovu hardvéru, nábeh predaja a dlhovú službu.",
            "Cash flow must include power, operations, hardware renewal, sales ramp and debt service.",
          )}
        </Reveal>
      </Frame>,
    ),
    slide(
      "funding",
      f("Financovanie", "Financing"),
      "night",
      <Frame
        tag={f("10 / Financovanie", "10 / Financing")}
        title={
          <>
            {f("Kapitál pre cloud.", "Capital for cloud.")}
            <br />
            <em>{f("Partner pre teplo.", "A partner for heat.")}</em>
          </>
        }
        foot={f(
          "Potenciálne nástroje, nie prísľub financovania. Základný scenár bez nepriznanej podpory; dotačný variant až po preverení oprávnenosti a kumulácie.",
          "Potential instruments, not commitments. Base case excludes unawarded aid; model grants only after eligibility and cumulation checks.",
        )}
      >
        <Columns
          items={[
            {
              tag: f("PRÍPRAVA", "DEVELOPMENT"),
              title: f(
                "Investor / strategický partner",
                "Investor / strategic partner",
              ),
              body: f(
                "Financuje overenie lokality, projektu a obchodu. ELENA môže kryť až 90 % oprávnených nákladov prípravy vhodného programu; nejde o dotáciu na výstavbu.",
                "Funds site, technical and commercial validation. ELENA can cover up to 90% of eligible preparation costs for a qualifying programme, not construction.",
              ),
            },
            {
              tag: "CLOUD",
              title: f("Kapitál + lízing + úver", "Equity + leasing + debt"),
              body: f(
                "Hardvér a infraštruktúra podľa zákazníckych kontraktov. Dlh sa opiera o preukázané peňažné toky.",
                "Hardware and infrastructure aligned with customer contracts. Debt relies on demonstrated cash flows.",
              ),
            },
            {
              tag: f("TEPLO", "HEAT"),
              title: f("Tepláreň / ESCO + podpora", "Utility / ESCO + support"),
              body: f(
                "Preveriť Modernizačný fond a Program Slovensko. TARGET ponúka bezplatnú technickú pomoc pre oprávnené projekty v regiónoch Coal+; nie investičný grant.",
                "Screen Modernisation Fund and Program Slovensko calls. TARGET offers free technical assistance for eligible projects in Coal+ regions, not an investment grant.",
              ),
            },
          ]}
        />
      </Frame>,
    ),
    slide(
      "regulation",
      f("Pripravenosť", "Readiness"),
      "paper",
      <Frame
        tag={f("11 / Podmienky realizácie", "11 / Delivery conditions")}
        title={
          <>
            {f("Povolenia a zmluvy", "Permits and contracts")}
            <br />
            <em>{f("sú súčasť projektu.", "are part of the project.")}</em>
          </>
        }
        foot={f(
          "Rámec overovaný k 13. 9. 2026. Povinnosti určí lokalita, výkon, služby a prevádzkovateľ; vrátane slovenského vykonania EED.",
          "Framework reviewed as of 13 September 2026. Obligations depend on site, capacity, services and operator, including Slovak EED implementation.",
        )}
      >
        <Columns
          items={[
            {
              title: f("Stavba a energetika", "Construction & energy"),
              body: f(
                "Práva k pozemkom, stavebný zámer, pripojenie a environmentálne posúdenie podľa rozsahu. Povolenie a osvedčenie pre teplo podľa príslušného režimu.",
                "Land rights, planning, grid connection and environmental assessment as applicable. Resolve the relevant heat licensing and certification path.",
              ),
            },
            {
              title: f("Odber a cena tepla", "Heat offtake & price"),
              body: f(
                "Zmluva, určené meradlá, kvalita a minimálny odber. Cenový režim ÚRSO preveriť pred uzavretím ekonomiky.",
                "Contract, compliant metering, quality and minimum offtake. Resolve the ÚRSO price regime before finalising economics.",
              ),
            },
            {
              title: f("Cloud a bezpečnosť", "Cloud & security"),
              body: f(
                "GDPR, posúdenie NIS2, zmluvy a prenositeľnosť dát. Verejný sektor navyše vyžaduje kvalifikáciu služieb a príslušný nákupný postup.",
                "GDPR, NIS2 scope assessment, contracts and data portability. Public-sector sales also require qualification and applicable procurement.",
              ),
            },
          ]}
        />
      </Frame>,
    ),
    slide(
      "plan",
      f("Prvých 90 dní", "First 90 days"),
      "night",
      <Frame
        tag={f("12 / Plán prípravy", "12 / Development plan")}
        title={
          <>
            {f("90 dní na podklady", "90 days to establish")}
            <br />
            <em>{f("pre ďalšie rozhodnutie.", "the next decision.")}</em>
          </>
        }
        intro={f(
          "Navrhovaná pracovná fáza po dohode s investorom. Cieľom sú dôkazy a porovnateľné možnosti.",
          "A proposed development phase after agreement with an investor. The objective is evidence and comparable options.",
        )}
        foot={f(
          "Cieľový plán, nie garancia termínov úradov alebo distribútora. Ďalšia fáza sa schváli podľa výsledkov.",
          "Target work plan, not a guarantee of authority or grid-operator timelines. Approve the next phase against results.",
        )}
      >
        <div className="pitch-stages">
          {[
            [
              "01–30",
              f("Vybrať kandidátov", "Screen candidates"),
              f(
                "Krátky zoznam lokalít, dáta o teple a prvé rozhovory so zákazníkmi.",
                "Site shortlist, heat-demand data and initial customer discussions.",
              ),
            ],
            [
              "31–60",
              f("Naceniť koncept", "Price the concept"),
              f(
                "Technický návrh, rozpočtové ponuky a právna cesta.",
                "Technical concept, budget quotes and legal pathway.",
              ),
            ],
            [
              "61–90",
              f("Pripraviť rozhodnutie", "Prepare the decision"),
              f(
                "Porovnanie lokalít, finančný model a podmienky pilotu.",
                "Site comparison, financial model and pilot terms.",
              ),
            ],
          ].map(([a, b, c], i) => (
            <Reveal key={a} i={i + 2}>
              <span className="pitch-day">{a}</span>
              <h3>{b}</h3>
              <p>{c}</p>
            </Reveal>
          ))}
        </div>
      </Frame>,
    ),
    slide(
      "gates",
      f("Investičná disciplína", "Investment discipline"),
      "paper",
      <Frame
        tag={f("13 / Rozhodovacie podmienky", "13 / Decision gates")}
        title={
          <>
            {f("Každá etapa musí", "Every stage must")}
            <br />
            <em>{f("obhájiť tú ďalšiu.", "earn the next.")}</em>
          </>
        }
      >
        <div className="pitch-gates">
          {[
            [
              f("Dopyt", "Demand"),
              f(
                "Zákazníci akceptujú cenu a rozsah služby.",
                "Customers accept the price and service scope.",
              ),
              f(
                "Slabý predaj → menší modul alebo odklad.",
                "Weak sales → smaller module or defer.",
              ),
            ],
            [
              f("Lokalita", "Site"),
              f(
                "Elektrina a tepelný odber majú prijateľné podmienky.",
                "Power and heat offtake have viable terms.",
              ),
              f(
                "Nevhodné pripojenie → iná lokalita.",
                "Unviable connection → another site.",
              ),
            ],
            [
              f("Ekonomika", "Economics"),
              f(
                "Ponuky a cash flow unesú prevádzku aj obnovu hardvéru.",
                "Quotes and cash flow support operations and hardware renewal.",
              ),
              f(
                "Nevychádza nepriaznivý scenár → prepracovať rozsah.",
                "Downside fails → revisit scope.",
              ),
            ],
          ].map(([a, b, c], i) => (
            <Reveal key={a} i={i + 2}>
              <span className="pitch-index">0{i + 1}</span>
              <h3>{a}</h3>
              <p>{b}</p>
              <small>{c}</small>
            </Reveal>
          ))}
        </div>
      </Frame>,
    ),
    slide(
      "ask",
      f("Pozvanie pre investora", "Investor invitation"),
      "night",
      <Frame
        tag={f("14 / Ďalší krok", "14 / Next step")}
        title={
          <>
            {f("Hľadáme partnera", "Seeking a partner")}
            <br />
            <em>{f("pre prvý HeatCloud.", "for the first HeatCloud.")}</em>
          </>
        }
        intro={f(
          "Predbežný záujem o model. Spoločne dohodnutá príprava. Investícia do výstavby až po overení.",
          "Initial interest in the model. A jointly agreed development phase. Construction investment follows validation.",
        )}
      >
        <div className="pitch-ask">
          <Reveal>
            <span className="pitch-index">{f("TERAZ", "NOW")}</span>
            <h3>
              {f("Dohodnúť prípravnú fázu", "Agree the development phase")}
            </h3>
            <p>
              {f(
                "Rozpočet, tím, míľniky a podmienky pokračovania. Financovanie pilotu sa určí podľa overeného rozsahu.",
                "Budget, team, milestones and conditions to proceed. Pilot financing follows a validated scope.",
              )}
            </p>
          </Reveal>
          <Reveal i={3}>
            <span className="pitch-index">{f("VÝSLEDOK", "DELIVERABLE")}</span>
            <h3>
              {f(
                "Projekt, o ktorom sa dá rozhodnúť",
                "A project ready for a decision",
              )}
            </h3>
            <p>
              {f(
                "Vybraná lokalita, nacenený koncept, podmienky odberu a plán financovania vrátane možností podpory.",
                "Selected site, priced concept, offtake terms and a financing plan including potential support.",
              )}
            </p>
          </Reveal>
        </div>
        <Reveal i={4}>
          <a className="pitch-cta" href={`mailto:${company.email}`}>
            {f("Poďme vybrať prvú lokalitu", "Let’s select the first site")}{" "}
            <span aria-hidden="true">↗</span>
          </a>
        </Reveal>
      </Frame>,
    ),
    slide(
      "sources",
      f("Zdroje a predpoklady", "Sources & assumptions"),
      "paper",
      <Frame
        tag={f("Príloha / Zdroje", "Appendix / Sources")}
        title={
          <>
            {f("Čo je podložené.", "What is supported.")}
            <br />
            <em>{f("Čo ešte overujeme.", "What we must validate.")}</em>
          </>
        }
        foot={f(
          "Stav k 13. 9. 2026. HeatCloud je vo fáze prípravy. Lokalita, zákaznícke kontrakty, dotácia ani stavebný rozpočet nie sú deklarované ako zabezpečené.",
          "As of 13 September 2026. HeatCloud is in development. No secured site, customer contracts, grant or construction budget are claimed.",
        )}
      >
        <div className="pitch-sources">
          {[
            [
              f(
                "Stavebné náklady / rozsah benchmarku",
                "Construction / benchmark scope",
              ),
              "Turner & Townsend · methodology",
              "https://reports.turnerandtownsend.com/data-centre-construction-cost-index-2025/methodology",
            ],
            [
              f("Tepelná energetika", "Heat regulation"),
              "Slov-Lex · 657/2004",
              "https://static.slov-lex.sk/static/SK/ZZ/2004/657/20260701.html",
            ],
            [
              f("Európsky rámec využitia tepla", "EU heat recovery framework"),
              "EED · 2023/1791",
              "https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX%3A32023L1791",
            ],
            [
              f("Podpora prípravy", "Development assistance"),
              "EIB · ELENA",
              "https://www.eib.org/en/products/advisory-services/elena/index",
            ],
            [
              f("Referenčný cloud", "Cloud reference"),
              "Infomaniak · D4",
              "https://news.infomaniak.com/en/infomaniak-inaugurates-a-revolutionary-data-center-that-recovers-100-of-its-energy-for-building-heating/",
            ],
            [
              f("Tepelné partnerstvo", "Thermal partnership"),
              "Fortum · Espoo / Kirkkonummi",
              "https://www.fortum.com/en/media/2023/06/fortum-invest-approximately-eur-225-million-waste-heat-projects-espoo-and-kirkkonummi-finland",
            ],
            [
              f("Lokálna tepelná sieť", "Local heat network"),
              "South Dublin · Tallaght",
              "https://www.sdcc.ie/en/news/tallaght-district-heating-network-and-energy-centre-officially-opened.html",
            ],
            [
              f("Interné predpoklady", "Internal assumptions"),
              f(
                "CAPEX, tržby, pilot a termíny — overiť v príprave",
                "CAPEX, revenue, pilot and timing — validate during development",
              ),
              null,
            ],
          ].map(([title, body, url], i) => (
            <Reveal key={title} i={2 + (i % 3)}>
              <span>0{i + 1}</span>
              <div>
                {url ? (
                  <a href={url} target="_blank" rel="noreferrer">
                    {title} ↗
                  </a>
                ) : (
                  <strong>{title}</strong>
                )}
                <p>{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Frame>,
    ),
  ];
}
