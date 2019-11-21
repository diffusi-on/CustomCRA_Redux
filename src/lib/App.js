import Css from "lib/App.module.scss";

import * as History from "history";
import * as Store from "store";
import { Provider } from "react-redux";
import { bind } from "decko";
import Config from "const/Config";
import Header from "lib/Header";
import React, { Component } from "react";
import Routes from "lib/Routes";
import Utils from "utils/Utils";

export default class App extends Component {
  constructor(props) {
    super(props);
    let userData = null;
    try {
      userData = JSON.parse(Utils.storageValue(Config.AUTH_LS_KEY));
    } catch (exception) {}
    this.history = History.createBrowserHistory();
    this.store = Store.createStore({
      history: this.history,
      userData
    });
  }

  render() {
    return (
      <Provider store={this.store}>
        <div className={Css.app}>
          <Header onClick={this.handleHeaderClick} />
          <Routes history={this.history} />
        </div>
      </Provider>
    );
  }

  @bind
  handleHeaderClick() {
    this.history.push("/");
  }
}
