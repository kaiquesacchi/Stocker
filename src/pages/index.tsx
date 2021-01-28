import React from "react";
import { NativeRouter, Route, Redirect } from "react-router-native";

import Home from "./Home";
import MyWallet from "./MyWallet";
import SearchStock from "./SearchStock";
import StockDetails from "./StockDetails";

export default function Router() {
  return (
    <NativeRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/my-wallet" component={MyWallet} />
      <Route exact path="/search-stocks" component={SearchStock} />
      <Route exact path="/stock-details/:stockSymbol" component={StockDetails} />
      <Route path="*" component={() => <Redirect to="/" />} />
    </NativeRouter>
  );
}
