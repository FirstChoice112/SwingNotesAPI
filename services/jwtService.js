const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      throw new Error("Authorization header missing or invalid");
    }
    const token = req.headers.authorization.replace("Bearer ", "");
    const data = jwt.verify(token, process.env.JWT_SECRET);

    req.user = data;

    next();
  } catch (error) {
    res.status(401).json({ success: false, error: "Invalid token 🤔" });
  }
}

module.exports = verify;
