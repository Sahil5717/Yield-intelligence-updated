# Yield Intelligence Frontend — production Dockerfile
#
# Two-stage build:
#   1. Node stage: install deps, run `vite build` with VITE_API_BASE_URL
#      baked in from a build arg
#   2. Nginx stage: serve the static dist/ with an SPA fallback and
#      bind to Railway's injected $PORT
#
# Build locally:
#   docker build --build-arg VITE_API_BASE_URL=http://localhost:8000 -t yi-frontend .
#
# Build for Railway:
#   Pass --build-arg VITE_API_BASE_URL=https://<your-backend>.up.railway.app
#   via Railway's build args (configured in railway.toml).

# ─── Build stage ──────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# package.json first for layer caching
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# The API URL has to be baked into the bundle at build time, because
# Vite replaces import.meta.env.VITE_* at compile time — not runtime.
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

RUN npm run build

# ─── Runtime stage ────────────────────────────────────────────────────
FROM nginx:1.27-alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Template nginx config — we'll substitute PORT at container start.
# NGINX_ENVSUBST_TEMPLATE_VARS limits envsubst to *only* these vars,
# so nginx's own variables like $uri survive unchanged. Without this
# scope, envsubst would eat $uri and break SPA fallback.
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
ENV NGINX_ENVSUBST_TEMPLATE_VARS="PORT"

# Railway injects PORT; nginx needs to listen on it. The entrypoint
# script that ships with the nginx image auto-processes templates
# from /etc/nginx/templates/ using env vars, so $PORT gets filled in.
ENV PORT=80

EXPOSE 80

# Default nginx entrypoint already handles the template substitution.
# Standard command is fine.
CMD ["nginx", "-g", "daemon off;"]
