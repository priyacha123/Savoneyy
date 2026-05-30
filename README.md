# Savoney — Personal Finance Tracker

A web-based personal finance tracker to log income, set budgets, track expenses, and monitor spending through a clean dashboard.

Built as part of an individual assessment project.

---

## Features

- Sign up / Sign in with Clerk authentication
- Protected dashboard — only accessible when logged in
- Add, view, and delete income entries
- Set budget limits per spending category
- Log expenses and track against budgets with visual progress bars
- Pie charts for income and expense breakdowns
- Filter expenses by category and date
- User data persisted in Neon PostgreSQL via Prisma
- Auto user creation in database on first login
- Fully responsive — mobile and desktop layouts
- Scroll-triggered animations
- Deployed on Vercel with SPA routing support

---

## Tech Stack

| Layer | Tool |
|---|---|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Auth | Clerk |
| Routing | React Router DOM |
| Database | Neon (Serverless PostgreSQL) |
| ORM | Prisma |
| Charts | Chart.js |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── components/
│   ├── LandingPage.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── ProtectedRoute.jsx
│   └── Savoney.jsx
├── App.jsx
└── main.jsx
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/savoney.git
cd savoney
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
DATABASE_URL=your_neon_postgres_connection_string
PORT=5000
```

> `DATABASE_URL` must be your Neon connection string with `?sslmode=require` appended.

### 4. Set up the database

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

---

## Deployment (Vercel)

### Environment variables

Add these in your Vercel project settings under **Environment Variables**:

```
VITE_CLERK_PUBLISHABLE_KEY
DATABASE_URL
```

---

## Authentication Flow

1. User signs up or logs in via Clerk
2. Clerk manages the session
3. On first login, user is created in the Neon database via `/api/create-user`
4. `ProtectedRoute` checks authentication before rendering the dashboard
5. Unauthenticated users are redirected to the login page

---

## Notes

- Do not expose `.env` or any credentials publicly
- Clerk publishable key must be prefixed with `VITE_` to be accessible in the frontend
- Database schema changes should be pushed with `npx prisma db push`
- The live deployment must remain accessible at the time of review

---

## Live Demo

[savoney.vercel.app](https://savoney.vercel.app)

---

