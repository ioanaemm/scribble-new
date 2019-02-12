import React, { Component } from "react";

export default class NotebookList extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="menu">
        <ul>{this.props.displayNotebooks}</ul>
      </div>
    );
  }
}
