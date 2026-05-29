import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {

    const {
      clerkId,
      title,
      amount,
      type,
    } = req.body;

    // Find current DB user
    const dbUser =
      await prisma.user.findUnique({
        where: {
          clerkId,
        },
      });

    if (!dbUser) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // Create transaction
    const transaction =
      await prisma.transaction.create({
        data: {
          userId: dbUser.id,

          title,
          amount,
          type,

          transactionDate: new Date(),

          accountId: 1,
        },
      });

    return res.status(201).json(transaction);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Server error",
    });
  }
}