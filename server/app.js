import "dotenv/config";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.js";
import incomeRoutes from "./routes/income.js";
import expenseRoutes from "./routes/expense.js";
import budgetRoutes from "./routes/budget.js";
import { prisma } from "./prisma/client.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.FRONTEND_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
].filter(Boolean);

function isAllowedOrigin(origin) {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;

  try {
    const { hostname } = new URL(origin);
    return hostname === "localhost" || hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "savoney-api" });
});

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "savoney-api" });
});

app.get("/api/health/db", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: "ok", database: "connected" });
  } catch (error) {
    console.error("database health check failed", error);
    res.status(503).json({
      status: "error",
      database: "unavailable",
      message: "Database connection failed. Check DATABASE_URL in the deployment environment.",
    });
  }
});

app.get("/health/db", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: "ok", database: "connected" });
  } catch (error) {
    console.error("database health check failed", error);
    res.status(503).json({
      status: "error",
      database: "unavailable",
      message: "Database connection failed. Check DATABASE_URL in the deployment environment.",
    });
  }
});

app.use("/api", userRoutes);
app.use("/api", incomeRoutes);
app.use("/api", expenseRoutes);
app.use("/api", budgetRoutes);
app.use("/", userRoutes);
app.use("/", incomeRoutes);
app.use("/", expenseRoutes);
app.use("/", budgetRoutes);

app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.use((error, _req, res, _next) => {
  void _next;
  console.error("unhandled server error", error);
  res.status(500).json({ error: "Internal server error." });
});

export default app;
