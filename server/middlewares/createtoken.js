// createToken.js

import express from "express";
import { clerkMiddleware, getAuth, requireAuth } from "@clerk/express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Use clerkMiddleware to ensure req.auth is populated
router.use(clerkMiddleware());

// POST /api/create-token
router.post("/", (req, res) => {
  // getAuth returns auth info from request
  const auth = getAuth(req);

  if (!auth.userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  // Issue your custom JWT
  const customToken = jwt.sign(
    { userId: auth.userId },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return res.json({ success: true, token: customToken });
});

export default router;
