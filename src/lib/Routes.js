import * as ReactRedux from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import AuthPage from "lib/pages/auth/AuthPage";
import DataPage from "lib/pages/data/DataPage";
import MainPage from "lib/pages/main/MainPage";
import ProtectedRoute from "lib/common/router/ProtectedRoute";
import React, { Component } from "react";
import RoutesConfig from "const/RoutesConfig";
import StaticPage from "lib/pages/static/StaticPage";

class Routes extends Component {
  render() {
    const { authState } = this.props;
    return (
      <ConnectedRouter history={this.props.history}>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/static" component={StaticPage} />
          <ProtectedRoute path="/auth" redirectTo={RoutesConfig.DATA.path} authState={authState} component={AuthPage} />
          <ProtectedRoute path="/data" redirectTo={RoutesConfig.AUTH.path} authState={authState} component={DataPage} />
        </Switch>
      </ConnectedRouter>
    );
  }
}

export default ReactRedux.connect(
  ({ main }) => ({
    authState: !!main.user
  }),
  (dispatch) => ({ dispatch })
)(Routes);

