import React, { Component } from "react";

import { Link } from "react-router-dom";
import Button from "components/Common/Button/Button";
import NotebookItem from "components/Common/NotebookItem/NotebookItem";
import "./NotebookList.scss";

export default class NotebookList extends Component {
  constructor() {
    super();

    this._isMounted = false;

    this.displayNotebookList = this.displayNotebookList.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  displayNotebookList() {
    if (!this.props.notebooks) {
      return null;
    }

    if (this.props.notebooks.length === 0) {
      return <p className="message-no-results">No notebooks found</p>;
    }

    return this.props.notebooks.map(notebook => {
      return (
        <NotebookItem
          className="notebook-item"
          notebook={notebook}
          key={notebook._id}
          removeNotebook={this.props.removeNotebook}
        />
      );
    });
  }

  render() {
    return (
      <div className="notebook-list">
        <Link to="/newnotebook" className="add-notebook-container">
          <Button
            className="add-notebook"
            type="primary"
            label="New Notebook"
          />
        </Link>
        <div className="inner-container">{this.displayNotebookList()}</div>
      </div>
    );
  }
}
