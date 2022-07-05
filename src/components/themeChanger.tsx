import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BeakerIcon, CogIcon, MoonIcon, SunIcon } from "@heroicons/react/solid";

export const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme === "system") setTheme("light");
    setMounted(true);
  }, [theme, setTheme]);

  const toggleTheme = () => {
    setTheme(theme === "light" || theme === "system" ? "dark" : "light");
  };

  if (!mounted || !theme) return null;

  return (
    <button className="btn btn-primary btn-md" onClick={toggleTheme}>
      {theme === "dark" ? (
        <MoonIcon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
    </button>
  );
};
