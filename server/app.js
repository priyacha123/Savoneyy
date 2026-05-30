import "dotenv/config";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.js";
import incomeRoutes from "./routes/income.js";
import expenseRoutes from "./routes/expense.js";
import budgetRoutes from "./routes/budget.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "savoney-api" });
});

app.use("/api", userRoutes);
app.use("/api", incomeRoutes);
app.use("/api", expenseRoutes);
app.use("/api", budgetRoutes);

app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.use((error, _req, res, _next) => {
  void _next;
  console.error("unhandled server error", error);
  res.status(500).json({ error: "Internal server error." });
});

export default app;
