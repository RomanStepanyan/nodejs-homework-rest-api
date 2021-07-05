const express = require("express");
const router = express.Router();
const controller = require("../../controllers/userControllers");

const { regLogValidation } = require("../../middlewares/userValidation");
const { protect } = require("../../middlewares/authProtect");

router.post("/signup", regLogValidation, controller.signUp);

router.post("/login", regLogValidation, controller.logIn);

router.post("/logout", protect, controller.logOut);

router.get("/current", protect, controller.currentUser);

module.exports = router;
