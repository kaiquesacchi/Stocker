import React from "react";
import ListFocusBlock from "../../components/FocusBlocks/List";
import { AppBarPage } from "../../components/Pages";
import styled from "styled-components/native";

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
  color: #71c7bb;
  font-size: 14px;
`;

export default function StockDetails({ match }: any) {
  const symbol = match.params.stockSymbol;

  interface iStock {
    symbol: string;
    company_name: string;
    price: string;
    change: string;
    pe: string;
    eps: string;
    high: string;
    low: string;
  }

  const data: any = {
    symbol: "ABCD4",
    company_name: "Empresa A. B.",
    price: "R$22,30",
    change: "2%",
    pe: "6,75",
    eps: "1,3",
    high: "R$23,40",
    low: "R$18,13",
  };
  const renderFunction = (key: any, index: number) => (
    <SCItemList key={index} first={index === 0}>
      <SCSymbolText>{key}</SCSymbolText>
      <SCNameText>{data[key]}</SCNameText>
    </SCItemList>
  );

  return (
    <AppBarPage title={symbol} backButton>
      <ListFocusBlock data={Object.keys(data)} renderFunction={renderFunction} />
    </AppBarPage>
  );
}
