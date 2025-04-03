"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    const body = document.getElementById("app-body");
    const header = document.getElementById("main-header");

    body?.classList.toggle("bg-white");
    body?.classList.toggle("bg-slate-900");

    body?.classList.toggle("text-black");
    body?.classList.toggle("text-white");

    header?.classList.toggle("bg-red-500");
    header?.classList.toggle("bg-slate-950");

    setDarkMode(isDark);
    console.log(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };
  return (
    <button
      onClick={toggleTheme}
      className="text-2xl px-4 hover:scale-110 transition-transform"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}
