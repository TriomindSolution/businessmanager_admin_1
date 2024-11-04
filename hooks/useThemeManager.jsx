import { useState, useEffect } from "react";

const useThemeManager = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const themeColor = JSON.parse(localStorage.getItem("color-theme"));
    return themeColor === "dark";
  });

  const updateTheme = () => {
    const themeColor = JSON.parse(localStorage.getItem("color-theme"));
    setIsDarkMode(themeColor === "dark");
    document.body.classList.toggle("dark", themeColor === "dark"); // Toggle dark class on body
  };

  useEffect(() => {
    // Initialize theme on component mount
    updateTheme();

    // Listen for both storage and themeChange events
    window.addEventListener("storage", updateTheme);
    window.addEventListener("themeChange", updateTheme);

    return () => {
      window.removeEventListener("storage", updateTheme);
      window.removeEventListener("themeChange", updateTheme);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    localStorage.setItem("color-theme", JSON.stringify(newTheme));
    window.dispatchEvent(new Event("themeChange"));
  };

  return [isDarkMode, toggleTheme];
};

export default useThemeManager;
