import { prisma } from "../src/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { clerkId, email, fullName } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    const user = await prisma.user.create({
      data: {
        clerkId,
        email,
        fullName,
      },
    });

    return res.status(201).json(user);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}