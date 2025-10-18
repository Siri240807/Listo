import React from "react";

export default function ProgressBar({ total, completed }) {
  const percentage = total === 0 ? 0 : (completed / total) * 100;

  return (
    <div className="mt-4 bg-gray-300 rounded-full h-4 overflow-hidden">
      <div
        className="bg-purple-500 h-4 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
