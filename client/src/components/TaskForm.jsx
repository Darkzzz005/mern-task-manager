import { useState } from "react";

function TaskForm({ onSubmit }) {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    onSubmit({ task, dueDate: dueDate || undefined });
    setTask("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="new task..."
        className="flex-1 p-2 rounded-md bg-[#f2ede4] outline-none"
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="p-2 rounded-md bg-[#f2ede4]"
      />

      <button
        type="submit"
        className="px-4 bg-[#3b2f2f] text-[#faf7f2] rounded-md"
      >
        add
      </button>
    </form>
  );
}

export default TaskForm;
