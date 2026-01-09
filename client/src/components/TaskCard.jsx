import { useState } from "react";

function TaskCard({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.task);

  const toggleStatus = async () => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    onUpdate(task._id, { status: newStatus });
  };

  const saveEdit = () => {
    console.log("Saving edit:", editText);
    onUpdate(task._id, { task: editText });
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditText(task.task);
    setIsEditing(false);
  };

  return (
    <div className="bg-[#faf7f2] border border-[#e6dccf] rounded-lg p-4 flex justify-between items-start">
      <div className="flex gap-3">
        <input
          type="checkbox"
          checked={task.status === "completed"}
          onChange={toggleStatus}
          className="mt-1"
        />

        <div>
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              autoFocus
              className="border-b border-[#c9b8a5] bg-transparent outline-none text-[#3b2f2f] flex-1"
            />
          ) : (
            <div>
              <p
                className={`text-[#3b2f2f] ${
                  task.status === "completed"
                    ? "line-through text-[#7b6a58]"
                    : ""
                }`}
              >
                {task.task}
              </p>
            </div>
          )}

          <div className="text-xs text-[#7b6a58] mt-1 space-y-0.5">
            {task.dueDate && (
              <p>due: {new Date(task.dueDate).toLocaleDateString("en-IN")}</p>
            )}

            {task.completedAt && (
              <p>
                completed: {new Date(task.completedAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-1 items-center">
        {isEditing ? (
          <>
            <button
              onClick={saveEdit}
              className="text-sm text-[#7b6a58] hover:text-[#a14f3c] px-2 py-1 border rounded"
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="text-sm text-[#7b6a58] hover:text-[#a14f3c] px-2 py-1 border rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-[#7b6a58] hover:text-[#a14f3c] px-2 py-1 border rounded"
            >
              edit
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="text-sm text-[#7b6a58] hover:text-[#a14f3c] px-2 py-1 border rounded"
            >
              delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
