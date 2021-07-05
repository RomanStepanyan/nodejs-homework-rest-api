const jwt = require("jsonwebtoken");
// const notAuthorized = (req, res, next) => {
//   return res.status(401).res.json({
//     message: `Not authorized`,
//   });
// };

const authMiddleware = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    next(
      // notAuthorized
      res.status(401),
      res.json({
        message: `Not authorized`,
      })
    );
  }

  const [, token] = auth.split(" ");
  console.log("token from headers", token);
  if (!token) {
    next(
      // notAuthorized
      res.status(401),
      res.json({
        message: `Not authorized`,
      })
    );
  }
  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    if (!user) {
      next(
        // notAuthorized
        res.status(401),
        res.json({
          message: `Not authorized`,
        })
      );
    }
    req.token = token;
    req.user = user;
    console.log("req.token from jwt.decode", req.token);
    console.log("req.user from jwt.decode", req.user);
    next();
  } catch (error) {
    next(
      res.status(401),
      res.json({
        message: `Not authorized`,
      })
    );
  }
};
module.exports = {
  authMiddleware,
};
