import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NotebookList extends Component {
  constructor() {
    super();

    this.displayNotebookList = this.displayNotebookList.bind(this);
  }

  displayNotebookList() {
    let notebooks = this.props.notebooks.map(item => {
      return (
        <li key={item.id}>
          <Link to={`/notebooks/${item.id}`}>
            {item.title} {item.id}
          </Link>
        </li>
      );
    });
    return <ul>{notebooks}</ul>;
  }
  render() {
    return <div className="menu">{this.displayNotebookList()}</div>;
  }
}
