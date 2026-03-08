# Eose888

Eose888 is a web application built with Next.js for stock-related portfolio and trading workflows, including account management, dashboards, and analytics.

## Live Website

- [click here](https://eose888.kubits.org)

## Project Documentation

- PDF Document (GitHub local): [Open `doc.pdf`](files/doc.pdf)

## Video

- [Eose888 Video Demo](https://youtu.be/x58GIhjc7HI?si=t5bg2TR6BcZihKvd)

## Team Members

- 6710504204 - Peeraphan Phuripattaraphan
- 6710503976 - Tanaphat Makkriangkrai
- 6710503763 - Khajonvit Pechlek
- 6710504182 - Pirapat Rojbadin

## Tech Stack

- Next.js
- React
- TypeScript
- Prisma
- MongoDB
- NextAuth
- Docker
- Cloudflare

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development environment:

```bash
npm run dev
```

3. Open your browser and go to:

```text
http://localhost:3000
```

## Available Scripts

- `npm run dev` - Run stock sync scripts and Next.js development server.
- `npm run build` - Build the application for production.
- `npm run start` - Start the production server.
- `npm run test` - Run tests once using Vitest.

## Run With Docker

### Prerequisites

- Docker Engine and Docker Compose installed.
- A valid `.env` file for the Next.js app.

### Start all services (web + MongoDB + MySQL)

```bash
docker compose up --build -d
```

Then open:

```text
http://localhost:3000
```

### Stop services

```bash
docker compose down
```

### View logs

```bash
docker compose logs -f web
```

### Notes for this repository

- The current `docker-compose.yml` expects the web app at `./project/eose888-main` and env file at `./project/eose888-main/.env`.
- If your local path is this repository root, set `build.context` to `.` and `env_file` to `./.env`.
- MySQL is exposed at host port `800` and MongoDB at host port `801`.
- The web app is exposed on `127.0.0.1:3000`.
