const express = require("express");

const router = express.Router();

const { asyncWrapper } = require("../../helpers/apiHelpers");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const { userDataValidation } = require("../../middlewares/userValidation");

const UserControllers = require("../../controllers/userControllers");

router.post(
  "/signup",
  userDataValidation,
  asyncWrapper(UserControllers.registration)
);

router.post("/login", userDataValidation, asyncWrapper(UserControllers.login));
router.post("/logout", authMiddleware, asyncWrapper(UserControllers.logout));
router.post(
  "/current",
  authMiddleware,
  asyncWrapper(UserControllers.receiveCurrentUser)
);

module.exports = router;
