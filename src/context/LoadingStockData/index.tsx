import React, { createContext, useContext, useState } from "react";

const defaultValue: [boolean, (isLoading: boolean) => void] = [false, (_isLoading: boolean) => {}];
const LoadingStockDataContext = createContext(defaultValue);

export default function useLoadingStockDataContext(): [boolean, (isLoading: boolean) => void] {
  /**
   * Provides access to whether the Stock Data is being loaded from API and a function to alter this status.
   * @return {[boolean, {isLoading: boolean => void}]}
   */
  return useContext(LoadingStockDataContext);
}

export function LoadingStockDataContextProvider({ children }: { children: React.ReactNode }) {
  /**
   * Wrapper that provides the LoadingStockData context.
   */
  const [isLoading, setIsLoading] = useState(false);
  return (
    <LoadingStockDataContext.Provider value={[isLoading, setIsLoading]}>{children}</LoadingStockDataContext.Provider>
  );
}
