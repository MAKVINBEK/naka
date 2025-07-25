import { useEffect, useState } from "react";
import { LuSun } from "react-icons/lu";
import { FaRegMoon } from "react-icons/fa";


const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("darkstyle");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    document.documentElement.classList.toggle("darkstyle");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <button className="daynight" onClick={toggleTheme}>
      {darkMode ? <LuSun /> : <FaRegMoon />}
    </button>
  );
};

export default ThemeSwitcher;
