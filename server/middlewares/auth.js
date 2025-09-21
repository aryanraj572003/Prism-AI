import { verifyToken } from "@clerk/backend";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
  console.log("Clerk Protect middleware called");

  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    // Strip "Bearer " prefix if present
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    // Verify Clerk JWT
    const decoded = await verifyToken(token, {
      secretKey: process.env.CLERK_JWT_KEY, // Get this from Clerk dashboard
    });

    // Clerk tokens carry the userId inside
    const clerkId = decoded.sub; // "sub" is the user's Clerk ID

    // Look up user in your DB by clerkId
    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    console.error("Clerk token verification failed:", error);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
