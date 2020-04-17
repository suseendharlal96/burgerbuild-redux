import React, { Component } from "react";
import { Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Burgerbuild from "./containers/BurgerBuild/BurgerBuild";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Success from "./components/UI/SuccessPage/SuccessPage";
import Auth from "./containers/Auth/Auth";

class App extends Component {
  render() {
    return (
      <Layout>
        <Route path="/" exact component={Burgerbuild} />
        <Route path="/auth" component={Auth} />
        <Route path="/orders" component={Orders} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/success" component={Success} />
      </Layout>
    );
  }
}
export default App;
