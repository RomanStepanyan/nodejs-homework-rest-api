const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");

const { sendEmail } = require("../helpers/mailHelper");
const { UsersModel } = require("../db/usersModel");
const {
  RegistrationConflictError,
  UnauthorizeError,
} = require("../helpers/errors");

const createUser = async (email, password) => {
  const existEmail = await UsersModel.findOne({ email });
  if (existEmail) {
    throw new RegistrationConflictError("Email in use");
  }

  const verifyToken = shortid.generate();
  try {
    await sendEmail(verifyToken, email);
  } catch (e) {
    throw new RegistrationConflictError("Some mailing problems occurred");
  }

  const user = new UsersModel({
    email,
    password,
    verifyToken,
  });

  return await user.save();
};

const loginUser = async (email, password) => {
  const user = await UsersModel.findOne({ email });
  if (!user) {
    throw new UnauthorizeError("User email is wrong");
  }
  if (!user.verify) {
    throw new UnauthorizeError("Verification failed");
  }
  const userCheck = await bcrypt.compare(password, user.password);
  if (!userCheck) {
    throw new UnauthorizeError("User password is wrong");
  }
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      subscription: user.subscription,
    },
    process.env.JWT_SECRET
  );
  await UsersModel.findByIdAndUpdate(user._id, { token: token }, { new: true });

  return { user, token };
};

const findUser = async (id) => {
  return await UsersModel.findById(id);
};

const updateAvatar = async (id, avatarURL) => {
  return await UsersModel.updateOne({ _id: id }, { avatarURL });
};

const userVerification = async (verifyToken) => {
  const user = await UsersModel.findOne({ verifyToken });
  if (!user) {
    return false;
  }
  await user.updateOne({ verify: true, verifyToken: "" });
  return true;
};

const userVerificationCheck = async (email) => {
  const user = await UsersModel.findOne({ email: email });
  return user;
};

module.exports = {
  createUser,
  loginUser,
  findUser,
  updateAvatar,
  userVerification,
  userVerificationCheck,
};
