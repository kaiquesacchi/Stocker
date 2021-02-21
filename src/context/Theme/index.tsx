import React, { createContext, Reducer, useContext, useReducer } from "react";
import { AsyncStorage, ToastAndroid } from "react-native";
import { ThemeProvider, DefaultTheme } from "styled-components/native";
import Dark from "./dark";
import Light from "./light";

const themes = {
  dark: Dark,
  light: Light,
};

type themeOption = keyof typeof themes;
type typeThemeContext = [theme: DefaultTheme, themeName: themeOption, setTheme: (theme: themeOption) => void];

const defaultValue: typeThemeContext = [Light, "light", (theme: keyof typeof themes) => {}];
const ThemeContext = createContext(defaultValue);

/**
 * Provides access to selected theme, current theme name and a function to alter the selected theme.
 * @return [DefaultTheme, string, (theme: string) => void]
 */
export default function useTheme(): typeThemeContext {
  return useContext(ThemeContext);
}

/**
 * Wrapper that provides the Theme context.
 */
export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const reducer = (_: themeOption, themeName: themeOption) => {
    AsyncStorage.setItem("_SETTINGS/THEME", themeName);
    return themeName;
  };

  const [theme, dispatch] = useReducer<Reducer<themeOption, any>>(reducer, "light");
  return (
    <ThemeContext.Provider value={[themes[theme], theme, dispatch]}>
      <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export async function LoadSavedTheme([_theme, themeName, setTheme]: typeThemeContext) {
  AsyncStorage.getItem("_SETTINGS/THEME")
    .then((result) => {
      if (!Object.keys(themes).includes(result as string)) setTheme(themeName);
      else if (result !== themeName) {
        setTheme(result as themeOption);
      }
    })
    .catch((error) => {
      console.error(error);
      ToastAndroid.show("Não foi possível carregar o tema salvo.", 10);
    });
}
