import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Orders/CheckoutSummary/CheckoutSummary";
import ContactForm from "./ContactForm/ContactForm";
import Modal from "../../components/UI/Modal/Modal";

class Checkout extends Component {
  state = {
    continuePurchase: false,
  };

  formSubmit = () => {
    this.setState({ continuePurchase: true });
    this.props.history.replace("/checkout/contact-form");
  };

  closeModalHandler = () => {
    this.setState({ continuePurchase: false });
  };
  render() {
    let summary = <Redirect to="/" />;
    const isPurchased = this.props.isPurchased ? (
      <Redirect to="/success" />
    ) : null;
    if (this.props.ingredients) {
      summary = (
        <div>
          {isPurchased}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            price={this.props.price}
            closeSummary={() => this.props.history.replace("/")}
            continue={this.formSubmit}
          />
          <Route
            path={this.props.match.path + "/contact-form"}
            render={(props) => (
              <Modal
                show={this.state.continuePurchase}
                closeModal={this.closeModalHandler}
              >
                <ContactForm {...props} />
              </Modal>
            )}
          />
        </div>
      );
    }

    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerReducer.ingredients,
    price: state.burgerReducer.totalPrice,
    isPurchased: state.orderReducer.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
