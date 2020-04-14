import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Summary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";

class Burgerbuild extends Component {
  state = {
    purchased: false,
  };

  componentDidMount() {
    this.props.initIngredients();
  }

  updatepurchase = (ingredients) => {
    console.log(ingredients);
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchased: true });
  };

  closeModalHandler = () => {
    this.setState({ purchased: false });
  };

  confirm = () => {
    this.props.onPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = <p>loading...</p>;
    if (this.props.ings) {
      burger = (
        <div>
          <Modal
            show={this.state.purchased}
            closeModal={this.closeModalHandler}
          >
            <Summary
              price={this.props.price}
              ingredients={this.props.ings}
              closeModal={this.closeModalHandler}
              confirm={this.confirm}
            />
          </Modal>
          <div>
            <Burger ingredients={this.props.ings} />
          </div>
          <div>
            <BuildControls
              ingredients={this.props.ings}
              itemsAdded={this.props.addIngredient}
              itemsRemoved={this.props.removeIngredient}
              purchase={this.updatepurchase(this.props.ings)}
              purchased={this.purchaseHandler}
              price={this.props.price}
              disabled={disabledInfo}
            />
          </div>
        </div>
      );
    }
    return <div>{burger}</div>;
  }
}
const mapStateToProps = (state) => {
  // console.log(state);
  return {
    ings: state.burgerReducer.ingredients,
    price: state.burgerReducer.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (ingreName) => dispatch(actions.addIngredient(ingreName)),
    removeIngredient: (ingreName) =>
      dispatch(actions.removeIngredient(ingreName)),
    initIngredients: () => dispatch(actions.initIngredient()),
    onPurchase: () => dispatch(actions.initOrder()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Burgerbuild);
