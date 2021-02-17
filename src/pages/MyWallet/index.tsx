import React, { useEffect, useState } from "react";
import { View } from "react-native";

import BottomBarNavigation from "../../components/BottomBars/Navigation";
import BottomBarActionButtons from "../../components/BottomBars/ActionButtons";

import StockFocusBlock, { iStockData } from "../../components/FocusBlocks/Stock";
import MyWalletController from "../../controllers/MyWallet";

import AppBarLayout from "../../components/Layouts/AppBar";
import useLoadingStockDataContext from "../../context/LoadingStockData";

import CheckBox from "@react-native-community/checkbox";

import styled from "styled-components/native";
const SCTouchableOpacity = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

export default function MyWallet() {
  const [isLoading] = useLoadingStockDataContext();
  const [stockDataList, setStockDataList] = useState<iStockData[]>([]);

  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedList, setSelectedList] = useState<boolean[]>([]);

  const loadWallet = () => {
    MyWalletController.getMyDetailedWallet().then((result) => {
      Promise.all(result).then((result) => {
        setStockDataList(result);
      });
    });
  };
  useEffect(() => {
    loadWallet();
  }, []);

  const startRemoving = () => {
    setSelectedList(stockDataList.map((_) => false));
    setIsSelecting(true);
  };
  const handleSelect = (index: number) => {
    let selectedListCopy = [...selectedList];
    selectedListCopy[index] = !selectedListCopy[index];
    setSelectedList(selectedListCopy);
  };
  const remove = () => {
    const allSymbols = stockDataList.map((stock) => stock.Symbol);
    MyWalletController.removeFromWallet(allSymbols.filter((_, index) => selectedList[index])).then(() => {
      loadWallet();
      setSelectedList(stockDataList.map((_) => false));
      setIsSelecting(false);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <AppBarLayout
        title="Minha Carteira"
        hasNavigationBar
        buttons={isSelecting ? [] : [{ name: "delete", onPress: startRemoving }]}>
        {stockDataList.map((stockData, index) => (
          <SCTouchableOpacity key={index} onPress={() => handleSelect(index)}>
            {isSelecting && (
              <CheckBox value={selectedList[index] || false} tintColors={{ true: "#71c7bb", false: "#aaa" }} disabled />
            )}
            <StockFocusBlock
              stockData={stockData}
              fontColor="#ffffff"
              isLoading={isLoading}
              onPress={isSelecting ? () => handleSelect(index) : undefined}
            />
          </SCTouchableOpacity>
        ))}
      </AppBarLayout>
      {isSelecting ? (
        <BottomBarActionButtons
          textAction="Excluir"
          onPressCancel={() => setIsSelecting(false)}
          onPressAction={remove}
        />
      ) : (
        <BottomBarNavigation />
      )}
    </View>
  );
}
