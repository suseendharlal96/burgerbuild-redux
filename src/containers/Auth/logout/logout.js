import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import * as action from "../../../store/actions/index";
import { connect } from "react-redux";

class logout extends Component {
  componentDidMount() {
    this.props.logout();
  }
  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(action.logout()),
  };
};
export default connect(null, mapDispatchToProps)(logout);
