import React from "react";

const quotes = [
  "Progress, not perfection 🌻",
  "Keep going, you’re doing great! 💪",
  "Small steps every day 🌸",
  "Focus on today, not tomorrow 🌞",
];

export default function QuoteBanner() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  return <div className="mb-4 text-gray-700 font-medium">{quote}</div>;
}
