# Savoney

Savoney is a production-ready personal finance dashboard for authenticated users. It tracks income, expenses, budgets, dashboard metrics, filters, and Chart.js analytics with user-specific PostgreSQL persistence.

## Features

- Clerk authentication with protected dashboard routes
- Auto-creates or updates a database user from the Clerk profile
- User-private income, expense, and budget data
- Income history and pie chart grouped by source
- Expense history, category/date filters, and pie chart grouped by category
- Budget category creation, expense dropdown population, progress bars, and over-budget highlighting
- PostgreSQL persistence through Prisma and Neon
- Express API backend with validation and status-code based errors
- Responsive dashboard layout and mobile slide-out sidebar

## Tech Stack

| Layer | Tool |
| --- | --- |
| Frontend | React, Vite |
| Styling | Tailwind CSS, local component styles |
| Auth | Clerk |
| Charts | Chart.js, react-chartjs-2 |
| Backend | Express.js |
| ORM | Prisma |
| Database | Neon PostgreSQL |
| Frontend Hosting | Vercel |
| Backend Hosting | Render, Railway, or local Node |

## Folder Structure

```txt
src/
  components/
  lib/api.js
  App.jsx
  main.jsx
server/
  prisma/client.js
  routes/
    budget.js
    expense.js
    helpers.js
    income.js
    users.js
  server.js
prisma/
  schema.prisma
```

## Environment Variables

Create `.env` in the project root for local development.

```env
VITE_CLERK_PUBLISHABLE_KEY=
VITE_API_URL=
DATABASE_URL=
CLERK_SECRET_KEY=
FRONTEND_URL=http://localhost:5173
PORT=5000
```

Use `VITE_API_URL` only when the API is hosted on a different origin, for example `https://savoney-api.onrender.com`. During local Vite development, `/api` is proxied to `http://localhost:5000`.

## Clerk Setup

1. Create a Clerk application.
2. Add `VITE_CLERK_PUBLISHABLE_KEY` to the frontend environment.
3. Add `CLERK_SECRET_KEY` to the backend host environment.
4. Configure Clerk sign-in and sign-up redirects to `/dashboard`.

## Neon and Prisma Setup

1. Create a Neon PostgreSQL project.
2. Copy the pooled or direct connection string.
3. Set `DATABASE_URL` in `.env`. Include `sslmode=require` when Neon requires it.
4. Push the Prisma schema and generate the client:

```bash
npx prisma db push
npx prisma generate
```

## Local Development

Install dependencies:

```bash
npm install
```

Run the Express API:

```bash
npm run dev:server
```

Run the Vite frontend in another terminal:

```bash
npm run dev
```

Open the Vite URL, usually `http://localhost:5173`.

## API Endpoints

All endpoints return JSON.

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/health` | Backend health check |
| POST | `/api/create-user` | Create or update a user by Clerk ID |
| POST | `/api/income` | Create an income entry |
| GET | `/api/income/:clerkId` | Get only that user's income entries |
| POST | `/api/expense` | Create an expense entry |
| GET | `/api/expense/:clerkId` | Get only that user's expenses |
| POST | `/api/budget` | Create or update a budget category |
| GET | `/api/budget/:clerkId` | Get only that user's budgets |

### Request Examples

```json
{
  "clerkId": "user_123",
  "email": "person@example.com",
  "fullName": "Person Example"
}
```

```json
{
  "clerkId": "user_123",
  "amount": 2500,
  "source": "Salary",
  "remarks": "Monthly salary",
  "date": "2026-05-30"
}
```

```json
{
  "clerkId": "user_123",
  "type": "Food",
  "amount": 10000
}
```

## Deployment

### Backend on Render or Railway

1. Create a Node service from this repository.
2. Set the start command:

```bash
npm run server
```

3. Add environment variables:

```env
DATABASE_URL=
CLERK_SECRET_KEY=
FRONTEND_URL=https://your-vercel-app.vercel.app
PORT=5000
```

4. Run `npx prisma db push` once against the production database.

### Frontend on Vercel

1. Import the repository into Vercel.
2. Set the build command to `npm run build`.
3. Set environment variables:

```env
VITE_CLERK_PUBLISHABLE_KEY=
VITE_API_URL=https://your-backend-host.example.com
```

4. Deploy.

## Notes

- Never hardcode Clerk or database secrets.
- Every income, expense, and budget record is linked through the database user's Clerk ID.
- Expense categories come from saved budget categories.
- Filtering happens in React state after user-specific expenses are loaded from the API.
