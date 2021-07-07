const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Users } = require("../db/userModel");

const userSignup = async (email, password) => {
  try {
    const user = new Users({
      email,
      password,
    });
    console.log("user", user);
    await user.save();

    return user;
  } catch (error) {
    console.log(error);
  }
};

const userLogin = async (email, password) => {
  try {
    const user = await Users.findOne({ email });
    console.log("user from findOne:", user);
    const isValidPassword = await user?.isValidPassword(password);
    if (!user || !isValidPassword) {
      throw new Error(`Email or password is wrong`);
    }
    // if (!(await bcrypt.compare(password, user.password))) {
    //   throw new Error(`Wrong password`);
    // }
    // const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);
    // const userId = user._id;

    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    await Users.updateOne({ _id: user._id }, { token });
    return token;
  } catch (error) {}
};

const userLogout = async (_id, token) => {
  console.log("_id from userLogout :", _id);
  try {
    const user = await Users.findByIdAndUpdate(_id, { token });
    console.log(user);
    if (!user) {
      throw new Error(`No user with '${_id}' found`);
    }

    // if (!(await bcrypt.compare(password, user.password))) {
    //   throw new Error(`Wrong password`);
    // }
    // const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);
    return user;
  } catch (error) {}
};

module.exports = {
  userSignup,
  userLogin,
  userLogout,
};

// if (err || !user || !user.token || user.token !== token) {
//     return res.status(401).json({ message: 'Not authorized' });

// 5 step
// const current = async (req, res, next) => {
//     const { email, subscription } = req.user;
//     return res.status(200).json({ currentUser: { email, subscription } });
//   };
