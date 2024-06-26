const jwt = require("jsonwebtoken");
const User = require("../models/Users");

require("dotenv").config();

const auth = async (req, res, next) => {
  if (req.path === "/login") {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }
  
  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer") {
    return res
      .status(401)
      .json({ error: "Unauthorized: Invalid token format" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ _id: decodedToken.userId });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid credentials" });
    }

    req.userId = decodedToken._id;
    req.loggedInUser = user;
    next();
  } catch (error) {
    logger.error("Error authenticating token:", error);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = { auth };
