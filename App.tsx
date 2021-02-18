import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Router from "./src/pages";

import { ActiveTabContextProvider } from "./src/context/ActiveTab";
import { LoadingStockDataContextProvider } from "./src/context/LoadingStockData";
import useTheme, { ThemeContextProvider, LoadSavedTheme } from "./src/context/Theme";

if (__DEV__) {
  import("./dev/ReactotronConfig");
}

function SettingsLoader({ children }: { children: React.ReactNode }) {
  const [theme, themeName, setTheme] = useTheme();
  useEffect(() => {
    LoadSavedTheme([theme, themeName, setTheme]);
  }, []);
  return (
    <React.Fragment>
      <StatusBar style={theme.statusBar} />
      {children}
    </React.Fragment>
  );
}

export default function App() {
  return (
    <ThemeContextProvider>
      <ActiveTabContextProvider>
        <LoadingStockDataContextProvider>
          <SettingsLoader>
            <Router />
          </SettingsLoader>
        </LoadingStockDataContextProvider>
      </ActiveTabContextProvider>
    </ThemeContextProvider>
  );
}
