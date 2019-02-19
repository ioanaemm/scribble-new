import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NotebookList extends Component {
  constructor() {
    super();

    this.displayNotebookList = this.displayNotebookList.bind(this);
  }

  displayNotebookList() {
    if (!this.props.notebooks) {
      return null;
    }
    let notebooks = this.props.notebooks.map(item => {
      return (
        <li key={item._id}>
          <Link to={`/notebooks/${item._id}`}>{item.title}</Link>
        </li>
      );
    });
    return <ul>{notebooks}</ul>;
  }
  render() {
    return <div className="menu">{this.displayNotebookList()}</div>;
  }
}
