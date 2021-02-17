import React from "react";
import BaseFocusBlock, { iProps as iPropsBase } from "../Base";
import { useHistory } from "react-router-native";

import CurrencyService from "../../../services/Currency";

import * as SC from "./styles";
export interface iStockData {
  Symbol: string;
  Name: string;
  Price: number | null;
  Change: number | null;
  Amount: number;
}

interface iProps extends iPropsBase {
  stockData: iStockData;
}

export default function StockFocusBlock({ stockData, onPress, ...rest }: iProps) {
  const history = useHistory();

  const handleRedirect = (stockSymbol: string) => {
    history.push("/stock-details/" + stockSymbol);
  };
  return (
    <BaseFocusBlock {...rest} onPress={onPress ? onPress : () => handleRedirect(stockData.Symbol)}>
      <SC.Body>
        <SC.MainInfo>
          <SC.MainLeft>
            <SC.SymbolText>{stockData.Symbol}</SC.SymbolText>
            <SC.NameText>{stockData.Name}</SC.NameText>
          </SC.MainLeft>
          <SC.MainRight>
            <SC.CurrentText>R${CurrencyService.toReadable(stockData.Price || 0)}</SC.CurrentText>
            <SC.ChangeBadge isPositive={!stockData.Change || stockData.Change >= 0}>
              <SC.ChangeText>{CurrencyService.toReadable(stockData.Change || 0)}%</SC.ChangeText>
            </SC.ChangeBadge>
          </SC.MainRight>
        </SC.MainInfo>
        <SC.AmountText>{`Valor total: ${
          stockData.Price ? "R$" + CurrencyService.toReadable(stockData.Price * stockData.Amount) : "Não disponível."
        } (${stockData.Amount} cotas)`}</SC.AmountText>
      </SC.Body>
    </BaseFocusBlock>
  );
}
