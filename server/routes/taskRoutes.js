const express = require("express");
const router = express.Router();
const controller = require("../controllers/taskController");
const checkAuth = require("../middleware/checkAuth");

router.post("/tasks", checkAuth, controller.createTask);
router.get("/tasks", checkAuth, controller.getTasksByUserId);
router.patch("/tasks/:id", checkAuth, controller.updateTask);
router.delete("/tasks/:id", checkAuth, controller.deleteTask);

module.exports = router;
