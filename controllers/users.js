const UserModel = require("../models/usersModel");
const bcrypt = require("bcryptjs");

//function to compare passwords
async function comparePassword(password, hashedPassword) {
  try {
    const isTheSame = await bcrypt.compare(password, hashedPassword);
    return isTheSame;
  } catch (error) {
    throw new Error("Error hashing passwords");
  }
}
//Function to find a user
function findUser(username) {
  return UserModel.findOne({ username: username });
}

module.exports = { comparePassword, findUser };
