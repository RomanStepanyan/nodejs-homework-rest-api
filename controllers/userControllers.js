const {
  createUser,
  loginUser,
  findUser,
  updateAvatar,
  userVerification,
  userVerificationCheck,
} = require("../services/user");

const { saveAvatar } = require("../helpers/saveAvatar");
const { UnauthorizeError } = require("../helpers/errors");
const { sendEmail } = require("../helpers/mailHelper");

const registration = async (req, res) => {
  const { email, password } = req.body;
  await createUser(email, password);
  res.status(201).json({ user: { email } });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const userData = await loginUser(email, password);
  const { token, user } = userData;
  const { subscription } = user;

  res.status(200).json({ token, user: { email, subscription } });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  const currentUser = await findUser(_id);
  if (!currentUser) {
    throw new UnauthorizeError("User doesn't exist");
  }
  currentUser.token = null;
  await currentUser.save();
  res.status(204).json({});
};

const receiveCurrentUser = async (req, res) => {
  const { _id } = req.user;
  const currentUser = await findUser(_id);
  if (!currentUser) {
    throw new UnauthorizeError("User doesn't exist");
  }
  const { email, subscription } = currentUser;
  res.status(200).json({ user: { email, subscription } });
};

const changeAvatar = async (req, res, next) => {
  const { id } = req.user;
  const avatarUrl = await saveAvatar(req);
  await updateAvatar(id, avatarUrl);
  return res.status(200).json({ status: "success", data: { avatarUrl } });
};

const verificationByToken = async (req, res) => {
  const { verifyToken } = req.params;
  const result = await userVerification(verifyToken);
  if (!result) {
    res.status(404).json({ message: "User not found. Verification failed" });
  } else return res.status(200).json({ message: "Verification successful" });
};

const reVerificationMailSending = async (req, res) => {
  const { email } = req.body;
  const user = await userVerificationCheck(email);
  if (!user.verifyToken) {
    res.status(404).json({ message: "Verification has already been passed" });
  }
  await sendEmail(user.verifyToken, email);
  res.status(200).json({ message: "Verification email sent" });
};

module.exports = {
  registration,
  login,
  logout,
  receiveCurrentUser,
  changeAvatar,
  verificationByToken,
  reVerificationMailSending,
};
