import CommonCss from "lib/common/Common.module.scss";

import Css from "lib/pages/data/DataPage.module.scss";

import * as MainActions from "actions/main";
import * as ReactRedux from "react-redux";
import { bind } from "decko";
import DataRow from "lib/pages/data/lib/DataRow";
import React, { Component } from "react";
import classNames from "classnames";

class DataPage extends Component {
  render() {
    return (
      <main className={classNames(CommonCss.page, Css.dataPage)}>
        <button
          className={CommonCss.button}
          disabled={this.props.dataFetching}
          onClick={this.handleAddButtonClick}>
            Add new (async)
        </button>
        <div className={Css.counter}>Items count: {this.props.data.length}</div>
        {this.renderTable()}
      </main>
    );
  }

  renderTable() {
    return (
      <table>
        <tbody>
          {this.props.data.map((item) => {
            return <DataRow key={item.login.uuid} item={item} onRemove={this.handleDataRowRemove} />;
          })}
        </tbody>
      </table>
    );
  }

  componentDidMount() {
    if (!this.props.data.length) this.props.dispatch(MainActions.addItem());
  }

  @bind
  handleAddButtonClick() {
    this.props.dispatch(MainActions.addItem())
      .then(({ name }) => {
        console.log(`${name.title}. ${name.first} ${name.last}`);//eslint-disable-line no-console
      });
  }

  @bind
  handleDataRowRemove(uuid) {
    this.props.dispatch(MainActions.removeItem(uuid));
  }
}

export default ReactRedux.connect(
  ({ main }) => ({
    data: main.data,
    dataFetching: main.dataFetching
  }),
  (dispatch) => ({ dispatch })
)(DataPage);
