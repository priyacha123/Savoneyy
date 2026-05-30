import { prisma } from "../prisma/client.js";

export function parsePositiveAmount(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount <= 0) {
    return null;
  }
  return amount;
}

export function parseEntryDate(value) {
  if (!value) {
    return null;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

export function serializeMoneyEntry(entry) {
  return {
    ...entry,
    amount: Number(entry.amount),
    date: entry.date.toISOString().slice(0, 10),
  };
}

export function serializeBudget(budget) {
  return {
    ...budget,
    amount: Number(budget.amount),
  };
}

export async function findUserByClerkId(clerkId) {
  if (!clerkId || typeof clerkId !== "string") {
    return null;
  }

  return prisma.user.findUnique({
    where: { clerkId },
  });
}
