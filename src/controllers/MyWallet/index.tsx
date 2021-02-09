import { AsyncStorage } from "react-native";
import StockDataController from "../StockData";

export default class MyWallet {
  static getMyWallet = async () => {
    const myWalletJSON = await AsyncStorage.getItem("_myWallet");
    return JSON.parse(myWalletJSON || "{}");
  };

  static getMyDetailedWallet = async () => {
    let myWallet = await MyWallet.getMyWallet();
    return Object.keys(myWallet).map(async (symbol) => {
      const stock = await StockDataController.getBySymbol(symbol);
      return {
        Symbol: symbol,
        Name: stock.Name,
        Price: stock.Price,
        Change: stock.Change,
        Amount: myWallet[symbol].currentAmount,
      };
    });
  };

  /** Registers a new trade to your wallet.
   * @param symbol: Symbol of the traded stock. Ex: "ABCD4"
   * @param amount: Amount of stocks traded. If positive, represents a buying operation, whereas negative values represent selling.
   * @param unitaryPrice: Price of each stock traded, always positive.
   */
  static addTrade = async (symbol: string, amount: number, unitaryPrice: number, date: Date) => {
    let myWallet = await MyWallet.getMyWallet();
    if (!Object.keys(myWallet).includes(symbol)) {
      myWallet[symbol] = {
        currentAmount: 0,
        trades: [],
      };
    }
    myWallet[symbol].currentAmount += amount;
    myWallet[symbol].trades.push({
      amount: amount,
      unitaryPrice: unitaryPrice,
      date: date,
    });
    return AsyncStorage.setItem("_myWallet", JSON.stringify(myWallet));
  };
}
