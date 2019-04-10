import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import * as Api from "api/Api";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";

import Button from "components/Common/Button/Button";
import NoteModal from "components/Common/NoteModal/NoteModal";
import "components/NotebookPage/NotebookContainer/NotebookContainer.scss";

export class NotebookContainer extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      notebook: null,
      pending: true,
      error: false,
      isInput: false,
      title: ""
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.onModalSubmit = this.onModalSubmit.bind(this);
    this.displayNotes = this.displayNotes.bind(this);
    this.onTitleSubmit = this.onTitleSubmit.bind(this);
    this.saveInputValue = this.saveInputValue.bind(this);
    this.displayTitle = this.displayTitle.bind(this);
    // this.showLessNoteContent = this.showLessNoteContent.bind(this);
  }
  componentDidMount() {
    Api.fetchNotebook(this.props.match.params.id).then(
      response => {
        this.setState({
          pending: false,
          title: response.data.title,
          notebook: response.data
        });
      },
      () => {
        this.setState({ pending: false, error: true });
      }
    );
  }

  toggleModal() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  onModalSubmit(noteData) {
    noteData.notebookId = this.state.notebook._id;
    Api.addNote(noteData).then(response => {
      this.setState({
        notebook: {
          ...this.state.notebook,
          notes: [...this.state.notebook.notes, response.data]
        }
      });
    });
    this.toggleModal();
  }

  // showLessNoteContent() {
  //   let showLessContent;
  //
  //   if (!this.state.notebook || !this.state.notebook.notes) {
  //     return null;
  //   } else {
  //     let notes = this.state.notebook.notes.map(note => {
  //       // showLessContent = note.body.substring(0, 100);
  //       return { __html: note.body };
  //     });
  //   }
  //   // console.log("showLessContent", showLessContent);
  // }

  displayNotes() {
    if (!this.state.notebook || !this.state.notebook.notes) {
      return null;
    }
    let notes = this.state.notebook.notes.map(note => {
      let htmlContent = note.body.substr(0, note.body.length - 180);
      console.log("htmlContent", htmlContent);
      let datestamp = moment(
        new Date(parseInt(note._id.substring(0, 8), 16) * 1000)
      ).format("Do MMMM YYYY");
      let hourstamp = moment(
        new Date(parseInt(note._id.substring(0, 8), 16) * 1000)
      ).format("hh:mm A");
      console.log(hourstamp);
      return (
        <li key={note._id}>
          <Link className="note-title" to={`/notes/${note._id}`}>
            {note.title}
          </Link>
          <span className="hourstamp">
            {hourstamp}&nbsp;&nbsp;
            <i className="icon fa fa-angle-right" />
          </span>
          <p className="dateStamp">{datestamp}</p>
          <div className="note-body">{ReactHtmlParser(htmlContent)} </div>
        </li>
      );
    });
    return <ul>{notes}</ul>;
  }

  renderModal() {
    if (!this.state.isOpen) {
      return null;
    }

    return (
      <NoteModal onClose={this.toggleModal} onSubmit={this.onModalSubmit} />
    );
  }

  onTitleSubmit() {
    // console.log("this.state.title", this.state.title);
    Api.patchNotebookContent(this.props.match.params.id, {
      title: this.state.title
    }).then(
      response => {
        console.log("response.data", response.data);
        this.setState({
          title: response.data.title,
          isInput: false
        });
      },
      error => {
        this.setState({
          error: error.response.data
        });
      }
    );
  }

  saveInputValue(e) {
    this.setState({
      title: e.target.value
    });
  }

  displayTitle() {
    if (this.state.isInput) {
      return (
        <>
          <input
            className="title-input"
            type="text"
            value={this.state.title}
            onChange={this.saveInputValue}
          />
          <button
            className="title-submit"
            type="primary"
            label="Save"
            onClick={this.onTitleSubmit}
          />
        </>
      );
    } else {
      return (
        <h3
          className="notebook-title"
          onClick={() => this.setState({ isInput: true })}
        >
          {this.state.title}
        </h3>
      );
    }
  }

  render() {
    if (this.state.pending) {
      return <p className="preloader">Loading...</p>;
    }
    if (this.state.error) {
      return <p className="error">Notebook not found</p>;
    }

    return (
      <div className="notebook-container">
        {this.displayTitle()}
        <p>{this.state.notebook && this.state.notebook.tags}</p>
        <Button
          className="newnote-modal"
          type="primary"
          onClick={this.toggleModal}
          label="New Note"
        />
        {this.renderModal()}
        {this.displayNotes()}
      </div>
    );
  }
}

export default withRouter(NotebookContainer);
