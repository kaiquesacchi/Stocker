import React from "react";
import { Dimensions, View } from "react-native";
import { Navigation } from "../../components/BottomBars";
import ListFocusBlock from "../../components/FocusBlocks/List";

import { AppBarPage } from "../../components/Pages";

import { SCListItem, SCTitle, SCValue } from "./styles";

import { ProgressChart } from "react-native-chart-kit";

const data = [
  { title: "Valor Aplicado", value: "32516.50" },
  { title: "Saldo Bruto Atual", value: "31152.45" },
  { title: "Lucro Realizado", value: "105.50" },
];

const renderFunction = (item: any, index: number) => (
  <SCListItem first={index === 0} key={index}>
    <SCTitle>{item.title}</SCTitle>
    <SCValue>{item.value}</SCValue>
  </SCListItem>
);

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

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <AppBarPage title="Resumo" hasNavigationBar altBanner={altBanner}>
        <ListFocusBlock title="Totais" data={data} renderFunction={renderFunction} />
      </AppBarPage>
      <Navigation />
    </View>
  );
}
