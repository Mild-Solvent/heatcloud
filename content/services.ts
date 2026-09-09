// The service catalogue — one entry per product page. Drives the mega-menu,
// the product grid, every product page, /pricing/ and the footer.
// Ported from the previous static build; the copy is unchanged.

export type Plan = {
  name: string; for: string; price: string; unit?: string;
  specs: [string, string?][]; featured?: boolean; cta?: string;
};
export type Service = {
  slug: string; name: string; group: GroupKey; icon: string;
  menuNote: string; tagline: string; from: string; summary: string; intro: string;
  features: { title: string; body: string }[];
  specs: [string, string][];
  plans: Plan[] | null; planNote: string | null;
  faq: [string, string][];
  related: string[];
};
export type GroupKey = 'compute' | 'storage' | 'web' | 'workplace' | 'heat';
export type Group = { key: GroupKey; title: string; blurb: string };

export const groups: Group[] = [
  { key: 'compute',   title: 'Compute',            blurb: 'Virtual machines, containers and accelerators in Slovak racks.' },
  { key: 'storage',   title: 'Storage & data',     blurb: 'Object storage, managed databases and backup that never leaves the country.' },
  { key: 'web',       title: 'Web & domains',      blurb: 'Hosting, names, certificates and media delivery.' },
  { key: 'workplace', title: 'Workplace',          blurb: 'Mail, files, meetings and documents for your whole team.' },
  { key: 'heat',      title: 'Heat',               blurb: 'The other half of the business: thermal energy sold to district networks.' },
];

