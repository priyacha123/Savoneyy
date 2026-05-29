# 🚀 Full Stack React App (Clerk + Neon + React Router)

A modern full-stack web application with authentication, protected routes, and a database-backed user system. Built for scalability and production deployment.

---

## ✨ Features

- 🔐 Authentication using Clerk (Sign In / Sign Up)
- 👤 Protected routes (Dashboard only for logged-in users)
- 🏠 Public Landing Page
- 📊 Dashboard for authenticated users
- 🧠 Auto user creation in backend after login
- 🌐 Client-side routing using React Router
- ⚡ Smooth UI interactions (hover animations, transitions)
- ☁️ Production deployment ready (Vercel)
- 🔁 SPA routing support for refresh & direct links

---

## 🛠 Tech Stack

- ⚛️ React (Vite)
- 🔐 Clerk Authentication
- 🧭 React Router DOM
- 🗄️ Neon PostgreSQL (Serverless Postgres)
- 🧩 Prisma ORM 
- 🚀 Vercel (Deployment)

---

## 📁 Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
````

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup environment variables

Create a `.env` file in the root directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
DATABASE_URL=your_neon_postgres_connection_string
PORT=5000
```

---

### 4. Start development server

```bash
npm run dev
```

Your app will run at:

```
http://localhost:5173
```

---

## 🚀 Deployment (Vercel)

### Important: Fix React Router refresh issue

Create a file called `vercel.json` in the project root:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

This ensures all routes are handled by React Router.

---

## 🔐 Authentication Flow

1. User signs in / signs up via Clerk
2. Clerk manages session
3. On login, user data is sent to backend (`/api/create-user`)
4. ProtectedRoute checks authentication
5. Only authenticated users can access `/dashboard`

---

## 📂 Project Structure

```
src/
 ├── components/
 │    ├── LandingPage.jsx
 │    ├── Login.jsx
 │    ├── Signup.jsx
 │    ├── ProtectedRoute.jsx
 │    ├── Savoney.jsx
 ├── App.jsx
 ├── main.jsx
```

---

## ⚠️ Important Notes

* Always add environment variables in Vercel for production
* `DATABASE_URL` must use Neon connection string with `sslmode=require`
* Clerk publishable key must start with `VITE_`
* SPA routing requires `vercel.json` rewrite

---


