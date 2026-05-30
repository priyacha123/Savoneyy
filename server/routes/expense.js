import { Router } from "express";
import { prisma } from "../prisma/client.js";
import {
  findUserByClerkId,
  parseEntryDate,
  parsePositiveAmount,
  serializeMoneyEntry,
} from "./helpers.js";

const router = Router();

router.post("/expense", async (req, res) => {
  try {
    const { clerkId, amount, source, remarks, date } = req.body;
    const parsedAmount = parsePositiveAmount(amount);
    const parsedDate = parseEntryDate(date);

    if (!clerkId) return res.status(400).json({ error: "clerkId is required." });
    if (!parsedAmount) return res.status(400).json({ error: "Amount must be greater than 0." });
    if (!source || source === "select-type") return res.status(400).json({ error: "Expense category is required." });
    if (!parsedDate) return res.status(400).json({ error: "A valid date is required." });

    const user = await findUserByClerkId(clerkId);
    if (!user) return res.status(404).json({ error: "User not found." });

    const budget = await prisma.budget.findUnique({
      where: {
        userId_type: {
          userId: user.id,
          type: source.trim(),
        },
      },
    });

    if (!budget) {
      return res.status(400).json({ error: `Create a budget for "${source}" before adding expenses.` });
    }

    const expense = await prisma.expense.create({
      data: {
        userId: user.id,
        amount: parsedAmount,
        source: source.trim(),
        remarks: remarks?.trim() || "N/A",
        date: parsedDate,
      },
    });

    return res.status(201).json(serializeMoneyEntry(expense));
  } catch (error) {
    console.error("create expense failed", error);
    return res.status(500).json({ error: "Failed to create expense." });
  }
});

router.get("/expense/:clerkId", async (req, res) => {
  try {
    const user = await findUserByClerkId(req.params.clerkId);
    if (!user) return res.status(404).json({ error: "User not found." });

    const expenses = await prisma.expense.findMany({
      where: { userId: user.id },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    });

    return res.status(200).json(expenses.map(serializeMoneyEntry));
  } catch (error) {
    console.error("get expense failed", error);
    return res.status(500).json({ error: "Failed to load expenses." });
  }
});

export default router;
