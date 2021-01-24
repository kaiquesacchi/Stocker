import React from "react";
import { View } from "react-native";
import { Navigation } from "../../components/BottomBars";
import ListFocusBlock from "../../components/FocusBlocks/List";

import { AppBarPage } from "../../components/Pages";

import { SCListItem, SCTitle, SCValue } from "./styles";

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

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <AppBarPage title="Resumo" hasNavigationBar>
        <ListFocusBlock title="Totais" data={data} renderFunction={renderFunction} />
      </AppBarPage>
      <Navigation />
    </View>
  );
}
