import React, { Component } from "react";
import { Route } from "react-router-dom";

import Modal from "../UI/Modal/Modal";
import OrderDetail from "./OrderDetail/OrderDetail";
import classes from "./Order.css";
import Button from "../UI/Modal/Button/Button";

class order extends Component {
  state = {
    continuePurchase: false,
  };

  closeModalHandler = () => {
    this.setState({ continuePurchase: false });
  };

  details = () => {
    this.setState({ continuePurchase: true });
    this.props.history.replace("/orders/details");
  };

  render() {
    console.log(this.props);
    const ingredients = [];
    for (let key in this.props.ingredients) {
      ingredients.push({ name: key, quantity: this.props.ingredients[key] });
    }

    const ingredientOutput = ingredients.map((ig) => {
      return (
        <span
          style={{
            textTransform: "capitalize",
            display: "inline-block",
            margin: "0 8px",
            border: "1px solid #ccc",
            padding: "5px",
          }}
          key={ig.name}
        >
          {ig.name} ({ig.quantity})
        </span>
      );
    });
    return (
      <div className={classes.Order}>
        <p>Ingredients: {ingredientOutput}</p>
        <p>
          Price: <strong>Rs.{this.props.price}</strong>
        </p>
        <div>
          <Button btntype="Success" clicked={this.details}>
            Details
          </Button>
          <Route
            path={this.props.match.path + "/details"}
            render={() => (
              <Modal
                show={this.state.continuePurchase}
                closeModal={this.closeModalHandler}
              >
                <OrderDetail
                  id={this.props.id}
                  date={this.props.date}
                  price={this.props.price}
                  ingredients={this.props.ingredients}
                  delete={this.props.delete}
                />
              </Modal>
            )}
          />
        </div>
      </div>
    );
  }
}

export default order;
