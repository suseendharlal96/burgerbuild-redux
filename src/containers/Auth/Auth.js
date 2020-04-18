import React, { Component } from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Modal/Button/Button";
import classes from "./Auth.css";
import * as authActions from "../../store/actions/index";

class Auth extends Component {
  state = {
    authForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        validation: {
          isRequired: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          isRequired: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  };

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

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, id) => {
    event.preventDefault();
    const data = {
      ...this.state.authForm,
      [id]: {
        ...this.state.authForm[id],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.authForm[id].validation
        ),
        touched: true,
      },
    };
    this.setState({ authForm: data });
  };

  changeMode = () => {
    this.setState((prevState) => {
      return {
        isSignup: !prevState.isSignup,
      };
    });
  };

  formSubmit = (event, isSignup) => {
    event.preventDefault();
    console.log(isSignup);
    if (this.props.price !== 0) {
      this.props.submitForm(
        this.state.isSignup,
        this.state.authForm,
        this.props,
        true
      );
    } else {
      this.props.submitForm(
        this.state.isSignup,
        this.state.authForm,
        this.props,
        false
      );
    }
  };

  render() {
    let formData = [];
    for (let key in this.state.authForm) {
      formData.push({ id: key, inputData: this.state.authForm[key] });
    }
    let button = (
      <Button btntype="Success">
        {this.state.isSignup
          ? this.props.loading
            ? "Signing up..."
            : "SignUp"
          : this.props.loading
          ? "Signing in..."
          : "SignIn"}
      </Button>
    );
    let error = null;
    if (this.props.error) {
      error = <p style={{ color: "red" }}>{this.props.error}</p>;
    }
    let form = (
      <form onSubmit={(event) => this.formSubmit(event, this.state.isSignup)}>
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
      <div className={classes.Auth}>
        {error}
        {form}
        <Button clicked={this.changeMode}>
          {this.state.isSignup ? "Switch to Signin" : "Switch to Signup"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.authReducer.loading,
    error: state.authReducer.error,
    price: state.burgerReducer.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (isSignup, loginData, routeData, ingData) =>
      dispatch(authActions.authStart(isSignup, loginData, routeData, ingData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
