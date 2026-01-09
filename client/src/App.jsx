import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import TasksPage from "./pages/TasksPage";

function App() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100">
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/tasks" element={<TasksPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
