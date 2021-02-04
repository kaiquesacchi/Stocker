import { AsyncStorage } from "react-native";
import AllStocks from "./allStocks.json";

export default class StockData {
  static getBySymbol = (symbol: string) => {
    return AsyncStorage.getItem(symbol.toUpperCase());
  };

  static getAllAvailable = () => {
    return AllStocks;
  };
}
