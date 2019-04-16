import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import * as Api from "api/Api";
import Select from "react-select";

import Preloader from "components/Common/Preloader/Preloader";
import Button from "components/Common/Button/Button";
import "./NoteContainer.scss";

export class NoteContainer extends Component {
  constructor() {
    super();
    this.state = {
      pending: true,
      error: null,
      title: "New note",
      isInput: false,
      body: "",
      notebook: null,
      isSaving: false,
      isDeleting: false,
      isSaved: false,
      isNew: false,
      notebookList: null,
      notebookOptions: null,
      selectedNotebook: null
    };

    this.titleInputRef = React.createRef();

    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.saveNoteDetails = this.saveNoteDetails.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.retrieveNotebook = this.retrieveNotebook.bind(this);
    this.displayNotebookTitle = this.displayNotebookTitle.bind(this);
    this.displayNotesInNotebook = this.displayNotesInNotebook.bind(this);
    this.displayTitle = this.displayTitle.bind(this);
    this.saveInputValue = this.saveInputValue.bind(this);
    this.loadNoteData = this.loadNoteData.bind(this);
    this.displaySaveButton = this.displaySaveButton.bind(this);
    this.loadNotebookList = this.loadNotebookList.bind(this);
    this.handleNotebookChange = this.handleNotebookChange.bind(this);
    this.removeIsInput = this.removeIsInput.bind(this);
    this.makeIsInput = this.makeIsInput.bind(this);
    this.displayNoteList = this.displayNoteList.bind(this);
    this.displayNoteDetails = this.displayNoteDetails.bind(this);
    this.displaySaveIcon = this.displaySaveIcon.bind(this);
    this.displayDeleteButton = this.displayDeleteButton.bind(this);
    this.displaySidebarNotebookTitle = this.displaySidebarNotebookTitle.bind(
      this
    );
    this.refreshData = this.refreshData.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  componentDidMount() {
    this.refreshData();
    window.addEventListener("click", this.removeIsInput);
    window.addEventListener("touchend", this.removeIsInput);
  }

  componentDidUpdate(newProps) {
    if (newProps !== this.props) {
      this.refreshData();
    }
  }

  refreshData() {
    const id = this.props.match.params.id;
    if (id) {
      this.loadNoteData(id);
    } else {
      this.loadNotebookList();
      this.setState({ pending: false, isNew: true });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.removeIsInput);
    window.removeEventListener("touchend", this.removeIsInput);
  }

  removeIsInput() {
    this.setState({ isInput: false });
  }

  makeIsInput(e) {
    e.stopPropagation();
    this.setState({ isInput: true }, () => {
      if (this.titleInputRef.current) {
        this.titleInputRef.current.focus();
      }
    });
  }

  loadNotebookList() {
    Api.fetchNotebooks({}).then(
      response => {
        const notebookOptions = response.data.map(notebook => {
          return {
            value: notebook._id,
            label: notebook.title
          };
        });
        let selectedNotebook;
        if (notebookOptions.length > 0) {
          const desiredNotebook = this.props.match.params.notebookId;
          if (desiredNotebook) {
            selectedNotebook = notebookOptions.filter(notebook => {
              return notebook.value === desiredNotebook;
            })[0];
          }
          if (!selectedNotebook) {
            selectedNotebook = notebookOptions[0];
          }
        }

        this.setState({
          notebookList: response.data,
          notebookOptions,
          selectedNotebook
        });
      },
      error => {
        alert("Something went wrong, please try again later");
      }
    );
  }

  loadNoteData(noteId) {
    Api.fetchNote(noteId).then(
      response => {
        this.retrieveNotebook(response.data.notebookId);

        const contentBlock = htmlToDraft(response.data.body || "");
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);

        this.setState({
          pending: false,
          title: response.data.title,
          body: response.data.body || "",
          editorState
        });
      },
      error => {
        this.setState({ error: error.response.data, pending: false });
      }
    );
  }

  retrieveNotebook(notebookId) {
    return Api.fetchNotebook(notebookId).then(
      response => {
        if (!response) {
          alert("Something went wrong, please try again later");
          return;
        }
        this.setState({
          notebook: response.data
        });
      },
      error => {
        alert("Something went wrong, please try again later");
      }
    );
  }

  handleNotebookChange(selectedNotebook) {
    this.setState({ selectedNotebook });
  }

  displaySidebarNotebookTitle() {
    if (
      this.state.isNew ||
      !this.state.notebook ||
      !this.state.notebook.title
    ) {
      return null;
    }
    return <span>{this.state.notebook.title}:</span>;
  }

  displayNotebookTitle() {
    if (this.state.isNew) {
      if (!this.state.notebookList) {
        return null;
      }

      return (
        <Select
          className="notebook-select"
          value={this.state.selectedNotebook}
          onChange={this.handleNotebookChange}
          options={this.state.notebookOptions}
        />
      );
    } else {
      if (!this.state.notebook) {
        return null;
      }
      return <span>{this.state.notebook.title}</span>;
    }
  }

  displayNotesInNotebook() {
    if (!this.state.notebook || !this.state.notebook.notes) {
      return null;
    }
    if (this.state.notebook.notes.length === 1) {
      return (
        <p className="message-no-other-notes">
          There are no other notes in this notebook.
        </p>
      );
    }

    let crtNoteId = this.props.match.params.id;

    let notes = this.state.notebook.notes.map(note => {
      if (crtNoteId === note._id) {
        return null;
      }

      return (
        <Link to={`/notes/${note._id}`} key={note._id}>
          <div className="note-list-content">
            <h5 className="note-list-title">{note.title}</h5>
            <p
              className="note-list-body"
              dangerouslySetInnerHTML={{ __html: note.body }}
            />
          </div>
        </Link>
      );
    });
    return notes;
  }

