import type { Group, Service } from '@/content/types';
import { Link } from '@/lib/locale';
import { Arrow } from './icons';

/**
 * The catalogue as a price list: numbered rows on hairlines, name, one line,
 * the starting price in mono. A table of what is sold, not a wall of cards.
 */
export default function ProductList({
  groups, services, pricesLabel, showBlurb = true,
}: {
  groups: Group[]; services: Service[]; pricesLabel: string; showBlurb?: boolean;
}) {
  let n = 0;
  return (
    <div className="space-y-14">
      {groups.map((g) => {
        const items = services.filter((s) => s.group === g.key);
        return (
          <div key={g.key} id={g.key} className="scroll-mt-20">
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-ink pb-3">
              <div>
                <h3 className="font-display text-[1.55rem] leading-tight">{g.title}</h3>
                {showBlurb ? <p className="mt-1 text-[0.9rem] text-ink-muted">{g.blurb}</p> : null}
              </div>
              <Link href="/pricing/" className="link-ink text-[0.85rem]">{pricesLabel} →</Link>
            </div>
            <ul>
              {items.map((s) => {
                n += 1;
                return (
                  <li key={s.slug}>
                    <Link
                      href={`/products/${s.slug}/`}
                      className="group -mx-3 grid grid-cols-[2.2rem_1fr] gap-x-4 gap-y-1 border-b border-line px-3 py-4 transition-colors hover:bg-paper-2 md:grid-cols-[2.2rem_15rem_1fr_13rem_1.25rem] md:items-baseline"
                    >
                      <span className="row-span-2 font-mono text-[0.7rem] text-ink-faint md:row-span-1">{String(n).padStart(2, '0')}</span>
                      <span className="font-medium text-ink decoration-heat-500 underline-offset-4 group-hover:underline">{s.name}</span>
                      <span className="hidden text-[0.9rem] leading-snug text-ink-muted md:block">{s.summary}</span>
                      <span className="col-start-2 font-mono text-[0.76rem] text-ink-soft md:col-start-auto md:text-right">{s.from}</span>
                      <Arrow className="hidden h-3.5 w-3.5 justify-self-end self-center text-heat-600 transition-transform group-hover:translate-x-0.5 md:block" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
