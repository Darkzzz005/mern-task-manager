const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    console.log("Request headers: ", req.headers);
    console.log("Authorization header: ", req.headers.authorization);

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = payload;

    next();
  } catch (error) {
    console.error("Auth error: ", error);
    return res.status(400).json({ error: "Invalid or expired token" });
  }
};

module.exports = checkAuth;
