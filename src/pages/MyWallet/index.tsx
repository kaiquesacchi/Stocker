import React from "react";
import { View } from "react-native";
import { Navigation } from "../../components/BottomBars";
import StockFocusBlock, { iStockData } from "../../components/FocusBlocks/Stock";

import { AppBarPage } from "../../components/Pages";

export default function MyWallet() {
  const stockDataList: iStockData[] = [
    {
      symbol: "ABCD4",
      companyName: "Empresa A. B.",
      currentPrice: "R$36,51",
      todayChange: "-0,12 (-1,3%)",
      changeIsPositive: false,
      averagePrice: "R$32,00",
      amount: "200 cotas",
      totalYield: "R$ 800,00",
    },
    {
      symbol: "EFGH11",
      companyName: "Empresa E. F.",
      currentPrice: "R$12,11",
      todayChange: "3,12 (+9,4%)",
      changeIsPositive: true,
      averagePrice: "R$20,13",
      amount: "600 cotas",
      totalYield: "R$ -1803,01",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <AppBarPage title="Minha Carteira" hasNavigationBar>
        {stockDataList.map((stockData, index) => (
          <StockFocusBlock key={index} stockData={stockData} fontColor="#ffffff" />
        ))}
      </AppBarPage>
      <Navigation />
    </View>
  );
}
