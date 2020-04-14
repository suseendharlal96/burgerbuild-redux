import React, { Component } from "react";
import { connect } from "react-redux";

import * as orderActions from "../../../store/actions/index";

import Button from "../../../components/UI/Modal/Button/Button";
import classes from "./ContactForm.css";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
      },
    },
  };

  componentWillMount() {
    if (this.props.purchased) {
      this.props.history.replace("/success");
    }
  }

  inputChangedHandler = (event, id) => {
    event.preventDefault();
    const copy = { ...this.state.orderForm };
    const deepCopy = { ...copy[id] };
    deepCopy.value = event.target.value;
    copy[id] = deepCopy;
    this.setState({ orderForm: copy });
  };

  formSubmit = (event) => {
    event.preventDefault();
    const formValue = {};
    for (let values in this.state.orderForm) {
      formValue[values] = this.state.orderForm[values].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customerDetails: formValue,
      orderDate: new Date(),
    };
    this.props.onPurchaseBurger(order);
  };

  render() {
    let formData = [];
    for (let key in this.state.orderForm) {
      formData.push({ id: key, inputData: this.state.orderForm[key] });
    }
    let button = <Button btntype="Success">PLACE ORDER</Button>;
    if (this.props.loading) {
      button = <Button btntype="Success">PLACING ORDER...</Button>;
    }

    let form = (
      <form onSubmit={this.formSubmit}>
        {formData.map((data) => {
          return (
            <Input
              key={data.id}
              elementType={data.inputData.elementType}
              elementConfig={data.inputData.elementConfig}
              value={data.inputData.value}
              changed={(event) => this.inputChangedHandler(event, data.id)}
            />
          );
        })}
        {button}
      </form>
    );
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerReducer.ingredients,
    price: state.burgerReducer.totalPrice,
    loading: state.orderReducer.loading,
    purchased: state.orderReducer.purchased,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaseBurger: (orderData) =>
      dispatch(orderActions.purchaseBurger(orderData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
