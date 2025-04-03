"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.classList.toggle("dark");
    const body = document.getElementById("app-body");
    const header = document.getElementById("main-header");

    if (darkMode) {
      console.log("light");
      body?.classList.remove("bg-slate-900", "text-white");
      body?.classList.remove("dark:text-white", "dark:bg-slate-900");

      header?.classList.remove("dark:bg-slate-950");
      header?.classList.remove("bg-slate-950");

      header?.classList.add("bg-red-500");
    } else {
      console.log("dark");

      body?.classList.toggle("dark:bg-slate-900");
      body?.classList.toggle("dark:text-white");
      body?.classList.remove("bg-white", "text-black");

      body?.classList.add("bg-slate-900", "text-white");

      header?.classList.toggle("dark:bg-slate-950");
      header?.classList.remove("bg-red-500");
      header?.classList.add("bg-slate-950");
    }

    setDarkMode(isDark);
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
