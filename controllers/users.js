const UserModel = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
//Function to create a new user with a hashed password
async function createUser(req, res, next) {
  try {
    const { username, password } = req.body;
    const userId = uuid.v4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword, userId };
    await UserModel.insert(newUser);

    res.status(201).json({ username: username, password: password, userId });
  } catch (error) {
    next(error);
  }
}
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

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await findUser(username);
    const correctPassword = comparePassword(password, user.password);

    const result = {
      success: false,
    };

    if (correctPassword) {
      const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
        expiresIn: 600,
      });

      result.success = true;
      result.token = token;
    } else {
      result.message = "faulty login attempt 🤦‍♂️";
    }
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error 🤯" });
  }
};

module.exports = { createUser, comparePassword, findUser, loginUser };
