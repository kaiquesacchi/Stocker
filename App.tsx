import React from "react";
import { StatusBar } from "expo-status-bar";
import Router from "./src/pages";

import { ActiveTabContextProvider } from "./src/context/ActiveTab";

if (__DEV__) {
  import("./dev/ReactotronConfig");
}

export default function App() {
  return (
    <ActiveTabContextProvider>
      <StatusBar style="light" />
      <Router />
    </ActiveTabContextProvider>
  );
}
