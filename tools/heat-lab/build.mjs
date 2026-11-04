// Builds the heat model lab into public/heat-lab/ as a self-contained static page.
//
//   node tools/heat-lab/build.mjs      (writes public/heat-lab/index.html + chart.umd.min.js)
//   node tools/heat-lab/verify.mjs     (checks the JS ports against the reference results)
//
// The calculations are JavaScript ports of github.com/Fenixcrowlite/datacenter-heat-reuse:
//   model.mjs -> heat_reuse/annual.py   (annual district-heat model, 8,760 h)
//   pool.mjs  -> heat_reuse/pool.py     (closed-loop Simulink/Stateflow pool model v04)
//   cool.mjs  -> it_independent_cooling_step_SK.m (IT cooling fault model, 5 s steps)
// data.json holds the repository's synthetic inputs, PVGIS typical-year weather for
// Partizánske and Spišská Nová Ves, pool forcing, FMEA and capacity-fault tables.
// Nothing is loaded from a third party at runtime: Chart.js is copied next to the page.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, '../../public/heat-lab');
const read = (f) => readFileSync(join(here, f), 'utf8');
const strip = (s) => s.split('\n').filter((l) => !l.startsWith('export ')).join('\n');

// Site palette (components/investor-landing.css) and no web fonts: the site promises
// no third-party requests, so the lab uses IBM Plex when installed and system faces otherwise.
const siteCss = `
:root[data-theme="light"]{--bg:#f8f8f4;--panel:#ffffff;--ink:#202922;--ink-2:#4f5952;--ink-3:#68706a;--line:#dce0d8;--grid:#eceee8;
  --heat:#bd501e;--heat-soft:#f6e3d6;--accent:#263c31;--accent-soft:#e3ebe4;--good:#2f6b45;--warn:#9a5b06;--bad:#b42318;color-scheme:light;
  --font-display:"IBM Plex Sans",system-ui,-apple-system,"Segoe UI",sans-serif}
html.embed header.top{display:none}
html.embed .wrap{padding-block:4px 8px}
html.embed aside.controls{position:static;max-height:none}
h1{font-weight:500;letter-spacing:-.03em}
section.card h2{font-weight:500;letter-spacing:-.015em}
`;
const siteJs = `
const Q=new URLSearchParams(location.search);
if(Q.get('lang')==='sk'||Q.get('lang')==='en')lang=Q.get('lang');
if(Q.get('embed')){document.documentElement.classList.add('embed');
  const post=()=>{try{parent.postMessage({type:'heat-lab-height',height:document.documentElement.scrollHeight,view:location.hash.slice(1)||'model'},'*')}catch(e){}};
  new ResizeObserver(post).observe(document.body);addEventListener('hashchange',post);addEventListener('load',post);}
`;

let page = read('page.tpl.html')
  .replace(/<link rel="preconnect"[^>]*>\n/, '')
  .replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*>\n/, '')
  .replace('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js', 'chart.umd.min.js')
  .replace('/*__SITE_CSS__*/', () => siteCss)
  .replace('/*__SITE_JS__*/', () => siteJs)
  .replace('__DATA__', () => read('data.json'))
  .replace('__MODEL__', () => strip(read('model.mjs')))
  .replace('__COOL__', () => strip(read('cool.mjs')))
  .replace('__POOL__', () => strip(read('pool.mjs')));

const doc = `<!doctype html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<style>*,*::before,*::after{box-sizing:border-box}body{margin:0;font-size:14px}img{max-width:100%}[hidden]{display:none!important}</style>
${page}
</head>
</html>
`;
// The template is body content with its own <title>/<style> at the top; browsers
// hoist it correctly, but keep a proper body for validators.
const fixed = doc.replace('</head>\n</html>', '').replace(/(<div class="wrap">)/, '</head>\n<body>\n$1') + '</body>\n</html>\n';

mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'index.html'), fixed);
copyFileSync(join(here, 'chart.umd.min.js'), join(out, 'chart.umd.min.js'));
console.log('heat lab written to public/heat-lab/ (' + Math.round(fixed.length / 1024) + ' KB)');
