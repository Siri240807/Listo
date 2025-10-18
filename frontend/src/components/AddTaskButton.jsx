import React, { useState } from "react";
import { motion } from "framer-motion";

export default function AddTaskButton({ addTask }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const handleAdd = () => {
    addTask(text);
    setText("");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8">
      {open && (
        <motion.input
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 200, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          className="p-2 rounded-full border border-gray-300 mr-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter task..."
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
      )}
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="bg-purple-600 text-white w-14 h-14 rounded-full shadow-lg text-2xl flex justify-center items-center"
        onClick={() => open ? handleAdd() : setOpen(true)}
      >
        {open ? "➤" : "+"}
      </motion.button>
    </div>
  );
}
