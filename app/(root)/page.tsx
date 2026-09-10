import { Logo } from '@/components/icons';
import { BASE } from '@/lib/base';
import { localeName, locales } from '@/lib/i18n';

// Runs before the meta refresh in the layout fires: an English browser goes to
// /en/, everything else to /sk/. The links underneath are for the case where
// neither happens.
const pick = `(function(){try{var l=(navigator.language||'').toLowerCase();var t=l.indexOf('en')===0?'en':'sk';location.replace(${JSON.stringify(BASE)}+'/'+t+'/'+location.hash)}catch(e){}})();`;

export default function RootRedirect() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <script dangerouslySetInnerHTML={{ __html: pick }} />
      <div className="text-center">
        <Logo className="mx-auto h-10 w-10 text-ink" />
        <p className="mt-4 font-display text-[1.4rem] font-semibold">HeatCloud Slovakia</p>
        <ul className="mt-6 flex justify-center gap-6 font-mono text-[0.8rem] uppercase tracking-[0.12em]">
          {locales.map((l) => (
            <li key={l}>
              <a href={`${BASE}/${l}/`} hrefLang={l} lang={l} className="underline underline-offset-4 hover:text-heat-600">
                {localeName[l]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