export const services: Service[] = [
  // ------------------------------------------------------------ COMPUTE
  {
    slug: 'cloud-servers', name: 'Cloud Servers', group: 'compute', icon: 'server',
    menuNote: 'Predictable VMs on NVMe, per-month billing',
    tagline: 'Virtual machines with a fixed monthly price, NVMe storage and no egress bill.',
    from: 'from €4.90/month',
    summary: 'General-purpose VMs with dedicated or shared vCPU, local NVMe and a flat monthly price that includes traffic.',
    intro: `<p>A Cloud Server is a KVM virtual machine on our own hardware in a Slovak data centre.
      You pick a size, we give you a root-capable machine in about 40 seconds with a public IPv4,
      a /64 of IPv6 and traffic included in the price. No hourly surprises, no per-gigabyte egress
      invoice at the end of the month.</p>
      <p>Every size is available with <b>shared</b> vCPU (cheaper, burstable, fine for staging and
      small web workloads) or <b>dedicated</b> vCPU (a physical core thread reserved for you, for
      databases, CI runners and anything latency-sensitive).</p>`,
    features: [
      { title: 'Boots in under a minute', body: 'Ubuntu, Debian, Rocky, AlmaLinux, Fedora, openSUSE, Windows Server (BYOL) or your own ISO. Cloud-init on every image.' },
      { title: 'Snapshots and scheduled backups', body: 'Point-in-time snapshots on demand; automatic daily backups with 7, 14 or 30 day retention for 20% of the instance price.' },
      { title: 'Resize without rebuilding', body: 'Scale CPU and RAM up or down on a reboot. Disk grows online. Downgrades are allowed once a month.' },
      { title: 'Private networking', body: 'Free VXLAN private networks between your instances at 10 Gb/s, with no traffic charge and no exposure to the public internet.' },
      { title: 'Firewall in front of the hypervisor', body: 'Stateful rules applied at the virtual switch, so blocked traffic never touches your instance or your CPU budget.' },
      { title: 'DDoS mitigation included', body: 'Volumetric scrubbing at the border on every instance, at no extra cost and with no traffic reclassification.' },
    ],
    specs: [
      ['Virtualisation', 'KVM on AMD EPYC 9004 / Intel Xeon Scalable 4th gen'],
      ['Storage', 'Local NVMe, triple-replicated Ceph for volumes'],
      ['Network', '1 Gb/s guaranteed, 10 Gb/s burst, unmetered traffic (fair use 20 TB/month)'],
      ['Addresses', '1 × IPv4 included, /64 IPv6, extra IPv4 €2.00/month'],
      ['Regions', 'sk-bts-1 (Bratislava), sk-kos-1 (Košice, planned)'],
      ['API', 'OpenStack-compatible REST API, Terraform provider, CLI'],
      ['SLA', '99.9% monthly availability — see the SLA'],
    ],
    plans: [
      { name: 'HC-2', for: 'Staging, small sites', price: '€4.90',
        specs: [['2', 'vCPU shared'], ['4 GB', 'RAM'], ['60 GB', 'NVMe'], ['20 TB', 'traffic']] },
      { name: 'HC-4', for: 'Production web apps', price: '€11.90', featured: true,
        specs: [['4', 'vCPU shared'], ['8 GB', 'RAM'], ['120 GB', 'NVMe'], ['20 TB', 'traffic']] },
      { name: 'HC-8D', for: 'Databases, CI', price: '€38.00',
        specs: [['8', 'vCPU dedicated'], ['32 GB', 'RAM'], ['360 GB', 'NVMe'], ['20 TB', 'traffic']] },
      { name: 'HC-16D', for: 'Heavy, steady load', price: '€76.00',
        specs: [['16', 'vCPU dedicated'], ['64 GB', 'RAM'], ['720 GB', 'NVMe'], ['20 TB', 'traffic']] },
    ],
    planNote: 'Billed monthly in advance, cancellable at the end of any month. Annual payment takes 15% off.',
    faq: [
      ['Is the traffic really unmetered?', 'Yes, within a fair-use ceiling of 20 TB per instance per month. Above that we ask you to move to a Public Cloud instance with metered traffic rather than charging you an overage rate — it works out cheaper for both of us.'],
      ['Can I run my own hypervisor or nested virtualisation?', 'Nested virtualisation is enabled on dedicated-vCPU sizes. Running a public hosting service on top of a single instance is fine; reselling raw compute is not — see the Acceptable Use Policy.'],
      ['What happens to my data if I stop paying?', 'Instances are suspended 7 days after an unpaid invoice, and deleted 30 days after suspension. You can download a full disk image at any point during that window.'],
      ['Do you have a free tier?', 'No. We would rather charge €4.90 and stay in business than run a free tier and fund it from your data.'],
    ],
    related: ['public-cloud', 'kubernetes', 'object-storage'],
  },
  {
    slug: 'public-cloud', name: 'Public Cloud', group: 'compute', icon: 'cloud',
    menuNote: 'OpenStack, billed by the second',
    tagline: 'A standards-based OpenStack cloud, billed by the second, with no lock-in.',
    from: 'from €0.0061/vCPU-hour',
    summary: 'Full OpenStack: Nova, Cinder, Neutron, Octavia and Magnum, billed by the second with an open API.',
    intro: `<p>Public Cloud is our OpenStack region. It speaks the same API as every other
      OpenStack cloud on earth, which means Terraform, Pulumi, Ansible, Packer and the
      <code>openstack</code> CLI work against it unmodified, and your exit plan is a
      <code>terraform apply</code> against someone else's endpoint.</p>
      <p>Billing is per second of runtime, with a monthly cap per flavour equal to the equivalent
      Cloud Server price — so a machine you forget to delete never costs more than a fixed monthly VM.</p>`,
    features: [
      { title: 'Per-second billing with a monthly cap', body: 'Pay for what you run. Once an instance has run long enough in a month to reach the flat monthly rate, the rest of the month is free.' },
      { title: 'Load balancers and floating IPs', body: 'Octavia load balancers with TLS termination, HTTP/2 and health checks, from €0.021/hour.' },
      { title: 'Block storage that survives the instance', body: 'Cinder volumes on triple-replicated NVMe, snapshot-able, attachable to any instance in the region.' },
      { title: 'Projects, quotas and RBAC', body: 'Split your organisation into projects with their own quotas, users and API credentials. Keystone federation with your own IdP on request.' },
      { title: 'Terraform and Ansible first', body: 'We publish reference modules for the common shapes: a hardened VM, a three-node etcd, an autoscaled web tier behind Octavia.' },
    ],
    specs: [
      ['OpenStack release', '2026.1 (Epoxy), upgraded within two releases'],
      ['Services', 'Keystone, Nova, Glance, Cinder, Neutron, Octavia, Magnum, Barbican, Heat'],
      ['Compute flavours', 'a1 (shared), d1 (dedicated), m1 (memory), g1 (GPU)'],
      ['Egress', '€0.008/GB out, ingress free, first 1 TB/month per project free'],
      ['Authentication', 'Application credentials, EC2 keypairs, optional OIDC federation'],
      ['SLA', '99.9% API availability, 99.95% instance availability'],
    ],
    plans: [
      { name: 'a1 shared', for: 'Burstable, general purpose', price: '€0.0061', unit: '/vCPU-hour',
        specs: [['2 GB', 'RAM per vCPU'], ['€4.90', 'monthly cap (2 vCPU)'], ['NVMe', 'root disk']] },
      { name: 'd1 dedicated', for: 'Steady, latency-sensitive', price: '€0.0163', unit: '/vCPU-hour', featured: true,
        specs: [['4 GB', 'RAM per vCPU'], ['€38.00', 'monthly cap (8 vCPU)'], ['NVMe', 'root disk']] },
      { name: 'm1 memory', for: 'Caches, analytics', price: '€0.0224', unit: '/vCPU-hour',
        specs: [['8 GB', 'RAM per vCPU'], ['€64.00', 'monthly cap (4 vCPU)'], ['NVMe', 'root disk']] },
      { name: 'Block storage', for: 'Cinder volumes', price: '€0.079', unit: '/GB-month',
        specs: [['3×', 'replication'], ['Snapshots', '€0.039/GB-month'], ['No', 'IOPS charge']] },
    ],
    planNote: 'Public Cloud is metered; Cloud Servers are the same hardware at a flat monthly price. Pick whichever billing model suits the workload.',
    faq: [
      ['How is this different from Cloud Servers?', 'Same racks, same disks. Cloud Servers are a simplified flat-rate product with a small control panel; Public Cloud is the raw OpenStack API with metered billing, projects and quotas.'],
      ['Can I move my images in and out?', 'Yes. Glance accepts and exports qcow2 and raw images, and image download traffic is not billed.'],
      ['Is there object storage in the same API?', 'Our object storage speaks S3 rather than Swift. It is in the same region and traffic between it and your instances is free.'],
    ],
    related: ['cloud-servers', 'kubernetes', 'object-storage'],
  },
  {
    slug: 'kubernetes', name: 'Managed Kubernetes', group: 'compute', icon: 'k8s',
    menuNote: 'Free control plane, you pay for nodes',
    tagline: 'Upstream Kubernetes with a control plane we run for free, and nodes you pay for.',
    from: 'control plane free, nodes from €11.90/month',
    summary: 'CNCF-conformant Kubernetes, highly-available control plane at no charge, autoscaling node pools and a CSI on replicated NVMe.',
    intro: `<p>We run the control plane — three etcd members across three fault domains, API server,
      scheduler, controller manager, monitoring, patching and version upgrades — and we do not
      charge for it. You pay for the worker nodes, which are ordinary Cloud Servers, and for
      whatever storage and load balancers your workloads ask for.</p>
      <p>It is upstream Kubernetes, CNCF-conformant, with no forked API. Your manifests, Helm
      charts and operators work the way they do everywhere else.</p>`,
    features: [
      { title: 'Free, highly-available control plane', body: 'Three-node etcd across independent power and network domains. We patch it; you never see it.' },
      { title: 'Autoscaling node pools', body: 'Set a minimum and maximum per pool. The cluster autoscaler adds and removes nodes on pending pods, and you are billed per second for the ones that exist.' },
      { title: 'CSI, CNI and CCM included', body: 'Cinder CSI for persistent volumes, Cilium as the CNI with network policy and Hubble, and a cloud controller manager that turns Services of type LoadBalancer into real Octavia load balancers.' },
      { title: 'Version upgrades you control', body: 'We support the three most recent minor versions. Upgrades are one click or one API call, node pool by node pool, with configurable surge and drain timeouts.' },
      { title: 'Private clusters', body: 'Optionally the API server is reachable only from your private network or an allow-list of CIDRs, with no public endpoint at all.' },
    ],
    specs: [
      ['Kubernetes versions', '1.32, 1.33, 1.34'],
      ['CNI', 'Cilium with eBPF datapath, network policy, Hubble observability'],
      ['Storage classes', 'nvme-replicated (default), nvme-local (fast, node-bound)'],
      ['Ingress', 'Bring your own; ingress-nginx and Traefik charts are tested each release'],
      ['Registry', 'Free private container registry, 50 GB per cluster'],
      ['SLA', '99.95% control plane API availability on clusters with three or more nodes'],
    ],
    plans: [
      { name: 'Control plane', for: 'HA, managed by us', price: '€0.00', specs: [['3', 'etcd members'], ['Upgrades', 'included'], ['Monitoring', 'included']] },
      { name: 'Node pool — small', for: 'Web and API workloads', price: '€11.90', featured: true,
        specs: [['4', 'vCPU shared'], ['8 GB', 'RAM'], ['120 GB', 'NVMe']] },
      { name: 'Node pool — dedicated', for: 'Stateful, steady load', price: '€38.00',
        specs: [['8', 'vCPU dedicated'], ['32 GB', 'RAM'], ['360 GB', 'NVMe']] },
      { name: 'Node pool — GPU', for: 'Inference, training', price: '€0.79', unit: '/hour',
        specs: [['1 ×', 'NVIDIA L40S'], ['16', 'vCPU dedicated'], ['96 GB', 'RAM']] },
    ],
    planNote: 'Load balancers, persistent volumes and egress are billed at Public Cloud rates.',
    faq: [
      ['Really free control plane? What is the catch?', 'The control plane costs us a fraction of a node, and a cluster with no workers is worth nothing to either of us. Clusters with fewer than three worker nodes get a single-replica control plane and no SLA.'],
      ['Can I use my own ingress controller and cert-manager?', 'Yes. We deploy nothing into your cluster except the CNI, CSI and cloud controller manager, and each of those can be disabled if you want to run your own.'],
      ['Do you support GPU nodes?', 'Yes — the NVIDIA device plugin and driver are pre-installed on GPU node pools. See GPU Cloud for the available accelerators.'],
    ],
    related: ['public-cloud', 'gpu-cloud', 'databases'],
  },
  {
    slug: 'gpu-cloud', name: 'GPU Cloud', group: 'compute', icon: 'chip',
    menuNote: 'L40S and H200 by the hour — and the heat goes to town',
    tagline: 'Accelerators by the hour, in a hall built to sell the heat they produce.',
    from: 'from €0.79/hour',
    summary: 'NVIDIA L40S and H200 instances for training and inference, in the racks whose waste heat is contracted to a district network.',
    intro: `<p>GPUs are the reason this company can heat a town. A rack of accelerators turns
      essentially all of its electrical input into heat at a temperature high enough to be worth
      capturing — and unlike a general-purpose fleet, it runs near full load for months at a time,
      which is exactly what a heat offtake contract needs.</p>
      <p>So the compute is priced to be competitive on its own merits, and the thermal revenue
      underneath it is what lets us keep it that way.</p>`,
    features: [
      { title: 'Bare-metal or virtualised', body: 'Full passthrough of one, two, four or eight accelerators, or MIG slices of an H200 for inference workloads that do not need a whole card.' },
      { title: 'No egress charge on model artefacts', body: 'Pulling a checkpoint out of object storage in the same region is free, and so is downloading your trained weights.' },
      { title: 'Fast local scratch', body: 'Every GPU host carries local NVMe scratch sized at 1 TB per accelerator, for datasets you do not want to stream.' },
      { title: 'Reserved capacity at a discount', body: 'One-month, three-month and twelve-month reservations at 20%, 30% and 40% off the hourly rate — and a reservation is what lets us commit heat to the network.' },
      { title: 'Direct liquid cooling', body: 'H200 nodes are direct-to-chip liquid cooled with a return temperature high enough to feed a heat pump efficiently, which is why they are cheaper here than in an air-cooled hall.' },
    ],
    specs: [
      ['Accelerators', 'NVIDIA L40S 48 GB, NVIDIA H200 SXM 141 GB'],
      ['Interconnect', 'NVLink within an H200 node, 400 Gb/s InfiniBand between nodes'],
      ['Drivers', 'CUDA 13.x images, PyTorch and JAX base images maintained by us'],
      ['Scratch', '1 TB local NVMe per accelerator'],
      ['Cooling', 'Direct-to-chip liquid on H200, rear-door heat exchanger on L40S'],
      ['Heat recovery', 'Return water at 45–50 °C, lifted by heat pump to district temperature'],
    ],
    plans: [
      { name: 'L40S ×1', for: 'Inference, fine-tuning', price: '€0.79', unit: '/hour',
        specs: [['48 GB', 'VRAM'], ['16', 'vCPU dedicated'], ['96 GB', 'RAM'], ['1 TB', 'NVMe scratch']] },
      { name: 'L40S ×4', for: 'Small training runs', price: '€3.05', unit: '/hour', featured: true,
        specs: [['192 GB', 'VRAM'], ['64', 'vCPU dedicated'], ['384 GB', 'RAM'], ['4 TB', 'NVMe scratch']] },
      { name: 'H200 ×1', for: 'Large-model inference', price: '€2.95', unit: '/hour',
        specs: [['141 GB', 'VRAM'], ['24', 'vCPU dedicated'], ['192 GB', 'RAM'], ['1 TB', 'NVMe scratch']] },
      { name: 'H200 ×8', for: 'Multi-node training', price: '€22.40', unit: '/hour',
        specs: [['1128 GB', 'VRAM'], ['192', 'vCPU dedicated'], ['1.5 TB', 'RAM'], ['8 TB', 'NVMe scratch']] },
    ],
    planNote: 'Reservations of one, three or twelve months take 20%, 30% and 40% off these rates.',
    faq: [
      ['Is capacity actually available?', 'GPU capacity is allocated from reservations first. Publish your shape and window through the contact form and we will tell you honestly when we can serve it, rather than selling you a queue position.'],
      ['Does heat recovery slow my job down?', 'No. Heat is captured downstream of the cold plate; the chips see the same coolant inlet temperature they would in any liquid-cooled hall. If the district network cannot take the heat, we reject it to a dry cooler as normal.'],
      ['Can I get bare metal without virtualisation?', 'Yes, from the ×4 shapes upward, on a one-month minimum term.'],
    ],
    related: ['kubernetes', 'object-storage', 'heat-offtake'],
  },

  // ------------------------------------------------------------ STORAGE
  {
    slug: 'object-storage', name: 'Object Storage', group: 'storage', icon: 'bucket',
    menuNote: 'S3-compatible, no egress fee',
    tagline: 'S3-compatible object storage at €5.90 per TB per month, with egress included.',
    from: '€5.90/TB/month',
    summary: 'Erasure-coded S3 storage with versioning, object lock and lifecycle rules — and no charge for getting your data back out.',
    intro: `<p>Object Storage is an S3-compatible endpoint backed by erasure-coded disks across
      three fault domains. It works with the AWS CLI, boto3, rclone, Veeam, restic, Cyberduck and
      anything else that speaks S3.</p>
      <p>There is no egress charge and no per-request charge. Storage that costs money to leave is
      not storage, it is a hostage situation.</p>`,
    features: [
      { title: 'No egress, no request charges', body: 'You pay for stored bytes. Downloads, PUTs, LISTs and lifecycle transitions are free, up to a fair-use egress ceiling of 3× your stored volume per month.' },
      { title: 'Object Lock for compliance', body: 'Governance and compliance retention modes, so backups written under a lock cannot be deleted by an attacker who has your keys — the WORM guarantee ransomware recovery actually depends on.' },
      { title: 'Versioning and lifecycle rules', body: 'Keep n versions, expire noncurrent objects after n days, move cold data to the archive class automatically.' },
      { title: 'Presigned URLs and static sites', body: 'Serve a bucket as a static website with your own domain and a free certificate, or hand out time-limited presigned URLs.' },
      { title: 'Server-side encryption', body: 'SSE-S3 with keys we manage, or SSE-C with keys you supply per request. Encryption at rest is on by default and cannot be turned off.' },
    ],
    specs: [
      ['API', 'S3 (signature v4), bucket and object ACLs, multipart upload, CORS'],
      ['Durability design target', '11 nines, erasure coded 8+3 across three fault domains'],
      ['Classes', 'standard €5.90/TB-month, archive €1.90/TB-month (12 h retrieval)'],
      ['Max object size', '5 TB, 10 000 parts'],
      ['Endpoints', 's3.sk-bts-1.heatcloud.sk, path and virtual-host style'],
      ['SLA', '99.9% availability, credited per the SLA'],
    ],
    plans: [
      { name: 'Standard', for: 'Everything hot', price: '€5.90', unit: '/TB/month',
        specs: [['Egress', 'included'], ['Requests', 'free'], ['Versioning', 'included'], ['Object Lock', 'included']], featured: true },
      { name: 'Archive', for: 'Cold, rarely read', price: '€1.90', unit: '/TB/month',
        specs: [['Retrieval', '12 hours'], ['Minimum', '90 days'], ['Egress', 'included']] },
    ],
    planNote: 'Billed on average stored bytes per hour, prorated. No minimum commitment on the standard class.',
    faq: [
      ['Is the "no egress" claim real?', 'Yes, within fair use: monthly egress up to three times your average stored volume. Above that we will call you and agree a rate rather than sending a surprise invoice.'],
      ['Can I use it as a Veeam or restic target?', 'Yes, both are tested each release. For Veeam, use the S3 Compatible repository type with Object Lock enabled.'],
      ['Where is the data physically?', 'In the Slovak region you selected. It is not replicated out of the country unless you configure cross-region replication yourself.'],
    ],
    related: ['backup', 'public-cloud', 'databases'],
  },
  {
    slug: 'databases', name: 'Managed Databases', group: 'storage', icon: 'db',
    menuNote: 'PostgreSQL, MySQL, Valkey, OpenSearch',
    tagline: 'Databases someone else patches, backs up and fails over.',
    from: 'from €18.00/month',
    summary: 'PostgreSQL, MySQL, Valkey and OpenSearch with automatic backups, point-in-time recovery and optional synchronous replicas.',
    intro: `<p>Managed Databases are the same engines you already run, with the operational work
      removed: minor version patching, backups, point-in-time recovery, failover, connection
      pooling and metrics. You get a connection string, a superuser-adjacent role and the ability
      to move away by taking a plain <code>pg_dump</code> whenever you like.</p>`,
    features: [
      { title: 'Point-in-time recovery', body: 'Continuous WAL/binlog archiving to object storage. Restore to any second within your retention window into a fresh instance, leaving the original untouched.' },
      { title: 'Synchronous replicas and failover', body: 'Add a standby in a second fault domain and we promote it automatically on failure, keeping the endpoint address stable.' },
      { title: 'Connection pooling built in', body: 'PgBouncer in transaction mode in front of PostgreSQL, so a serverless workload with 2 000 connections does not fall over a 200-connection limit.' },
      { title: 'Extensions you actually need', body: 'PostGIS, pgvector, pg_stat_statements, TimescaleDB (Apache edition), pg_cron, uuid-ossp, hstore, and about sixty more.' },
      { title: 'Private-only by default', body: 'A new database is reachable only from your private network. Public exposure is an explicit opt-in with a mandatory allow-list.' },
    ],
    specs: [
      ['Engines', 'PostgreSQL 15/16/17, MySQL 8.0/8.4, Valkey 8, OpenSearch 2.x'],
      ['Backups', 'Daily full plus continuous WAL, 7 days retention included, up to 35 days'],
      ['Encryption', 'TLS required in transit, LUKS at rest'],
      ['Maintenance', 'Weekly window you choose; minor versions applied, majors offered'],
      ['Metrics', 'Prometheus endpoint, slow query log, per-query statistics'],
      ['SLA', '99.9% single node, 99.95% with a synchronous replica'],
    ],
    plans: [
      { name: 'DB-2', for: 'Development, small apps', price: '€18.00',
        specs: [['2', 'vCPU'], ['4 GB', 'RAM'], ['80 GB', 'NVMe'], ['7 days', 'PITR']] },
      { name: 'DB-4', for: 'Production', price: '€44.00', featured: true,
        specs: [['4', 'vCPU dedicated'], ['16 GB', 'RAM'], ['240 GB', 'NVMe'], ['14 days', 'PITR']] },
      { name: 'DB-8', for: 'Busy production', price: '€88.00',
        specs: [['8', 'vCPU dedicated'], ['32 GB', 'RAM'], ['480 GB', 'NVMe'], ['14 days', 'PITR']] },
      { name: 'Replica', for: 'HA or read scaling', price: '+100%',
        specs: [['Same', 'size as primary'], ['Auto', 'failover'], ['Sync or', 'async']] },
    ],
    planNote: 'Storage beyond the included amount is €0.12/GB-month. Backups within the retention window are free.',
    faq: [
      ['Can I get superuser?', 'Not literally, but the role we give you can create databases, roles, extensions from the allow-list, and read every statistic view. If you need something outside that, ask — the list grows.'],
      ['How do I leave?', 'pg_dump, mysqldump, or a logical replication slot to a server you run. We do not charge for the egress.'],
      ['Do you support major version upgrades?', 'Yes, in-place with a maintenance window, or by logical replication into a new instance with a short cutover if you cannot take the downtime.'],
    ],
    related: ['object-storage', 'kubernetes', 'backup'],
  },
  {
    slug: 'backup', name: 'Managed Backup', group: 'storage', icon: 'archive',
    menuNote: 'Immutable off-site backup, €4.50/TB',
    tagline: 'Off-site, immutable backup for servers, workstations and Microsoft 365.',
    from: '€4.50/TB/month',
    summary: 'Agent-based backup for Linux, Windows, macOS, VMware and Microsoft 365, written to immutable storage in Slovakia.',
    intro: `<p>Managed Backup is a place to put copies of things that must survive both a disk
      failure and a person with your credentials. Backups are written with Object Lock enabled, so
      a compromised agent cannot delete history — it can only stop writing new copies, which is
      something the console alerts you about.</p>
      <p>The service is deliberately boring: an agent, a schedule, a retention policy, a restore
      test you can run monthly, and an invoice that only counts stored bytes.</p>`,
    features: [
      { title: 'Immutable by default', body: 'Every backup set is written under a compliance-mode retention lock for the length of its policy. Nobody — including us — can delete it early.' },
      { title: 'Restore tests you can schedule', body: 'Monthly automated restore of a sampled subset into a scratch area, with a pass/fail report. An untested backup is a rumour.' },
      { title: 'Microsoft 365 and Google Workspace', body: 'Mail, calendars, contacts, OneDrive/Drive and SharePoint/Shared Drives, per user per month, with granular item-level restore.' },
      { title: 'Client-side encryption', body: 'Optional end-to-end encryption where the key never leaves your machines. We then hold ciphertext we cannot read — and cannot help you recover if you lose the key.' },
      { title: 'Bandwidth-aware scheduling', body: 'Throttle windows, block-level incrementals and deduplication across a whole fleet, so a nightly run finishes before the working day starts.' },
    ],
    specs: [
      ['Agents', 'Linux (deb/rpm), Windows 10/11 and Server 2019+, macOS 13+, VMware vSphere 7/8, Proxmox VE 8'],
      ['SaaS sources', 'Microsoft 365, Google Workspace'],
      ['Deduplication', 'Variable-block, fleet-wide, before encryption'],
      ['Retention', 'GFS policies up to 10 years'],
      ['Restore', 'Full, file-level, or boot the image straight into a Cloud Server'],
      ['SLA', '99.9% availability of the backup and restore service'],
    ],
    plans: [
      { name: 'Storage', for: 'Servers and workstations', price: '€4.50', unit: '/TB/month', featured: true,
        specs: [['Unlimited', 'agents'], ['Immutable', 'by policy'], ['Restores', 'free']] },
      { name: 'Microsoft 365', for: 'Per protected user', price: '€1.90', unit: '/user/month',
        specs: [['Unlimited', 'storage'], ['Item-level', 'restore'], ['365 days', 'retention']] },
      { name: 'Restore-to-cloud', for: 'Disaster recovery', price: '€0.00',
        specs: [['Boot', 'an image as a VM'], ['Pay only', 'for the VM'], ['No', 'restore fee']] },
    ],
    planNote: 'Priced on stored bytes after deduplication and compression, which for a typical fleet is 3–6× smaller than the source.',
    faq: [
      ['If backups are immutable, how do I ever reduce my bill?', 'Retention locks expire with the policy. Shorten the policy and storage falls away as existing locks lapse — you cannot shrink history retroactively, which is the point.'],
      ['Can I restore to hardware you do not host?', 'Yes. The restore agent runs anywhere and there is no egress charge for restores.'],
      ['Is this a replacement for replication?', 'No. Replication protects against hardware failure; backup protects against mistakes and malice. You want both.'],
    ],
    related: ['object-storage', 'hdrive', 'databases'],
  },

  // ------------------------------------------------------------ WEB
  {
    slug: 'web-hosting', name: 'Web Hosting', group: 'web', icon: 'globe',
    menuNote: 'PHP, Node, Python, free TLS',
    tagline: 'Managed hosting for sites and apps, with certificates, mail and staging included.',
    from: 'from €5.90/month',
    summary: 'PHP, Node.js, Python and static hosting with free certificates, daily backups, staging copies and a one-click WordPress.',
    intro: `<p>Web Hosting is for the sites that do not need a server: a WordPress, a Laravel app,
      a Next.js front end, a static build from a Git repository. You get SSH and SFTP, a real
      shell, Composer and npm, and a control panel that does not hide the filesystem from you.</p>`,
    features: [
      { title: 'Certificates that renew themselves', body: 'Free ACME certificates for every domain and subdomain, including wildcards, renewed automatically with no configuration.' },
      { title: 'Staging copies in one click', body: 'Clone a site — files, database and configuration — into a staging URL, break it, then push it back or throw it away.' },
      { title: 'Deploy from Git', body: 'Point a site at a repository and a branch; every push builds and deploys, with the previous release kept for instant rollback.' },
      { title: 'Daily backups, 30 days', body: 'Files and databases, restorable per-site or per-file from the panel, at no extra cost.' },
      { title: 'Mail included', body: 'Mailboxes on your domain with SPF, DKIM and DMARC configured for you, or leave mail elsewhere and we get out of the way.' },
      { title: 'Runtime versions you choose', body: 'PHP 8.1–8.5, Node 20/22/24, Python 3.11–3.13, per site, switchable without a ticket.' },
    ],
    specs: [
      ['Web server', 'nginx with HTTP/3, Brotli, and a per-site PHP-FPM pool'],
      ['Databases', 'MariaDB 11 and PostgreSQL 17, unlimited per plan quota'],
      ['Access', 'SSH, SFTP, WP-CLI, Composer, npm, cron with a one-minute resolution'],
      ['Caching', 'Redis/Valkey object cache and a full-page cache with tag invalidation'],
      ['Traffic', 'Unmetered, fair use'],
      ['SLA', '99.9% monthly availability'],
    ],
    plans: [
      { name: 'Starter', for: 'One small site', price: '€5.90',
        specs: [['1', 'site'], ['20 GB', 'NVMe'], ['5', 'mailboxes'], ['Daily', 'backups']] },
      { name: 'Studio', for: 'Freelancers, agencies', price: '€14.90', featured: true,
        specs: [['20', 'sites'], ['150 GB', 'NVMe'], ['50', 'mailboxes'], ['Staging', 'included']] },
      { name: 'Business', for: 'High-traffic sites', price: '€39.00',
        specs: [['100', 'sites'], ['500 GB', 'NVMe'], ['Unlimited', 'mailboxes'], ['Dedicated', 'CPU quota']] },
    ],
    planNote: 'Domain names are billed separately. Migration of an existing site is free — we do it for you.',
    faq: [
      ['Will you migrate my site for me?', 'Yes, at no charge, including the DNS cutover, on any annual plan. Send us the current provider credentials and a maintenance window.'],
      ['Do you throttle CPU?', 'There is a per-site CPU quota to stop one tenant ruining a machine for everyone. You can see your usage in the panel; if you are hitting it regularly, the honest answer is a Cloud Server, and we will say so.'],
      ['Can I host client sites and resell?', 'Yes on Studio and Business. You remain the customer of record and responsible for your clients under the Acceptable Use Policy.'],
    ],
    related: ['domains', 'hmail', 'cloud-servers'],
  },
  {
    slug: 'domains', name: 'Domain Names', group: 'web', icon: 'lock',
    menuNote: '.sk, .eu, .com and 300 more',
    tagline: 'Registration, transfer and DNS for .sk and 300 other extensions.',
    from: '.sk from €13.90/year',
    summary: 'Accredited registration with free WHOIS privacy where the registry allows it, DNSSEC, and anycast DNS included.',
    intro: `<p>Domains are sold at a transparent price, renewed at the same price, and transferred
      away without an argument. Renewal never costs more than registration, because a low first
      year followed by a punitive renewal is a trick, not a price.</p>`,
    features: [
      { title: 'Renewal at the registration price', body: 'The price you paid in year one is the price in year two. We publish the whole table.' },
      { title: 'Anycast DNS included', body: 'Six points of presence, DNSSEC signing, and an API for record management, whether or not you host anything else with us.' },
      { title: 'Transfer lock and registry lock', body: 'Standard transfer lock on every domain; registry lock available on extensions that support it, for names you cannot afford to lose.' },
      { title: 'WHOIS privacy where permitted', body: 'Free redaction of registrant details on extensions whose registry allows it. SK-NIC requires certain details to be public — we tell you exactly what is published before you buy.' },
      { title: 'Bulk operations', body: 'Import a portfolio by CSV, set renewal policy per domain, and get one invoice.' },
    ],
    specs: [
      ['Accreditation', 'ICANN-accredited registrar (application in progress), SK-NIC registrar'],
      ['Extensions', '.sk, .cz, .eu, .com, .net, .org, .io, .dev, .app and ~300 more'],
      ['DNS', 'Anycast, DNSSEC, ALIAS/ANAME at the apex, DoH/DoT resolvers'],
      ['Transfers', 'Free in, free out, no release fee'],
      ['Grace periods', '30-day renewal grace, 30-day redemption at registry cost plus €0'],
    ],
    plans: [
      { name: '.sk', for: 'Slovak presence', price: '€13.90', unit: '/year', featured: true,
        specs: [['Renewal', 'same price'], ['DNS', 'included'], ['DNSSEC', 'included']] },
      { name: '.eu', for: 'EU-wide', price: '€8.90', unit: '/year',
        specs: [['Renewal', 'same price'], ['DNS', 'included'], ['Privacy', 'included']] },
      { name: '.com', for: 'International', price: '€12.50', unit: '/year',
        specs: [['Renewal', 'same price'], ['DNS', 'included'], ['Privacy', 'included']] },
      { name: 'DNS only', for: 'Domains held elsewhere', price: '€0.00',
        specs: [['Anycast', 'zones'], ['API', 'access'], ['DNSSEC', 'signing']] },
    ],
    planNote: 'Registry price changes are passed through at cost, announced at least 30 days before they take effect.',
    faq: [
      ['Can I keep my domain and host elsewhere?', 'Yes. DNS hosting is free and unconditional, and there is no penalty for pointing a name away from us.'],
      ['What does SK-NIC publish about me?', 'For .sk, the registrant name and address are published in the public register; contact email and phone are not. We show you the exact record before submission.'],
      ['How long does a transfer take?', 'Usually under an hour for .sk, up to five days for gTLDs where the losing registrar uses the full acknowledgement window.'],
    ],
    related: ['web-hosting', 'hmail', 'streaming'],
  },
  {
    slug: 'streaming', name: 'Streaming & Media', group: 'web', icon: 'play',
    menuNote: 'VOD, live and radio delivery',
    tagline: 'Video on demand, live streams and radio, delivered from Slovakia.',
    from: 'from €9.00/month',
    summary: 'Transcoding, adaptive streaming and a player for VOD, live events and audio, with no per-viewer licensing games.',
    intro: `<p>Upload a file and get adaptive HLS and DASH renditions, a thumbnail sheet, subtitles
      and an embeddable player. Or push RTMP/SRT and get a low-latency live stream with DVR and
      automatic recording to object storage.</p>
      <p>Audio is a first-class case, not an afterthought: internet radio with a scheduler,
      listener statistics and Icecast-compatible endpoints.</p>`,
    features: [
      { title: 'Adaptive transcoding', body: 'H.264 and AV1 ladders generated on upload, from 240p to 4K, with per-title encoding so a talking head does not get a bitrate meant for a football match.' },
      { title: 'Low-latency live', body: 'RTMP, SRT and WebRTC ingest; LL-HLS output with 2–4 second glass-to-glass, DVR window and automatic VOD recording.' },
      { title: 'Player you can restyle', body: 'An embeddable player with your colours and logo, chapters, subtitles, playback speed and a keyboard-accessible control bar.' },
      { title: 'Access control', body: 'Signed URLs, domain allow-lists, geographic restriction, and optional AES-128 encryption for internal material.' },
      { title: 'Statistics without tracking viewers', body: 'Aggregate plays, completion and bandwidth. No per-viewer profiles, no third-party pixels, nothing to disclose in a cookie banner.' },
    ],
    specs: [
      ['Ingest', 'HTTP upload, RTMP, SRT, WebRTC'],
      ['Output', 'HLS, LL-HLS, DASH, MP4 progressive, Icecast for audio'],
      ['Codecs', 'H.264, HEVC, AV1, AAC, Opus'],
      ['Storage', 'Backed by Object Storage, billed at the same €5.90/TB'],
      ['Delivery', 'From the Slovak region, with edge caching in Vienna and Prague'],
    ],
    plans: [
      { name: 'VOD', for: 'Libraries and courses', price: '€9.00',
        specs: [['500 GB', 'delivery/month'], ['100 GB', 'storage'], ['Transcoding', 'included']] },
      { name: 'Live', for: 'Events and streams', price: '€29.00', unit: '/month', featured: true,
        specs: [['2', 'concurrent channels'], ['2 TB', 'delivery/month'], ['DVR +', 'recording']] },
      { name: 'Radio', for: 'Audio broadcasters', price: '€12.00', unit: '/month',
        specs: [['1', 'station'], ['1 000', 'listeners'], ['Scheduler', 'included']] },
    ],
    planNote: 'Additional delivery is €0.008/GB. Storage beyond the included amount is billed at Object Storage rates.',
    faq: [
      ['Do you support DRM?', 'Widevine and PlayReady are on the roadmap; today we offer signed URLs and AES-128, which is enough for most training and internal material but not for licensed film.'],
      ['Can I use my own CDN?', 'Yes. The origin is a normal HTTP origin and you can put any CDN in front of it.'],
    ],
    related: ['object-storage', 'web-hosting', 'domains'],
  },

  // ------------------------------------------------------------ WORKPLACE
  {
    slug: 'hsuite', name: 'hSuite', group: 'workplace', icon: 'suite',
    menuNote: 'Mail, drive, meet, chat and docs',
    tagline: 'The whole workplace — mail, files, meetings, chat and documents — on Slovak servers.',
    from: '€4.90/user/month',
    summary: 'hMail, hDrive, hMeet, hChat and collaborative documents in one subscription, one admin console, one invoice.',
    intro: `<p>hSuite is the bundle: mail on your domain, a shared drive, video meetings, team
      chat and real-time document editing, administered from one console and billed per user.</p>
      <p>It exists because the alternative for a Slovak organisation is to put its entire internal
      communication on infrastructure in another jurisdiction, funded by an advertising business.
      Nothing in hSuite is scanned, profiled or used to train anything.</p>`,
    features: [
      { title: 'One admin console', body: 'Users, groups, shared mailboxes, drive quotas, device sessions, retention rules and audit logs in one place, with delegated admin roles.' },
      { title: 'Real-time documents', body: 'Collaborative text documents, spreadsheets and presentations built on Collabora/LibreOffice, editing .docx, .xlsx and .pptx in place.' },
      { title: 'Meetings without an install', body: 'hMeet runs in the browser, up to 150 participants, with recording to hDrive, live captions in Slovak, English and Czech, and dial-in numbers on request.' },
      { title: 'Chat with history you control', body: 'Channels, threads, direct messages, file sharing and search, with a retention policy you set per channel.' },
      { title: 'Migration from Microsoft 365 or Google', body: 'Mail, calendars, contacts and files moved for you, with a coexistence window so nothing stops working during the switch.' },
      { title: 'No advertising, no profiling', body: 'Your content is processed to deliver the service and for nothing else. This is a contractual term in the DPA, not a marketing sentence.' },
    ],
    specs: [
      ['Included', 'hMail, hDrive, hMeet, hChat, hDocs, shared calendars and contacts'],
      ['Storage', '50 GB mail + 1 TB drive per user on Standard; pooled across the organisation'],
      ['Protocols', 'IMAP, SMTP, JMAP, CalDAV, CardDAV, WebDAV, ActiveSync'],
      ['Identity', 'Built-in directory, or SAML/OIDC federation with your IdP; SCIM provisioning'],
      ['Devices', 'Web, iOS, Android, and any standards-compliant desktop client'],
      ['Data location', 'Slovakia only, with sub-processors listed in the DPA'],
    ],
    plans: [
      { name: 'Basic', for: 'Small teams', price: '€4.90', unit: '/user/month',
        specs: [['20 GB', 'mail'], ['200 GB', 'drive'], ['hMeet', '50 participants'], ['hChat', 'included']] },
      { name: 'Standard', for: 'Most organisations', price: '€8.90', unit: '/user/month', featured: true,
        specs: [['50 GB', 'mail'], ['1 TB', 'drive'], ['hMeet', '150 participants'], ['SSO +', 'SCIM']] },
      { name: 'Advanced', for: 'Regulated and larger', price: '€14.90', unit: '/user/month',
        specs: [['100 GB', 'mail'], ['3 TB', 'drive'], ['Retention', 'and legal hold'], ['Audit', 'export']] },
      { name: 'Non-profit / school', for: 'Verified organisations', price: '−50%',
        specs: [['Any', 'plan'], ['Verified', 'annually'], ['Same', 'features']] },
    ],
    planNote: 'Minimum one user, no minimum term on monthly billing. Annual billing takes 15% off.',
    faq: [
      ['Can we keep our existing mail domain?', 'Yes — that is the normal case. We give you the DNS records, and you can run a split domain during migration.'],
      ['Is there an offline desktop client?', 'Use any IMAP/CalDAV client: Thunderbird, Outlook, Apple Mail. We test Thunderbird and Outlook each release, and ActiveSync covers Outlook profiles that expect Exchange.'],
      ['What happens to our data if we leave?', 'Export everything — mail as mbox or EML, files as they are, calendars as ICS — from the admin console at any time, without asking us and without a fee.'],
    ],
    related: ['hmail', 'hdrive', 'backup'],
  },
  {
    slug: 'hmail', name: 'hMail', group: 'workplace', icon: 'at',
    menuNote: 'Mail on your domain, from €1.50',
    tagline: 'Mail on your own domain, with the anti-spam done properly and nothing read by machines.',
    from: '€1.50/user/month',
    summary: 'Standards-based mail hosting with SPF, DKIM, DMARC and MTA-STS configured for you, and deliverability we actually monitor.',
    intro: `<p>hMail is mail hosting for organisations that want their own domain, working
      deliverability and a mailbox nobody else reads. It speaks IMAP, SMTP and JMAP, syncs
      calendars and contacts over CalDAV and CardDAV, and has a web client that is fast enough to
      be the primary one.</p>`,
    features: [
      { title: 'Deliverability as a service', body: 'We publish and monitor your SPF, DKIM, DMARC and MTA-STS records, watch reputation at the major receivers, and tell you when a campaign is about to get you listed.' },
      { title: 'Anti-spam and anti-phishing', body: 'Reputation, content and authentication filtering with a quarantine each user controls, plus display-name spoof detection for internal impersonation attempts.' },
      { title: 'Aliases, groups and shared mailboxes', body: 'Unlimited aliases, distribution lists, catch-all, and shared mailboxes with per-user permissions — none of which consume a licence.' },
      { title: 'Retention and legal hold', body: 'Organisation-wide retention policies and per-user legal hold on Advanced, with an auditable export.' },
      { title: 'No scanning for anything but safety', body: 'Message content is processed for spam and malware filtering, delivery, and search indexing for the mailbox owner. Nothing else.' },
    ],
    specs: [
      ['Protocols', 'IMAP4rev2, SMTP with submission, JMAP, CalDAV, CardDAV, ActiveSync'],
      ['Authentication', 'SPF, DKIM, DMARC, ARC, MTA-STS, TLS-RPT, DANE'],
      ['Limits', '500 recipients/hour on Basic, 2 000 on Standard, higher on request'],
      ['Max message size', '50 MB, with large attachments offloaded to hDrive links'],
      ['Encryption', 'TLS required inbound and outbound where the peer supports it; S/MIME and OpenPGP in the web client'],
      ['SLA', '99.9% monthly availability'],
    ],
    plans: [
      { name: 'Mailbox', for: 'Per user', price: '€1.50', unit: '/user/month', featured: true,
        specs: [['20 GB', 'mail'], ['Unlimited', 'aliases'], ['Calendar +', 'contacts']] },
      { name: 'Mailbox Plus', for: 'Heavy mail users', price: '€3.50', unit: '/user/month',
        specs: [['100 GB', 'mail'], ['Legal', 'hold'], ['S/MIME', 'management']] },
      { name: 'Shared mailbox', for: 'info@, support@', price: '€0.00',
        specs: [['Included', 'with any plan'], ['Per-user', 'permissions'], ['Shared', 'sent items']] },
    ],
    planNote: 'A domain is not required to be registered with us. Bring your own and point the MX.',
    faq: [
      ['Can I migrate from Microsoft 365 without downtime?', 'Yes. We sync mailboxes over IMAP while your MX still points at the old provider, then cut the MX over at a time you choose and re-sync the delta.'],
      ['Do you offer a catch-all?', 'Yes, off by default, because a catch-all is a spam magnet. Turn it on per domain if you need it.'],
      ['Will my newsletters get through?', 'Bulk sending from a mailbox service is limited by design. For campaigns, use a dedicated sending domain and a proper ESP — we will help you set the DNS up, and the AUP explains what we do not allow.'],
    ],
    related: ['hsuite', 'domains', 'hdrive'],
  },
  {
    slug: 'hdrive', name: 'hDrive', group: 'workplace', icon: 'folder',
    menuNote: 'Files, sync and sharing — 1 TB from €3.90',
    tagline: 'Files that sync, share and version, stored where you can point at them on a map.',
    from: '€3.90/month for 1 TB',
    summary: 'Desktop and mobile sync, selective offline files, public links with passwords and expiry, and full version history.',
    intro: `<p>hDrive is file storage for people rather than for programs: a synced folder on every
      machine, a web interface, shared team spaces, and links you can hand to someone outside the
      organisation without giving them an account.</p>
      <p>Under it is the same replicated storage as the rest of the platform, and above it is
      version history that goes back far enough to undo a bad Monday.</p>`,
    features: [
      { title: 'Sync clients that behave', body: 'Windows, macOS and Linux clients with selective sync, files-on-demand placeholders and conflict resolution that keeps both versions rather than picking one.' },
      { title: 'Version history and a trash that waits', body: 'Every save is a version for 90 days; deleted files sit in trash for 30 days after that. Restore either from any client.' },
      { title: 'Sharing with an expiry date', body: 'Public links with optional password, download limit, expiry date and upload-only drop boxes for collecting files from outside.' },
      { title: 'Team spaces with real permissions', body: 'Shared spaces with read, write and manage roles, group membership, and an activity feed showing who changed what.' },
      { title: 'Edit in place', body: 'Open a .docx or .xlsx straight from hDrive into hDocs, edit collaboratively, and save it back to the same file.' },
      { title: 'End-to-end encrypted folders', body: 'Optional client-side encrypted folders for material we should not be able to read. Search does not work inside them — that is the honest trade.' },
    ],
    specs: [
      ['Clients', 'Windows 10+, macOS 13+, Linux (AppImage, deb, rpm), iOS, Android'],
      ['Protocols', 'WebDAV, S3 gateway on Team plans, public REST API'],
      ['Max file size', '250 GB'],
      ['Versioning', '90 days, unlimited versions, not counted against your quota'],
      ['Sharing', 'Links, groups, external guests (free, no licence needed)'],
      ['SLA', '99.9% monthly availability'],
    ],
    plans: [
      { name: 'Solo 1 TB', for: 'One person', price: '€3.90',
        specs: [['1 TB', 'storage'], ['1', 'user'], ['Version', 'history']] },
      { name: 'Team 3 TB', for: 'Up to 6 people', price: '€11.90', featured: true,
        specs: [['3 TB', 'pooled'], ['6', 'users'], ['Team', 'spaces'], ['Guests', 'free']] },
      { name: 'Team 10 TB', for: 'Growing organisations', price: '€29.00',
        specs: [['10 TB', 'pooled'], ['Unlimited', 'users'], ['S3', 'gateway'], ['Audit', 'log']] },
      { name: 'Extra storage', for: 'Any plan', price: '€3.20', unit: '/TB/month',
        specs: [['Pooled', 'immediately'], ['No', 'egress fee'], ['Prorated', 'monthly']] },
    ],
    planNote: 'External guests never consume a seat. Users beyond a plan limit are €2.00 each per month.',
    faq: [
      ['Is this Nextcloud?', 'It is built on the Nextcloud server with our own storage backend, sync client packaging and support. We say so plainly because you deserve to know what you can migrate to and from.'],
      ['Can I mount it as a drive letter?', 'Yes, over WebDAV, though the sync client is faster and works offline. Team 10 TB also exposes an S3 endpoint for automated workflows.'],
      ['Does version history eat my quota?', 'No. Versions and trash are stored on our side of the meter.'],
    ],
    related: ['hsuite', 'backup', 'object-storage'],
  },

  // ------------------------------------------------------------ HEAT
  {
    slug: 'heat-offtake', name: 'Heat Offtake', group: 'heat', icon: 'flame',
    menuNote: 'Contracted heat for district networks',
    tagline: 'For heat utilities: contracted recovered heat at a discount to your gas cost.',
    from: 'contracted, indexed to your gas cost',
    summary: 'A long-term heat purchase agreement with a district heating operator: recovered datacenter heat, delivered to the network, priced below gas.',
    intro: `<p>This is the other side of the business, and it is not sold by the seat. If you
      operate a district heating network — a <i>teplárenská spoločnosť</i>, a municipal utility, a
      housing association with its own boiler house — we will site a datacenter next to your
      network and sell you the heat it produces.</p>
      <p>The commercial shape is a heat purchase agreement of 10 to 15 years, priced at a fixed
      discount to your delivered gas heat cost and indexed to the same gas benchmark, so the
      discount holds whichever way the gas price moves. You keep the customer relationship and the
      network; we deliver hot water at your primary temperature into your substation.</p>`,
    features: [
      { title: 'Priced against your actual alternative', body: 'The reference is your delivered cost of gas-fired heat, not a spot index you cannot hedge. The contract quotes a percentage discount to it.' },
      { title: 'We take the technical risk', body: 'Heat pumps, exchangers, controls and the interconnection to your substation are our capex and our maintenance obligation, up to an agreed delivery point.' },
      { title: 'Backup by design', body: 'Your existing plant stays as backup and peak capacity. Recovered heat is a base-load contribution, typically 20–40% of annual network demand at the scale we build.' },
      { title: 'The funding stack is part of the deal', body: 'Modernisation Fund, Programme Slovakia and ELENA/EIB instruments are aimed exactly at this. We prepare the applications; the thermal asset is what gets funded.' },
      { title: 'Metered and auditable', body: 'Delivery is metered at the substation to the same standard as any other heat source on your network, with the data available to you continuously.' },
      { title: 'Efficiency obligations, satisfied', body: 'Waste-heat integration counts towards the efficient district heating criteria under EED 2023/1791 — the direction the regulation is already pushing you.' },
    ],
    specs: [
      ['Delivery temperature', '70–85 °C at the substation, heat-pump lifted from a 40–50 °C loop'],
      ['Thermal scale', '1–5 MW thermal per site at first phase, expandable with IT load'],
      ['Availability', 'Base-load; contracted annual delivery with a minimum take and a cap'],
      ['Contract length', '10–15 years, extension by agreement'],
      ['Price mechanism', 'Discount to your delivered gas heat cost, indexed to the same benchmark'],
      ['Delivery point', 'Your substation flange; everything upstream is ours'],
    ],
    plans: null,
    planNote: null,
    faq: [
      ['What do you need from us to start?', 'Your network primary and return temperatures, an annual load profile, the location of candidate substations, and your current delivered heat cost. That is enough for an indicative term sheet.'],
      ['What if your datacenter is empty?', 'The contract carries a minimum annual delivery with liquidated damages, backed by our own gas or electric boiler as the fallback. You are not exposed to our sales pipeline.'],
      ['Why is the heat cheaper than gas?', 'Because we are already paid for the electricity by our compute customers. The heat is a by-product with a marginal cost of the heat-pump electricity plus maintenance — well under the cost of burning gas for the same joule.'],
      ['Is this proven anywhere?', 'Yes. Infomaniak’s D4 datacenter in Geneva has fed roughly its entire electrical consumption into the Geneva network as heat since November 2024, at 1.7 MW thermal. The research dossier this company grew out of documents that and the Slovak numbers behind it.'],
    ],
    related: ['gpu-cloud', 'cloud-servers'],
  },
];

export const byGroup = (key: GroupKey) => services.filter((s) => s.group === key);
export const bySlug = (slug: string) => services.find((s) => s.slug === slug);
