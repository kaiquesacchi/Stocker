import React, { createContext, useContext, useState } from "react";
import { ThemeProvider, DefaultTheme } from "styled-components/native";
import Dark from "./dark";
import Light from "./light";

const themes = {
  dark: Dark,
  light: Light,
};

type i = [theme: DefaultTheme, themeName: keyof typeof themes, setTheme: (theme: keyof typeof themes) => void];

const defaultValue: i = [Light, "light", (theme: keyof typeof themes) => {}];
const ThemeContext = createContext(defaultValue);

/**
 * Provides access to selected theme, current theme name and a function to alter the selected theme.
 * @return [DefaultTheme, string, (theme: string) => void]
 */
export default function useTheme(): i {
  return useContext(ThemeContext);
}

/**
 * Wrapper that provides the Theme context.
 */
export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<keyof typeof themes>("light");
  return (
    <ThemeContext.Provider value={[themes[theme], theme, setTheme]}>
      <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
