# Build the static export, then serve it with nginx. Same bytes as the GitHub
# Pages deployment — only the base path differs.
FROM node:22-bookworm-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
# Strictly `npm ci`: it must fail loudly if the lockfile and package.json have
# drifted, rather than quietly installing a different version than was tested.
RUN npm ci --no-audit --no-fund
COPY . .
# Served at the domain root here, so no base path.
RUN npm run build

FROM nginx:alpine AS runner
COPY --from=builder /app/out /usr/share/nginx/html
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=4s --start-period=5s --retries=3 \
  CMD wget -qO /dev/null http://127.0.0.1/ || exit 1
