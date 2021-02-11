import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Navigation from "../../components/BottomBars/Navigation";
import StockFocusBlock, { iStockData } from "../../components/FocusBlocks/Stock";
import MyWalletController from "../../controllers/MyWallet";

import AppBarLayout from "../../components/Layouts/AppBar";

export default function MyWallet() {
  useEffect(() => {
    MyWalletController.getMyDetailedWallet().then((result) => {
      Promise.all(result).then((result) => {
        setStockDataList(result);
      });
    });
  }, []);
  const [stockDataList, setStockDataList] = useState<iStockData[]>([]);

  return (
    <View style={{ flex: 1 }}>
      <AppBarLayout title="Minha Carteira" hasNavigationBar>
        {stockDataList.map((stockData, index) => (
          <StockFocusBlock key={index} stockData={stockData} fontColor="#ffffff" />
        ))}
      </AppBarLayout>
      <Navigation />
    </View>
  );
}
