const jwt = require("jsonwebtoken");
const { findUser } = require("../services/user");

const { UnauthorizeError } = require("../helpers/errors");

const authMiddleware = async (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(" ");
    if (!token) {
      next(new UnauthorizeError("Not authorized"));
    }

    const user = jwt.decode(token, process.env.JWT_SECRET);
    const { _id } = user;
    const checkUser = await findUser(_id);
    if (!checkUser || checkUser.token === null) {
      next(new UnauthorizeError("User doesn't exist"));
    }

    req.user = checkUser;
    next();
  } catch (err) {
    next(new UnauthorizeError("Some problems!!!"));
  }
};

module.exports = {
  authMiddleware,
};
