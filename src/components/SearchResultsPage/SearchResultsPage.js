import React, { Component } from "react";
import * as Api from "api/Api";
import { withRouter } from "react-router-dom";

import NotebookList from "components/Common/NotebookList/NotebookList";
import NoteList from "components/Common/NoteList/NoteList";
import Title from "components/Common/Title/Title";

import Preloader from "components/Common/Preloader/Preloader";
import "./SearchResultsPage.scss";

export class SearchResultsPage extends Component {
  constructor() {
    super();
    this.state = {
      pending: true,
      notebooks: null,
      notes: null
    };
    this.fetchResults = this.fetchResults.bind(this);
    this.displayNotebookList = this.displayNotebookList.bind(this);
    this.displayNoteList = this.displayNoteList.bind(this);
    this.removeNotebook = this.removeNotebook.bind(this);
    this.addNotebook = this.addNotebook.bind(this);
  }

  componentDidMount() {
    this.fetchResults();
  }

  componentDidUpdate(newProps) {
    if (newProps !== this.props) {
      this.fetchResults();
    }
  }

  fetchResults() {
    this.setState({ pending: true });
    Api.fetchSearchList(this.props.match.params.query).then(response => {
      this.setState({
        notebooks: response.data.notebooks,
        notes: response.data.notes,
        pending: false
      });
    });
  }

  displayNotebookList() {
    if (!this.state.notebooks) {
      return null;
    }
    if (this.state.notebooks.length === 0) {
      return <p className="message-no-results">No notebooks found</p>;
    }
    return (
      <NotebookList
        notebooks={this.state.notebooks}
        removeNotebook={this.removeNotebook}
        addNotebook={this.addNotebook}
      />
    );
  }

  displayNoteList() {
    if (!this.state.notes) {
      return null;
    }
    if (this.state.notes.length === 0) {
      return <p className="message-no-results">No notebooks found</p>;
    }
    return <NoteList notes={this.state.notes} />;
  }

  removeNotebook(notebookId) {
    Api.deleteNotebook(notebookId).then(response => {
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

  render() {
    if (this.state.pending) {
      return (
        <div className="search-list-container">
          <Preloader />
        </div>
      );
    }
    return (
      <div className="search-list-container">
        <div>
          <Title content="Notebooks" />
          {this.displayNotebookList()}
        </div>
        <div>
          <Title content="Notes" />
          {this.displayNoteList()}
        </div>
      </div>
    );
  }
}

export default withRouter(SearchResultsPage);
