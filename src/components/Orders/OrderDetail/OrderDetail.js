import React from "react";
import { connect } from "react-redux";

import Button from "../../UI/Modal/Button/Button";

const orderDetail = (props) => {
  console.log(props.date);
  // console.log(props.id);
  // console.log(props.ingredients);
  // console.log(props.price);
  let button;
  if (props.loading) {
    button = <Button btntype="Danger">Deleting...</Button>;
  } else {
    button = (
      <Button btntype="Danger" clicked={props.delete}>
        Delete
      </Button>
    );
  }

  return (
    <div>
      <h2>Burger Detail:</h2>
      <p>Burger ordered on: {new Date(props.date).toISOString()}</p>
      <p>ingredients added are:</p>
      {Object.keys(props.ingredients).map((ing) => {
        return (
          <li key={ing}>
            {ing} <span>quantity:{props.ingredients[ing]}</span>
          </li>
        );
      })}
      <p>
        Total Price:<strong>Rs.{props.price.toFixed(2)}</strong>
      </p>
      {button}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.orderReducer.loading,
  };
};

export default connect(mapStateToProps)(orderDetail);
