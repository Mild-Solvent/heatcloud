#!/usr/bin/env bash
# Build the Next.js image and serve it on the tailnet.
# Run ON the devbox:  bash ~/github/heatcloud-slovakia/site/deploy.sh [port]
#
# Binds only to the Tailscale address, so the preview is reachable from the
# tailnet and from nowhere else on the LAN.
set -euo pipefail

NAME=heatcloud-site
PORT="${1:-8420}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "== building image"
docker build -t "$NAME:latest" "$ROOT"

echo "== resolving tailscale address"
TSIP="$(tailscale ip -4 2>/dev/null | head -1 || true)"
if [ -z "$TSIP" ]; then
  echo "!! no tailscale IPv4 found; refusing to bind 0.0.0.0" >&2
  exit 1
fi
echo "   $TSIP"

echo "== (re)starting container on ${TSIP}:${PORT}"
docker rm -f "$NAME" >/dev/null 2>&1 || true
docker run -d \
  --name "$NAME" \
  --restart unless-stopped \
  -p "${TSIP}:${PORT}:80" \
  "$NAME:latest" >/dev/null

echo "== waiting for it to answer"
ok=
for _ in $(seq 1 60); do
  if curl -fs -o /dev/null "http://${TSIP}:${PORT}/" 2>/dev/null; then ok=1; break; fi
  sleep 1
done
if [ -z "$ok" ]; then
  echo "!! never came up; last 40 log lines:" >&2
  docker logs --tail 40 "$NAME" >&2
  exit 1
fi

echo "== serving on http://devbox.tail20cc8f.ts.net:${PORT}/"
docker ps --filter "name=$NAME" --format '   {{.Names}}  {{.Status}}  {{.Ports}}'
