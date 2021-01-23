import React from "react";
import { View } from "react-native";
import { Navigation } from "../../components/BottomBars";

import { AppBarPage } from "../../components/Pages";

export default function MyWallet() {
  return (
    <View style={{ flex: 1 }}>
      <AppBarPage title="Minha Carteira"></AppBarPage>
      <Navigation />
    </View>
  );
}
