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
  static async getMyWallet(): Promise<iWallet> {
    const myWalletJSON = await AsyncStorage.getItem("_myWallet");
    return JSON.parse(myWalletJSON || "{}");
  }

  static async getBySymbol(symbol: string) {
    let myWallet = await MyWallet.getMyWallet();
    return myWallet[symbol];
  }

  static async getMyDetailedWallet() {
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
  }

  /** Registers a new trade to your wallet.
   * @param symbol: Symbol of the traded stock. Ex: "ABCD4"
   * @param amount: Amount of stocks traded. If positive, represents a buying operation, whereas negative values represent selling.
   * @param unitaryPrice: Price of each stock traded, always positive.
   */
  static async addTrade(symbol: string, amount: number, unitaryPrice: number, date: Date) {
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
  }

  /**
   * Removes trades from the Wallet registry. If there are no trades left, removes the whole entry.
   * Out of bounds indexes are ignored.
   * @param symbol Symbol of the traded stock. Ex: "ABCD4"
   * @param indexes Indexes of the trades from the trades's list that will be removed.
   *
   * @throws {"Symbol not on Wallet"} The symbol
   */
  static async removeTrades(symbol: string, indexes: number[]) {
    let myWallet = await MyWallet.getMyWallet();
    if (!Object.keys(myWallet).includes(symbol)) throw "Symbol not on Wallet";

    let { currentAmount, totalSold, totalSpent, trades } = myWallet[symbol];
    trades = trades.filter((trade, index) => {
      if (indexes.includes(index)) {
        currentAmount -= trade.amount;
        if (trade.amount > 0) {
          // Was a buying trade.
          totalSpent -= trade.amount * trade.unitaryPrice;
        } else {
          // Was a selling trade.
          totalSold -= -1 * trade.amount * trade.unitaryPrice;
        }
        return false;
      }
      return true;
    });

    // Removes entry if no trade is left.
    if (trades.length === 0) delete myWallet[symbol];
    else {
      myWallet[symbol] = {
        currentAmount: currentAmount,
        totalSold: totalSold,
        totalSpent: totalSpent,
        trades: trades,
      };
    }
    return AsyncStorage.setItem("_myWallet", JSON.stringify(myWallet));
  }

  static async getFullStats() {
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
  }

  static async removeFromWallet(symbols: string[]) {
    let myWallet = await MyWallet.getMyWallet();
    symbols.forEach((symbol) => delete myWallet[symbol]);
    return AsyncStorage.setItem("_myWallet", JSON.stringify(myWallet));
  }
}
