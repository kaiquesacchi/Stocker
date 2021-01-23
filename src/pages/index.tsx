import React from "react";
import { NativeRouter, Route, Redirect } from "react-router-native";

import Home from "./Home";
import MyWallet from "./MyWallet";
import StockDetails from "./StockDetails";

export default function Router() {
  return (
    <NativeRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/my-wallet" component={MyWallet} />
      <Route exact path="/stock-details" component={StockDetails} />
      <Route path="*" component={() => <Redirect to="/" />} />
    </NativeRouter>
  );
}
