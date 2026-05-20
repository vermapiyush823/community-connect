# 🏘️ Community Connect

A modern full-stack community/social organization platform built with Angular 21, NestJS 11, and MongoDB Atlas.

![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Angular](https://img.shields.io/badge/Angular-21-red)
![NestJS](https://img.shields.io/badge/NestJS-11-red)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 21 (Standalone APIs) |
| Backend | NestJS 11 |
| Database | MongoDB Atlas + Mongoose |
| UI | Angular Material MDC + Tailwind CSS v4 |
| Package Manager | pnpm |
| Architecture | pnpm workspace monorepo |

## 📁 Project Structure

```
community-connect/
├── apps/
│   ├── frontend/          # Angular 21 app
│   │   └── src/app/
│   │       ├── core/      # Auth, guards, interceptors
│   │       ├── features/  # Dashboard, Members, Donations, Events
│   │       ├── layout/    # Toolbar + Sidenav layout
│   │       └── services/  # API services
│   └── backend/           # NestJS 11 API
│       └── src/
│           ├── modules/   # Announcements, Events, Members, Donations, Dashboard
│           ├── common/    # Filters, interceptors
│           ├── config/    # Environment config
│           ├── database/  # MongoDB connection
│           └── seed/      # Seed data scripts
├── packages/
│   └── shared/            # Shared TypeScript interfaces
└── docker-compose.yml
```

## ⚡ Quick Start

### Prerequisites

- **Node.js** >= 20.x
- **pnpm** >= 9.x (`npm install -g pnpm`)
- **MongoDB Atlas** account (or local MongoDB)

### 1. Clone & Install

```bash
cd community-connect
pnpm install
```

### 2. Configure Environment

```bash
# Copy the example env file
cp .env.example apps/backend/.env

# Edit apps/backend/.env with your MongoDB Atlas URI
```

### 3. Seed the Database

```bash
pnpm seed
```

### 4. Start Development Servers

```bash
# Start both frontend and backend
pnpm dev

# Or start individually
pnpm dev:frontend   # http://localhost:4200
pnpm dev:backend    # http://localhost:3000
```

### 5. Access the App

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:3000/api
- **Swagger Docs**: http://localhost:3000/api/docs

## 🐳 Docker

```bash
docker-compose up --build
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/announcements` | All announcements |
| GET | `/api/announcements/latest` | Latest 6 announcements |
| POST | `/api/announcements` | Create announcement |
| GET | `/api/events` | All events |
| GET | `/api/events/upcoming` | Upcoming events |
| POST | `/api/events` | Create event |
| GET | `/api/dashboard/summary` | Dashboard stats |
| GET | `/api/members` | All members |
| POST | `/api/members` | Create member |
| GET | `/api/donations` | All donations |
| POST | `/api/donations` | Create donation |

## 🎨 Features

### Dashboard (Fully Working)
- ✅ Welcome banner with date & greeting
- ✅ Stats cards (Members, Events, Donations, Volunteers)
- ✅ Announcements carousel with auto-scroll, arrows, swipe, infinite loop
- ✅ Upcoming events list with register buttons
- ✅ Recent activity timeline

### Scaffolded Pages
- 📋 Members Directory
- 💰 Donations Management
- 📅 Events Calendar

## 🛠️ Development

### Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start frontend + backend |
| `pnpm build` | Build all packages |
| `pnpm seed` | Seed database with demo data |
| `pnpm lint` | Lint all packages |
| `pnpm format` | Format code with Prettier |

## 📄 License

MIT
# community-connect
