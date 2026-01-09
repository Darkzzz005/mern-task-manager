import React, { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import {
  addTask,
  deleteTask,
  getAllTasksByUser,
  updateTask,
} from "../api/api-helper";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const data = await getAllTasksByUser();
      setTasks(data.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (task) => {
    try {
      await addTask(task);
      fetchTasks();
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const handleUpdateTask = async (id, data) => {
    await updateTask(id, data);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617]">
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-semibold  text-slate-100 mb-6 tracking-wide">
          Your Tasks
        </h1>

        <div className="mb-6 bg-[#0b1220] border border-white/10 rounded-2xl p-4 shadow-lg shadow-black/30 text-black">
          <TaskForm onSubmit={handleAddTask} />
        </div>

        <div className="space-y-4">
          {loading ? (
            <p className="text-slate-400 text-center">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-slate-500 text-center">
              No tasks yet. Add something meaningful ✨
            </p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onUpdate={handleUpdateTask}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TasksPage;
