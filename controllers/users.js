const UserModel = require("../models/usersModel");
const bcrypt = require("bcryptjs");
//Function to create a new user
async function createUser(req, res, next) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };
    const savedUser = await UserModel.insert(newUser);

    res.status(201).json({ username: username, password: password });
  } catch (error) {
    next(error);
  }
}

module.exports = { createUser };

// I detta exempel används bcrypt.hash() för att hasha lösenordet med en säkerhetsnivå (salt) på 10.
// Det hashade lösenordet sparas sedan i databasen istället för det råa lösenordet. När användaren loggar in senare kan du använda bcrypt.compare()
// för att jämföra det hashade lösenordet med det som användaren anger vid inloggning.
