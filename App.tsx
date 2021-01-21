import React from "react";
import { StatusBar } from "expo-status-bar";
import Router from "./src/pages";

export default function App() {
  return (
    <React.Fragment>
      <StatusBar style="light" />
      <Router />
    </React.Fragment>
  );
}
