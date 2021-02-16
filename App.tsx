import React from "react";
import { StatusBar } from "expo-status-bar";
import Router from "./src/pages";

import { ActiveTabContextProvider } from "./src/context/ActiveTab";
import { LoadingStockDataContextProvider } from "./src/context/LoadingStockData";

if (__DEV__) {
  import("./dev/ReactotronConfig");
}

export default function App() {
  return (
    <ActiveTabContextProvider>
      <LoadingStockDataContextProvider>
        <StatusBar style="light" />
        <Router />
      </LoadingStockDataContextProvider>
    </ActiveTabContextProvider>
  );
}
