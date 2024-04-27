const UserModel = require("../models/usersModel");
const uuid = require("uuid").v4;
//Function to create a new user
async function createUser(req, res) {
  try {
    const { username, password } = req.body;
    const userId = uuid(); //generera uuid
    const newUser = { username, password, userId };
    const savedUser = await UserModel.insert(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { createUser };
