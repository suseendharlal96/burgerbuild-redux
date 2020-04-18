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
          autofocus: "autofocus",
        },
        value: "",
        validation: {
          isRequired: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          isRequired: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code(5 charac)",
        },
        value: "",
        validation: {
          isRequired: true,
          minLength: 5,
          maxLength: 5,
          isNumeric: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          isRequired: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
          readonly: "readonly",
        },
        value: this.props.email,
        validation: {},
        valid: true,
        touched: false,
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
        validation: {
          isRequired: true,
        },
        valid: false,
      },
    },
    formIsValid: false,
  };

  componentWillMount() {
    if (this.props.purchased) {
      this.props.history.replace("/success");
    }
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.isRequired) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, id) => {
    event.preventDefault();
    const copy = { ...this.state.orderForm };
    const deepCopy = { ...copy[id] };
    deepCopy.value = event.target.value;
    deepCopy.valid = this.checkValidity(deepCopy.value, deepCopy.validation);
    deepCopy.touched = true;
    copy[id] = deepCopy;
    let formIsValid = true;
    for (let inputIdentifier in copy) {
      formIsValid = copy[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: copy, formIsValid: formIsValid });
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
    this.props.onPurchaseBurger(order, this.props.token);
  };

  render() {
    let formData = [];
    for (let key in this.state.orderForm) {
      formData.push({ id: key, inputData: this.state.orderForm[key] });
    }
    let button = (
      <Button disabled={!this.state.formIsValid} btntype="Success">
        PLACE ORDER
      </Button>
    );
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
              invalid={!data.inputData.valid}
              shouldValidate={data.inputData.validation}
              touched={data.inputData.touched}
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
    token: state.authReducer.idToken,
    email: state.authReducer.email,
    loading: state.orderReducer.loading,
    purchased: state.orderReducer.purchased,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaseBurger: (orderData, token) =>
      dispatch(orderActions.purchaseBurger(orderData, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
