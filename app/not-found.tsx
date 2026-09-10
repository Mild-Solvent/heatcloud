import './globals.css';
import { Logo } from '@/components/icons';
import { en } from '@/content/i18n/en';
import { sk } from '@/content/i18n/sk';
import { BASE } from '@/lib/base';
import { fontClass } from '@/lib/fonts';

// The static 404.html a web server serves for any path it does not have. It
// cannot know which language the visitor wanted, so it says it in both.
export default function GlobalNotFound() {
  return (
    <main className={`${fontClass} flex min-h-screen items-center justify-center bg-paper p-8 font-sans text-ink`}>
      <div className="max-w-xl">
        <Logo className="h-9 w-9 text-ink" />
        <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-muted">404</p>
        {[
          ['sk', sk.notFound, sk.common.home],
          ['en', en.notFound, en.common.home],
        ].map(([l, t, home]) => {
          const nf = t as typeof en.notFound;
          return (
            <section key={l as string} lang={l as string} className="mt-6 border-t border-line pt-5">
              <h1 className="font-display text-[1.7rem] leading-tight">{nf.title}</h1>
              <p className="mt-2 text-[0.93rem] leading-relaxed text-ink-muted">{nf.lede}</p>
              <p className="mt-3">
                <a href={`${BASE}/${l}/`} className="text-[0.9rem] text-water-600 underline underline-offset-4">{nf.home}</a>
                <span className="sr-only">{home as string}</span>
              </p>
            </section>
          );
        })}
      </div>
    </main>
  );
}
