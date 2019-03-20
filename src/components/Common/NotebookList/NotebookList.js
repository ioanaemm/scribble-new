import React, { Component } from "react";
import Masonry from "react-masonry-component";

import NotebookItem from "components/Common/NotebookItem/NotebookItem";
import "components/Common/NotebookList/NotebookList.scss";

export default class NotebookList extends Component {
  constructor() {
    super();

    this.displayNotebookList = this.displayNotebookList.bind(this);
  }

  displayNotebookList() {
    if (!this.props.notebooks) {
      return null;
    }
    let notebooks = this.props.notebooks.map(notebook => {
      return <NotebookItem notebook={notebook} key={notebook._id} />;
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
