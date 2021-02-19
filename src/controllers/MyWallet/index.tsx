import { AsyncStorage } from "react-native";
import StockDataController from "../StockData";

export interface iTrade {
  amount: number;
  unitaryPrice: number;
  date: Date;
}
export interface iWalletStockRegistry {
  currentAmount: number;
  totalSpent: number;
  totalSold: number;
  trades: iTrade[];
}

interface iWallet {
  [key: string]: iWalletStockRegistry;
}

export default class MyWallet {
  static getMyWallet = async (): Promise<iWallet> => {
    const myWalletJSON = await AsyncStorage.getItem("_myWallet");
    return JSON.parse(myWalletJSON || "{}");
  };

  static getBySymbol = async (symbol: string) => {
    let myWallet = await MyWallet.getMyWallet();
    return myWallet[symbol];
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
        totalSpent: 0,
        totalSold: 0,
        trades: [],
      };
    }
    myWallet[symbol].currentAmount += amount;
    myWallet[symbol][amount > 0 ? "totalSpent" : "totalSold"] += Math.abs(amount) * unitaryPrice;
    myWallet[symbol].trades.push({
      amount: amount,
      unitaryPrice: unitaryPrice,
      date: date,
    });
    return AsyncStorage.setItem("_myWallet", JSON.stringify(myWallet));
  };

  static getFullStats = async () => {
    let myWallet = await MyWallet.getMyWallet();

    let currentInvested = 0;
    let pastInvested = 0;
    let soldMinusSpent = 0;

    await Promise.all(
      Object.keys(myWallet).map(async (symbol) => {
        const { Price, "Last 30 Days": Last30Days } = await StockDataController.getBySymbol(symbol);
        if (Price === null) return;
        const { currentAmount, totalSold, totalSpent } = myWallet[symbol];
        currentInvested += Price * currentAmount;
        pastInvested += Last30Days[0] * currentAmount;
        soldMinusSpent += totalSold - totalSpent;
      })
    );

    return {
      totalChangeIn30: pastInvested !== 0 ? ((currentInvested - pastInvested) / pastInvested) * 100 : 0,
      currentInvested: currentInvested,
      currentEarnings: currentInvested + soldMinusSpent,
    };
  };

  static removeFromWallet = async (symbols: string[]) => {
    let myWallet = await MyWallet.getMyWallet();
    symbols.forEach((symbol) => delete myWallet[symbol]);
    return AsyncStorage.setItem("_myWallet", JSON.stringify(myWallet));
  };
}
