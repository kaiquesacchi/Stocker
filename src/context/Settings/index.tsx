import React, { createContext, Reducer, useContext, useReducer } from "react";
import { AsyncStorage } from "react-native";

interface iSettings {
  GoogleFinanceURL: string;
  loadDataOnInit: string;
}
type typeSettingsKey = keyof iSettings;
interface iKeyValue {
  key: typeSettingsKey;
  value: string;
}
type typeSettingsContext = [iSettings, ({}: iKeyValue) => void];

const defaultValue: typeSettingsContext = [{ GoogleFinanceURL: "", loadDataOnInit: "true" }, ({ key, value }) => {}];
const SettingsContext = createContext(defaultValue);

/**
 * Provides access to settings and a function to alter them.
 * @return [object, ({key: string, value: string}) => void]
 */

export default function useTheme(): typeSettingsContext {
  return useContext(SettingsContext);
}

/**
 * Wrapper that provides the Settings context.
 */
export function SettingsContextProvider({ children }: { children: React.ReactNode }) {
  const reducer = (old: iSettings, { key, value }: iKeyValue) => {
    AsyncStorage.setItem("_SETTINGS/" + key, value);
    return { ...old, [key]: value };
  };

  const [settings, dispatch] = useReducer<Reducer<iSettings, any>>(reducer, defaultValue[0]);
  return <SettingsContext.Provider value={[settings, dispatch]}>{children}</SettingsContext.Provider>;
}

export async function LoadSavedSettings([settings, setSettings]: typeSettingsContext) {
  return Promise.all(
    Object.keys(settings).map(async (key) => {
      const defaultValue = settings[key as typeSettingsKey];
      const result = await AsyncStorage.getItem("_SETTINGS/" + key);
      if (result === null) {
        AsyncStorage.setItem("_SETTINGS/" + key, defaultValue);
        return [key, defaultValue];
      }
      if (result !== defaultValue) {
        setSettings({ key: key as typeSettingsKey, value: result });
      }
      return [key, result];
    })
  ).then((results) => Object.fromEntries(results));
}
