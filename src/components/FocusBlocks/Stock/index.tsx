import React from "react";
import BaseFocusBlock, { iProps as iPropsBase } from "../Base";
import styled from "styled-components/native";
import { useHistory } from "react-router-native";

interface iSCFontColor {
  fontColor: string;
}

const SCBody = styled.View`
  padding: 20px 0;
`;

const SCMainInfo = styled.View<iSCFontColor>`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom-width: 1px;
  border-color: ${(props) => props.fontColor + "50"};
`;
const SCMainLeft = styled.View``;
const SCMainRight = styled.View`
  align-items: flex-end;
`;

const SCSymbolText = styled.Text<iSCFontColor>`
  color: ${(props) => props.fontColor};
  font-size: 20px;
`;
const SCNameText = styled.Text<iSCFontColor>`
  color: ${(props) => props.fontColor};
  opacity: 0.8;
`;
const SCCurrentText = styled.Text<iSCFontColor>`
  color: ${(props) => props.fontColor};
  font-size: 20px;
`;

interface iSCChangeBadge {
  isPositive: boolean;
}
const SCChangeBadge = styled.View<iSCChangeBadge>`
  background-color: ${(props) => (props.isPositive ? "#49aa49" : "#d35b3d")};
  padding: 5px 8px;
  border-radius: 20px;
  border: 1px solid #ddd;
  margin-top: 5px;
`;

const SCChangeText = styled.Text`
  color: white;
`;

const SCAmountText = styled.Text<iSCFontColor>`
  color: ${(props) => props.fontColor};
`;

export interface iStockData {
  Symbol: string;
  Name: string;
  Price: string;
  Change: string;
  Amount: number;
}

interface iProps extends iPropsBase {
  stockData: iStockData;
  fontColor: string;
}

export default function StockFocusBlock({ stockData, fontColor, ...rest }: iProps) {
  const history = useHistory();

  const handleRedirect = (stockSymbol: string) => {
    history.push("/stock-details/" + stockSymbol);
  };
  return (
    <BaseFocusBlock {...rest} onPress={() => handleRedirect(stockData.Symbol)}>
      <SCBody>
        <SCMainInfo fontColor={fontColor}>
          <SCMainLeft>
            <SCSymbolText fontColor={fontColor}>{stockData.Symbol}</SCSymbolText>
            <SCNameText fontColor={fontColor}>{stockData.Name}</SCNameText>
          </SCMainLeft>
          <SCMainRight>
            <SCCurrentText fontColor={fontColor}>R${stockData.Price}</SCCurrentText>
            <SCChangeBadge isPositive={parseFloat(stockData.Change.replace(",", ".")) >= 0}>
              <SCChangeText>{stockData.Change}%</SCChangeText>
            </SCChangeBadge>
          </SCMainRight>
        </SCMainInfo>
        <SCAmountText fontColor={fontColor}>{`Valor total: ${
          parseFloat(stockData.Price.replace(",", ".")) * stockData.Amount
        } (${stockData.Amount} cotas)`}</SCAmountText>
      </SCBody>
    </BaseFocusBlock>
  );
}
