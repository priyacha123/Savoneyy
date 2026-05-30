import { Router } from "express";
import { prisma } from "../prisma/client.js";
import { findUserByClerkId, parsePositiveAmount, serializeBudget } from "./helpers.js";

const router = Router();

router.post("/budget", async (req, res) => {
  try {
    const { clerkId, type, amount } = req.body;
    const category = type?.trim();
    const parsedAmount = parsePositiveAmount(amount);

    if (!clerkId) return res.status(400).json({ error: "clerkId is required." });
    if (!category) return res.status(400).json({ error: "Budget category is required." });
    if (!parsedAmount) return res.status(400).json({ error: "Budget amount must be greater than 0." });

    const user = await findUserByClerkId(clerkId);
    if (!user) return res.status(404).json({ error: "User not found." });

    const budget = await prisma.budget.upsert({
      where: {
        userId_type: {
          userId: user.id,
          type: category,
        },
      },
      update: { amount: parsedAmount },
      create: {
        userId: user.id,
        type: category,
        amount: parsedAmount,
      },
    });

    return res.status(201).json(serializeBudget(budget));
  } catch (error) {
    console.error("create budget failed", error);
    return res.status(500).json({ error: "Failed to create budget." });
  }
});

router.get("/budget/:clerkId", async (req, res) => {
  try {
    const user = await findUserByClerkId(req.params.clerkId);
    if (!user) return res.status(404).json({ error: "User not found." });

    const budgets = await prisma.budget.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(budgets.map(serializeBudget));
  } catch (error) {
    console.error("get budgets failed", error);
    return res.status(500).json({ error: "Failed to load budgets." });
  }
});

export default router;
