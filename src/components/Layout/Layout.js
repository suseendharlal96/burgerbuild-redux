import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Layout.css";
import Auxi from "../../hoc/Auxilary";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sidebarToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <Auxi>
        <Toolbar
          isAuth={this.props.isAuth}
          drawerToggleClicked={this.sidebarToggleHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuth}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Auxi>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.authReducer.idToken !== null,
  };
};

export default connect(mapStateToProps)(Layout);
