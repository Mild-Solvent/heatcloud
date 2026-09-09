// The seven legal documents. Prose ported verbatim from the previous build.
// Bodies are trusted authored HTML and are rendered with dangerouslySetInnerHTML.

import { company, site } from './company';
import { esc, table } from './html';

const N = company.legalName;

// Lifted out of the SLA document so the row list stays readable.
const slaTable = table(['Service', { t: 'Monthly availability' }, 'Measured at'], [
  ['Cloud Servers', '99.9%', 'Hypervisor reachability of the instance’s public interface'],
  ['Public Cloud — API', '99.9%', 'Keystone and Nova API response to a synthetic request'],
  ['Public Cloud — instances', '99.95%', 'Instance reachability, excluding customer-caused states'],
  ['Managed Kubernetes — control plane', '99.95%', 'API server response, clusters with ≥3 worker nodes'],
  ['GPU Cloud', '99.5%', 'Instance reachability and accelerator presence'],
  ['Object Storage', '99.9%', 'Successful GET/PUT against a canary bucket'],
  ['Managed Databases — single node', '99.9%', 'Successful connection and query on the primary endpoint'],
  ['Managed Databases — with replica', '99.95%', 'Same, including automatic failover time'],
  ['Managed Backup', '99.9%', 'Availability of the backup and restore service'],
  ['Web Hosting', '99.9%', 'HTTP 200 from a canary path on the customer site'],
  ['hSuite, hMail, hDrive', '99.9%', 'Successful login and protocol transaction'],
  ['Streaming', '99.9%', 'Manifest and segment delivery from the origin'],
]);

export type LegalSection = { h: string; body: string };
export type LegalDoc = {
  slug: string; title: string; lede: string; effective: string;
  sections: LegalSection[];
};

