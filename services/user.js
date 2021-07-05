const Users = require("../db/userModel");

const getUserById = (id) => {
  return Users.findById(id);
};

const getUserByEmail = async (email) => {
  return await Users.findOne({ email });
};

const addUser = async (body) => {
  const user = await Users(body);
  return user.save();
};

const updateToken = (id, token) => {
  Users.updateOne({ _id: id }, { token });
};

module.exports = {
  getUserById,
  getUserByEmail,
  addUser,
  updateToken,
};
