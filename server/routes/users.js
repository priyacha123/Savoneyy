import { Router } from "express";
import { prisma } from "../prisma/client.js";

const router = Router();

router.post("/create-user", async (req, res) => {
  try {
    const { clerkId, email, fullName } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({ error: "clerkId and email are required." });
    }

    const user = await prisma.user.upsert({
      where: { clerkId },
      update: {
        email,
        fullName: fullName || null,
      },
      create: {
        clerkId,
        email,
        fullName: fullName || null,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error("create-user failed", error);
    return res.status(500).json({
      error: "Failed to create or update user.",
      code: error.code || error.name || "UNKNOWN_ERROR",
    });
  }
});

export default router;
