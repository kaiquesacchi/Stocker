import React from "react";
import { View } from "react-native";
import { Navigation } from "../../components/BottomBars";

import { AppBarPage } from "../../components/Pages";

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <AppBarPage title="Home"></AppBarPage>
      <Navigation />
    </View>
  );
}
