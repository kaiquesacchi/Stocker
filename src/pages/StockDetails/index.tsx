import React from "react";
import { AppBarPage } from "../../components/Pages";

export default function StockDetails({ match }: any) {
  const symbol = match.params.stockSymbol;
  return <AppBarPage title={symbol} backButton></AppBarPage>;
}
