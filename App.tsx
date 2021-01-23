import React from "react";
import { StatusBar } from "expo-status-bar";
import Router from "./src/pages";
import { ActiveTabContextProvider } from "./src/context/ActiveTab";

export default function App() {
  return (
    <ActiveTabContextProvider>
      <StatusBar style="light" />
      <Router />
    </ActiveTabContextProvider>
  );
}
