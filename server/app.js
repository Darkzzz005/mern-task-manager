require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");
const port = process.env.PORT;

// cors middleware
app.use(cors());

// middleware to parse JSON requests
app.use(express.json());

// connect to database
connectDB();

// routes
app.use('/api/auth', require('./routes/userRoutes'));
app.use('/api', require('./routes/taskRoutes'));

// start server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});