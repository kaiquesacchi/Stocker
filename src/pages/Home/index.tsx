import React from "react";
import { Dimensions, View } from "react-native";
import { Navigation } from "../../components/BottomBars";
import ListFocusBlock from "../../components/FocusBlocks/List";

import AppBarPage, { iButton } from "../../components/Pages/AppBar";

import { SCHorizontalListItem, SCListItem, SCTitle, SCValue } from "./styles";

import { ProgressChart } from "react-native-chart-kit";
import { getAllData } from "../../services/GoogleFinanceAPI";

/* Chart settings. */
const chartData = {
  data: [0.8, 0.1, 0.6],
  labels: ["CDI", "IBOVESPA", "Carteira"],
};
const chartConfig = {
  color: (opacity = 1) => `rgba(113, 199, 187, ${opacity})`,
};
const altBanner = (
  <ProgressChart
    data={chartData}
    chartConfig={chartConfig}
    width={Dimensions.get("window").width}
    height={220}
    radius={50}
    hideLegend
  />
);
/* End of Chart settings. */
/* Chart legend. */
interface iLegendDataItem {
  title: string;
  value: string;
}
const legendData: iLegendDataItem[] = [
  { title: "Carteira", value: "12.9%" },
  { title: "IBOVESPA", value: "4%" },
  { title: "CDI", value: "0.5%" },
];

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
const summaryData: iSummaryDataItem[] = [
  { title: "Valor Aplicado", value: "32516.50" },
  { title: "Saldo Bruto Atual", value: "31152.45" },
  { title: "Lucro Realizado", value: "105.50" },
];

const summaryRenderFunction = (item: iSummaryDataItem, index: number) => (
  <SCListItem first={index === 0} key={index}>
    <SCTitle>{item.title}</SCTitle>
    <SCValue>{item.value}</SCValue>
  </SCListItem>
);
/* End of Summary Info. */

export default function Home() {
  const buttons: iButton[] = [
    {
      name: "cached",
      onPress: getAllData,
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <AppBarPage title="Resumo" hasNavigationBar altBanner={altBanner} buttons={buttons}>
        <ListFocusBlock horizontal data={legendData} renderFunction={legendRenderFunction} />
        <ListFocusBlock title="Totais" data={summaryData} renderFunction={summaryRenderFunction} />
      </AppBarPage>
      <Navigation />
    </View>
  );
}
