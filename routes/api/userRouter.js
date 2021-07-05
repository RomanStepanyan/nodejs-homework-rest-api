// const express = require("express");
// const router = express.Router();
// const validate = require("./validation.js");

// const { userSignup, userLogin, userLogout } = require("../../model/userAuth");

// router.post("/signup", validate.user, async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     const newUser = await userSignup(email, password);
//     if (!newUser) {
//       res.status(400);
//       res.json({
//         message: `Signup is failed, check your email or password`,
//       });
//     }
//     res.status(201);
//     res.json({ newUser });
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/login", validate.user, async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     const token = await userLogin(email, password);
//     res.status(201);
//     res.json({ "User logged in": token });
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/logout", async (req, res, next) => {
//   const { _id, token } = req.user;
//   console.log("id from logout :", _id);
//   console.log("token from logout :", token);
//   try {
//     await userLogout(_id, null);
//     res.status(201);
//     res.json({ "User logged in": token });
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;
