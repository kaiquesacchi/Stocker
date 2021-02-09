import { AsyncStorage } from "react-native";
import AllStocks from "./allStocks.json";

export default class StockData {
  static getBySymbol = async (symbol: string) => {
    const result = await AsyncStorage.getItem(symbol.toUpperCase());
    if (result === null) throw "Stock not found.";
    return JSON.parse(result);
  };

  static getAllAvailable = () => {
    return AllStocks;
  };
}
