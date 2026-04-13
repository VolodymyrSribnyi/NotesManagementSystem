# Notes Management App

Full-stack notes application built with ASP.NET Core 10 + React + TypeScript.

## Tech Stack
- **Backend**: .NET 10, ASP.NET Core, EF Core, SQL Server
- **Frontend**: React, TypeScript, TanStack Query, react-i18next, Tailwind CSS
- **Testing**: Playwright (e2e)

---

## 🐳 Run with Docker (recommended)

> Prerequisites: [Docker Desktop](https://www.docker.com/products/docker-desktop/)

```bash
docker compose up --build
```

- API: http://localhost:5157/swagger
- Client: http://localhost:5173

---

## 💻 Run locally

### Backend
> Prerequisites: .NET 10 SDK, SQL Server (LocalDB is fine)

```bash
cd API
dotnet restore
dotnet ef database update
dotnet run
```

API runs on https://localhost:7176 — Swagger UI at `/swagger`

### Frontend
> Prerequisites: Node.js 20+

```bash
cd notes-client
npm install
npm run dev
```

Client runs on http://localhost:5173

---

## 🧪 E2E Tests (Playwright)

Make sure the frontend dev server and API are running, then:

```bash
cd notes-client
npx playwright install chromium   # first time only
npx playwright test
```
