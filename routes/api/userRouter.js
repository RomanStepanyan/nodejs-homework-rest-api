const express = require("express");

const router = express.Router();

const { asyncWrapper } = require("../../helpers/apiHelpers");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const uploadMiddleware = require("../../middlewares/uploadMiddleware");

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
router.patch(
  "/avatars",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  asyncWrapper(UserControllers.changeAvatar)
);
router.get(
  "/verify/:verifyToken",
  asyncWrapper(UserControllers.verificationByToken)
);
router.post("/verify", asyncWrapper(UserControllers.reVerificationMailSending));
module.exports = router;
