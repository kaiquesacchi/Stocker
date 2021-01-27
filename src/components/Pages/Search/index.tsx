import React from "react";
import styled from "styled-components/native";
import BaseFocusBlock from "../../FocusBlocks/Base";
import ListFocusBlock from "../../FocusBlocks/List";
import BasePage from "../Base";

interface iProps {
  children?: React.ReactNode;
}

const SCSearchBar = styled.View`
  margin-top: 50px;
`;

const SCTextInput = styled.TextInput`
  color: white;
  padding: 8px;
  font-size: 16px;
`;

interface iSCListItem {
  first?: boolean;
}
const SCItemList = styled.View<iSCListItem>`
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

function SearchPage({ children }: iProps) {
  interface iStock {
    symbol: string;
    companyName: string;
  }
  const searchPredictions: iStock[] = [
    { symbol: "ABCD4", companyName: "Empresa A. B." },
    { symbol: "EFGH3", companyName: "Empresa E. F." },
  ];
  const renderFunction = (item: iStock, index: number) => (
    <SCItemList key={index} first={index === 0}>
      <SCSymbolText>{item.symbol}</SCSymbolText>
      <SCNameText>{item.companyName}</SCNameText>
    </SCItemList>
  );

  return (
    <BasePage>
      <SCSearchBar>
        <BaseFocusBlock>
          <SCTextInput placeholder="Pesquise por nome ou símbolo" placeholderTextColor="#fff8"></SCTextInput>
        </BaseFocusBlock>
      </SCSearchBar>
      <ListFocusBlock data={searchPredictions} renderFunction={renderFunction} />
      {children}
    </BasePage>
  );
}

export default SearchPage;
