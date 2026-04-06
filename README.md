# ShrinkIt

A modern URL shortener with analytics, password protection, and link expiration.

[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06b6d4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-1.3-fbf0df?style=flat-square&logo=bun)](https://bun.sh/)

## Features

- Shorten URLs with auto-generated or custom codes
- Password-protected links
- Expiration dates for links
- Click tracking and analytics
- Google OAuth authentication
- Dashboard with full link management (CRUD, search, pagination)
- Responsive dark-themed UI

## Tech Stack

| Category | Technology |
|---|---|
| **Runtime** | Bun |
| **Framework** | Vinext (Vite-based) |
| **Language** | TypeScript |
| **UI** | React 19, shadcn/ui, Tailwind CSS 4 |
| **Database** | PostgreSQL + Prisma ORM |
| **Cache** | Redis |
| **Auth** | Better Auth (Google OAuth) |
| **API** | oRPC + TanStack Query |
| **Forms** | React Hook Form + Zod |
| **State** | Zustand, nuqs |
| **Deployment** | Docker + Caddy |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) >= 1.3
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/shrinkit.git
cd shrinkit

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env

# Generate Prisma client and run migrations
bun run generate
bun run migrate

# Start development server
bun run dev
```

### Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/shrinkit
REDIS_URL=redis://localhost:6379
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run generate` | Generate Prisma client |
| `bun run migrate` | Run database migrations |
| `bun run reset` | Reset database |

## Project Structure

```
app/
├── (auth)/          # Authentication (Better Auth, Google OAuth)
├── (database)/      # Database layer (Prisma, PostgreSQL)
├── dashboard/       # Protected dashboard routes
├── link/[link]/     # URL redirect handler
├── rpc/             # oRPC API layer
└── components/      # Shared UI components (shadcn/ui)
```

## Architecture

```
Client (React 19)
    │
    ├── oRPC + TanStack Query (type-safe API calls)
    ├── Better Auth (Google OAuth sessions via Redis)
    └── shadcn/ui + Tailwind CSS 4 (dark-themed UI)

Server (Vinext/Vite)
    │
    ├── oRPC Router (protected procedures)
    ├── Prisma ORM (PostgreSQL)
    └── Redis (session storage)
```

## Deployment

```bash
docker compose up --build -d
```

The app runs behind a Caddy reverse proxy with automatic HTTPS.

---

> Portfolio project — [shrinkit.rihosting.com.br](https://shrinkit.rihosting.com.br)
