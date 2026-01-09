const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User registration
exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashPass = await bcrypt.hash(password, 10);
    const user = new User({ username, password_hash: hashPass });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
};

// User login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // 1. find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 2. compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 3. generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.json({
      message: "Login successful",
      token: token,
      name: user.username,
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};
