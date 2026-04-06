# 🏪 Marvelli Management System

A production-ready, full-stack management platform for social assistance distribution, built with **Laravel 12** and **React 19**. The system is fully containerized, designed for high availability and ease of deployment, providing a centralized solution for family records, inventory tracking, and document generation.

---

## Philosophy

Most volunteer-run management tools suffer from fragmentation: spreadsheets for families, manual PDF generation, and disconnected inventory logs. This project centralizes these operations into a cohesive, declarative infrastructure.

The goal is to provide a "zero-configuration" environment for developers and a robust, modern interface for volunteers. By leveraging Docker containerization, we ensure the environment is identical from development to production, abstracting away the complexities of PHP extensions, Node versions, and database drivers.

---

## Architecture

The system is organized into a modular container-based architecture, orchestrated via Docker Compose over a shared bridge network (`laravel_network`).

```
┌─────────────────────────────────────────────────────────────────┐
│                        Docker Environment                       │
│                                                                 │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐   │
│  │    Nginx     │      │   React UI   │      │    MySQL     │   │
│  │ (Web Entry)  │◄────►│ (Dev/Prod)   │      │  (Database)  │   │
│  └──────┬───────┘      └──────────────┘      └──────┬───────┘   │
│         │                                           ▲           │
│         ▼                                           │           │
│  ┌──────────────┐                                   │           │
│  │ Laravel App  │───────────────────────────────────┘           │
│  │  (PHP-FPM)   │       • RESTful API / Sanctum                 │
│  └──────────────┘       • PDF Generation (DomPDF)               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Communication Flow

- **Frontend Entry**: React (Vite) serves the SPA on `:5173`.
- **API Proxy**: Nginx handles incoming requests on `:8080`, proxying PHP traffic to the Laravel `app` service.
- **Persistence**: MySQL 8.0 provides relational storage with a persistent volume for data durability.
- **Authentication**: Laravel Sanctum manages stateful and token-based authentication for secure API access.

---

## Services

| Service | Technology | Description |
|---------|------------|-------------|
| **Nginx** | `nginx:alpine` | High-performance web server & reverse proxy |
| **App** | `Laravel 12 (PHP 8.2)` | Core business logic, PDF generation & API |
| **React** | `React 19 + Vite` | Modern TypeScript frontend with MUI & Tailwind |
| **MySQL** | `MySQL 8.0` | Relational database with automated health checks |

---

## Security Model

- **Environment Isolation** — Sensitive credentials (DB passwords, App Keys) are managed via `.env` files and never committed to version control.
- **Sanctum Protection** — API routes are guarded by Laravel Sanctum, implementing SPA authentication and API token validation.
- **Middleware Enforcement** — Granular access control via `IsAdmin` and `CheckTokenLastUsed` middlewares to ensure session integrity.
- **CORS Hardening** — Strict CORS policies configured to allow requests only from authorized frontend origins.

---

## Repository Structure

```
/
├── app/               # Laravel Core (Models, Controllers, Middleware)
├── bootstrap/         # Laravel Bootstrapping & Cache
├── config/            # System & Service Configuration
├── database/          # Migrations & Seeders
├── docker/            # Service-specific Docker configurations
├── react/             # Frontend SPA (TypeScript, MUI, i18next)
│   ├── src/           # Component-based Architecture
│   └── public/        # Static assets & MSW Workers
├── resources/         # Blade Views (PDF Templates)
├── routes/            # API & Web Route Definitions
└── docker-compose.yml # Infrastructure Orchestration
```

---

## Setup & Deployment

### 1. Prerequisites
Ensure you have **Docker** and **Docker Compose** installed.

### 2. Initialization
Clone the repository and prepare the environment:
```bash
# Copy environment files
cp .env.example .env

# Install backend dependencies (local or via container)
composer install
```

### 3. Orchestration
Spin up the entire infrastructure:
```bash
docker compose up --build -d
```

### 4. Database Provisioning
Run migrations and seed initial data:
```bash
docker compose exec app php artisan migrate --seed
```

---

## Access Points

| Application | URL |
|-------------|-----|
| **Frontend UI** | [http://localhost:5173](http://localhost:5173) |
| **Backend API** | [http://localhost:8080](http://localhost:8080) |

---

## Development Workflow

- **Clear Cache**: `docker compose exec app php artisan optimize:clear`
- **Frontend Logs**: `docker compose logs -f react`
- **Testing**: `docker compose exec app php artisan test`
