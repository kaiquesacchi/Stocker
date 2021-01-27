import React from "react";
import { View } from "react-native";
import { Navigation } from "../../components/BottomBars";

import SearchPage from "../../components/Pages/Search";

export default function SearchStock() {
  return (
    <View style={{ flex: 1 }}>
      <SearchPage></SearchPage>
      <Navigation />
    </View>
  );
}