export const legalDocs: LegalDoc[] = [
  {
    slug: 'terms',
    title: 'General Terms & Conditions',
    lede: 'The contract between you and us: how services are ordered, what they cost, what happens when something goes wrong, and how either of us can walk away.',
    effective: 'on first commercial launch (not yet in force)',
    sections: [
      { h: 'Who we are and what these terms cover', body: `
        <p>These General Terms &amp; Conditions (the <b>“Terms”</b>) govern the provision of all
        services (the <b>“Services”</b>) by ${N}, with its registered office in ${company.seat}
        (<b>“we”</b>, <b>“us”</b>, <b>“HeatCloud”</b>) to you (the <b>“Customer”</b>).</p>
        <p>The Terms apply together with the <a href="/legal/aup/">Acceptable Use Policy</a>, the
        <a href="/legal/sla/">Service Level Agreement</a>, the
        <a href="/legal/dpa/">Data Processing Agreement</a> where applicable, and the price list
        published at <a href="/pricing/">/pricing/</a>. In the event of conflict, the order of
        precedence is: a signed individual agreement, the DPA, the SLA, the AUP, these Terms, the
        price list.</p>
        <p>Heat purchase agreements with district heating operators are negotiated individually
        and are <b>not</b> governed by these Terms.</p>` },

      { h: 'Definitions', body: `
        <ul>
          <li><b>Account</b> — the Customer’s administrative access to the Services.</li>
          <li><b>Customer Content</b> — any data, software or material the Customer or its users
          store in, transmit through or generate using the Services.</li>
          <li><b>Billing Period</b> — the calendar month, unless annual billing is selected.</li>
          <li><b>Consumer</b> — a natural person acting outside their trade, business or
          profession, within the meaning of Act No. 250/2007 Coll.</li>
          <li><b>Business Day</b> — Monday to Friday, excluding Slovak public holidays.</li>
        </ul>` },

      { h: 'Conclusion of the contract', body: `
        <p>A contract is concluded when we confirm an order in writing (email is writing) or when
        we make the ordered Service available, whichever is earlier. We may refuse any order
        without giving reasons, in particular where we cannot serve the requested capacity, where
        the intended use would breach the AUP, or where identity verification fails.</p>
        <p>The Customer must provide accurate identification and billing details and keep them
        current. Business customers must state a valid VAT identification number if they wish to
        be invoiced under the reverse-charge mechanism.</p>
        <p>The Customer is responsible for all activity under its Account, must keep credentials
        secure, and must enable multi-factor authentication on administrative access. Compromised
        credentials must be reported to us without undue delay.</p>` },

      { h: 'The Services', body: `
        <p>We will provide the Services with the professional care of a competent operator, in
        accordance with their published description and the SLA. Service descriptions on this
        site are part of the contract; marketing statements elsewhere are not.</p>
        <p>We may change technical implementation at any time provided the Service’s functionality
        and performance are not materially reduced. Where a change does materially reduce them, we
        give at least 30 days’ notice and the Customer may terminate the affected Service without
        penalty within that period.</p>
        <p>Beta, preview and free-of-charge features are provided as-is, carry no SLA, and may be
        withdrawn at any time. They are marked as such.</p>` },

      { h: 'Customer obligations', body: `
        <p>The Customer shall:</p>
        <ul>
          <li>use the Services in accordance with the <a href="/legal/aup/">AUP</a> and applicable
          law, including Slovak and EU law;</li>
          <li>hold all rights and consents necessary for the Customer Content it stores or
          transmits;</li>
          <li>maintain its own backups of anything whose loss would matter — our backup features
          are a Service, not a substitute for the Customer’s own retention policy, except where a
          specific backup Service is purchased;</li>
          <li>apply security updates to software it operates on our infrastructure and not leave
          exploitable systems running unattended;</li>
          <li>respond to abuse notices we forward within the time stated in the notice.</li>
        </ul>
        <p>Where the Customer resells or provides the Services onward, the Customer remains fully
        responsible towards us for its own customers’ conduct.</p>` },

      { h: 'Prices, invoicing and payment', body: `
        <p>Prices are those published at <a href="/pricing/">/pricing/</a> on the day of the order,
        stated in euro and <b>excluding</b> value added tax. Slovak VAT of ${site.vatRate}% is added
        where applicable. Business customers established in another EU Member State with a valid
        VAT identification number are invoiced under the reverse charge.</p>
        <p>Subscription Services are invoiced in advance for each Billing Period. Metered Services
        are invoiced in arrears based on our measurement records, which are decisive absent
        manifest error. Invoices are issued electronically and are due <b>14 days</b> from issue
        unless otherwise agreed.</p>
        <p>Accepted methods are payment card, SEPA direct debit and bank transfer. Public bodies
        and business customers above an agreed monthly volume may request purchase-order handling
        and 30-day terms.</p>
        <p><b>Price changes.</b> We may change prices with at least 30 days’ written notice. The
        Customer may terminate the affected Service without penalty before the change takes
        effect. Third-party registry and licence fees (notably domain registry fees) are passed
        through at cost and may change with the notice the registry gives us. Prices for a
        prepaid annual term do not change during that term.</p>` },

      { h: 'Late payment, suspension and deletion', body: `
        <p>If an invoice is unpaid on its due date we will send a reminder. If it remains unpaid:</p>
        <ul>
          <li><b>Day 7 after due date</b> — the affected Services may be suspended. Data is
          retained and remains exportable by the Customer.</li>
          <li><b>Day 30 after suspension</b> — the affected Services and the associated Customer
          Content may be permanently deleted.</li>
        </ul>
        <p>We will notify the Customer by email before each step. Statutory default interest
        applies to late payments. We may set off amounts owed to us against credits owed by us.</p>
        <p>We may also suspend a Service immediately, without the above steps, where required by
        law, where continued operation presents a serious security risk to us or third parties, or
        as provided in the AUP. Where we suspend without notice we will explain why as soon as we
        can and restore the Service as soon as the cause is removed.</p>` },

      { h: 'Term, renewal and termination', body: `
        <p>Monthly Services renew automatically for one further month unless cancelled before the
        end of the current month. Annual Services renew for one further year unless cancelled at
        least 30 days before the renewal date. <b>Renewal is at the same price as the expiring
        term</b>, subject to clause 6.</p>
        <p>Either party may terminate for convenience with effect from the end of the current
        Billing Period, by notice through the Account or in writing. There is no cancellation fee.
        Prepaid annual fees are not refunded on termination for convenience.</p>
        <p>Either party may terminate any Service with immediate effect for material breach that
        is not remedied within 14 days of written notice, or immediately and without notice on the
        other party’s insolvency. We may terminate immediately for a serious or repeated breach of
        the AUP.</p>
        <p><b>After termination.</b> Customer Content remains available for export for 30 days,
        after which it is deleted. On request within that period we will provide reasonable
        assistance with migration at our standard rates; we do not charge for the egress
        bandwidth.</p>` },

      { h: 'Availability and service levels', body: `
        <p>Availability commitments and the credits payable if we miss them are set out in the
        <a href="/legal/sla/">SLA</a>. Service credits are the Customer’s sole and exclusive
        financial remedy for failure to meet an availability commitment, without prejudice to the
        right to terminate for material breach under clause 8.</p>` },

      { h: 'Customer Content and data', body: `
        <p>Customer Content remains the Customer’s property. We acquire no rights in it other than
        the limited rights necessary to provide the Services. We do not access Customer Content
        except where necessary to provide or protect the Services, where the Customer asks us to,
        or where we are legally required to; such access is logged and available to the Customer on
        request.</p>
        <p>We do not use Customer Content for advertising, profiling, or the training of machine
        learning models. This is a contractual obligation, not a policy we can change unilaterally.</p>
        <p>Customer Content is stored in the Slovak region selected by the Customer. Where we
        process personal data on the Customer’s behalf, the <a href="/legal/dpa/">DPA</a> applies
        and forms part of this contract.</p>
        <p>Where we are legally compelled to disclose Customer Content, we will inform the Customer
        before disclosure unless legally prohibited from doing so, and will disclose only what the
        instrument actually requires.</p>` },

      { h: 'Intellectual property', body: `
        <p>We retain all rights in the Services, our software, documentation and trade marks. The
        Customer receives a non-exclusive, non-transferable right to use them for the duration of
        the contract and for its intended purpose.</p>
        <p>Open-source components are licensed under their own terms, which prevail over these
        Terms for those components. Where a Service is built on an open-source project we say so on
        its service page.</p>` },

      { h: 'Warranties and liability', body: `
        <p>We warrant that the Services will be provided with reasonable skill and care and will
        materially conform to their published description. To the extent permitted by law, all
        other warranties are excluded.</p>
        <p><b>Cap.</b> Our aggregate liability arising in any twelve-month period is limited to the
        total fees paid by the Customer for the affected Service in the twelve months preceding the
        event giving rise to the claim.</p>
        <p><b>Excluded loss.</b> We are not liable for loss of profit, loss of revenue, loss of
        anticipated savings, loss of goodwill, or for loss or corruption of data to the extent the
        Customer could have avoided it by maintaining backups in accordance with clause 5.</p>
        <p><b>What is never limited.</b> Nothing in these Terms limits liability for death or
        personal injury caused by negligence, for damage caused intentionally or by gross
        negligence, for fraud, or for any liability that cannot be limited under Slovak law. For
        Consumers, nothing in this clause affects statutory rights.</p>` },

      { h: 'Indemnity', body: `
        <p>The Customer shall indemnify us against third-party claims arising from Customer Content
        or from the Customer’s use of the Services in breach of these Terms or the AUP, including
        reasonable legal costs. We will notify the Customer promptly of any such claim, allow the
        Customer to participate in the defence, and not settle without the Customer’s consent,
        which shall not be unreasonably withheld.</p>` },

      { h: 'Changes to these Terms', body: `
        <p>We may amend these Terms with at least 30 days’ written notice. If the amendment
        materially disadvantages the Customer, the Customer may terminate the affected Services
        without penalty before it takes effect; continued use after that date constitutes
        acceptance. Amendments required by law take effect on the date the law requires.</p>
        <p>Every version of these Terms is archived and available on request, so that a Customer
        can establish what was agreed at any given time.</p>` },

      { h: 'Force majeure', body: `
        <p>Neither party is liable for failure to perform caused by an event beyond its reasonable
        control, including natural disaster, war, terrorism, general failure of the electricity or
        telecommunications network, or acts of public authority. Force majeure does not excuse
        payment of amounts already due. If the event continues for more than 30 days, either party
        may terminate the affected Service without liability.</p>` },

      { h: 'Confidentiality', body: `
        <p>Each party shall keep confidential the other’s non-public information disclosed in
        connection with the contract, use it only for the purposes of the contract, and protect it
        with at least the care it applies to its own confidential information. This obligation
        survives termination by three years, and indefinitely for Customer Content.</p>` },

      { h: 'Assignment and subcontracting', body: `
        <p>The Customer may not assign the contract without our written consent, which will not be
        unreasonably withheld. We may assign the contract to a successor of our business on notice.
        We may use subcontractors, including the sub-processors listed in the
        <a href="/legal/dpa/">DPA</a>, and remain fully responsible for their performance.</p>` },

      { h: 'Consumers', body: `
        <p>This clause applies only where the Customer is a Consumer, and prevails over any
        conflicting provision of these Terms.</p>
        <p><b>Right of withdrawal.</b> Under Act No. 102/2014 Coll., a Consumer may withdraw from a
        distance contract within 14 days without giving a reason, by any unambiguous statement sent
        to <a href="mailto:${company.email}">${company.email}</a>. Where the Consumer has asked us
        to begin providing the Service during that period, and the Service has been fully
        provided, the right of withdrawal is lost; where partially provided, the Consumer pays a
        proportionate amount for what was provided. We refund within 14 days of being informed,
        using the same payment method.</p>
        <p><b>Complaints.</b> Complaints may be sent to <a href="mailto:${company.email}">${company.email}</a>
        and are acknowledged immediately and resolved within 30 days.</p>
        <p><b>Alternative dispute resolution.</b> A Consumer may address an unresolved complaint to
        the Slovak Trade Inspection (Slovenská obchodná inšpekcia) as the general ADR body, or use
        the European online dispute resolution platform. Nothing in these Terms deprives a Consumer
        of the protection of mandatory Slovak consumer law.</p>` },

      { h: 'Governing law and jurisdiction', body: `
        <p>These Terms are governed by the law of the Slovak Republic, excluding its conflict-of-law
        rules and excluding the UN Convention on Contracts for the International Sale of Goods.
        The courts of the Slovak Republic have jurisdiction.</p>
        <p>For Consumers, this choice does not deprive the Consumer of the protection of the
        mandatory law of their country of habitual residence, and a Consumer may bring proceedings
        in the courts of that country.</p>` },

      { h: 'Final provisions', body: `
        <p>If any provision is or becomes invalid, the remainder stays in force and the invalid
        provision is replaced by one that comes closest to its commercial intent.</p>
        <p>Failure to enforce a right is not a waiver of it. There are no oral side agreements;
        amendments must be in writing. Notices to us go to
        <a href="mailto:${company.email}">${company.email}</a>; notices to the Customer go to the
        email address on the Account.</p>
        <p>These Terms are published in English and Slovak. Where the versions diverge, the Slovak
        version prevails for Consumers resident in Slovakia and the English version prevails
        otherwise. <i>(The Slovak version has not yet been prepared for this preview.)</i></p>` },
    ],
  },
  {
    slug: 'aup',
    title: 'Acceptable Use Policy',
    lede: 'What may not run on our infrastructure, how we find out, and what we do about it. Written narrowly on purpose — a policy broad enough to prohibit anything is a policy that protects nobody.',
    effective: 'on first commercial launch (not yet in force)',
    sections: [
      { h: 'Scope', body: `
        <p>This Acceptable Use Policy (<b>“AUP”</b>) applies to everyone who uses the Services,
        including the Customer’s own users and customers. It forms part of the
        <a href="/legal/terms/">Terms</a>. Where the AUP prohibits something, the Customer must
        also prevent its own users from doing it.</p>` },

      { h: 'Prohibited content', body: `
        <p>The Services may not be used to store, transmit or make available:</p>
        <ul>
          <li>child sexual abuse material — reported to law enforcement immediately and without
          notice to the Customer;</li>
          <li>content that incites violence or terrorism, or that constitutes unlawful hate speech
          under Slovak or EU law;</li>
          <li>material that infringes third-party intellectual property rights, where we have
          received a valid notice and the Customer has not responded;</li>
          <li>malware, exploit kits, phishing pages, or credential-harvesting infrastructure;</li>
          <li>content whose distribution is otherwise unlawful in the Slovak Republic.</li>
        </ul>
        <p>We do not proactively inspect Customer Content. We act on reports, on legal orders, and
        on automated signals of platform abuse such as outbound spam or attack traffic.</p>` },

      { h: 'Prohibited activities', body: `
        <ul>
          <li><b>Unauthorised access</b> — scanning, probing, penetrating or disrupting any system
          without documented authorisation from its owner.</li>
          <li><b>Attack infrastructure</b> — command and control, botnet coordination, DDoS-for-hire,
          proxy networks built from compromised hosts.</li>
          <li><b>Credential abuse</b> — password spraying, stuffing, or brute-force against any
          third party.</li>
          <li><b>Fraud</b> — carding, fake shops, investment fraud, impersonation of a real person
          or organisation.</li>
          <li><b>Circumventing our limits</b> — evading quotas, filters, suspensions or billing
          through multiple accounts or technical means.</li>
        </ul>` },

      { h: 'Email and bulk messaging', body: `
        <p>Bulk or commercial email sent through our Services must comply with Act No. 351/2011
        Coll. and the GDPR. Specifically:</p>
        <ul>
          <li>recipients must have given consent or fall within the narrow soft-opt-in for existing
          customers;</li>
          <li>every message must identify the sender and carry a working unsubscribe that is
          honoured within 48 hours;</li>
          <li>purchased, scraped or “appended” lists may not be used;</li>
          <li>mailbox services are for correspondence, not campaigns — a mailbox that begins
          sending campaign volumes will be rate-limited and we will point you at a proper sending
          setup instead.</li>
        </ul>
        <p>Open relays, open proxies and open recursive resolvers are prohibited outright.</p>` },

      { h: 'Network and resource use', body: `
        <p>The Customer may not spoof source addresses, announce IP space it does not control,
        operate amplification-capable services without rate limiting, or generate traffic designed
        to degrade a third party.</p>
        <p>Shared services (Web Hosting, hSuite, hDrive) carry per-tenant resource limits so that
        one tenant cannot ruin a machine for everyone. Where a Customer consistently exceeds them,
        we will say so and recommend a dedicated product rather than silently throttling.</p>
        <p><b>Cryptocurrency mining</b> is not permitted on shared services or on trial capacity. It
        is permitted on Cloud Servers, Public Cloud and GPU Cloud on paid, verified accounts —
        subject to the same fair-use terms as any other workload.</p>` },

      { h: 'Security research', body: `
        <p>We welcome good-faith security research against <b>our own</b> platform. Report findings
        to <a href="mailto:${company.security}">${company.security}</a>. We will not pursue legal
        action against a researcher who acts in good faith, does not access, modify or exfiltrate
        other customers’ data, does not degrade the Service, and gives us a reasonable period to
        fix the issue before publishing.</p>
        <p>Testing against third parties from our network requires that party’s documented
        authorisation, which we may ask to see.</p>` },

      { h: 'Reporting abuse', body: `
        <p>Send reports to <a href="mailto:${company.abuse}">${company.abuse}</a> with full
        headers or logs, timestamps in UTC, and the IP address or URL concerned. We acknowledge
        within 24 hours and act according to severity.</p>
        <p>Notices of allegedly illegal content should identify the specific material, the legal
        basis, and the notifier’s contact details, in line with the Digital Services Act
        notice-and-action requirements.</p>` },

      { h: 'Enforcement', body: `
        <p>Our response is proportionate to the severity and the Customer’s history:</p>
        <ul>
          <li><b>Notice</b> — most cases. We forward the report and ask for action within a stated
          period, usually 24 to 72 hours.</li>
          <li><b>Restriction</b> — rate limiting, null-routing a single address, or disabling one
          feature, where that resolves the harm.</li>
          <li><b>Suspension</b> — where the harm is ongoing and the Customer has not acted.</li>
          <li><b>Immediate suspension without notice</b> — reserved for active attack traffic,
          CSAM, and cases where a legal order requires it.</li>
          <li><b>Termination</b> — for serious or repeated breach.</li>
        </ul>
        <p>We aim to act on the narrowest thing that stops the harm. Suspending an entire account
        because of one bad virtual machine is a failure of engineering, not a display of rigour.</p>` },

      { h: 'Appeals', body: `
        <p>Any enforcement decision can be appealed by replying to the enforcement notice or
        writing to <a href="mailto:${company.email}">${company.email}</a>. Appeals are reviewed by
        someone other than the person who made the original decision, and answered within five
        Business Days. Where we got it wrong we restore the Service and say so.</p>` },
    ],
  },
  {
    slug: 'sla',
    title: 'Service Level Agreement',
    lede: 'What we commit to, how it is measured, what does not count, and the credit you get when we miss — claimable without an argument.',
    effective: 'on first commercial launch (not yet in force)',
    sections: [
      { h: 'What this document does', body: `
        <p>This Service Level Agreement (<b>“SLA”</b>) sets the availability we commit to for each
        Service and the service credits payable if we fail to meet it. It forms part of the
        <a href="/legal/terms/">Terms</a>. Service credits are the sole financial remedy for
        missed availability, without prejudice to the right to terminate for material breach.</p>` },

      { h: 'Availability commitments', body: `
        <p><b>Monthly Availability</b> means, for a given calendar month:
        <code>(total minutes − Downtime minutes) ÷ total minutes × 100</code>, rounded to two
        decimals, measured per Service instance.</p>
        ${slaTable}
        <p>Beta and free-of-charge features carry no commitment. Kubernetes clusters with fewer
        than three worker nodes carry no control-plane commitment.</p>` },

      { h: 'How Downtime is measured', body: `
        <p><b>Downtime</b> is a period of at least five consecutive minutes during which the
        Service fails the measurement described in the table above. Measurement is performed by our
        own monitoring from at least two independent probes outside the affected fault domain,
        sampling at 30-second intervals.</p>
        <p>Monitoring data supporting a credit claim is provided to the Customer on request. Where
        the Customer’s own monitoring disagrees with ours and the Customer can evidence its
        measurement, we will investigate and, in case of genuine doubt, resolve it in the
        Customer’s favour.</p>` },

      { h: 'What does not count as Downtime', body: `
        <ul>
          <li>Announced maintenance within a published window — at least 14 days’ notice for
          service-affecting maintenance, 7 days for security patching.</li>
          <li>Emergency maintenance to address an actively exploited vulnerability, for which we
          give as much notice as circumstances allow and a written explanation afterwards.</li>
          <li>Suspension under the Terms or the AUP, or non-payment.</li>
          <li>Faults in the Customer’s own software, configuration, DNS, or operating system;
          exhaustion of a quota or of the instance’s own resources.</li>
          <li>Failures of networks outside our control, including the Customer’s ISP and the
          public internet beyond our border routers.</li>
          <li>Force majeure as defined in the Terms.</li>
          <li>For single-instance deployments, downtime caused by the failure of a single physical
          host where the Service is designed to be deployed redundantly and the Customer chose not
          to. This exclusion does not apply to Managed Kubernetes control planes, Object Storage,
          or replicated Managed Databases.</li>
        </ul>` },

      { h: 'Service credits', body: `
        <p>Where Monthly Availability for a Service falls below its commitment, the Customer is
        entitled to a credit against the next invoice, calculated on that Service’s monthly fee:</p>
        ${table([{ t: 'Monthly Availability achieved', num: false }, { t: 'Credit', num: true }], [
          ['Below the commitment but ≥ 99.0%', '10%'],
          ['Below 99.0% but ≥ 95.0%', '25%'],
          ['Below 95.0%', '50%'],
          ['Below 95.0% in two consecutive months', '50% and the right to terminate the affected Service immediately, with a refund of any prepaid unused fees'],
        ])}
        <p>For metered Services, the “monthly fee” is the amount billed for that Service in the
        affected month. Credits do not accumulate beyond 100% of the monthly fee for a Service and
        are applied as a credit, not paid in cash, except where no further invoice will be issued.</p>` },

      { h: 'Claiming a credit', body: `
        <p>Submit a claim to <a href="mailto:${company.email}">${company.email}</a> within
        <b>30 days</b> of the end of the affected month, stating the Service, the approximate times
        of unavailability and any evidence you have. We respond within 10 Business Days.</p>
        <p>Where our own monitoring already shows that a commitment was missed, we will apply the
        credit without waiting for a claim and tell the Customer we have done so. The claim process
        exists for the cases we missed, not as an obstacle course.</p>` },

      { h: 'Incident communication', body: `
        <p>We commit to: a public status page reflecting per-Service state; notification of
        affected customers within 30 minutes of an incident being confirmed; updates at least
        hourly while an S1 incident is open; and a written post-incident report within five
        Business Days of resolution, published rather than sent only to those who complained.</p>` },

      { h: 'Support response targets', body: `
        ${table(['Severity', 'First response', 'Hours'], [
          ['S1 — production down, no workaround', '1 hour', '24/7'],
          ['S2 — production degraded', '4 hours', 'Business hours'],
          ['S3 — question or non-production issue', '1 Business Day', 'Business hours'],
          ['S4 — change or feature request', '3 Business Days', 'Business hours'],
        ])}
        <p>These are response targets, not resolution guarantees, and they apply on every plan.
        Missing a response target does not trigger a service credit, but it does entitle the
        Customer to escalate to <a href="mailto:${company.email}">${company.email}</a>, which is
        read by the people who run the platform.</p>` },
    ],
  },
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    lede: 'What personal data we process as a controller — about visitors, customers and the people who write to us — why, for how long, and what you can demand from us.',
    effective: 'on first commercial launch (not yet in force)',
    sections: [
      { h: 'Controller and contact', body: `
        <p>${N}, ${company.seat}, is the controller for the processing described here. Contact for
        all data protection matters: <a href="mailto:${company.dpo}">${company.dpo}</a>.</p>
        <p>Where we process personal data <i>on behalf of</i> a customer — everything inside the
        services the customer runs — we act as a processor, not a controller, and the
        <a href="/legal/dpa/">Data Processing Agreement</a> governs it instead of this policy.</p>
        <p>A data protection officer will be appointed if and when the scale of processing requires
        one under Article 37 GDPR. Until then the address above reaches the person responsible.</p>` },

      { h: 'What we process, why, and on what basis', body: `
        ${table(['Data', 'Purpose', 'Legal basis', 'Retention'], [
          ['Name, email, phone, company, address, VAT number', 'Concluding and performing the contract; support', 'Art. 6(1)(b) — contract', 'Contract duration + 4 years'],
          ['Billing records, invoices, payment references', 'Invoicing and statutory accounting', 'Art. 6(1)(c) — legal obligation', '10 years (Act 431/2002 Coll.)'],
          ['Account and administrative action logs', 'Security, abuse investigation, audit trail', 'Art. 6(1)(f) — legitimate interest in a secure platform', '12 months'],
          ['Server and network logs, including IP addresses', 'Operating and defending the platform', 'Art. 6(1)(f) — legitimate interest in security', '90 days, longer for an open incident'],
          ['Support tickets and their contents', 'Answering the request; quality', 'Art. 6(1)(b) and (f)', '3 years from closure'],
          ['Messages sent through the contact form', 'Answering the enquiry', 'Art. 6(1)(b) pre-contract, or (f)', '2 years'],
          ['Abuse reports and enforcement records', 'Handling abuse; legal defence', 'Art. 6(1)(c) and (f)', '3 years'],
        ])}
        <p>We do not process special categories of personal data as a controller, we do not carry
        out automated decision-making with legal effects, and we do not profile visitors.</p>` },

      { h: 'What we do not do', body: `
        <ul>
          <li>We do not sell or rent personal data. There is no circumstance in which we would.</li>
          <li>We do not use advertising networks, tracking pixels or third-party analytics on this
          site.</li>
          <li>We do not scan customer content for advertising or profiling, and we do not use it to
          train machine learning models.</li>
          <li>We do not enrich our records with data bought from brokers.</li>
        </ul>` },

      { h: 'Recipients', body: `
        <p>Personal data is disclosed only to: employees and contractors who need it for their
        role, under confidentiality obligations; the processors we use for payment, accounting and
        transactional email, each under an Article 28 contract; and public authorities where a
        legally binding request requires it.</p>
        <p>The current list of processors and sub-processors, with their role and country, is
        published in the <a href="/legal/dpa/">DPA</a> and updated with 30 days’ notice.</p>` },

      { h: 'International transfers', body: `
        <p>Our infrastructure is in the Slovak Republic. We aim to use processors established in
        the EU or EEA. Where a transfer to a third country cannot be avoided, it is made under an
        adequacy decision or under the European Commission’s standard contractual clauses, with a
        transfer impact assessment on file and available on request.</p>` },

      { h: 'Security', body: `
        <p>Encryption in transit for all services and at rest for all stored data; multi-factor
        authentication on administrative access; least-privilege access with logging; separation of
        production and non-production environments; regular patching, backup and restore testing;
        and an incident response process that notifies affected people without undue delay.</p>
        <p>Personal data breaches are notified to the Office for Personal Data Protection of the
        Slovak Republic within 72 hours where the criteria of Article 33 are met, and to affected
        individuals where Article 34 requires it.</p>` },

      { h: 'Your rights', body: `
        <p>Under the GDPR you have the right to: access your data; have inaccurate data corrected;
        have data erased where one of the Article 17 grounds applies; restrict processing; receive
        your data in a portable format; object to processing based on legitimate interests; and, in
        the rare cases where processing rests on consent, withdraw it at any time without affecting
        prior processing.</p>
        <p>Write to <a href="mailto:${company.dpo}">${company.dpo}</a>. We answer within one month,
        extendable by two further months for complex requests, and we will tell you if we extend.
        We do not charge for this, and we will not make you prove your identity beyond what is
        necessary to be sure we are talking to the right person.</p>
        <p>You may also lodge a complaint with the <b>Úrad na ochranu osobných údajov Slovenskej
        republiky</b> (Office for Personal Data Protection of the Slovak Republic), Hraničná 12,
        820 07 Bratislava, or with the supervisory authority of your habitual residence.</p>` },

      { h: 'Cookies and this website', body: `
        <p>This website sets no cookies and loads no third-party resources. There is no consent
        banner because there is nothing to consent to. See the
        <a href="/legal/cookies/">Cookie Policy</a>, which is short for the same reason.</p>` },

      { h: 'Changes to this policy', body: `
        <p>Material changes are announced by email to customers at least 30 days in advance and
        noted on this page. The version and date at the top of the document tell you which text you
        are reading.</p>` },
    ],
  },
  {
    slug: 'dpa',
    title: 'Data Processing Agreement',
    lede: 'The Article 28 terms that apply when you use our services to process personal data. It takes effect automatically with the contract — there is nothing to sign and no “enterprise plan” gate.',
    effective: 'on first commercial launch (not yet in force)',
    sections: [
      { h: 'Parties, roles and scope', body: `
        <p>This Data Processing Agreement (<b>“DPA”</b>) forms part of the
        <a href="/legal/terms/">Terms</a> between the Customer (<b>“Controller”</b>) and ${N}
        (<b>“Processor”</b>), and applies whenever the Customer uses the Services to process
        personal data within the meaning of Regulation (EU) 2016/679 (<b>“GDPR”</b>).</p>
        <p>It requires no separate signature. Where the Customer is itself a processor for a third
        party, this DPA applies on a back-to-back basis and the Customer’s instructions are treated
        as its own controller’s instructions.</p>` },

      { h: 'Subject matter and details of processing', body: `
        ${table(['Item', 'Detail'], [
          ['<b>Subject matter</b>', 'Provision of the Services ordered by the Controller'],
          ['<b>Duration</b>', 'The term of the contract, plus the 30-day export window'],
          ['<b>Nature and purpose</b>', 'Hosting, storage, transmission, backup and processing as technically required to deliver the Services'],
          ['<b>Types of personal data</b>', 'Determined by the Controller. Typically identification and contact data, content data, usage and log data'],
          ['<b>Categories of data subject</b>', 'Determined by the Controller. Typically its employees, customers, users and correspondents'],
          ['<b>Special categories</b>', 'Only if the Controller chooses to store them; the Controller is responsible for the additional safeguards Article 9 requires'],
        ])}` },

      { h: 'Instructions', body: `
        <p>The Processor processes personal data only on the Controller’s documented instructions,
        which comprise this DPA, the Terms, the configuration the Controller sets in the Services,
        and any further written instruction the parties agree.</p>
        <p>Where Union or Slovak law requires the Processor to process beyond those instructions,
        it will inform the Controller of that requirement before processing, unless the law
        prohibits it on important grounds of public interest.</p>
        <p>The Processor will inform the Controller if, in its opinion, an instruction infringes the
        GDPR, and may suspend that instruction until it is confirmed or withdrawn.</p>` },

      { h: 'Confidentiality', body: `
        <p>The Processor ensures that persons authorised to process personal data are bound by
        confidentiality obligations that survive the end of their engagement, are trained on data
        protection, and have access only to the data their role requires.</p>` },

      { h: 'Security of processing', body: `
        <p>Taking into account the state of the art and the risks, the Processor implements the
        technical and organisational measures required by Article 32, including:</p>
        <ul>
          <li>encryption in transit (TLS 1.2+) and at rest (LUKS or equivalent) for all customer data;</li>
          <li>pseudonymisation where the Service permits it without breaking functionality;</li>
          <li>multi-factor authentication and least-privilege role-based access for all
          administrative access, with immutable logging;</li>
          <li>separation of customer environments at the hypervisor, storage and network layers;</li>
          <li>redundancy of power, cooling, network and storage sufficient to meet the SLA, and
          restoration procedures tested at least annually;</li>
          <li>vulnerability management with defined patching windows, and periodic penetration
          testing by an independent party once the platform is in commercial operation;</li>
          <li>a documented incident response process with defined roles and notification paths.</li>
        </ul>
        <p>The Processor may update measures over time provided the level of protection is not
        reduced.</p>` },

      { h: 'Sub-processors', body: `
        <p>The Controller gives general authorisation for the engagement of sub-processors. Each is
        engaged under a written contract imposing the same obligations as this DPA, and the
        Processor remains fully liable for their performance.</p>
        <p>The current list, which will be maintained here and is illustrative in this preview:</p>
        ${table(['Sub-processor', 'Role', 'Location'], [
          ['To be named on launch', 'Payment processing', 'EU'],
          ['To be named on launch', 'Transactional email delivery', 'EU'],
          ['To be named on launch', 'Accounting and invoicing', 'Slovakia'],
          ['To be named on launch', 'Datacenter colocation, first region', 'Slovakia'],
        ])}
        <p>The Processor gives at least <b>30 days’ notice</b> before adding or replacing a
        sub-processor. The Controller may object on reasonable data protection grounds within that
        period; if the parties cannot resolve the objection, the Controller may terminate the
        affected Service without penalty and receive a refund of prepaid unused fees.</p>` },

      { h: 'Assistance to the Controller', body: `
        <p>The Processor assists the Controller, by appropriate technical and organisational
        measures and insofar as possible:</p>
        <ul>
          <li>in responding to data subject requests — primarily by providing the export, deletion
          and access functions in the Services, and by forwarding without undue delay any request
          received directly;</li>
          <li>in ensuring compliance with Articles 32 to 36, including data protection impact
          assessments and prior consultation, by providing the information reasonably available to
          it.</li>
        </ul>
        <p>This assistance is provided at no charge for requests of a normal scale.</p>` },

      { h: 'Personal data breaches', body: `
        <p>The Processor notifies the Controller <b>without undue delay and in any event within 24
        hours</b> of becoming aware of a personal data breach affecting the Controller’s data,
        providing the nature of the breach, the categories and approximate number of records
        concerned, likely consequences, measures taken, and a contact point — supplemented as
        further information becomes available.</p>
        <p>The Processor does not notify supervisory authorities or data subjects on the
        Controller’s behalf unless expressly instructed to do so.</p>` },

      { h: 'Deletion or return of data', body: `
        <p>On termination, the Controller may export its data for 30 days using the functions in
        the Services. After that period the Processor deletes the data, including from backups
        within the normal backup rotation of at most 35 days, unless Union or Slovak law requires
        retention. The Processor certifies deletion in writing on request.</p>` },

      { h: 'Audits', body: `
        <p>The Processor makes available the information necessary to demonstrate compliance with
        Article 28 and allows for and contributes to audits, including inspections, conducted by
        the Controller or an auditor it mandates.</p>
        <p>In practice: the Processor will first offer its current audit report or certification
        where one exists. Where that does not answer the Controller’s question, the Controller may
        request an on-site or remote audit on 30 days’ notice, once per year and additionally after
        a breach, limited to the systems processing that Controller’s data, subject to
        confidentiality and to not compromising other customers’ security. Each party bears its own
        costs for one audit per year.</p>` },

      { h: 'International transfers', body: `
        <p>The Processor stores and processes the Controller’s data in the Slovak Republic. It will
        not transfer personal data to a third country without the Controller’s instruction or
        authorisation, and any such transfer will be made under an adequacy decision or the
        European Commission’s standard contractual clauses, which are incorporated by reference
        where they apply.</p>` },

      { h: 'Liability and precedence', body: `
        <p>Liability under this DPA is subject to the limitations in the Terms, except where the
        GDPR provides otherwise. In case of conflict between this DPA and the Terms on the subject
        of data protection, this DPA prevails. Nothing in this DPA limits either party’s obligations
        directly imposed by the GDPR.</p>` },
    ],
  },
  {
    slug: 'cookies',
    title: 'Cookie Policy',
    lede: 'The shortest document on this site, because the honest version is short.',
    effective: site.updated,
    sections: [
      { h: 'What this website stores', body: `
        <p><b>Nothing.</b> This site sets no cookies, uses no local storage, loads no fonts,
        scripts, images or stylesheets from third-party servers, and contains no analytics or
        advertising code. There is no consent banner because there is nothing to consent to.</p>
        <p>Your browser sends our web server a request, which is logged with your IP address, the
        page requested, the time and your user agent, for 90 days, for security and capacity
        purposes. That is described in the <a href="/legal/privacy/">Privacy Policy</a>.</p>` },

      { h: 'What the products will store', body: `
        <p>When the services launch, the customer control panel and the applications
        (hSuite, hMail, hDrive) will need strictly necessary cookies to keep you logged in and to
        protect against cross-site request forgery. Those are exempt from consent under Section 109
        of Act No. 452/2021 Coll. and Article 5(3) of the ePrivacy Directive, because the service
        cannot work without them.</p>
        <p>Where we later want anything that is <i>not</i> strictly necessary — product analytics,
        for instance — we will ask for consent first, with a refusal that is as easy as acceptance,
        and it will be off until you say yes.</p>` },

      { h: 'Third-party content', body: `
        <p>We do not embed third-party video players, social widgets, chat boxes, maps or font
        services on this site. If that changes, this page changes first.</p>` },
    ],
  },
  {
    slug: 'imprint',
    title: 'Legal notice',
    lede: 'Who is behind this website, what its legal status actually is, and where to complain.',
    effective: site.updated,
    sections: [
      { h: 'Status of this website', body: `
        <p>This website is a <b>preview</b>. It presents the intended service catalogue, pricing
        and terms of a company that is <b>${company.status}</b>. No service described here is
        currently operating, no order can be placed, no contract can be concluded, and no payment
        can be taken.</p>
        <p>The identifiers below are placeholders. They are not invented registration numbers,
        because a fabricated IČO on a page that looks like a real company’s legal notice would be
        exactly the kind of thing this document exists to prevent.</p>` },

      { h: 'Identification of the operator', body: `
        ${table(['Item', 'Value'], [
          ['Business name', esc(company.legalName)],
          ['Legal status', esc(company.status)],
          ['Registered office', esc(company.seat)],
          ['Company ID (IČO)', esc(company.ico)],
          ['Tax ID (DIČ)', esc(company.dic)],
          ['VAT ID (IČ DPH)', esc(company.icdph)],
          ['Commercial register', esc(company.register)],
          ['Email', `<a href="mailto:${company.email}">${company.email}</a>`],
          ['Website', esc(site.origin)],
        ])}
        <p class="small">Published in the form required by Section 4 of Act No. 22/2004 Coll. on
        electronic commerce and Section 3a of the Commercial Code, to the extent the information
        exists.</p>` },

      { h: 'Supervisory authorities', body: `
        <p><b>Trade supervision and consumer protection:</b> Slovenská obchodná inšpekcia (Slovak
        Trade Inspection), Inšpektorát SOI pre Bratislavský kraj.</p>
        <p><b>Personal data protection:</b> Úrad na ochranu osobných údajov Slovenskej republiky,
        Hraničná 12, 820 07 Bratislava.</p>
        <p><b>Energy and heat regulation</b> (relevant to the heat offtake activity, once it
        exists): Úrad pre reguláciu sieťových odvetví (ÚRSO), under Act No. 657/2004 Coll. on
        thermal energy.</p>` },

      { h: 'Dispute resolution', body: `
        <p>Consumers may address unresolved complaints to the Slovak Trade Inspection as the
        general alternative dispute resolution body under Act No. 391/2015 Coll., or use the
        European Commission’s online dispute resolution platform. Complaints to us go to
        <a href="mailto:${company.email}">${company.email}</a> first, and we would rather resolve
        them there.</p>` },

      { h: 'Content of this site', body: `
        <p>All figures on this site relating to heat recovery, energy prices and deployment
        economics are desk estimates drawn from the published
        <a href="https://mild-solvent.github.io/heatcloud-slovakia/">HeatCloud Slovakia research
        dossier</a>. They are presented for evaluation. They are not engineering design, not an
        offer, and not investment advice.</p>
        <p>Service specifications, prices and availability dates describe an intended offering and
        may change entirely before launch. Third-party names — Infomaniak, NVIDIA, Kubernetes,
        Nextcloud, OpenStack and others — are used descriptively and are the trade marks of their
        respective owners; their use here implies no endorsement or affiliation.</p>` },

      { h: 'Copyright', body: `
        <p>The text and design of this website are © 2026 ${N}. The research dossier it draws on is
        published separately under its own terms.</p>` },
    ],
  },
];

export const legalBySlug = (slug: string) => legalDocs.find((d) => d.slug === slug);
