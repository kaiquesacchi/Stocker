import { AsyncStorage } from "react-native";
import csvToJson from "csvtojson";

export interface iGoogleFinanceStockData {
  Symbol: string;
  Name: string;
  Price: number | null;
  Change: number | null;
  "P/E": number | null;
  EPS: number | null;
  High: number | null;
  Low: number | null;
  "Last 30 Days": number[];
}

function fromBackendToNumber(value: string) {
  const parsedValue = Number(value.replace(",", "."));
  return isNaN(parsedValue) ? null : parsedValue;
}
export default class GoogleFinanceAPI {
  static async getAllData(setIsLoading: (newValue: boolean) => void, GoogleFinanceURL: string) {
    setIsLoading(true);
    try {
      const response = await fetch(GoogleFinanceURL);
      if (!response.ok) throw "Response not OK";

      const csv = await response.text();
      const json = await csvToJson().fromString(csv);
      await Promise.all(
        json.slice(1).map((stock) => {
          const formattedStock: iGoogleFinanceStockData = {
            Symbol: stock.Symbol,
            Name: stock.Name,
            Price: fromBackendToNumber(stock.Price),
            Change: fromBackendToNumber(stock.Change),
            "P/E": fromBackendToNumber(stock["P/E"]),
            EPS: fromBackendToNumber(stock.EPS),
            High: fromBackendToNumber(stock.High),
            Low: fromBackendToNumber(stock.Low),
            "Last 30 Days": stock["Last 30 Days"].split(";").map(fromBackendToNumber),
          };
          AsyncStorage.setItem(formattedStock.Symbol, JSON.stringify(formattedStock));
        })
      );
      alert("Valores atualizados.");
    } catch (error) {
      console.dir(error);
      alert("Erro ao obter dados do Google Finance.");
    } finally {
      setIsLoading(false);
    }
  }
}
