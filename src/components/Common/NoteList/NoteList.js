import React, { Component } from "react";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-component";
import moment from "moment";

import "components/Common/NotebookList/NotebookList.scss";

export default class NoteList extends Component {
  constructor() {
    super();

    this.displayNotes = this.displayNotes.bind(this);
  }

  displayNotes() {
    if (!this.props.notes) {
      return null;
    }
    let noteList = this.props.notes.map(item => {
      let timestamp = moment(
        new Date(parseInt(item._id.substring(0, 8), 16) * 1000)
      ).format("Do MMMM YYYY");

      return (
        <div className="note-item" key={item._id}>
          <p>
            Created on{" "}
            <span>
              <b>{timestamp}</b>
            </span>
          </p>
          <span className="notebook-title">
            <Link to={`/notes/${item._id}`}>{item.title}</Link>
          </span>
          <div dangerouslySetInnerHTML={{ __html: item.body }} />
        </div>
      );
    });

    return <>{noteList}</>;
  }

  render() {
    return (
      <Masonry className="my-gallery-class note-list">
        {this.displayNotes()}
      </Masonry>
    );
  }
}
