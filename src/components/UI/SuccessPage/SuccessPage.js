import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./SuccessPage.css";
import Button from "../Modal/Button/Button";
import Burger from "../../Burger/Burger";
import axios from "../../../axios-orders";

class Success extends Component {
  state = {
    ingredients: null,
  };
  componentDidMount() {
    console.log(this.props.ingredients);
    axios
      .get("/orders.json")
      .then((res) => {
        console.log(res);
        const a = [];
        for (let key in res.data) {
          a.push({ id: key, data: res.data[key] });
        }
        const b = a[a.length - 1];
        this.setState({ ingredients: b.data.ingredients });
      })
      .then((err) => console.log(err));
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
