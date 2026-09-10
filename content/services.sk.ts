// Katalóg služieb, slovensky. Slug za slugom a plán za plánom zrkadlí
// services.en.ts — ceny sú čísla a formátujú sa podľa jazyka stránky.

import type { Group, Service } from './types';

export const groups: Group[] = [
  { key: 'compute',   title: 'Výpočtový výkon',   blurb: 'Virtuálne stroje, kontajnery a akcelerátory v slovenských rackoch.' },
  { key: 'storage',   title: 'Úložisko a dáta',   blurb: 'Objektové úložisko, spravované databázy a zálohovanie, ktoré nikdy neopustí krajinu.' },
  { key: 'web',       title: 'Web a domény',      blurb: 'Hosting, domény, certifikáty a doručovanie médií.' },
  { key: 'workplace', title: 'Kancelária',        blurb: 'Pošta, súbory, stretnutia a dokumenty pre celý tím.' },
  { key: 'heat',      title: 'Teplo',             blurb: 'Druhá polovica biznisu: tepelná energia predávaná do sietí CZT.' },
];

export const services: Service[] = [
  // ------------------------------------------------------------ VÝPOČTY
  {
    slug: 'cloud-servers', name: 'Cloud servery', group: 'compute', icon: 'server',
    menuNote: 'Predvídateľné VM na NVMe, mesačná fakturácia',
    tagline: 'Virtuálne stroje s pevnou mesačnou cenou, NVMe úložiskom a bez faktúry za egress.',
    from: 'od 4,90 €/mesiac',
    summary: 'Univerzálne VM s dedikovaným alebo zdieľaným vCPU, lokálnym NVMe a paušálnou mesačnou cenou vrátane prenosu.',
    intro: `<p>Cloud server je virtuálny stroj KVM na našom vlastnom hardvéri v slovenskom dátovom
      centre. Vyberiete si veľkosť a približne za 40 sekúnd dostanete stroj s root prístupom,
      verejnou IPv4, /64 IPv6 a prenosom v cene. Žiadne hodinové prekvapenia, žiadna faktúra za
      egress po gigabajtoch na konci mesiaca.</p>
      <p>Každá veľkosť je dostupná so <b>zdieľaným</b> vCPU (lacnejšie, burstable, vhodné na
      staging a malé webové záťaže) alebo <b>dedikovaným</b> vCPU (vlákno fyzického jadra
      vyhradené pre vás — na databázy, CI runnery a čokoľvek citlivé na latenciu).</p>`,
    features: [
      { title: 'Naštartuje do minúty', body: 'Ubuntu, Debian, Rocky, AlmaLinux, Fedora, openSUSE, Windows Server (BYOL) alebo vlastné ISO. Cloud-init na každom obraze.' },
      { title: 'Snapshoty a plánované zálohy', body: 'Snapshoty na vyžiadanie; automatické denné zálohy so 7-, 14- alebo 30-dňovým uchovávaním za 20 % ceny inštancie.' },
      { title: 'Zmena veľkosti bez prestavby', body: 'CPU a RAM zväčšíte alebo zmenšíte pri reštarte. Disk rastie za behu. Zníženie je povolené raz mesačne.' },
      { title: 'Privátna sieť', body: 'Bezplatné privátne VXLAN siete medzi vašimi inštanciami na 10 Gb/s, bez poplatku za prenos a bez vystavenia verejnému internetu.' },
      { title: 'Firewall pred hypervízorom', body: 'Stavové pravidlá aplikované na virtuálnom switchi, takže zablokovaný prenos sa nikdy nedotkne vašej inštancie ani vášho CPU.' },
      { title: 'Ochrana pred DDoS v cene', body: 'Volumetrické čistenie na hranici siete pre každú inštanciu, bez príplatku a bez preklasifikovania prenosu.' },
    ],
    specs: [
      ['Virtualizácia', 'KVM na AMD EPYC 9004 / Intel Xeon Scalable 4. gen.'],
      ['Úložisko', 'Lokálne NVMe, trojito replikovaný Ceph pre zväzky'],
      ['Sieť', '1 Gb/s garantovaný, 10 Gb/s burst, nemeraný prenos (fair use 20 TB/mesiac)'],
      ['Adresy', '1 × IPv4 v cene, /64 IPv6, ďalšia IPv4 2,00 €/mesiac'],
      ['Regióny', 'sk-bts-1 (Bratislava), sk-kos-1 (Košice, plánovaný)'],
      ['API', 'REST API kompatibilné s OpenStackom, Terraform provider, CLI'],
      ['SLA', '99,9 % mesačná dostupnosť — pozri SLA'],
    ],
    plans: [
      { name: 'HC-2', for: 'Staging, malé weby', price: 4.9,
        specs: [['2', 'vCPU zdieľané'], ['4 GB', 'RAM'], ['60 GB', 'NVMe'], ['20 TB', 'prenos']] },
      { name: 'HC-4', for: 'Produkčné webové aplikácie', price: 11.9, featured: true,
        specs: [['4', 'vCPU zdieľané'], ['8 GB', 'RAM'], ['120 GB', 'NVMe'], ['20 TB', 'prenos']] },
      { name: 'HC-8D', for: 'Databázy, CI', price: 38,
        specs: [['8', 'vCPU dedikované'], ['32 GB', 'RAM'], ['360 GB', 'NVMe'], ['20 TB', 'prenos']] },
      { name: 'HC-16D', for: 'Vysoká, stála záťaž', price: 76,
        specs: [['16', 'vCPU dedikované'], ['64 GB', 'RAM'], ['720 GB', 'NVMe'], ['20 TB', 'prenos']] },
    ],
    planNote: 'Fakturované mesačne vopred, zrušiteľné ku koncu ktoréhokoľvek mesiaca. Ročná platba znižuje cenu o 15 %.',
    faq: [
      ['Je prenos naozaj nemeraný?', 'Áno, v rámci fair use stropu 20 TB na inštanciu mesačne. Nad ním vás požiadame o presun na inštanciu Public Cloud s meraným prenosom namiesto účtovania prirážky — vyjde to lacnejšie pre nás oboch.'],
      ['Môžem prevádzkovať vlastný hypervízor alebo vnorenú virtualizáciu?', 'Vnorená virtualizácia je zapnutá na veľkostiach s dedikovaným vCPU. Prevádzkovať verejný hosting na jednej inštancii je v poriadku; ďalší predaj surového výpočtového výkonu nie — pozri Zásady prijateľného používania.'],
      ['Čo sa stane s mojimi dátami, ak prestanem platiť?', 'Inštancie sa pozastavia 7 dní po nezaplatenej faktúre a zmažú 30 dní po pozastavení. Kedykoľvek počas tohto okna si môžete stiahnuť úplný obraz disku.'],
      ['Máte bezplatnú úroveň?', 'Nie. Radšej si vypýtame 4,90 € a zostaneme v biznise, než by sme prevádzkovali free tier a financovali ho z vašich dát.'],
    ],
    related: ['public-cloud', 'kubernetes', 'object-storage'],
  },
  {
    slug: 'public-cloud', name: 'Public Cloud', group: 'compute', icon: 'cloud',
    menuNote: 'OpenStack, účtovaný po sekundách',
    tagline: 'Štandardný OpenStack cloud, účtovaný po sekundách, bez uzamknutia.',
    from: 'od 0,0061 €/vCPU-hod.',
    summary: 'Plný OpenStack: Nova, Cinder, Neutron, Octavia a Magnum, účtovaný po sekundách s otvoreným API.',
    intro: `<p>Public Cloud je náš región OpenStack. Hovorí rovnakým API ako každý iný OpenStack
      cloud na svete, takže Terraform, Pulumi, Ansible, Packer a <code>openstack</code> CLI proti
      nemu fungujú bez úprav — a váš plán odchodu je <code>terraform apply</code> proti cudziemu
      endpointu.</p>
      <p>Účtuje sa za sekundu behu, s mesačným stropom pre každý flavour vo výške ceny
      zodpovedajúceho Cloud servera — takže stroj, ktorý zabudnete zmazať, nikdy nestojí viac
      než VM s pevnou mesačnou cenou.</p>`,
    features: [
      { title: 'Sekundové účtovanie s mesačným stropom', body: 'Platíte za to, čo beží. Keď inštancia v mesiaci nabehne dosť na to, aby dosiahla paušálnu mesačnú sadzbu, zvyšok mesiaca je zdarma.' },
      { title: 'Load balancery a floating IP', body: 'Load balancery Octavia s TLS termináciou, HTTP/2 a health checkmi, od 0,021 €/hod.' },
      { title: 'Blokové úložisko, ktoré prežije inštanciu', body: 'Cinder zväzky na trojito replikovanom NVMe, so snapshotmi, pripojiteľné k ľubovoľnej inštancii v regióne.' },
      { title: 'Projekty, kvóty a RBAC', body: 'Rozdeľte organizáciu na projekty s vlastnými kvótami, používateľmi a API prihlasovacími údajmi. Federácia Keystone s vaším IdP na požiadanie.' },
      { title: 'Najprv Terraform a Ansible', body: 'Zverejňujeme referenčné moduly pre bežné tvary: zabezpečené VM, trojuzlové etcd, autoškálovanú webovú vrstvu za Octaviou.' },
    ],
    specs: [
      ['Vydanie OpenStack', '2026.1 (Epoxy), upgrade do dvoch vydaní'],
      ['Služby', 'Keystone, Nova, Glance, Cinder, Neutron, Octavia, Magnum, Barbican, Heat'],
      ['Compute flavoury', 'a1 (zdieľané), d1 (dedikované), m1 (pamäť), g1 (GPU)'],
      ['Egress', '0,008 €/GB von, ingress zdarma, prvý 1 TB/mesiac na projekt zdarma'],
      ['Autentifikácia', 'Application credentials, EC2 keypairs, voliteľná OIDC federácia'],
      ['SLA', '99,9 % dostupnosť API, 99,95 % dostupnosť inštancií'],
    ],
    plans: [
      { name: 'a1 zdieľané', for: 'Burstable, všeobecné použitie', price: 0.0061, unit: '/vCPU-hod.', metered: true,
        specs: [['2 GB', 'RAM na vCPU'], ['4,90 €', 'mesačný strop (2 vCPU)'], ['NVMe', 'systémový disk']] },
      { name: 'd1 dedikované', for: 'Stále, citlivé na latenciu', price: 0.0163, unit: '/vCPU-hod.', metered: true, featured: true,
        specs: [['4 GB', 'RAM na vCPU'], ['38,00 €', 'mesačný strop (8 vCPU)'], ['NVMe', 'systémový disk']] },
      { name: 'm1 pamäť', for: 'Cache, analytika', price: 0.0224, unit: '/vCPU-hod.', metered: true,
        specs: [['8 GB', 'RAM na vCPU'], ['64,00 €', 'mesačný strop (4 vCPU)'], ['NVMe', 'systémový disk']] },
      { name: 'Blokové úložisko', for: 'Cinder zväzky', price: 0.079, unit: '/GB-mesiac',
        specs: [['3×', 'replikácia'], ['Snapshoty', '0,039 €/GB-mesiac'], ['Bez', 'poplatku za IOPS']] },
    ],
    planNote: 'Public Cloud je meraný; Cloud servery sú ten istý hardvér za paušálnu mesačnú cenu. Vyberte si model účtovania, ktorý sedí workloadu.',
    faq: [
      ['V čom sa to líši od Cloud serverov?', 'Rovnaké racky, rovnaké disky. Cloud servery sú zjednodušený paušálny produkt s malým ovládacím panelom; Public Cloud je surové OpenStack API s meraným účtovaním, projektmi a kvótami.'],
      ['Môžem si presúvať obrazy dnu a von?', 'Áno. Glance prijíma a exportuje obrazy qcow2 a raw a prenos pri sťahovaní obrazov sa neúčtuje.'],
      ['Je v tom istom API aj objektové úložisko?', 'Naše objektové úložisko hovorí S3, nie Swift. Je v tom istom regióne a prenos medzi ním a vašimi inštanciami je zdarma.'],
    ],
    related: ['cloud-servers', 'kubernetes', 'object-storage'],
  },
  {
    slug: 'kubernetes', name: 'Spravovaný Kubernetes', group: 'compute', icon: 'k8s',
    menuNote: 'Control plane zdarma, platíte za uzly',
    tagline: 'Upstream Kubernetes s control plane, ktorý prevádzkujeme zdarma, a uzlami, za ktoré platíte.',
    from: 'control plane zdarma, uzly od 11,90 €/mesiac',
    summary: 'Kubernetes v súlade s CNCF, vysoko dostupný control plane bez poplatku, autoškálované skupiny uzlov a CSI na replikovanom NVMe.',
    intro: `<p>Control plane prevádzkujeme my — tri členy etcd v troch doménach zlyhania, API
      server, scheduler, controller manager, monitoring, záplaty a upgrady verzií — a neúčtujeme
      ho. Platíte za worker uzly, čo sú bežné Cloud servery, a za úložisko a load balancery, ktoré
      si vaše workloady vyžiadajú.</p>
      <p>Je to upstream Kubernetes v súlade s CNCF, bez forknutého API. Vaše manifesty, Helm charty
      a operátory fungujú rovnako ako všade inde.</p>`,
    features: [
      { title: 'Bezplatný, vysoko dostupný control plane', body: 'Trojuzlové etcd v nezávislých napájacích a sieťových doménach. Záplatujeme ho my; vy ho nikdy nevidíte.' },
      { title: 'Autoškálované skupiny uzlov', body: 'Nastavte minimum a maximum na skupinu. Cluster autoscaler pridáva a odoberá uzly podľa čakajúcich podov a platíte po sekundách za tie, ktoré existujú.' },
      { title: 'CSI, CNI a CCM v cene', body: 'Cinder CSI pre perzistentné zväzky, Cilium ako CNI so sieťovými politikami a Hubble a cloud controller manager, ktorý premení Service typu LoadBalancer na skutočný load balancer Octavia.' },
      { title: 'Upgrady verzií pod vašou kontrolou', body: 'Podporujeme tri najnovšie minor verzie. Upgrade je jeden klik alebo jedno volanie API, skupina uzlov po skupine, s nastaviteľným surge a drain timeoutom.' },
      { title: 'Privátne klastre', body: 'Voliteľne je API server dostupný len z vašej privátnej siete alebo zo zoznamu povolených CIDR, bez akéhokoľvek verejného endpointu.' },
    ],
    specs: [
      ['Verzie Kubernetes', '1.32, 1.33, 1.34'],
      ['CNI', 'Cilium s eBPF datapath, sieťové politiky, Hubble observabilita'],
      ['Storage classes', 'nvme-replicated (predvolená), nvme-local (rýchla, viazaná na uzol)'],
      ['Ingress', 'Vlastný; charty ingress-nginx a Traefik testujeme pri každom vydaní'],
      ['Registry', 'Bezplatný privátny container registry, 50 GB na klaster'],
      ['SLA', '99,95 % dostupnosť API control plane na klastroch s tromi a viac uzlami'],
    ],
    plans: [
      { name: 'Control plane', for: 'HA, spravujeme my', price: 0, specs: [['3', 'členovia etcd'], ['Upgrady', 'v cene'], ['Monitoring', 'v cene']] },
      { name: 'Skupina uzlov — malá', for: 'Webové a API workloady', price: 11.9, featured: true,
        specs: [['4', 'vCPU zdieľané'], ['8 GB', 'RAM'], ['120 GB', 'NVMe']] },
      { name: 'Skupina uzlov — dedikovaná', for: 'Stavové, stála záťaž', price: 38,
        specs: [['8', 'vCPU dedikované'], ['32 GB', 'RAM'], ['360 GB', 'NVMe']] },
      { name: 'Skupina uzlov — GPU', for: 'Inferencia, trénovanie', price: 0.79, unit: '/hod.', metered: true,
        specs: [['1 ×', 'NVIDIA L40S'], ['16', 'vCPU dedikované'], ['96 GB', 'RAM']] },
    ],
    planNote: 'Load balancery, perzistentné zväzky a egress sa účtujú sadzbami Public Cloud.',
    faq: [
      ['Naozaj bezplatný control plane? Kde je háčik?', 'Control plane nás stojí zlomok uzla a klaster bez workerov nemá hodnotu pre nikoho z nás. Klastre s menej než tromi worker uzlami dostanú control plane s jednou replikou a bez SLA.'],
      ['Môžem použiť vlastný ingress controller a cert-manager?', 'Áno. Do vášho klastra nenasadzujeme nič okrem CNI, CSI a cloud controller managera a každý z nich sa dá vypnúť, ak si chcete prevádzkovať vlastný.'],
      ['Podporujete GPU uzly?', 'Áno — NVIDIA device plugin a ovládač sú na GPU skupinách uzlov predinštalované. Dostupné akcelerátory nájdete v GPU Cloude.'],
    ],
    related: ['public-cloud', 'gpu-cloud', 'databases'],
  },
  {
    slug: 'gpu-cloud', name: 'GPU Cloud', group: 'compute', icon: 'chip',
    menuNote: 'L40S a H200 na hodiny — a teplo ide do mesta',
    tagline: 'Akcelerátory na hodiny, v sále postavenej na predaj tepla, ktoré vyrábajú.',
    from: 'od 0,79 €/hod.',
    summary: 'Inštancie NVIDIA L40S a H200 na trénovanie a inferenciu, v rackoch, ktorých odpadové teplo je zazmluvnené pre sieť CZT.',
    intro: `<p>GPU sú dôvod, prečo táto firma dokáže vykúriť mesto. Rack akcelerátorov premení
      v podstate celý svoj elektrický príkon na teplo pri teplote dosť vysokej na to, aby sa
      oplatilo ho zachytiť — a na rozdiel od univerzálnej flotily beží mesiace takmer na plný
      výkon, čo je presne to, čo zmluva o odbere tepla potrebuje.</p>
      <p>Výpočtový výkon je preto ocenený tak, aby bol konkurencieschopný sám osebe, a tepelný
      príjem pod ním je to, čo nám umožňuje ho tak udržať.</p>`,
    features: [
      { title: 'Bare metal alebo virtualizované', body: 'Plný passthrough jedného, dvoch, štyroch alebo ôsmich akcelerátorov, alebo MIG rezy H200 pre inferenčné workloady, ktoré nepotrebujú celú kartu.' },
      { title: 'Bez poplatku za egress pri artefaktoch modelov', body: 'Stiahnuť checkpoint z objektového úložiska v tom istom regióne je zdarma a rovnako aj stiahnutie natrénovaných váh.' },
      { title: 'Rýchly lokálny scratch', body: 'Každý GPU host má lokálny NVMe scratch s veľkosťou 1 TB na akcelerátor pre datasety, ktoré nechcete streamovať.' },
      { title: 'Rezervovaná kapacita so zľavou', body: 'Jedno-, troj- a dvanásťmesačné rezervácie s 20 %, 30 % a 40 % zľavou z hodinovej sadzby — a rezervácia je to, čo nám umožňuje zaviazať sa sieti dodávkou tepla.' },
      { title: 'Priame kvapalinové chladenie', body: 'Uzly H200 sú chladené kvapalinou priamo na čipe s teplotou spiatočky dosť vysokou na efektívne napájanie tepelného čerpadla — preto sú tu lacnejšie než vo vzduchom chladenej sále.' },
    ],
    specs: [
      ['Akcelerátory', 'NVIDIA L40S 48 GB, NVIDIA H200 SXM 141 GB'],
      ['Prepojenie', 'NVLink v rámci uzla H200, 400 Gb/s InfiniBand medzi uzlami'],
      ['Ovládače', 'Obrazy CUDA 13.x, základné obrazy PyTorch a JAX udržiavané nami'],
      ['Scratch', '1 TB lokálne NVMe na akcelerátor'],
      ['Chladenie', 'Kvapalina priamo na čipe pri H200, výmenník v zadných dverách pri L40S'],
      ['Rekuperácia tepla', 'Spiatočka 45–50 °C, tepelným čerpadlom zdvihnutá na teplotu siete CZT'],
    ],
    plans: [
      { name: 'L40S ×1', for: 'Inferencia, fine-tuning', price: 0.79, unit: '/hod.', metered: true,
        specs: [['48 GB', 'VRAM'], ['16', 'vCPU dedikované'], ['96 GB', 'RAM'], ['1 TB', 'NVMe scratch']] },
      { name: 'L40S ×4', for: 'Menšie trénovacie behy', price: 3.05, unit: '/hod.', metered: true, featured: true,
        specs: [['192 GB', 'VRAM'], ['64', 'vCPU dedikované'], ['384 GB', 'RAM'], ['4 TB', 'NVMe scratch']] },
      { name: 'H200 ×1', for: 'Inferencia veľkých modelov', price: 2.95, unit: '/hod.', metered: true,
        specs: [['141 GB', 'VRAM'], ['24', 'vCPU dedikované'], ['192 GB', 'RAM'], ['1 TB', 'NVMe scratch']] },
      { name: 'H200 ×8', for: 'Trénovanie na viacerých uzloch', price: 22.4, unit: '/hod.', metered: true,
        specs: [['1128 GB', 'VRAM'], ['192', 'vCPU dedikované'], ['1,5 TB', 'RAM'], ['8 TB', 'NVMe scratch']] },
    ],
    planNote: 'Rezervácie na jeden, tri alebo dvanásť mesiacov znižujú tieto sadzby o 20 %, 30 % a 40 %.',
    faq: [
      ['Je kapacita naozaj dostupná?', 'GPU kapacita sa prideľuje najprv z rezervácií. Pošlite nám cez kontaktný formulár tvar a časové okno a úprimne vám povieme, kedy ho vieme obslúžiť, namiesto predaja miesta v rade.'],
      ['Spomaľuje rekuperácia tepla môj job?', 'Nie. Teplo sa zachytáva za studenou doskou; čipy vidia rovnakú vstupnú teplotu chladiva ako v ktorejkoľvek kvapalinou chladenej sále. Ak sieť CZT teplo nemôže odobrať, odvedieme ho do suchého chladiča ako obvykle.'],
      ['Môžem dostať bare metal bez virtualizácie?', 'Áno, od tvarov ×4 nahor, s minimálnou dobou jeden mesiac.'],
    ],
    related: ['kubernetes', 'object-storage', 'heat-offtake'],
  },

  // ------------------------------------------------------------ ÚLOŽISKO
  {
    slug: 'object-storage', name: 'Objektové úložisko', group: 'storage', icon: 'bucket',
    menuNote: 'Kompatibilné s S3, bez poplatku za egress',
    tagline: 'Objektové úložisko kompatibilné s S3 za 5,90 € za TB mesačne, s egressom v cene.',
    from: '5,90 €/TB/mesiac',
    summary: 'Erasure-coded S3 úložisko s verziovaním, object lockom a lifecycle pravidlami — a bez poplatku za to, že si dáta vezmete späť.',
    intro: `<p>Objektové úložisko je endpoint kompatibilný s S3 na erasure-coded diskoch v troch
      doménach zlyhania. Funguje s AWS CLI, boto3, rclone, Veeam, restic, Cyberduck a čímkoľvek
      iným, čo hovorí S3.</p>
      <p>Neexistuje poplatok za egress ani za requesty. Úložisko, z ktorého odchod stojí peniaze,
      nie je úložisko, je to rukojemnícka situácia.</p>`,
    features: [
      { title: 'Bez egressu, bez poplatkov za requesty', body: 'Platíte za uložené bajty. Sťahovanie, PUT, LIST a lifecycle prechody sú zdarma, do fair use stropu egressu 3× vášho uloženého objemu mesačne.' },
      { title: 'Object Lock pre súlad', body: 'Režimy uchovávania governance a compliance, takže zálohy zapísané pod zámkom nemôže zmazať útočník, ktorý má vaše kľúče — WORM záruka, od ktorej naozaj závisí obnova po ransomvéri.' },
      { title: 'Verziovanie a lifecycle pravidlá', body: 'Uchovajte n verzií, expirujte neaktuálne objekty po n dňoch, presúvajte studené dáta do archívnej triedy automaticky.' },
      { title: 'Presigned URL a statické weby', body: 'Servírujte bucket ako statický web s vlastnou doménou a bezplatným certifikátom, alebo rozdávajte časovo obmedzené presigned URL.' },
      { title: 'Šifrovanie na strane servera', body: 'SSE-S3 s kľúčmi, ktoré spravujeme my, alebo SSE-C s kľúčmi, ktoré dodáte s každým requestom. Šifrovanie v pokoji je zapnuté predvolene a nedá sa vypnúť.' },
    ],
    specs: [
      ['API', 'S3 (signature v4), ACL bucketov a objektov, multipart upload, CORS'],
      ['Cieľová odolnosť', '11 deviatok, erasure coding 8+3 v troch doménach zlyhania'],
      ['Triedy', 'standard 5,90 €/TB-mesiac, archív 1,90 €/TB-mesiac (vyzdvihnutie do 12 h)'],
      ['Max. veľkosť objektu', '5 TB, 10 000 častí'],
      ['Endpointy', 's3.sk-bts-1.heatcloud.sk, path aj virtual-host štýl'],
      ['SLA', '99,9 % dostupnosť, kredity podľa SLA'],
    ],
    plans: [
      { name: 'Standard', for: 'Všetko aktívne', price: 5.9, unit: '/TB/mesiac',
        specs: [['Egress', 'v cene'], ['Requesty', 'zdarma'], ['Verziovanie', 'v cene'], ['Object Lock', 'v cene']], featured: true },
      { name: 'Archív', for: 'Studené, zriedka čítané', price: 1.9, unit: '/TB/mesiac',
        specs: [['Vyzdvihnutie', '12 hodín'], ['Minimum', '90 dní'], ['Egress', 'v cene']] },
    ],
    planNote: 'Účtované podľa priemerne uložených bajtov za hodinu, pomerne. Bez minimálneho záväzku pri triede standard.',
    faq: [
      ['Je tvrdenie „bez egressu“ skutočné?', 'Áno, v rámci fair use: mesačný egress do trojnásobku vášho priemerne uloženého objemu. Nad ním vám zavoláme a dohodneme sadzbu namiesto poslania prekvapivej faktúry.'],
      ['Môžem ho použiť ako cieľ pre Veeam alebo restic?', 'Áno, oba testujeme pri každom vydaní. Pre Veeam použite typ repozitára S3 Compatible so zapnutým Object Lockom.'],
      ['Kde sú dáta fyzicky?', 'V slovenskom regióne, ktorý ste si vybrali. Nereplikujú sa mimo krajiny, kým si sami nenastavíte replikáciu medzi regiónmi.'],
    ],
    related: ['backup', 'public-cloud', 'databases'],
  },
  {
    slug: 'databases', name: 'Spravované databázy', group: 'storage', icon: 'db',
    menuNote: 'PostgreSQL, MySQL, Valkey, OpenSearch',
    tagline: 'Databázy, ktoré za vás niekto iný záplatuje, zálohuje a prepína pri výpadku.',
    from: 'od 18,00 €/mesiac',
    summary: 'PostgreSQL, MySQL, Valkey a OpenSearch s automatickými zálohami, obnovou k bodu v čase a voliteľnými synchrónnymi replikami.',
    intro: `<p>Spravované databázy sú tie isté enginy, ktoré už prevádzkujete, bez prevádzkovej
      práce: záplatovanie minor verzií, zálohy, obnova k bodu v čase, failover, connection pooling
      a metriky. Dostanete connection string, rolu blízku superuserovi a možnosť odísť obyčajným
      <code>pg_dump</code>, kedykoľvek chcete.</p>`,
    features: [
      { title: 'Obnova k bodu v čase', body: 'Priebežné archivovanie WAL/binlogu do objektového úložiska. Obnovte ktorúkoľvek sekundu v rámci retenčného okna do novej inštancie, originál zostane nedotknutý.' },
      { title: 'Synchrónne repliky a failover', body: 'Pridajte standby v druhej doméne zlyhania a pri výpadku ho automaticky povýšime, adresa endpointu zostáva stabilná.' },
      { title: 'Connection pooling v cene', body: 'PgBouncer v transakčnom režime pred PostgreSQL, takže serverless workload s 2 000 spojeniami nespadne na limite 200 spojení.' },
      { title: 'Rozšírenia, ktoré naozaj potrebujete', body: 'PostGIS, pgvector, pg_stat_statements, TimescaleDB (edícia Apache), pg_cron, uuid-ossp, hstore a približne šesťdesiat ďalších.' },
      { title: 'Predvolene len privátne', body: 'Nová databáza je dostupná len z vašej privátnej siete. Verejné vystavenie je výslovný opt-in s povinným zoznamom povolených adries.' },
    ],
    specs: [
      ['Enginy', 'PostgreSQL 15/16/17, MySQL 8.0/8.4, Valkey 8, OpenSearch 2.x'],
      ['Zálohy', 'Denná plná plus priebežný WAL, 7 dní uchovávania v cene, až 35 dní'],
      ['Šifrovanie', 'TLS povinné pri prenose, LUKS v pokoji'],
      ['Údržba', 'Týždenné okno podľa vášho výberu; minor verzie aplikované, major ponúknuté'],
      ['Metriky', 'Prometheus endpoint, log pomalých dopytov, štatistiky po dopytoch'],
      ['SLA', '99,9 % jeden uzol, 99,95 % so synchrónnou replikou'],
    ],
    plans: [
      { name: 'DB-2', for: 'Vývoj, malé aplikácie', price: 18,
        specs: [['2', 'vCPU'], ['4 GB', 'RAM'], ['80 GB', 'NVMe'], ['7 dní', 'PITR']] },
      { name: 'DB-4', for: 'Produkcia', price: 44, featured: true,
        specs: [['4', 'vCPU dedikované'], ['16 GB', 'RAM'], ['240 GB', 'NVMe'], ['14 dní', 'PITR']] },
      { name: 'DB-8', for: 'Vyťažená produkcia', price: 88,
        specs: [['8', 'vCPU dedikované'], ['32 GB', 'RAM'], ['480 GB', 'NVMe'], ['14 dní', 'PITR']] },
      { name: 'Replika', for: 'HA alebo škálovanie čítania', price: '+100 %',
        specs: [['Rovnaká', 'veľkosť ako primár'], ['Automatický', 'failover'], ['Sync alebo', 'async']] },
    ],
    planNote: 'Úložisko nad rámec zahrnutého je 0,12 €/GB-mesiac. Zálohy v rámci retenčného okna sú zdarma.',
    faq: [
      ['Môžem dostať superusera?', 'Doslova nie, ale rola, ktorú dostanete, vie vytvárať databázy, roly, rozšírenia zo zoznamu povolených a čítať každý štatistický pohľad. Ak potrebujete niečo mimo toho, opýtajte sa — zoznam rastie.'],
      ['Ako odídem?', 'pg_dump, mysqldump alebo slot logickej replikácie na server, ktorý prevádzkujete. Egress neúčtujeme.'],
      ['Podporujete upgrady major verzií?', 'Áno, na mieste s oknom údržby, alebo logickou replikáciou do novej inštancie s krátkym prepnutím, ak si výpadok nemôžete dovoliť.'],
    ],
    related: ['object-storage', 'kubernetes', 'backup'],
  },
  {
    slug: 'backup', name: 'Spravované zálohovanie', group: 'storage', icon: 'archive',
    menuNote: 'Nemenné off-site zálohy, 4,50 €/TB',
    tagline: 'Off-site, nemenné zálohovanie serverov, pracovných staníc a Microsoft 365.',
    from: '4,50 €/TB/mesiac',
    summary: 'Agentové zálohovanie pre Linux, Windows, macOS, VMware a Microsoft 365, zapisované do nemenného úložiska na Slovensku.',
    intro: `<p>Spravované zálohovanie je miesto pre kópie vecí, ktoré musia prežiť zlyhanie disku
      aj človeka s vašimi prihlasovacími údajmi. Zálohy sa zapisujú so zapnutým Object Lockom,
      takže kompromitovaný agent nemôže zmazať históriu — môže len prestať zapisovať nové kópie,
      na čo vás konzola upozorní.</p>
      <p>Služba je zámerne nudná: agent, rozvrh, retenčná politika, test obnovy, ktorý môžete
      spúšťať mesačne, a faktúra, ktorá počíta len uložené bajty.</p>`,
    features: [
      { title: 'Predvolene nemenné', body: 'Každá sada záloh sa zapisuje pod retenčným zámkom v režime compliance na dĺžku svojej politiky. Nikto — vrátane nás — ju nemôže zmazať skôr.' },
      { title: 'Testy obnovy, ktoré si naplánujete', body: 'Mesačná automatická obnova vzorky do dočasného priestoru so správou o úspechu alebo zlyhaní. Neotestovaná záloha je fáma.' },
      { title: 'Microsoft 365 a Google Workspace', body: 'Pošta, kalendáre, kontakty, OneDrive/Drive a SharePoint/zdieľané disky, za používateľa mesačne, s granulárnou obnovou po položkách.' },
      { title: 'Šifrovanie na strane klienta', body: 'Voliteľné end-to-end šifrovanie, kde kľúč nikdy neopustí vaše stroje. My potom držíme šifrový text, ktorý nevieme prečítať — a nevieme vám pomôcť s obnovou, ak kľúč stratíte.' },
      { title: 'Plánovanie s ohľadom na šírku pásma', body: 'Okná obmedzenia rýchlosti, blokové inkrementy a deduplikácia naprieč celou flotilou, aby nočný beh skončil pred začiatkom pracovného dňa.' },
    ],
    specs: [
      ['Agenti', 'Linux (deb/rpm), Windows 10/11 a Server 2019+, macOS 13+, VMware vSphere 7/8, Proxmox VE 8'],
      ['SaaS zdroje', 'Microsoft 365, Google Workspace'],
      ['Deduplikácia', 'Variabilné bloky, naprieč flotilou, pred šifrovaním'],
      ['Uchovávanie', 'GFS politiky až na 10 rokov'],
      ['Obnova', 'Plná, po súboroch, alebo spustenie obrazu priamo ako Cloud server'],
      ['SLA', '99,9 % dostupnosť služby zálohovania a obnovy'],
    ],
    plans: [
      { name: 'Úložisko', for: 'Servery a pracovné stanice', price: 4.5, unit: '/TB/mesiac', featured: true,
        specs: [['Neobmedzene', 'agentov'], ['Nemenné', 'podľa politiky'], ['Obnovy', 'zdarma']] },
      { name: 'Microsoft 365', for: 'Za chráneného používateľa', price: 1.9, unit: '/používateľ/mesiac',
        specs: [['Neobmedzené', 'úložisko'], ['Obnova', 'po položkách'], ['365 dní', 'uchovávanie']] },
      { name: 'Obnova do cloudu', for: 'Obnova po havárii', price: 0,
        specs: [['Spustiť', 'obraz ako VM'], ['Platíte len', 'za VM'], ['Bez', 'poplatku za obnovu']] },
    ],
    planNote: 'Cena podľa uložených bajtov po deduplikácii a kompresii, čo je pri typickej flotile 3–6× menej než zdroj.',
    faq: [
      ['Ak sú zálohy nemenné, ako si niekedy znížim účet?', 'Retenčné zámky expirujú s politikou. Skráťte politiku a úložisko ubúda, ako existujúce zámky vypršia — históriu nemôžete zmenšiť spätne, čo je celý zmysel.'],
      ['Môžem obnoviť na hardvér, ktorý nehostujete vy?', 'Áno. Obnovovací agent beží kdekoľvek a za obnovy sa neúčtuje egress.'],
      ['Je to náhrada replikácie?', 'Nie. Replikácia chráni pred zlyhaním hardvéru; záloha chráni pred chybami a zlým úmyslom. Chcete oboje.'],
    ],
    related: ['object-storage', 'hdrive', 'databases'],
  },

  // ------------------------------------------------------------ WEB
  {
    slug: 'web-hosting', name: 'Webhosting', group: 'web', icon: 'globe',
    menuNote: 'PHP, Node, Python, bezplatné TLS',
    tagline: 'Spravovaný hosting pre weby a aplikácie, s certifikátmi, poštou a stagingom v cene.',
    from: 'od 5,90 €/mesiac',
    summary: 'PHP, Node.js, Python a statický hosting s bezplatnými certifikátmi, dennými zálohami, staging kópiami a WordPressom na jeden klik.',
    intro: `<p>Webhosting je pre weby, ktoré nepotrebujú server: WordPress, aplikácia v Laraveli,
      frontend v Next.js, statický build z Git repozitára. Dostanete SSH a SFTP, skutočný shell,
      Composer a npm a ovládací panel, ktorý pred vami neskrýva súborový systém.</p>`,
    features: [
      { title: 'Certifikáty, ktoré sa obnovujú samy', body: 'Bezplatné ACME certifikáty pre každú doménu a subdoménu, vrátane wildcard, obnovované automaticky bez konfigurácie.' },
      { title: 'Staging kópie na jeden klik', body: 'Naklonujte web — súbory, databázu aj konfiguráciu — na staging URL, rozbite ho a potom ho pošlite späť alebo zahoďte.' },
      { title: 'Nasadenie z Gitu', body: 'Nasmerujte web na repozitár a vetvu; každý push zostaví a nasadí, s predchádzajúcim vydaním uchovaným na okamžitý rollback.' },
      { title: 'Denné zálohy, 30 dní', body: 'Súbory aj databázy, obnoviteľné po weboch alebo po súboroch z panela, bez príplatku.' },
      { title: 'Pošta v cene', body: 'Schránky na vašej doméne s nakonfigurovaným SPF, DKIM a DMARC, alebo nechajte poštu inde a my sa nebudeme pliesť.' },
      { title: 'Verzie runtime podľa vášho výberu', body: 'PHP 8.1–8.5, Node 20/22/24, Python 3.11–3.13, pre každý web zvlášť, prepínateľné bez tiketu.' },
    ],
    specs: [
      ['Webový server', 'nginx s HTTP/3, Brotli a PHP-FPM poolom pre každý web'],
      ['Databázy', 'MariaDB 11 a PostgreSQL 17, neobmedzene v rámci kvóty plánu'],
      ['Prístup', 'SSH, SFTP, WP-CLI, Composer, npm, cron s minútovým rozlíšením'],
      ['Cache', 'Objektová cache Redis/Valkey a full-page cache s invalidáciou podľa tagov'],
      ['Prenos', 'Nemeraný, fair use'],
      ['SLA', '99,9 % mesačná dostupnosť'],
    ],
    plans: [
      { name: 'Starter', for: 'Jeden malý web', price: 5.9,
        specs: [['1', 'web'], ['20 GB', 'NVMe'], ['5', 'schránok'], ['Denné', 'zálohy']] },
      { name: 'Studio', for: 'Freelanceri, agentúry', price: 14.9, featured: true,
        specs: [['20', 'webov'], ['150 GB', 'NVMe'], ['50', 'schránok'], ['Staging', 'v cene']] },
      { name: 'Business', for: 'Weby s vysokou návštevnosťou', price: 39,
        specs: [['100', 'webov'], ['500 GB', 'NVMe'], ['Neobmedzene', 'schránok'], ['Dedikovaná', 'CPU kvóta']] },
    ],
    planNote: 'Domény sa účtujú osobitne. Migrácia existujúceho webu je zdarma — spravíme ju za vás.',
    faq: [
      ['Presuniete mi web vy?', 'Áno, bezplatne, vrátane prepnutia DNS, pri ktoromkoľvek ročnom pláne. Pošlite nám prihlasovacie údaje k súčasnému poskytovateľovi a okno údržby.'],
      ['Obmedzujete CPU?', 'Každý web má CPU kvótu, aby jeden nájomca nepokazil stroj všetkým. Svoje využitie vidíte v paneli; ak ju dosahujete pravidelne, úprimná odpoveď je Cloud server a povieme vám to.'],
      ['Môžem hostovať weby klientov a ďalej predávať?', 'Áno, na Studio a Business. Zostávate zákazníkom v zázname a zodpovedáte za svojich klientov podľa Zásad prijateľného používania.'],
    ],
    related: ['domains', 'hmail', 'cloud-servers'],
  },
  {
    slug: 'domains', name: 'Domény', group: 'web', icon: 'lock',
    menuNote: '.sk, .eu, .com a 300 ďalších',
    tagline: 'Registrácia, transfer a DNS pre .sk a 300 ďalších koncoviek.',
    from: '.sk od 13,90 €/rok',
    summary: 'Akreditovaná registrácia s bezplatnou ochranou WHOIS tam, kde to register dovolí, DNSSEC a anycast DNS v cene.',
    intro: `<p>Domény sa predávajú za transparentnú cenu, obnovujú za rovnakú cenu a prevádzajú
      preč bez hádky. Obnova nikdy nestojí viac než registrácia, lebo lacný prvý rok nasledovaný
      trestnou obnovou je trik, nie cena.</p>`,
    features: [
      { title: 'Obnova za registračnú cenu', body: 'Cena, ktorú ste zaplatili v prvom roku, je cenou v druhom roku. Zverejňujeme celú tabuľku.' },
      { title: 'Anycast DNS v cene', body: 'Šesť bodov prítomnosti, DNSSEC podpisovanie a API na správu záznamov, bez ohľadu na to, či u nás hostujete čokoľvek iné.' },
      { title: 'Zámok transferu a zámok registra', body: 'Štandardný zámok transferu na každej doméne; zámok registra dostupný pri koncovkách, ktoré ho podporujú, pre mená, ktoré si nemôžete dovoliť stratiť.' },
      { title: 'Ochrana WHOIS, kde je povolená', body: 'Bezplatné skrytie údajov držiteľa pri koncovkách, ktorých register to dovolí. SK-NIC vyžaduje zverejnenie niektorých údajov — presne vám povieme, čo sa zverejní, skôr než kúpite.' },
      { title: 'Hromadné operácie', body: 'Importujte portfólio cez CSV, nastavte politiku obnovy pre každú doménu a dostaňte jednu faktúru.' },
    ],
    specs: [
      ['Akreditácia', 'Registrátor akreditovaný ICANN (žiadosť prebieha), registrátor SK-NIC'],
      ['Koncovky', '.sk, .cz, .eu, .com, .net, .org, .io, .dev, .app a ~300 ďalších'],
      ['DNS', 'Anycast, DNSSEC, ALIAS/ANAME na apexe, DoH/DoT resolvery'],
      ['Transfery', 'Zdarma dnu, zdarma von, bez poplatku za uvoľnenie'],
      ['Ochranné lehoty', '30 dní na obnovu po expirácii, 30 dní redemption za cenu registra plus 0 €'],
    ],
    plans: [
      { name: '.sk', for: 'Slovenská prítomnosť', price: 13.9, unit: '/rok', featured: true,
        specs: [['Obnova', 'za rovnakú cenu'], ['DNS', 'v cene'], ['DNSSEC', 'v cene']] },
      { name: '.eu', for: 'Celá EÚ', price: 8.9, unit: '/rok',
        specs: [['Obnova', 'za rovnakú cenu'], ['DNS', 'v cene'], ['Ochrana údajov', 'v cene']] },
      { name: '.com', for: 'Medzinárodná', price: 12.5, unit: '/rok',
        specs: [['Obnova', 'za rovnakú cenu'], ['DNS', 'v cene'], ['Ochrana údajov', 'v cene']] },
      { name: 'Len DNS', for: 'Domény vedené inde', price: 0,
        specs: [['Anycast', 'zóny'], ['API', 'prístup'], ['DNSSEC', 'podpisovanie']] },
    ],
    planNote: 'Zmeny cien registrov prenášame v skutočnej výške, oznámené najmenej 30 dní pred účinnosťou.',
    faq: [
      ['Môžem si nechať doménu a hostovať inde?', 'Áno. DNS hosting je bezplatný a bezpodmienečný a za nasmerovanie mena preč od nás nie je žiadna sankcia.'],
      ['Čo o mne zverejní SK-NIC?', 'Pri .sk sa vo verejnom registri zverejňuje meno a adresa držiteľa; kontaktný e-mail a telefón nie. Presný záznam vám ukážeme pred odoslaním.'],
      ['Ako dlho trvá transfer?', 'Pri .sk zvyčajne do hodiny, pri gTLD až päť dní, ak pôvodný registrátor využije celé potvrdzovacie okno.'],
    ],
    related: ['web-hosting', 'hmail', 'streaming'],
  },
  {
    slug: 'streaming', name: 'Streaming a médiá', group: 'web', icon: 'play',
    menuNote: 'VOD, live a rádio',
    tagline: 'Video na vyžiadanie, živé streamy a rádio, doručované zo Slovenska.',
    from: 'od 9,00 €/mesiac',
    summary: 'Transkódovanie, adaptívny streaming a prehrávač pre VOD, živé podujatia a audio, bez licenčných hier za diváka.',
    intro: `<p>Nahrajte súbor a dostanete adaptívne HLS a DASH verzie, náhľadový hárok, titulky
      a vložiteľný prehrávač. Alebo pošlite RTMP/SRT a dostanete živý stream s nízkou latenciou,
      DVR a automatickým nahrávaním do objektového úložiska.</p>
      <p>Audio je plnohodnotný prípad, nie dodatočný nápad: internetové rádio s plánovačom,
      štatistikami poslucháčov a endpointmi kompatibilnými s Icecastom.</p>`,
    features: [
      { title: 'Adaptívne transkódovanie', body: 'Rebríčky H.264 a AV1 generované pri nahraní, od 240p po 4K, s kódovaním podľa titulu, aby hovoriaca hlava nedostala bitrate určený na futbalový zápas.' },
      { title: 'Živé vysielanie s nízkou latenciou', body: 'Ingest RTMP, SRT a WebRTC; výstup LL-HLS s 2–4 sekundami od kamery po obrazovku, okno DVR a automatické nahrávanie VOD.' },
      { title: 'Prehrávač, ktorý si prispôsobíte', body: 'Vložiteľný prehrávač s vašimi farbami a logom, kapitolami, titulkami, rýchlosťou prehrávania a ovládacou lištou prístupnou z klávesnice.' },
      { title: 'Riadenie prístupu', body: 'Podpísané URL, zoznamy povolených domén, geografické obmedzenie a voliteľné šifrovanie AES-128 pre interný materiál.' },
      { title: 'Štatistiky bez sledovania divákov', body: 'Súhrnné prehrania, dopozeranie a šírka pásma. Žiadne profily divákov, žiadne pixely tretích strán, nič na zverejnenie v cookie lište.' },
    ],
    specs: [
      ['Ingest', 'HTTP upload, RTMP, SRT, WebRTC'],
      ['Výstup', 'HLS, LL-HLS, DASH, MP4 progresívne, Icecast pre audio'],
      ['Kodeky', 'H.264, HEVC, AV1, AAC, Opus'],
      ['Úložisko', 'Postavené na objektovom úložisku, účtované rovnako za 5,90 €/TB'],
      ['Doručovanie', 'Zo slovenského regiónu, s edge cache vo Viedni a Prahe'],
    ],
    plans: [
      { name: 'VOD', for: 'Knižnice a kurzy', price: 9,
        specs: [['500 GB', 'doručenie/mesiac'], ['100 GB', 'úložisko'], ['Transkódovanie', 'v cene']] },
      { name: 'Live', for: 'Podujatia a streamy', price: 29, featured: true,
        specs: [['2', 'súbežné kanály'], ['2 TB', 'doručenie/mesiac'], ['DVR +', 'nahrávanie']] },
      { name: 'Rádio', for: 'Rozhlasoví vysielatelia', price: 12,
        specs: [['1', 'stanica'], ['1 000', 'poslucháčov'], ['Plánovač', 'v cene']] },
    ],
    planNote: 'Ďalšie doručenie je 0,008 €/GB. Úložisko nad rámec zahrnutého sa účtuje sadzbami objektového úložiska.',
    faq: [
      ['Podporujete DRM?', 'Widevine a PlayReady sú v pláne; dnes ponúkame podpísané URL a AES-128, čo stačí na väčšinu školiaceho a interného materiálu, nie však na licencovaný film.'],
      ['Môžem použiť vlastnú CDN?', 'Áno. Origin je bežný HTTP origin a môžete pred neho postaviť akúkoľvek CDN.'],
    ],
    related: ['object-storage', 'web-hosting', 'domains'],
  },

  // ------------------------------------------------------------ KANCELÁRIA
  {
    slug: 'hsuite', name: 'hSuite', group: 'workplace', icon: 'suite',
    menuNote: 'Pošta, disk, stretnutia, chat a dokumenty',
    tagline: 'Celá kancelária — pošta, súbory, stretnutia, chat a dokumenty — na slovenských serveroch.',
    from: '4,90 €/používateľ/mesiac',
    summary: 'hMail, hDrive, hMeet, hChat a spoločné dokumenty v jednom predplatnom, jednej administrátorskej konzole, na jednej faktúre.',
    intro: `<p>hSuite je balík: pošta na vašej doméne, zdieľaný disk, videostretnutia, tímový chat
      a úprava dokumentov v reálnom čase, spravované z jednej konzoly a účtované za používateľa.</p>
      <p>Existuje preto, lebo alternatívou pre slovenskú organizáciu je dať celú svoju internú
      komunikáciu na infraštruktúru v inej jurisdikcii, financovanú reklamným biznisom. Nič v
      hSuite sa neskenuje, neprofiluje ani nepoužíva na trénovanie čohokoľvek.</p>`,
    features: [
      { title: 'Jedna administrátorská konzola', body: 'Používatelia, skupiny, zdieľané schránky, kvóty disku, relácie zariadení, retenčné pravidlá a audit logy na jednom mieste, s delegovanými administrátorskými rolami.' },
      { title: 'Dokumenty v reálnom čase', body: 'Spoločné textové dokumenty, tabuľky a prezentácie postavené na Collabora/LibreOffice, s úpravou .docx, .xlsx a .pptx na mieste.' },
      { title: 'Stretnutia bez inštalácie', body: 'hMeet beží v prehliadači, do 150 účastníkov, s nahrávaním do hDrive, živými titulkami po slovensky, anglicky a česky a telefonickými číslami na požiadanie.' },
      { title: 'Chat s históriou pod vašou kontrolou', body: 'Kanály, vlákna, priame správy, zdieľanie súborov a vyhľadávanie, s retenčnou politikou, ktorú nastavíte pre každý kanál.' },
      { title: 'Migrácia z Microsoft 365 alebo Googlu', body: 'Poštu, kalendáre, kontakty a súbory presunieme za vás, s oknom súbežnej prevádzky, aby počas prechodu nič neprestalo fungovať.' },
      { title: 'Bez reklamy, bez profilovania', body: 'Váš obsah sa spracúva na poskytnutie služby a na nič iné. Toto je zmluvné ustanovenie v Zmluve o spracúvaní osobných údajov, nie marketingová veta.' },
    ],
    specs: [
      ['V cene', 'hMail, hDrive, hMeet, hChat, hDocs, zdieľané kalendáre a kontakty'],
      ['Úložisko', '50 GB pošta + 1 TB disk na používateľa pri Standarde; zdieľané v rámci organizácie'],
      ['Protokoly', 'IMAP, SMTP, JMAP, CalDAV, CardDAV, WebDAV, ActiveSync'],
      ['Identita', 'Vstavaný adresár, alebo SAML/OIDC federácia s vaším IdP; SCIM provisioning'],
      ['Zariadenia', 'Web, iOS, Android a ktorýkoľvek štandardný desktopový klient'],
      ['Umiestnenie dát', 'Len Slovensko, so subdodávateľmi uvedenými v Zmluve o spracúvaní osobných údajov'],
    ],
    plans: [
      { name: 'Basic', for: 'Malé tímy', price: 4.9, unit: '/používateľ/mesiac',
        specs: [['20 GB', 'pošta'], ['200 GB', 'disk'], ['hMeet', '50 účastníkov'], ['hChat', 'v cene']] },
      { name: 'Standard', for: 'Väčšina organizácií', price: 8.9, unit: '/používateľ/mesiac', featured: true,
        specs: [['50 GB', 'pošta'], ['1 TB', 'disk'], ['hMeet', '150 účastníkov'], ['SSO +', 'SCIM']] },
      { name: 'Advanced', for: 'Regulované a väčšie', price: 14.9, unit: '/používateľ/mesiac',
        specs: [['100 GB', 'pošta'], ['3 TB', 'disk'], ['Retencia', 'a legal hold'], ['Audit', 'export']] },
      { name: 'Neziskovky / školy', for: 'Overené organizácie', price: '−50 %',
        specs: [['Ktorýkoľvek', 'plán'], ['Overenie', 'ročne'], ['Rovnaké', 'funkcie']] },
    ],
    planNote: 'Minimálne jeden používateľ, bez viazanosti pri mesačnej fakturácii. Ročná fakturácia znižuje cenu o 15 %.',
    faq: [
      ['Môžeme si nechať existujúcu poštovú doménu?', 'Áno — to je bežný prípad. Dáme vám DNS záznamy a počas migrácie môžete prevádzkovať rozdelenú doménu.'],
      ['Existuje offline desktopový klient?', 'Použite ľubovoľného IMAP/CalDAV klienta: Thunderbird, Outlook, Apple Mail. Thunderbird a Outlook testujeme pri každom vydaní a ActiveSync pokrýva profily Outlooku, ktoré očakávajú Exchange.'],
      ['Čo sa stane s našimi dátami, ak odídeme?', 'Exportujte všetko — poštu ako mbox alebo EML, súbory tak, ako sú, kalendáre ako ICS — z administrátorskej konzoly kedykoľvek, bez pýtania a bez poplatku.'],
    ],
    related: ['hmail', 'hdrive', 'backup'],
  },
  {
    slug: 'hmail', name: 'hMail', group: 'workplace', icon: 'at',
    menuNote: 'Pošta na vašej doméne, od 1,50 €',
    tagline: 'Pošta na vlastnej doméne, s poriadne spraveným antispamom a bez čítania strojmi.',
    from: '1,50 €/používateľ/mesiac',
    summary: 'Štandardný poštový hosting so SPF, DKIM, DMARC a MTA-STS nakonfigurovanými za vás a doručiteľnosťou, ktorú naozaj sledujeme.',
    intro: `<p>hMail je poštový hosting pre organizácie, ktoré chcú vlastnú doménu, fungujúcu
      doručiteľnosť a schránku, ktorú nikto iný nečíta. Hovorí IMAP, SMTP a JMAP, synchronizuje
      kalendáre a kontakty cez CalDAV a CardDAV a má webového klienta dosť rýchleho na to, aby bol
      tým hlavným.</p>`,
    features: [
      { title: 'Doručiteľnosť ako služba', body: 'Zverejňujeme a monitorujeme vaše záznamy SPF, DKIM, DMARC a MTA-STS, sledujeme reputáciu u veľkých prijímateľov a povieme vám, keď sa kampaň chystá dostať vás na blacklist.' },
      { title: 'Antispam a antiphishing', body: 'Filtrovanie podľa reputácie, obsahu a autentifikácie s karanténou, ktorú si každý používateľ ovláda sám, plus detekcia falšovania zobrazovaného mena pri pokusoch o internú impersonáciu.' },
      { title: 'Aliasy, skupiny a zdieľané schránky', body: 'Neobmedzené aliasy, distribučné zoznamy, catch-all a zdieľané schránky s oprávneniami na používateľa — nič z toho nespotrebúva licenciu.' },
      { title: 'Retencia a legal hold', body: 'Retenčné politiky pre celú organizáciu a legal hold pre používateľa pri Advanced, s auditovateľným exportom.' },
      { title: 'Žiadne skenovanie okrem bezpečnosti', body: 'Obsah správ sa spracúva na filtrovanie spamu a malvéru, doručenie a indexovanie vyhľadávania pre majiteľa schránky. Nič iné.' },
    ],
    specs: [
      ['Protokoly', 'IMAP4rev2, SMTP so submission, JMAP, CalDAV, CardDAV, ActiveSync'],
      ['Autentifikácia', 'SPF, DKIM, DMARC, ARC, MTA-STS, TLS-RPT, DANE'],
      ['Limity', '500 príjemcov/hodinu pri Basic, 2 000 pri Standard, viac na požiadanie'],
      ['Max. veľkosť správy', '50 MB, veľké prílohy sa presúvajú do odkazov hDrive'],
      ['Šifrovanie', 'TLS povinné dnu aj von, kde ho protistrana podporuje; S/MIME a OpenPGP vo webovom klientovi'],
      ['SLA', '99,9 % mesačná dostupnosť'],
    ],
    plans: [
      { name: 'Schránka', for: 'Za používateľa', price: 1.5, unit: '/používateľ/mesiac', featured: true,
        specs: [['20 GB', 'pošta'], ['Neobmedzene', 'aliasov'], ['Kalendár +', 'kontakty']] },
      { name: 'Schránka Plus', for: 'Náročnejší používatelia pošty', price: 3.5, unit: '/používateľ/mesiac',
        specs: [['100 GB', 'pošta'], ['Legal', 'hold'], ['S/MIME', 'správa']] },
      { name: 'Zdieľaná schránka', for: 'info@, support@', price: 0,
        specs: [['V cene', 'každého plánu'], ['Oprávnenia', 'na používateľa'], ['Zdieľané', 'odoslané']] },
    ],
    planNote: 'Doména nemusí byť registrovaná u nás. Prineste si vlastnú a nasmerujte MX.',
    faq: [
      ['Môžem migrovať z Microsoft 365 bez výpadku?', 'Áno. Synchronizujeme schránky cez IMAP, kým váš MX ešte smeruje na starého poskytovateľa, potom MX prepneme v čase, ktorý si vyberiete, a dosynchronizujeme rozdiel.'],
      ['Ponúkate catch-all?', 'Áno, predvolene vypnutý, lebo catch-all je magnet na spam. Zapnite si ho pre doménu, ak ho potrebujete.'],
      ['Prejdú moje newslettre?', 'Hromadné odosielanie zo služby schránok je zámerne obmedzené. Na kampane použite vyhradenú odosielaciu doménu a poriadny ESP — pomôžeme vám nastaviť DNS a Zásady prijateľného používania vysvetľujú, čo nedovoľujeme.'],
    ],
    related: ['hsuite', 'domains', 'hdrive'],
  },
  {
    slug: 'hdrive', name: 'hDrive', group: 'workplace', icon: 'folder',
    menuNote: 'Súbory, synchronizácia a zdieľanie — 1 TB od 3,90 €',
    tagline: 'Súbory, ktoré sa synchronizujú, zdieľajú a verziujú, uložené tam, kde na ne ukážete na mape.',
    from: '3,90 €/mesiac za 1 TB',
    summary: 'Synchronizácia na desktope a mobile, selektívne offline súbory, verejné odkazy s heslom a expiráciou a úplná história verzií.',
    intro: `<p>hDrive je úložisko súborov pre ľudí, nie pre programy: synchronizovaný priečinok na
      každom stroji, webové rozhranie, zdieľané tímové priestory a odkazy, ktoré môžete dať niekomu
      mimo organizácie bez zakladania účtu.</p>
      <p>Pod ním je to isté replikované úložisko ako zvyšok platformy a nad ním história verzií,
      ktorá siaha dosť ďaleko na to, aby sa dal vrátiť zlý pondelok.</p>`,
    features: [
      { title: 'Synchronizační klienti, ktorí sa správajú', body: 'Klienti pre Windows, macOS a Linux so selektívnou synchronizáciou, zástupnými súbormi na vyžiadanie a riešením konfliktov, ktoré uchová obe verzie namiesto výberu jednej.' },
      { title: 'História verzií a kôš, ktorý počká', body: 'Každé uloženie je verziou 90 dní; zmazané súbory potom zostávajú v koši 30 dní. Oboje obnovíte z ktoréhokoľvek klienta.' },
      { title: 'Zdieľanie s dátumom expirácie', body: 'Verejné odkazy s voliteľným heslom, limitom stiahnutí, dátumom expirácie a drop boxy len na nahrávanie na zber súborov zvonku.' },
      { title: 'Tímové priestory so skutočnými oprávneniami', body: 'Zdieľané priestory s rolami čítanie, zápis a správa, členstvom v skupinách a prehľadom aktivity, kto čo zmenil.' },
      { title: 'Úprava na mieste', body: 'Otvorte .docx alebo .xlsx priamo z hDrive v hDocs, upravujte spoločne a uložte späť do toho istého súboru.' },
      { title: 'End-to-end šifrované priečinky', body: 'Voliteľné priečinky šifrované na strane klienta pre materiál, ktorý by sme nemali vedieť prečítať. Vyhľadávanie v nich nefunguje — to je poctivá výmena.' },
    ],
    specs: [
      ['Klienti', 'Windows 10+, macOS 13+, Linux (AppImage, deb, rpm), iOS, Android'],
      ['Protokoly', 'WebDAV, S3 brána pri plánoch Team, verejné REST API'],
      ['Max. veľkosť súboru', '250 GB'],
      ['Verziovanie', '90 dní, neobmedzený počet verzií, nezapočítavajú sa do kvóty'],
      ['Zdieľanie', 'Odkazy, skupiny, externí hostia (zdarma, bez licencie)'],
      ['SLA', '99,9 % mesačná dostupnosť'],
    ],
    plans: [
      { name: 'Solo 1 TB', for: 'Jedna osoba', price: 3.9,
        specs: [['1 TB', 'úložisko'], ['1', 'používateľ'], ['História', 'verzií']] },
      { name: 'Team 3 TB', for: 'Do 6 ľudí', price: 11.9, featured: true,
        specs: [['3 TB', 'zdieľané'], ['6', 'používateľov'], ['Tímové', 'priestory'], ['Hostia', 'zdarma']] },
      { name: 'Team 10 TB', for: 'Rastúce organizácie', price: 29,
        specs: [['10 TB', 'zdieľané'], ['Neobmedzene', 'používateľov'], ['S3', 'brána'], ['Audit', 'log']] },
      { name: 'Ďalšie úložisko', for: 'Ktorýkoľvek plán', price: 3.2, unit: '/TB/mesiac',
        specs: [['Zdieľané', 'okamžite'], ['Bez', 'poplatku za egress'], ['Pomerne', 'mesačne']] },
    ],
    planNote: 'Externí hostia nikdy nespotrebúvajú miesto. Používatelia nad limit plánu sú po 2,00 € mesačne.',
    faq: [
      ['Je to Nextcloud?', 'Je postavený na serveri Nextcloud s naším vlastným úložiskovým backendom, balením synchronizačného klienta a podporou. Hovoríme to otvorene, lebo si zaslúžite vedieť, odkiaľ a kam sa dá migrovať.'],
      ['Môžem ho pripojiť ako disk?', 'Áno, cez WebDAV, hoci synchronizačný klient je rýchlejší a funguje offline. Team 10 TB navyše vystavuje S3 endpoint pre automatizované workflow.'],
      ['Žerie história verzií moju kvótu?', 'Nie. Verzie a kôš sú uložené na našej strane merača.'],
    ],
    related: ['hsuite', 'backup', 'object-storage'],
  },

  // ------------------------------------------------------------ TEPLO
  {
    slug: 'heat-offtake', name: 'Odber tepla', group: 'heat', icon: 'flame',
    menuNote: 'Zmluvné teplo pre siete CZT',
    tagline: 'Pre teplárne: zmluvné rekuperované teplo so zľavou oproti vašej cene plynu.',
    from: 'zmluvne, indexované na vašu cenu plynu',
    summary: 'Dlhodobá zmluva o dodávke tepla s prevádzkovateľom siete CZT: rekuperované teplo z dátového centra, dodané do siete, lacnejšie než z plynu.',
    intro: `<p>Toto je druhá strana biznisu a nepredáva sa na používateľa. Ak prevádzkujete sieť
      centrálneho zásobovania teplom — teplárenskú spoločnosť, mestský podnik, bytové družstvo
      s vlastnou kotolňou — umiestnime dátové centrum vedľa vašej siete a predáme vám teplo,
      ktoré vyrába.</p>
      <p>Obchodná podoba je zmluva o dodávke tepla na 10 až 15 rokov, s pevnou zľavou oproti vašej
      cene tepla z plynu a indexovaná na ten istý plynový benchmark, takže zľava drží bez ohľadu na
      to, kam sa cena plynu pohne. Vzťah so zákazníkmi aj sieť zostávajú vám; my dodávame horúcu
      vodu na teplote vášho primáru do vašej odovzdávacej stanice.</p>`,
    features: [
      { title: 'Cena oproti vašej skutočnej alternatíve', body: 'Referenciou je vaša cena dodaného tepla z plynu, nie spotový index, ktorý sa nedá zaistiť. Zmluva uvádza percentuálnu zľavu oproti nej.' },
      { title: 'Technické riziko berieme my', body: 'Tepelné čerpadlá, výmenníky, riadenie a pripojenie na vašu odovzdávaciu stanicu sú náš capex a naša povinnosť údržby, až po dohodnutý bod dodávky.' },
      { title: 'Záloha podľa návrhu', body: 'Vaša existujúca prevádzka zostáva ako záloha a špičková kapacita. Rekuperované teplo je príspevok v základnom zaťažení, typicky 20–40 % ročnej spotreby siete pri mierke, ktorú staviame.' },
      { title: 'Balík financovania je súčasťou dohody', body: 'Modernizačný fond, Program Slovensko a nástroje ELENA/EIB mieria presne sem. Žiadosti pripravíme my; financuje sa tepelné aktívum.' },
      { title: 'Merané a auditovateľné', body: 'Dodávka sa meria na odovzdávacej stanici rovnakým štandardom ako každý iný zdroj tepla vo vašej sieti, s dátami priebežne dostupnými pre vás.' },
      { title: 'Povinnosti účinnosti, splnené', body: 'Integrácia odpadového tepla sa započítava do kritérií účinného CZT podľa smernice EED 2023/1791 — smer, ktorým vás regulácia už tlačí.' },
    ],
    specs: [
      ['Teplota dodávky', '70–85 °C na odovzdávacej stanici, tepelným čerpadlom zdvihnuté z okruhu 40–50 °C'],
      ['Tepelný výkon', '1–5 MW tepelných na lokalitu v prvej fáze, rozšíriteľné s IT záťažou'],
      ['Dostupnosť', 'Základné zaťaženie; zmluvná ročná dodávka s minimálnym odberom a stropom'],
      ['Dĺžka zmluvy', '10–15 rokov, predĺženie dohodou'],
      ['Cenový mechanizmus', 'Zľava oproti vašej cene dodaného tepla z plynu, indexovaná na ten istý benchmark'],
      ['Bod dodávky', 'Príruba vašej odovzdávacej stanice; všetko pred ňou je naše'],
    ],
    plans: null,
    planNote: null,
    faq: [
      ['Čo od nás potrebujete na začiatok?', 'Teplotu primáru a spiatočky vašej siete, ročný profil odberu, umiestnenie kandidátskych odovzdávacích staníc a vašu súčasnú cenu dodaného tepla. Na indikatívny term sheet to stačí.'],
      ['Čo ak je vaše dátové centrum prázdne?', 'Zmluva obsahuje minimálnu ročnú dodávku so zmluvnou pokutou, krytú naším vlastným plynovým alebo elektrickým kotlom ako zálohou. Nie ste vystavení nášmu obchodnému pipeline.'],
      ['Prečo je teplo lacnejšie než plyn?', 'Lebo elektrinu nám už zaplatili zákazníci výpočtového výkonu. Teplo je vedľajší produkt s marginálnym nákladom elektriny pre tepelné čerpadlá plus údržby — hlboko pod cenou spálenia plynu na ten istý joule.'],
      ['Je to niekde overené?', 'Áno. Dátové centrum D4 spoločnosti Infomaniak v Ženeve od novembra 2024 dodáva približne celú svoju spotrebu elektriny do ženevskej siete ako teplo, 1,7 MW tepelných. Výskumná štúdia, z ktorej táto firma vyrástla, to dokumentuje spolu so slovenskými číslami za tým.'],
    ],
    related: ['gpu-cloud', 'cloud-servers'],
  },
];
