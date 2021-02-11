import { AsyncStorage } from "react-native";
import csvToJson from "csvtojson";
import { GOOGLE_FINANCE_URL } from "@env";

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
export function fromBackendToNumber(value: string) {
  const parsedValue = Number(value.replace(",", "."));
  return isNaN(parsedValue) ? null : parsedValue;
}

export function getAllData() {
  return fetch(GOOGLE_FINANCE_URL)
    .then((response) => {
      if (response.ok) {
        response.text().then((csv) => {
          csvToJson()
            .fromString(csv)
            .then((json) => {
              Promise.all(
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
              ).then(() => {
                alert("Valores atualizados.");
              });
            });
        });
      } else {
        console.dir(response);
        alert("Erro ao obter dados do Google Finance.");
      }
    })
    .catch((error) => {
      console.dir(error);
      alert("Não foi possível obter dados do Google Finance.");
    });
}
