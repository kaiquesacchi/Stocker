import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Router from "./src/pages";

import { ActiveTabContextProvider } from "./src/context/ActiveTab";
import { LoadingStockDataContextProvider } from "./src/context/LoadingStockData";
import useTheme, { ThemeContextProvider, LoadSavedTheme } from "./src/context/Theme";
import useSettings, { SettingsContextProvider, LoadSavedSettings } from "./src/context/Settings";

if (__DEV__) {
  import("./dev/ReactotronConfig");
}

function SettingsLoader({ children }: { children: React.ReactNode }) {
  const [theme, themeName, setTheme] = useTheme();
  const settingsTools = useSettings();

  useEffect(() => {
    LoadSavedTheme([theme, themeName, setTheme]);
    LoadSavedSettings(settingsTools);
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
    <SettingsContextProvider>
      <ThemeContextProvider>
        <ActiveTabContextProvider>
          <LoadingStockDataContextProvider>
            <SettingsLoader>
              <Router />
            </SettingsLoader>
          </LoadingStockDataContextProvider>
        </ActiveTabContextProvider>
      </ThemeContextProvider>
    </SettingsContextProvider>
  );
}
