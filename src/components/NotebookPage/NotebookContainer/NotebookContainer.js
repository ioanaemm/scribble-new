import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import * as Api from "api/Api";
import moment from "moment";

import Preloader from "components/Common/Preloader/Preloader";
import NoteList from "components/Common/NoteList/NoteList";
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

    this.inputRef = React.createRef();

    this.toggleModal = this.toggleModal.bind(this);
    this.onModalSubmit = this.onModalSubmit.bind(this);
    this.displayNotes = this.displayNotes.bind(this);
    this.onTitleSubmit = this.onTitleSubmit.bind(this);
    this.saveInputValue = this.saveInputValue.bind(this);
    this.displayTitle = this.displayTitle.bind(this);
    this.makeInput = this.makeInput.bind(this);
    this.makeNotInput = this.makeNotInput.bind(this);
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

    window.addEventListener("click", this.makeNotInput);
    window.addEventListener("touchend", this.makeNotInput);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.makeNotInput);
    window.removeEventListener("touchend", this.makeNotInput);
  }

  makeNotInput() {
    this.setState({ isInput: false });
  }

  makeInput(e) {
    e.stopPropagation();

    this.setState({ isInput: true }, () => {
      this.inputRef.current.focus();
    });
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

  displayNotes() {
    if (!this.state.notebook || !this.state.notebook.notes) {
      return null;
    }

    return <NoteList notes={this.state.notebook.notes} />;
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
            ref={this.inputRef}
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
        <h3 className="notebook-title" onClick={this.makeInput}>
          <i className="fa fa-book" />
          {this.state.title}
        </h3>
      );
    }
  }

  render() {
    if (this.state.pending) {
      return (
        <div className="notebook-container">
          <Preloader centered={true} />
        </div>
      );
    }
    if (this.state.error) {
      return (
        <div className="notebook-container">
          <p className="error">Notebook not found</p>
        </div>
      );
    }

    return (
      <div className="notebook-container">
        {this.displayTitle()}

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
