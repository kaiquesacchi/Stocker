import React, { createContext, useContext, useState } from "react";

const defaultValue: [string, (activeTab: string) => void] = ["/", (activeTab: string) => {}];
const ActiveTabContext = createContext(defaultValue);

export default function useActiveTab(): [string, (activeTab: string) => void] {
  /**
   * Provides access to the active tab's path and a function to alter it.
   * @return {[string, {activeTab: string => void}]}
   */
  return useContext(ActiveTabContext);
}

export function ActiveTabContextProvider({ children }: { children: React.ReactNode }) {
  /**
   * Wrapper that provides the ActiveTab context.
   */
  const [activeTab, setActiveTab] = useState("/");
  return <ActiveTabContext.Provider value={[activeTab, setActiveTab]}>{children}</ActiveTabContext.Provider>;
}
