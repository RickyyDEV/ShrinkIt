FROM oven/bun:1 AS builder

WORKDIR /app

COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

COPY . .

ARG COMMIT_SHA=unknown
RUN echo "Building commit $COMMIT_SHA"

RUN bun run build

FROM oven/bun:1-slim

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app ./

EXPOSE 3000
CMD ["concurrently -k -n \"WEB,CRON\" -c \"bgBlue.bold,bgMagenta.bold\" \"bun run dev:web\" \"bun run dev:cron\""]