import React, { Component } from "react";
import { connect } from "react-redux";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Backdrop from "../../Backdrop/Backdrop";

class sideDrawer extends Component {
  render() {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (this.props.open) {
      attachedClasses = [classes.SideDrawer, classes.Open];
    }
    let user = null;
    if (this.props.email) {
      user = (
        <span style={{ color: "brown" }}> {"Welcome " + this.props.email}</span>
      );
    }
    return (
      <div>
        <Backdrop show={this.props.open} click={this.props.closed} />
        <div className={attachedClasses.join(" ")} onClick={this.props.closed}>
          {user}
          <div className={classes.Logo}>
            <Logo />
          </div>
          <nav>
            <NavigationItems isAuth={this.props.isAuth} />
          </nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.authReducer.email,
  };
};

export default connect(mapStateToProps)(sideDrawer);