  handleEditorChange(/*body*/ editorState) {
    // this.setState({
    //   body: body
    // });
    this.setState({
      editorState,
      body: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    });
  }

  deleteNote() {
    this.setState({ isDeleting: true });
    Api.deleteNote(this.props.match.params.id).then(
      response => {
        this.props.history.push("/");
      },
      error => {
        this.setState({ isDeleting: false });
        alert("Error deleting note, please try again later");
      }
    );
  }

  saveNoteDetails() {
    this.setState({ isSaving: true });

    if (this.state.isNew) {
      const noteData = {
        title: this.state.title,
        body: this.state.body,
        notebookId: this.state.selectedNotebook.value
      };

      setTimeout(() => {
        Api.addNote(noteData).then(response => {
          this.retrieveNotebook(response.data.notebookId).then(() => {
            this.setState(
              { isNew: false, isSaving: false, isSaved: true },
              () => {
                this.props.history.push(`/notes/${response.data._id}`);
                setTimeout(() => {
                  this.setState({ isSaved: false });
                }, 2000);
              }
            );
          });
        });
      }, 500);
    } else {
      setTimeout(() => {
        Api.patchNoteContent(this.props.match.params.id, {
          title: this.state.title,
          body: this.state.body
        }).then(
          response => {
            this.setState(
              {
                isInput: false,
                isSaving: false,
                isSaved: true
              },
              () => {
                setTimeout(() => {
                  this.setState({ isSaved: false });
                }, 2000);
              }
            );
          },
          error => {
            this.setState({
              error: error.response.data,
              isSaving: false
            });
          }
        );
      }, 500);
    }
  }

  saveInputValue(e) {
    e.preventDefault();
    this.setState({
      title: e.target.value
    });
  }

  onKeyUp(e) {
    if (e.key === "Enter") {
      this.removeIsInput();
    }
  }

  displayTitle() {
    if (this.state.isInput) {
      return (
        <>
          <input
            className="input-title"
            type="text"
            ref={this.titleInputRef}
            value={this.state.title}
            onChange={this.saveInputValue}
            onClick={e => e.stopPropagation}
            onKeyUp={this.onKeyUp}
          />
        </>
      );
    } else {
      return (
        <>
          <h3 className="note-title" onClick={this.makeIsInput}>
            {this.state.title}
          </h3>
        </>
      );
    }
  }

  displaySaveButton() {
    return (
      <div className="save-button-container">
        <Button className="save-note desktop" onClick={this.saveNoteDetails}>
          {this.displaySaveIcon()}
        </Button>
        {this.displayDeleteButton()}
        <Button className="save-note mobile" onClick={this.saveNoteDetails}>
          {this.displaySaveIcon()}
        </Button>
      </div>
    );
  }

  displayDeleteButton() {
    if (this.state.isNew) {
      return null;
    }
    return (
      <Button
        type="secondary"
        label={
          this.state.isDeleting ? (
            <Preloader />
          ) : (
            <i className="fa fa-trash-alt" />
          )
        }
        className={`delete-note desktop ${
          this.state.isDeleting ? "is-deleting" : "is-not-deleting"
        }`}
        onClick={this.deleteNote}
      />
    );
  }
  displaySaveIcon() {
    if (this.state.isSaving) {
      return <Preloader />;
    } else if (this.state.isSaved) {
      return <i className="fa icon fa-check fa-lg" key="check" />;
    } else {
      return <i className="fa icon fa-cloud-upload-alt fa-lg" key="cloud" />;
    }
  }

  displayNoteList() {
    if (this.state.isNew) {
      return null;
    }
    return (
      <div className="note-list-container">
        <h3 className="note-list-container-title">
          {this.displaySidebarNotebookTitle()}
        </h3>
        <div className="notelist-divider" />
        {this.displayNotesInNotebook()}
      </div>
    );
  }

  displayNoteDetails() {
    return (
      <div className="note-details">
        {this.displaySaveButton()}
        <div className="notebook-title">
          Notebook: {this.displayNotebookTitle()}
        </div>
        <div className="note-header">{this.displayTitle()}</div>
        <div className="note-editor">
          <Editor
            editorState={this.state.editorState}
            wrapperClassName="editor-wrapper"
            editorClassName="editor-inner-container"
            onEditorStateChange={this.handleEditorChange}
          />
        </div>
      </div>
    );
  }

  render() {
    if (this.state.pending) {
      return <Preloader />;
    }

    if (this.state.error) {
      return <p>{this.state.error}</p>;
    }

    if (
      this.state.isNew &&
      this.state.notebookList &&
      this.state.notebookList.length === 0
    ) {
      return (
        <div className="note-container">
          <p className="message-no-results">
            Before creating a note, you need to create a notebook.
            <br />
            <Link to="/newnotebook" className="notebooks-page-container">
              <Button type="primary" className="notebooks-page">
                Create one now
              </Button>
            </Link>
          </p>
        </div>
      );
    }

    return (
      <div className="note-container">
        <div className="note-content">
          {this.displayNoteDetails()}
          {this.displayNoteList()}
        </div>
      </div>
    );
  }
}
export default withRouter(NoteContainer);
