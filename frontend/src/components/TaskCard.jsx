import React, { useState } from "react";
import { motion } from "framer-motion";

export default function TaskCard({ task, toggleComplete, deleteTask, updateTask }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.itemDescription);

  const handleSave = () => {
    updateTask(task.ID, text);
    setEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="bg-white/50 backdrop-blur-md rounded-2xl p-4 mb-3 flex justify-between items-center shadow-md"
    >
      {editing ? (
        <input
          className="flex-1 p-2 rounded-md border border-gray-300"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <span
          onClick={() => toggleComplete(task.ID)}
          className={`flex-1 cursor-pointer ${task.completed ? "line-through text-gray-400" : ""}`}
        >
          {task.itemDescription}
        </span>
      )}

      <div className="flex space-x-2">
        {editing ? (
          <button className="bg-green-400 px-3 py-1 rounded-lg" onClick={handleSave}>Save</button>
        ) : (
          <>
            <button className="bg-yellow-400 px-3 py-1 rounded-lg" onClick={() => setEditing(true)}>Edit</button>
            <button className="bg-red-400 px-3 py-1 rounded-lg" onClick={() => deleteTask(task.ID)}>❌</button>
          </>
        )}
      </div>
    </motion.div>
  );
}
