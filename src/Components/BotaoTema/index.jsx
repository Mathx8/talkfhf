import React from "react";
import { useTheme } from "../../ThemeContext";

const BotaoTema = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {isDark ? "☀️ Modo Claro" : "🌙 Modo Escuro"}
    </button>
  );
};

export default BotaoTema;