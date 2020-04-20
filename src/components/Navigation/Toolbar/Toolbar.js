import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

class toolbar extends Component {
  render() {
    let user = null;
    if (this.props.email) {
      user = (
        <span style={{ color: "yellow" }}>{"Welcome " + this.props.email}</span>
      );
    }
    return (
      <div>
        <header className={classes.Toolbar}>
          <DrawerToggle clicked={this.props.drawerToggleClicked} />
          {user}
          <div className={classes.Logo}>
            <Logo />
          </div>
          <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth={this.props.isAuth} />
          </nav>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.authReducer.email,
  };
};

export default connect(mapStateToProps)(toolbar);
