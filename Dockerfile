# ──────────────────────────────────────────────────────────────────────────────
# This Dockerfile exists ONLY as a safety net.
#
# This repo is a monorepo with two services:
#     backend/   → FastAPI (Python)
#     frontend/  → React + Vite + nginx
#
# Each has its own Dockerfile. Railway must be configured with
# Settings → Source → Root Directory = "backend" or "frontend" PER SERVICE.
#
# If Railway is building THIS file, it means Root Directory is not set
# and you're about to hit the same "Railpack could not determine how to
# build the app" error we fixed last time.
#
# See README.md, section "Deploying to Railway" for the 8-step setup.
# ──────────────────────────────────────────────────────────────────────────────

FROM alpine:latest

RUN echo "" && \
    echo "══════════════════════════════════════════════════════════════════════" && \
    echo "  ❌  STOP — this repo is a monorepo, not a single-service app." && \
    echo "══════════════════════════════════════════════════════════════════════" && \
    echo "" && \
    echo "  You are trying to build from the repo root. That is wrong." && \
    echo "" && \
    echo "  Fix: In Railway, go to" && \
    echo "       Settings → Source → Root Directory" && \
    echo "  and set it to either 'backend' or 'frontend' for each service." && \
    echo "" && \
    echo "  Full setup instructions: see README.md section" && \
    echo "  'Deploying to Railway — read this first'." && \
    echo "" && \
    echo "══════════════════════════════════════════════════════════════════════" && \
    exit 1
