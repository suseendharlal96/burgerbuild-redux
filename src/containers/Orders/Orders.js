import React, { Component } from "react";
import { connect } from "react-redux";

import Order from "../../components/Orders/Order";
import * as action from "../../store/actions/index";

class Orders extends Component {
  state = {
    orders: [],
    priceCheck: "",
    dateCheck: "",
  };
  componentDidMount() {
    this.props.fetchOrders();
  }

  sort = (event) => {
    if (event.target.value === "low") {
      this.props.orders.sort((a, b) => +a.price - +b.price);
      this.setState({ priceCheck: event.target.value });
      this.setState({ dateCheck: "" });
    } else if (event.target.value === "high") {
      this.props.orders.sort((a, b) => +b.price - +a.price);
      this.setState({ priceCheck: event.target.value });
      this.setState({ dateCheck: "" });
    } else if (event.target.value === "old") {
      this.props.orders.sort(
        (a, b) =>
          new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
      );
      this.setState({ dateCheck: event.target.value });
      this.setState({ priceCheck: "" });
    } else if (event.target.value === "new") {
      this.props.orders.sort(
        (a, b) =>
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      );
      this.setState({ dateCheck: event.target.value });
      this.setState({ priceCheck: "" });
    }
  };

  deleteHandler = (value) => {
    console.log(value);
    this.props.deleteOrders(value, { ...this.props });
  };

  render() {
    let filter = null;
    if (this.props.orders && this.props.orders.length > 0) {
      filter = (
        <div>
          <h2>My Orders:</h2>
          <div>Filter By:</div>
          <span>
            <label>Date:</label>
            old:
            <input
              type="radio"
              name="price"
              value="old"
              onChange={(event) => this.sort(event)}
              checked={this.state.dateCheck === "old"}
            />
            new:
            <input
              type="radio"
              name="price"
              value="new"
              onChange={(event) => this.sort(event)}
              checked={this.state.dateCheck === "new"}
            />
          </span>
          <span>
            <label>Price:</label>
            <span>
              low:
              <input
                type="radio"
                name="price"
                value="low"
                onChange={(event) => this.sort(event)}
                checked={this.state.priceCheck === "low"}
              />
              high:
              <input
                type="radio"
                name="price"
                value="high"
                onChange={(event) => this.sort(event)}
                checked={this.state.priceCheck === "high"}
              />
            </span>
          </span>
        </div>
      );
    } else {
      filter = <p>No Orders found!</p>;
    }
    console.log(this.props.orders);
    return (
      <div>
        {filter}
        {this.props.orders.map((order) => {
          return (
            <Order
              {...this.props}
              key={order.id}
              id={order.id}
              date={order.orderDate}
              price={order.price}
              ingredients={order.ingredients}
              delete={() => this.deleteHandler(order.id)}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orderReducer.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => dispatch(action.fetchOrders()),
    deleteOrders: (id, props) => dispatch(action.deleteOrder(id, props)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
