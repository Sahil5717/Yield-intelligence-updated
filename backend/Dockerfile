# Yield Intelligence Backend — production Dockerfile
#
# Uses python:3.12-slim as base. Pure-Python / manylinux wheels are
# available for every package in requirements.txt (core), so no C
# compiler is needed. Image lands around 600-800 MB.
#
# If you want the heavy Bayesian stack in the image, add
# requirements-heavy.txt to the pip install line below and uncomment
# the build-essential apt install — image grows to ~2 GB.

FROM python:3.12-slim

# System deps — curl for healthcheck, nothing else needed for core install.
# If switching to heavy deps, uncomment build-essential + libopenblas-dev.
RUN apt-get update \
 && apt-get install -y --no-install-recommends curl \
 # build-essential libopenblas-dev \
 && rm -rf /var/lib/apt/lists/*

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

# Install Python deps first for layer caching
COPY requirements.txt ./
RUN pip install -r requirements.txt

# Then copy the app
COPY . .

# Runtime env
# - PORT is injected by Railway; we default to 8000 for local `docker run`
# - YIELD_DB_PATH points at the mounted volume directory (see railway.toml)
# - JWT_SECRET and CORS_ORIGINS must be supplied at runtime via env
ENV PORT=8000 \
    YIELD_DB_PATH=/data/yield_intelligence.db

# Create the data directory so the app can write even before volume mount
RUN mkdir -p /data

# Healthcheck — hits the public /api/health which doesn't require auth
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD curl -fsS "http://127.0.0.1:${PORT}/api/health" > /dev/null || exit 1

# Bind to 0.0.0.0 and respect the injected PORT. Use sh -c so $PORT
# is expanded at container start, not at image build.
CMD ["sh", "-c", "uvicorn api:app --host 0.0.0.0 --port ${PORT}"]
