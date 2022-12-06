const express = require("express");
const { register } = require("../controllers/auth.js");
const { login } = require("../controllers/auth.js");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
