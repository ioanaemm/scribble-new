import React, { Component } from "react";
import Masonry from "react-masonry-component";

import NoteItem from "components/Common/NoteItem/NoteItem";

export default class NoteList extends Component {
  constructor() {
    super();

    this.displayNotes = this.displayNotes.bind(this);
  }

  displayNotes() {
    if (!this.props.notes) {
      return null;
    }
    return this.props.notes.map(note => {
      return <NoteItem key={note._id} note={note} />;
    });
  }

  render() {
    return (
      <Masonry className="my-gallery-class note-list">
        {this.displayNotes()}
      </Masonry>
    );
  }
}
