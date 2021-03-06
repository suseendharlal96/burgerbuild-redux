import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./SuccessPage.css";
import * as actions from "../../../store/actions/index";
import Button from "../Modal/Button/Button";
import Burger from "../../Burger/Burger";

class Success extends Component {
  componentDidMount() {
    this.props.initPurchase();
    // this.props.resetIngre();
  }

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

const mapDispatchToProps = (dispatch) => {
  return {
    initPurchase: () => dispatch(actions.initOrder()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Success);
