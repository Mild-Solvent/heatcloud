#!/usr/bin/env bash
# Smoke-test the served Next.js site.
#   bash ~/github/heatcloud-slovakia/site/smoke.sh [base-url]
set -uo pipefail

BASE="${1:-http://$(tailscale ip -4 | head -1):8420}"
fail=0; n=0

check() { # path expected-status [expected-substring]
  local path="$1" want="$2" needle="${3:-}" code
  code="$(curl -sS -o /tmp/next.body -w '%{http_code}' "$BASE$path" 2>/dev/null)"
  n=$((n+1))
  if [ "$code" != "$want" ]; then
    printf '  FAIL  %-40s %s (wanted %s)\n' "$path" "$code" "$want"; fail=$((fail+1)); return
  fi
  if [ -n "$needle" ] && ! grep -qF -e "$needle" /tmp/next.body; then
    printf '  FAIL  %-40s missing %q\n' "$path" "$needle"; fail=$((fail+1)); return
  fi
  printf '  ok    %-40s %s\n' "$path" "$code"
}

PRODUCTS="cloud-servers public-cloud kubernetes gpu-cloud object-storage databases backup
web-hosting domains streaming hsuite hmail hdrive heat-offtake"
LEGAL="terms aup sla privacy dpa cookies imprint"

echo "== pages"
for p in / /products/ /pricing/ /business/ /console/ /heat/ /datacenters/ /about/ /support/ /contact/ /legal/; do
  check "$p" 200 "</html>"
done

echo "== product pages"
for s in $PRODUCTS; do check "/products/$s/" 200 "</html>"; done

echo "== legal documents"
for d in $LEGAL; do check "/legal/$d/" 200 "Draft, not legal advice"; done

echo "== assets and metadata"
check /favicon.svg 200 svg
check /og.png      200 ''
check /robots.txt  200 "Disallow: /"

echo "== error handling"
check /nope/              404 "not here"
check /products/nothing/  404 "not here"
check /legal/nothing/     404 "not here"

echo "== content spot checks"
check /                      200 "heats Slovak towns"
check /business/             200 "Assumptions"
check /console/              200 "Heat contribution"
check /pricing/              200 "Annual billing"
check /products/gpu-cloud/   200 "H200"
check /legal/dpa/            200 "Article 28"
check /legal/imprint/        200 "placeholders"
check /products/heat-offtake/ 200 "heat purchase agreement"

echo "== interactive components hydrate (client bundles referenced)"
check /business/ 200 "_next/static"
check /pricing/  200 "_next/static"

echo
if [ "$fail" -eq 0 ]; then echo "PASS — $n checks"; else echo "FAIL — $fail of $n checks failed"; fi
exit $((fail > 0))
