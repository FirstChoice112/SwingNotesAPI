const UserModel = require("../models/usersModel");
//Function to create a new user
async function createUser(req, res, next) {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    const newUser = { username, password };
    console.log(newUser);
    const savedUser = await UserModel.insert(newUser);
    res.status(201).json({ username: username, password: password });
  } catch (error) {
    next(error);
  }
}

module.exports = { createUser };
