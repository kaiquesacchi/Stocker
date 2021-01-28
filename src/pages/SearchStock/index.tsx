import React from "react";
import { View } from "react-native";
import { Navigation } from "../../components/BottomBars";

import SearchPage from "../../components/Pages/Search";

import styled from "styled-components/native";
import { useHistory } from "react-router-native";

interface iSCListItem {
  first?: boolean;
}
const SCItemList = styled.TouchableOpacity<iSCListItem>`
  border-top-width: 1px;
  border-color: ${(props) => (props.first ? "#0000" : "#6665")};
  padding-top: 10px;
  margin-bottom: 10px;
`;
const SCSymbolText = styled.Text`
  color: white;
  font-size: 18px;
`;
const SCNameText = styled.Text`
  color: #fffa;
  font-size: 14px;
`;

export default function SearchStock() {
  const history = useHistory();
  const handleRedirect = (symbol: string) => {
    history.push("/stock-details/" + symbol);
  };
  interface iStock {
    symbol: string;
    companyName: string;
  }

  const searchPredictions: iStock[] = [
    { symbol: "ABCD4", companyName: "Empresa A. B." },
    { symbol: "EFGH3", companyName: "Empresa E. F." },
    { symbol: "EFGH3", companyName: "Empresa E. F." },
    { symbol: "EFGH3", companyName: "Empresa E. F." },
    { symbol: "EFGH3", companyName: "Empresa E. F." },
    { symbol: "EFGH3", companyName: "Empresa E. F." },
    { symbol: "EFGH3", companyName: "Empresa E. F." },
    { symbol: "EFGH3", companyName: "Empresa E. F." },
    { symbol: "EFGH3", companyName: "Empresa E. F." },
    { symbol: "EFGH3", companyName: "Empresa E. F." },
    { symbol: "EFGH3", companyName: "Empresa E. F." },
    { symbol: "EFGH3", companyName: "Empresa E. F." },
  ];

  const renderFunction = (item: iStock, index: number) => (
    <SCItemList key={index} first={index === 0} onPress={() => handleRedirect(item.symbol)}>
      <SCSymbolText>{item.symbol}</SCSymbolText>
      <SCNameText>{item.companyName}</SCNameText>
    </SCItemList>
  );

  return (
    <View style={{ flex: 1 }}>
      <SearchPage suggestionRenderFunction={renderFunction} suggestions={searchPredictions}></SearchPage>
      <Navigation />
    </View>
  );
}
