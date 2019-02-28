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

  displayNotebookList() {
    if (!this.props.notebooks) {
      return null;
    }
    let notebooks = this.props.notebooks.map(item => {
      return (
        <div className="notebook-item" key={item._id}>
          <p className="notebook-total">
            Posts in Notebook:
            <span> 17</span>
          </p>
          <span className="notebook-title">
            <Link to={`/notebooks/${item._id}`}>{item.title}</Link>
          </span>
          <Title content="Tags" />
          <Button type="secondary" label={item.tags} />
        </div>
      );
    });

    return <>{notebooks}</>;
  }

  render() {
    return (
      <Masonry className={"my-gallery-class notebook-list"}>
        {this.displayNotebookList()}
      </Masonry>
    );
  }
}
