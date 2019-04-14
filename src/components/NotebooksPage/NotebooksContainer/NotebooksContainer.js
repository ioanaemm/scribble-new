import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as Api from "api/Api";

import NotebookList from "components/Common/NotebookList/NotebookList";

import "./NotebooksContainer.scss";

export class NotebooksContainer extends Component {
  constructor() {
    super();
    this.state = {
      notebooks: null
    };
    this.displayNotebookList = this.displayNotebookList.bind(this);
    this.removeNotebook = this.removeNotebook.bind(this);
    this.addNotebook = this.addNotebook.bind(this);
  }

  componentDidMount() {
    Api.fetchNotebooks({
      limit: Number.MAX_SAFE_INTEGER,
      sort: { _id: -1 },
      skip: 0
    }).then(response => {
      if (response) {
        this.setState({ notebooks: response.data });
      }
    });
  }

  removeNotebook(notebookId) {
    Api.deleteNotebook(notebookId).then(response => {
      console.log(response.data);
      if (this.state.notebooks) {
        this.setState({
          notebooks: this.state.notebooks.filter(
            notebook => notebook._id !== notebookId
          )
        });
      }
    });
  }

  addNotebook(notebookData) {
    Api.addNotebook(notebookData).then(response => {
      if (this._isMounted) {
        this.setState({
          notebooks: [response.data, ...this.state.notebooks]
        });
      }
    });
  }

  displayNotebookList() {
    if (!this.state.notebooks) {
      return null;
    }

    return (
      <NotebookList
        notebooks={this.state.notebooks}
        removeNotebook={this.removeNotebook}
        addNotebook={this.addNotebook}
      />
    );
  }

  render() {
    return (
      <div className="notebooks-group">
        <h1 className="title">All Notebooks</h1>
        {this.displayNotebookList()}
      </div>
    );
  }
}

export default withRouter(NotebooksContainer);
