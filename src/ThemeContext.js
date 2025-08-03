import React, { createContext, useContext, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./themes";
import OverlayEscolherTema from "./Components/EscolherTema";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState(() => {
    const salvo = localStorage.getItem("theme");
    return salvo || "light";
  });

  const [mostrarOverlay, setMostrarOverlay] = useState(() => {
    return localStorage.getItem("theme") === null;
  });

  const setAndSaveTheme = (nome) => {
    setThemeName(nome);
    localStorage.setItem("theme", nome);
    setMostrarOverlay(false);
  };

  const isDark = themeName === "dark";
  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    const novo = isDark ? "light" : "dark";
    setAndSaveTheme(novo);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <StyledThemeProvider theme={theme}>
        {children}
        {mostrarOverlay && <OverlayEscolherTema onEscolher={setAndSaveTheme} />}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);