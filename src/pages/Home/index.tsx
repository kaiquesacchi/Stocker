import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { useHistory } from "react-router-native";

import useLoadingStockDataContext from "../../context/LoadingStockData";
import useTheme from "../../context/Theme";
import useSettings from "../../context/Settings";

import Navigation from "../../components/BottomBars/Navigation";
import ListFocusBlock from "../../components/FocusBlocks/List";
import AppBarLayout, { iButton } from "../../components/Layouts/AppBar";

import MyWalletController from "../../controllers/MyWallet";
import StockDataController from "../../controllers/StockData";

import GoogleFinanceAPIService from "../../services/GoogleFinanceAPI";
import CurrencyService from "../../services/Currency";

import { SCHorizontalListItem, SCListItem, SCTitle, SCValue } from "./styles";

/* Chart legend. */
interface iLegendDataItem {
  title: string;
  value: string;
}

const legendRenderFunction = (item: iLegendDataItem, index: number) => (
  <SCHorizontalListItem first={index === 0} key={index}>
    <SCTitle>{item.title}</SCTitle>
    <SCValue>{item.value}</SCValue>
  </SCHorizontalListItem>
);
/* End of Chart legend. */
/* Summary Info. */
interface iSummaryDataItem {
  title: string;
  value: string;
}

const summaryRenderFunction = (item: iSummaryDataItem, index: number) => (
  <SCListItem first={index === 0} key={index}>
    <SCTitle>{item.title}</SCTitle>
    <SCValue>{item.value}</SCValue>
  </SCListItem>
);
/* End of Summary Info. */

export default function Home() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useLoadingStockDataContext();
  const [theme] = useTheme();
  const [settings] = useSettings();

  const [wallet30Change, setWallet30Change] = useState(0);
  const [currentInvested, setCurrentInvested] = useState(0);
  const [currentEarnings, setCurrentEarnings] = useState(0);
  const [IBOVChange, setIBOVChange] = useState(0);
  const [INXChange, setINXChange] = useState(0);

  useEffect(() => {
    MyWalletController.getFullStats().then((result) => {
      setWallet30Change(result.totalChangeIn30);
      setCurrentInvested(result.currentInvested);
      setCurrentEarnings(result.currentEarnings);
    });
    StockDataController.getChangeIn30("IBOV").then((result) => setIBOVChange(result || 0));
    StockDataController.getChangeIn30(".INX").then((result) => setINXChange(result || 0));
  }, []);

  const legendData: iLegendDataItem[] = [
    { title: "Carteira", value: CurrencyService.toReadable(wallet30Change) + "%" },
    { title: "IBOVESPA", value: CurrencyService.toReadable(IBOVChange) + "%" },
    { title: "S&P 500", value: CurrencyService.toReadable(INXChange) + "%" },
  ];

  const summaryData: iSummaryDataItem[] = [
    { title: "Valor Atualmente Investido", value: CurrencyService.toReadable(currentInvested) },
    { title: "Lucro Atual", value: CurrencyService.toReadable(currentEarnings) },
  ];

  const buttons: iButton[] = [
    {
      name: "reload-outline",
      onPress: () => GoogleFinanceAPIService.getAllData(setIsLoading, settings["GoogleFinanceURL"]),
    },
    {
      name: "settings-outline",
      onPress: () => history.push("/settings"),
    },
  ];

  const normalize = (values: number[]) => {
    const min = Math.min(...values) - 1;
    const max = Math.max(...values) + 1;
    if (max - min === 0) return values.map((_) => 0.5);
    return values.map((value) => (value - min) / (max - min));
  };

  /* Chart settings. */
  const altBanner = (
    <ProgressChart
      data={{
        data: normalize([wallet30Change, IBOVChange, INXChange]),
        labels: [],
      }}
      chartConfig={{
        color: (opacity = 1) =>
          theme.palette.primary.main +
          Math.floor(opacity * 255)
            .toString(16)
            .padStart(2, "0"),
        backgroundGradientFrom: theme.palette.background.main,
        backgroundGradientTo: theme.palette.background.main,
      }}
      width={Dimensions.get("window").width}
      height={230}
      radius={30}
      hideLegend
    />
  );
  /* End of Chart settings. */

  return (
    <View style={{ flex: 1 }}>
      <AppBarLayout title="Resumo" hasNavigationBar altBanner={altBanner} buttons={buttons}>
        <ListFocusBlock
          title="Últimos 30 Dias"
          horizontal
          data={legendData}
          renderFunction={legendRenderFunction}
          isLoading={isLoading}
        />
        <ListFocusBlock
          title="Totais"
          data={summaryData}
          renderFunction={summaryRenderFunction}
          isLoading={isLoading}
        />
      </AppBarLayout>
      <Navigation />
    </View>
  );
}
