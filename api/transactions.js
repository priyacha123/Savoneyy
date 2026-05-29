import { prisma } from "../src/lib/prisma";

export default async function handler(req, res) {

  if (req.method === "GET") {

    const transactions =
      await prisma.transaction.findMany({
        include: {
          category: true,
          account: true,
        },
      });

    return res.status(200).json(transactions);
  }

  if (req.method === "POST") {

    const transaction =
      await prisma.transaction.create({
        data: req.body,
      });

    return res.status(201).json(transaction);
  }

  return res.status(405).json({
    error: "Method not allowed",
  });
}