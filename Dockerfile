FROM node:23-alpine AS base

# Stage 1: Dependencies
FROM base AS deps
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Stage 2: Builder
FROM base AS builder
WORKDIR /app

# Set build arguments
ARG DB_URL

# Debug: Print build argument
RUN echo "DB_URL build argument: $DB_URL"

# Create .env file with the build argument before copying source code
RUN echo "DB_URL=$DB_URL" > .env && \
    echo "NODE_ENV=production" >> .env

# Debug: Print .env file contents
RUN echo "Contents of .env file:" && cat .env

# Debug: Print environment variables
RUN echo "Environment variables:" && env | grep -E "DB_URL|NODE_ENV"

# Copy source files
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1

RUN corepack enable && corepack prepare pnpm@latest --activate
# Build the application
RUN pnpm build

# Stage 3: Runner
FROM base AS runner
WORKDIR /app

# Accept build argument
ARG DB_URL
ENV DB_URL=$DB_URL

# Debug: Print final environment variables in runner stage
RUN echo "Runner stage environment variables:" && env | grep -E "DB_URL|NODE_ENV"

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
