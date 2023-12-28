import express from "express";

import {
  getUserData,
  updateUserData,
} from "../../controllers/user/userProfileController.js";

const router = express.Router();

router.get("/", getUserData);
router.put("/", updateUserData);

export default router;
