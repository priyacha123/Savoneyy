import { Router } from "express";
import { prisma } from "../prisma/client.js";
import {
  findUserByClerkId,
  parseEntryDate,
  parsePositiveAmount,
  serializeMoneyEntry,
} from "./helpers.js";

const router = Router();

router.post("/income", async (req, res) => {
  try {
    const { clerkId, amount, source, remarks, date } = req.body;
    const parsedAmount = parsePositiveAmount(amount);
    const parsedDate = parseEntryDate(date);

    if (!clerkId) return res.status(400).json({ error: "clerkId is required." });
    if (!parsedAmount) return res.status(400).json({ error: "Amount must be greater than 0." });
    if (!source || source === "select-type") return res.status(400).json({ error: "Income source is required." });
    if (!parsedDate) return res.status(400).json({ error: "A valid date is required." });

    const user = await findUserByClerkId(clerkId);
    if (!user) return res.status(404).json({ error: "User not found." });

    const income = await prisma.income.create({
      data: {
        userId: user.id,
        amount: parsedAmount,
        source: source.trim(),
        remarks: remarks?.trim() || "N/A",
        date: parsedDate,
      },
    });

    return res.status(201).json(serializeMoneyEntry(income));
  } catch (error) {
    console.error("create income failed", error);
    return res.status(500).json({ error: "Failed to create income." });
  }
});

router.get("/income/:clerkId", async (req, res) => {
  try {
    const user = await findUserByClerkId(req.params.clerkId);
    if (!user) return res.status(200).json([]);

    const incomes = await prisma.income.findMany({
      where: { userId: user.id },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    });

    return res.status(200).json(incomes.map(serializeMoneyEntry));
  } catch (error) {
    console.error("get income failed", error);
    return res.status(500).json({ error: "Failed to load income." });
  }
});

export default router;
