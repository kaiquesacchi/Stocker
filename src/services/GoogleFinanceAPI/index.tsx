import { GOOGLE_FINANCE_URL } from "@env";
import csvToJson from "csvtojson";
import { AsyncStorage } from "react-native";

export function getAllData() {
  return fetch(GOOGLE_FINANCE_URL)
    .then((response) => {
      if (response.ok) {
        response.text().then((csv) => {
          csvToJson()
            .fromString(csv)
            .then((json) => {
              Promise.all(json.slice(1).map((stock) => AsyncStorage.setItem(stock.Symbol, JSON.stringify(stock)))).then(
                () => {
                  alert("Valores atualizados.");
                }
              );
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
