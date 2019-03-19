import React, { Component } from "react";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-component";

import Button from "components/Common/Button/Button";
import Title from "components/Common/Title/Title.js";
import "components/Common/NotebookList/NotebookList.scss";

export default class NotebookList extends Component {
  constructor() {
    super();

    this.displayNotebookList = this.displayNotebookList.bind(this);
  }

  displayTags(notebook) {
    if (!notebook.tags) {
      return null;
    }
    return (
      <>
        <Title content="Tags" />
        <Button type="secondary" label={notebook.tags} />
      </>
    );
  }

  displayNotebookList() {
    if (!this.props.notebooks) {
      return null;
    }
    let notebooks = this.props.notebooks.map(notebook => {
      return (
        <div
          className={`notebook-item notebook-item-${notebook._id}`}
          key={notebook._id}
        >
          <p onClick={() => this.props.removeNotebook(notebook._id)}>Delete</p>
          <p className="notebook-total">
            Notes in Notebook:
            <span> {notebook.noteCount}</span>
          </p>
          <span className="notebook-title">
            <Link to={`/notebooks/${notebook._id}`}>{notebook.title}</Link>
          </span>
          {this.displayTags(notebook)}
        </div>
      );
    });

    return <>{notebooks}</>;
  }

  render() {
    return (
      <Masonry className={"notebook-list"}>
        {this.displayNotebookList()}
      </Masonry>
    );
  }
}
