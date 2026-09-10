#!/usr/bin/env bash
# Smoke-test the served Next.js site.
#   bash smoke.sh [base-url]
set -uo pipefail

BASE="${1:-http://$(tailscale ip -4 | head -1):8420}"
fail=0; n=0

check() { # path expected-status [expected-substring]
  local path="$1" want="$2" needle="${3:-}" code
  code="$(curl -sS -o /tmp/next.body -w '%{http_code}' "$BASE$path" 2>/dev/null)"
  n=$((n+1))
  if [ "$code" != "$want" ]; then
    printf '  FAIL  %-44s %s (wanted %s)\n' "$path" "$code" "$want"; fail=$((fail+1)); return
  fi
  if [ -n "$needle" ] && ! grep -qF -e "$needle" /tmp/next.body; then
    printf '  FAIL  %-44s missing %q\n' "$path" "$needle"; fail=$((fail+1)); return
  fi
  printf '  ok    %-44s %s\n' "$path" "$code"
}

PRODUCTS="cloud-servers public-cloud kubernetes gpu-cloud object-storage databases backup
web-hosting domains streaming hsuite hmail hdrive heat-offtake"
LEGAL="terms aup sla privacy dpa cookies imprint"
PAGES="/ /products/ /pricing/ /business/ /console/ /heat/ /datacenters/ /about/ /support/ /contact/ /legal/"

echo "== language redirect at the root"
check / 200 'http-equiv="refresh"'

for L in sk en; do
  echo "== pages, $L"
  for p in $PAGES; do check "/$L$p" 200 "</html>"; done
  echo "== product pages, $L"
  for s in $PRODUCTS; do check "/$L/products/$s/" 200 "</html>"; done
done

echo "== legal documents"
for d in $LEGAL; do check "/en/legal/$d/" 200 "Draft, not legal advice"; done
for d in $LEGAL; do check "/sk/legal/$d/" 200 "Návrh, nie právne poradenstvo"; done

echo "== assets and metadata"
check /icon-192.png 200 ''
check /logo-256.png 200 ''
check /hero.jpg    200 ''
check /og.jpg      200 ''
check /robots.txt  200 "Disallow: /"

echo "== error handling (the static 404 is bilingual)"
check /nope/                 404 "not here"
check /nope/                 404 "tu nie je"
check /en/products/nothing/  404 "not here"
check /sk/legal/nothing/     404 "tu nie je"

echo "== content spot checks"
check /en/                       200 "heats"
check /sk/                       200 "vykuruje"
check /en/business/              200 "Assumptions"
check /sk/business/              200 "Predpoklady"
check /en/console/               200 "Heat contribution"
check /sk/console/               200 "Príspevok tepla"
check /en/pricing/               200 "Annual billing"
check /sk/pricing/               200 "Ročná fakturácia"
check /en/products/gpu-cloud/    200 "H200"
check /en/legal/dpa/             200 "Article 28"
check /sk/legal/dpa/             200 "článku 28"
check /en/legal/imprint/         200 "placeholders"
check /en/products/heat-offtake/ 200 "heat purchase agreement"
check /sk/products/heat-offtake/ 200 "zmluv"
check /sk/investors/             200 "Mäntsälä"
check /en/investors/             200 "Stockholm"

echo "== the language switch points at the same page"
check /en/pricing/ 200 'href="/sk/pricing/"'
check /sk/pricing/ 200 'href="/en/pricing/"'

echo "== interactive components hydrate (client bundles referenced)"
check /en/business/ 200 "_next/static"
check /sk/pricing/  200 "_next/static"

echo
if [ "$fail" -eq 0 ]; then echo "PASS — $n checks"; else echo "FAIL — $fail of $n checks failed"; fi
exit $((fail > 0))
