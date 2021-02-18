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
  const themeContext = useTheme();
  useEffect(() => {
    LoadSavedTheme(themeContext);
  }, []);
  return <React.Fragment>{children}</React.Fragment>;
}

export default function App() {
  return (
    <ThemeContextProvider>
      <ActiveTabContextProvider>
        <LoadingStockDataContextProvider>
          <SettingsLoader>
            <StatusBar style="light" />
            <Router />
          </SettingsLoader>
        </LoadingStockDataContextProvider>
      </ActiveTabContextProvider>
    </ThemeContextProvider>
  );
}
