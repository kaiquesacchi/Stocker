import React, { useReducer, useState } from "react";
import { View } from "react-native";
import { Navigation } from "../../components/BottomBars";

import SearchPage from "../../components/Pages/Search";

import { useHistory } from "react-router-native";
import StockData from "../../controllers/StockData/StockData";

import { SCItemList, SCNameText, SCSymbolText } from "./styles";

export default function SearchStock() {
  const history = useHistory();

  const allStocks = StockData.getAllAvailable();
  type keys = keyof typeof allStocks;

  const [searchPredictions, setSearchPredictions] = useState<iStock[]>([]);
  const [searched, dispatchForSearched] = useReducer((oldValue: string, newValue: string) => {
    const firstLetter = newValue.slice(0, 1).toUpperCase() as keys;
    if (!(firstLetter in allStocks)) {
      setSearchPredictions([]);
    } else {
      const dictionary = Object.keys(allStocks[firstLetter]);
      const options = dictionary.filter((value) => value.startsWith(newValue.toUpperCase()));
      setSearchPredictions(options.map((option) => ({ symbol: option, companyName: allStocks[firstLetter][option] })));
    }
    return newValue;
  }, "");

  const handleRedirect = (symbol: string) => {
    history.push("/stock-details/" + symbol);
  };
  interface iStock {
    symbol: string;
    companyName: string;
  }

  const renderFunction = (item: iStock, index: number) => (
    <SCItemList key={index} first={index === 0} onPress={() => handleRedirect(item.symbol)}>
      <SCSymbolText>{item.symbol}</SCSymbolText>
      <SCNameText>{item.companyName}</SCNameText>
    </SCItemList>
  );

  return (
    <View style={{ flex: 1 }}>
      <SearchPage
        suggestionRenderFunction={renderFunction}
        suggestions={searchPredictions}
        onChangeText={dispatchForSearched}
        isEmpty={searched.length === 0}
      />
      <Navigation />
    </View>
  );
}
