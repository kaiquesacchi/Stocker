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
  symbol: string;
  companyName: string;
  currentPrice: string;
  todayChange: string;
  changeIsPositive: boolean;
  averagePrice: string;
  amount: string;
  totalYield: string;
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
    <BaseFocusBlock {...rest} onPress={() => handleRedirect(stockData.symbol)}>
      <SCBody>
        <SCMainInfo fontColor={fontColor}>
          <SCMainLeft>
            <SCSymbolText fontColor={fontColor}>{stockData.symbol}</SCSymbolText>
            <SCNameText fontColor={fontColor}>{stockData.companyName}</SCNameText>
          </SCMainLeft>
          <SCMainRight>
            <SCCurrentText fontColor={fontColor}>{stockData.currentPrice}</SCCurrentText>
            <SCChangeBadge isPositive={stockData.changeIsPositive}>
              <SCChangeText>{stockData.todayChange}</SCChangeText>
            </SCChangeBadge>
          </SCMainRight>
        </SCMainInfo>
        <SCAmountText
          fontColor={fontColor}>{`Valor total: ${stockData.totalYield} (${stockData.amount})`}</SCAmountText>
      </SCBody>
    </BaseFocusBlock>
  );
}
