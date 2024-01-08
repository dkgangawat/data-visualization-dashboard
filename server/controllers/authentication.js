const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    // Compare the password with the hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({  success:false ,message: "Invalid username or password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET_KEY
    );
    res.cookie("token", token);
    res.json({ success: true, message: "Login successful", user, token });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

//this signup function used to create a admin if there is no admin in the database
const signup = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    //count document with role 1 and return if count is greater than 0
    const count = await User.countDocuments({ role: 1 });
    if (count > 0) {
      return res.status(401).json({
        success: false,
        error: "You are not authorized to create admin",
      });
    }
    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, username, password:hashedPassword, role: 1 });
    const createdUser = await user.save();
    const token = jwt.sign(
      {
        userId: createdUser._id,
      },
      process.env.JWT_SECRET_KEY
    );
    res.status(201).json({
      message: "signup successful",
      success: true,
      user: createdUser,
      token,
    });
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({ success: false, error: "Failed to create user" });
  }
};

module.exports = {
  login,
  signup,
};
