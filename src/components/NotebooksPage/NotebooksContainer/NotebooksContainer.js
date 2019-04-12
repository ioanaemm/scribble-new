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

  displayNotebookList() {
    if (!this.state.notebooks) {
      return null;
    }

    return (
      <NotebookList
        notebooks={this.state.notebooks}
        removeNotebook={this.removeNotebook}
      />
    );

    // let notebookList = this.state.notebooks.map(notebook => {
    //   let timestamp = moment(
    //     new Date(parseInt(notebook._id.substring(0, 8), 16) * 1000)
    //   ).format("Do MMMM YYYY");
    //
    //   if (!notebook.tags) {
    //     return null;
    //   }
    //
    //   return (
    //     <li className="notebook-item" key={notebook._id}>
    //       <Link className="note-link" to={`/notebooks/${notebook._id}`}>
    //         {notebook.title}
    //       </Link>
    //       <button
    //         className="delete"
    //         onClick={() => this.removeNotebook(notebook._id)}
    //       >
    //         <i className="fa fa-trash-alt" />
    //       </button>
    //       <p>Created on: {timestamp}</p>
    //       <p> Posts in notebook: {notebook.noteCount}</p>
    //       <div className="tags-container">
    //         <Title content="Tags" />
    //         <Button className="tags" type="secondary" label={notebook.tags} />
    //       </div>
    //     </li>
    //   );
    // });
    //
    // return <ul className="notebook-list">{notebookList}</ul>;
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
