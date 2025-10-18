import React from "react";

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
      onClick={() =>
        setTheme(theme === "light" ? "dark" : theme === "dark" ? "aesthetic" : "light")
      }
    >
      {theme === "light" ? "🌞" : theme === "dark" ? "🌙" : "🍓"}
    </button>
  );
}
