import { AsyncStorage } from "react-native";
import AllStocks from "./allStocks.json";

import { iGoogleFinanceStockData } from "../../services/GoogleFinanceAPI";

export default class StockData {
  static getBySymbol = async (symbol: string): Promise<iGoogleFinanceStockData> => {
    const result = await AsyncStorage.getItem(symbol.toUpperCase());
    if (result === null) throw "Stock not found.";
    return JSON.parse(result);
  };

  static getAllAvailable = () => {
    return AllStocks;
  };
}
