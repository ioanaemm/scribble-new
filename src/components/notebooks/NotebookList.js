import React, { Component } from "react";

export default class NotebookList extends Component {
  constructor() {
    super();
  }
  render() {
    return <ul>{this.props.displayNotebooks}</ul>;
  }
}
