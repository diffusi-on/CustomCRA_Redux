import Css from "lib/Header.module.scss";

import logo from "assets/logo.svg";

import * as MainActions from "actions/main";
import * as ReactRedux from "react-redux";
import { bind } from "decko";
import React, { Component } from "react";

class Header extends Component {
  render() {
    const { user } = this.props;
    return (
      <header className={Css.header} onClick={this.props.onClick}>
        <img src={logo} className={Css.logo} alt="logo" />
        {user && <h3>
          <span>You loged in as: {user.login.toUpperCase()} </span>
          <span className={Css.logout} onClick={this.handleLogoutTextClick}>logout</span>
        </h3>}
      </header>
    );
  }

  @bind
  handleLogoutTextClick() {
    this.props.dispatch(MainActions.logoutUser());
  }
}

export default ReactRedux.connect(
  ({ main }) => ({
    user: main.user
  }),
  (dispatch) => ({ dispatch })
)(Header);
