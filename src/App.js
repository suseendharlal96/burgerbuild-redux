import React, { Component } from "react";
import { Route } from "react-router-dom";

import lazyLoadComponent from "./hoc/lazyload";
import Layout from "./components/Layout/Layout";
import Burgerbuild from "./containers/BurgerBuild/BurgerBuild";
import Logout from "./containers/Auth/logout/logout";

const lazyCheckout = lazyLoadComponent(() => {
  return import("./containers/Checkout/Checkout");
});

const lazyOrders = lazyLoadComponent(() => {
  return import("./containers/Orders/Orders");
});

const lazySuccess = lazyLoadComponent(() => {
  return import("./components/UI/SuccessPage/SuccessPage");
});

const lazyAuth = lazyLoadComponent(() => {
  return import("./containers/Auth/Auth");
});

class App extends Component {
  render() {
    return (
      <Layout>
        <Route path="/" exact component={Burgerbuild} />
        <Route path="/auth" component={lazyAuth} />
        <Route path="/orders" component={lazyOrders} />
        <Route path="/logout" component={Logout} />
        <Route path="/checkout" component={lazyCheckout} />
        <Route path="/success" component={lazySuccess} />
      </Layout>
    );
  }
}
export default App;
