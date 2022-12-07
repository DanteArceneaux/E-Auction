const express = require("express");
const { register, login, getMe } = require("../controllers/auth.controller.js");

const router = express.Router();

const { protect } = require("../middleware/auth.middleware.js");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

module.exports = router;
