import React from 'react';
import { NativeRouter, Route, Redirect } from 'react-router-native';

import Home from './Home';
import StockDetails from './StockDetails';

export default function Router() {
  return (
    <NativeRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/stockDetails" component={StockDetails} />
      <Route path="*" component={() => <Redirect to="/" />} />
    </NativeRouter>
  );
}
