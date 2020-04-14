import React from "react";

import classes from "./Order.css";

const order = (props) => {
  const ingredients = [];
  for (let key in props.ingredients) {
    ingredients.push({ name: key, quantity: props.ingredients[key] });
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
        Price: <strong>Rs.{props.price}</strong>
      </p>
    </div>
  );
};

export default order;
