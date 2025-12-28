# --------
# 1. Builder
# --------
FROM oven/bun:1.2.23-alpine AS builder

# Add the link to your new repository here
LABEL org.opencontainers.image.source="https://github.com/armandwipangestu/velora"

WORKDIR /app

# Install dependencies using cached layer
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Declare the argument that expect to receive at build time
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_GISCUS_REPO
ARG NEXT_PUBLIC_GISCUS_REPO_ID
ARG NEXT_PUBLIC_GISCUS_CATEGORY
ARG NEXT_PUBLIC_GISCUS_CATEGORY_ID
ARG NEXT_PUBLIC_GISCUS_MAPPING
ARG NEXT_PUBLIC_GISCUS_TERM
ARG NEXT_PUBLIC_UMAMI_DATA_WEBSITE_ID
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID

# Set is as an environment variable so the build can access it
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_GISCUS_REPO=$NEXT_PUBLIC_GISCUS_REPO
ENV NEXT_PUBLIC_GISCUS_REPO_ID=$NEXT_PUBLIC_GISCUS_REPO_ID
ENV NEXT_PUBLIC_GISCUS_CATEGORY=$NEXT_PUBLIC_GISCUS_CATEGORY
ENV NEXT_PUBLIC_GISCUS_CATEGORY_ID=$NEXT_PUBLIC_GISCUS_CATEGORY_ID
ENV NEXT_PUBLIC_GISCUS_MAPPING=$NEXT_PUBLIC_GISCUS_MAPPING
ENV NEXT_PUBLIC_GISCUS_TERM=$NEXT_PUBLIC_GISCUS_TERM
ENV NEXT_PUBLIC_UMAMI_DATA_WEBSITE_ID=$NEXT_PUBLIC_UMAMI_DATA_WEBSITE_ID
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID=$NEXT_PUBLIC_GA_MEASUREMENT_ID

# Copy all source
COPY . .

# Build Next.js
RUN bun run build


# --------
# 2. Runner
# --------
FROM oven/bun:1.2.23-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["bun", "run", "server.js"]