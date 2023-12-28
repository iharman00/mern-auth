import express from "express";

import protect from "../../middlewares/auth/protectRoutesMiddleware.js";
import userAuthRoutes from "./userAuthRoutes.js";
import userProfileRoutes from "./userProfileRoutes.js";

const router = express.Router();

// User Authentication
router.use("/auth", userAuthRoutes);

// User Profile data - protected
router.use("/profile", protect, userProfileRoutes);

export default router;
