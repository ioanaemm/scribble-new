import React, { Component } from "react";
import * as Api from "Api/Api";
import { withRouter } from "react-router-dom";

class SearchResultsPage extends Component {
  constructor() {
    super();
    this.state = {
      notebooks: null,
      notes: null
    };
    this.fetchResults = this.fetchResults.bind(this);
    this.displayNotebookList = this.displayNotebookList.bind(this);
    this.displayNoteList = this.displayNoteList.bind(this);
  }

  componentDidMount() {
    this.fetchResults(this.props.match.params.query);
  }

  fetchResults(term) {
    Api.fetchSearchList(term).then(response => {
      console.log("response", response.data);
      this.setState({
        notebooks: response.data.notebooks,
        notes: response.data.notes
      });
    });
  }

  displayNotebookList() {
    console.log("this.state.notebooks", this.state.notebooks);
    if (!this.state.notebooks) {
      return null;
    }
    let notebooks = this.state.notebooks.map(notebook => {
      return <li key={notebook._id}>{notebook.title}</li>;
    });
    return <ul>{notebooks}</ul>;
  }

  displayNoteList() {
    if (!this.state.notes) {
      return null;
    }

    let notes = this.state.notes.map(note => {
      return <li key={note._id}>{note.title}</li>;
    });

    return <ul>{notes}</ul>;
  }

  render() {
    return (
      <div className="search-list-container">
        <div>
          <p>Notebooks</p>
          {this.displayNotebookList()}
        </div>
        <div>
          <p>Notes</p>
          {this.displayNoteList()}
        </div>
      </div>
    );
  }
}

export default withRouter(SearchResultsPage);
