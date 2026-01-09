const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { task, priority, dueDate } = req.body;

    const newTask = await Task.create({
      task,
      priority,
      dueDate,
      user: req.user.id, // from auth middleware
    });

    res.status(201).json({
      success: true,
      data: newTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getTasksByUserId = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.body.status === "completed") {
      updateData.completedAt = new Date();
    }

    if (req.body.status && req.body.status !== "completed") {
      updateData.completedAt = null;
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
