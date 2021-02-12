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

  /**
   * Calculates the change in price on the last 30 days
   * @param symbol Stock symbol
   * @returns Change (as percentage) in price . Returns null if price or price history are unavailable.
   */
  static getChangeIn30 = async (symbol: string) => {
    const { Price, "Last 30 Days": LastIn30 } = await StockData.getBySymbol(symbol);
    if (Price === null || LastIn30.length === 0) return null;
    return ((Price - LastIn30[0]) / LastIn30[0]) * 100;
  };
}
