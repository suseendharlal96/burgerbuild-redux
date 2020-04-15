import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import classes from "./SuccessPage.css";
import Orders from "../../../containers/Orders/Orders";
import Button from "../Modal/Button/Button";
import Burger from "../../Burger/Burger";
import axios from "../../../axios-orders";

class Success extends Component {
  render() {
    let burger = <p>Your burger is being prepared...</p>;
    if (this.props.ingredients) {
      burger = <Burger ingredients={this.props.ingredients} />;
    }
    return (
      <div className={classes.Successpage}>
        <h2>Your order has been successfully placed!</h2>
        <Button
          btntype="Success"
          clicked={() => this.props.history.replace("/")}
        >
          Place New Order!
        </Button>
        <Button
          btntype="Success"
          clicked={() => this.props.history.replace("/orders")}
        >
          Go to My Orders!
        </Button>
        <h2>Your burger is being prepared!</h2>
        <div>{burger}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerReducer.ingredients,
  };
};

export default connect(mapStateToProps)(Success);
