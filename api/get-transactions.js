import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {

    const { clerkId } = req.body;

    // Find user
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

    // Fetch only this user's transactions
    const transactions =
      await prisma.transaction.findMany({
        where: {
          userId: dbUser.id,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return res.status(200).json(transactions);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Server error",
    });
  }
}